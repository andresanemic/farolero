'use strict';

// RED de Farolero. Escrito ANTES del código, el 2026-09-29.
//
// Los ocho casos que este proyecto tiene que presionar: grant ausente, grant expirado,
// destino distinto, presupuesto excedido, subdelegación amplificada, repetición de
// efecto, recibo alterado y verificador que solo cree al ejecutor. La revocación es
// la presión del proyecto 7 (`../llavero`) y aquí aparece solo el reloj, que es la
// otra forma en que una autoridad muere.

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { Farolero } = require('../src/farolero.js');
const { verifyReceipt } = require('../vendor/vespi-kernel/receipt.js');

const T0 = '2026-09-29T12:00:00.000Z';
const T1 = '2026-09-29T13:00:00.000Z';

function temporal() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'farolero-'));
}

function taller(dir) {
  const f = new Farolero({ dir });
  f.registrarAgente({ id: 'agente-1', nombre: 'Cosechador', rol: 'redactor' });
  f.registrarAgente({ id: 'agente-2', nombre: 'Escribano', rol: 'revisor' });
  return f;
}

const PERMISO = {
  actuator: 'ana',
  id: 'perm-1',
  agente: 'agente-1',
  accion: 'publicar',
  sujeto: 'boletin-9',
  operacion: 'boletin-9-semana-32',
  destino: 'canal:boletin',
  presupuesto: '10',
  vence: '2026-10-01T00:00:00.000Z',
  pauser: ['ana'],
};

const PETICION = {
  agente: 'agente-1',
  accion: 'publicar',
  sujeto: 'boletin-9',
  operacion: 'boletin-9-semana-32',
  destino: 'canal:boletin',
  unidades: '3',
  clave: 'pub-1',
};

// 1. Grant ausente.
test('sin permiso, la ejecución queda bloqueada y vuelve a la persona con la salida', async () => {
  const f = taller(temporal());
  const r = await f.ejecutar(PETICION, { now: T0 });
  assert.equal(r.estado, 'bloqueado');
  assert.match(r.detalle, /no hay permiso/);
  assert.ok(r.salida.length > 0, 'el bloqueo nombra una salida');
  assert.equal(r.recibo.status, 'blocked');
});

// 2. Grant expirado.
test('con el permiso vencido, el bloqueo nombra la hora en que murió', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const r = await f.ejecutar(PETICION, { now: '2026-10-02T09:00:00.000Z' });
  assert.equal(r.estado, 'bloqueado');
  assert.match(r.detalle, /venció/);
  assert.match(r.detalle, /2026-10-01/);
});

// 3. Destino distinto.
test('con el mismo permiso y otro destino, el bloqueo nombra los dos destinos', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const r = await f.ejecutar({ ...PETICION, destino: 'canal:otro', clave: 'pub-2' }, { now: T0 });
  assert.equal(r.estado, 'bloqueado');
  assert.match(r.detalle, /canal:otro/);
  assert.match(r.detalle, /canal:boletin/);
});

// 4. Presupuesto excedido.
test('el presupuesto es un límite duro y se acumula entre ejecuciones', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const uno = await f.ejecutar(PETICION, { now: T0 });
  assert.equal(uno.estado, 'verificado');
  const dos = await f.ejecutar({ ...PETICION, unidades: '8', clave: 'pub-2' }, { now: T1 });
  assert.equal(dos.estado, 'bloqueado');
  assert.match(dos.detalle, /presupuesto/);
  // El núcleo llama `maxAmount` a lo que se ejerció; el campo conserva el nombre del grant.
  assert.equal(uno.recibo.authority.exercised[0].maxAmount, '3');
});

// 5. Subdelegación amplificada.
test('un delegado no puede recibir más de lo que su delegante tiene', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const caso = (parche, titulo) => {
    assert.throws(
      () => f.delegar({ ...PERMISO, id: 'perm-2', actuator: 'agente-1', padre: 'perm-1', ...parche }),
      (err) => {
        assert.match(err.message, /no cabe|amplifica/i, titulo);
        return true;
      },
      titulo,
    );
  };
  caso({ presupuesto: '11' }, 'presupuesto');
  caso({ destino: 'canal:otro' }, 'destino');
  caso({ accion: 'borrar' }, 'acción');
  caso({ vence: '2026-12-01T00:00:00.000Z' }, 'reloj');
  const ok = f.delegar({ ...PERMISO, id: 'perm-2', actuator: 'agente-1', padre: 'perm-1', agente: 'agente-2', presupuesto: '4', clave: 'sub-1' });
  assert.equal(ok.id, 'perm-2');
  assert.equal(ok.presupuesto, '4');
});

// 6. Repetición de efecto.
test('el mismo efecto no se ejecuta dos veces: el segundo intento devuelve el recibo del primero', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const uno = await f.ejecutar(PETICION, { now: T0 });
  const dos = await f.ejecutar(PETICION, { now: T1 });
  assert.equal(uno.estado, 'verificado');
  assert.equal(dos.estado, 'repetido');
  assert.equal(dos.recibo.digest, uno.recibo.digest);
  assert.equal(f.efectos().length, 1, 'el almacén tiene un solo efecto');
});

// 7. Recibo alterado.
test('un recibo editado a mano no verifica', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const r = await f.ejecutar(PETICION, { now: T0 });
  assert.equal(verifyReceipt(r.recibo).ok, true);
  const alterado = { ...r.recibo, detail: 'todo bien' };
  const veredicto = verifyReceipt(alterado);
  assert.equal(veredicto.ok, false);
  assert.equal(veredicto.reason, 'digest mismatch');
});

// 8. Verificador que solo cree al ejecutor.
test('un verificador que solo cree al ejecutor no puede producir un verde en la auditoría', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const r = await f.ejecutar(PETICION, { now: T0 });
  assert.equal(r.estado, 'verificado');
  const creyente = { id: 'verificador-creyente', verificar: async () => ({ verified: true, checks: { el: true }, reason: 'me lo creo' }) };
  const conCreyente = await f.ejecutar({ ...PETICION, clave: 'pub-9' }, { now: T1, verificador: creyente });
  assert.equal(conCreyente.estado, 'verificado', 'el kernel acepta lo que le digan');
  const auditoria = f.auditar(conCreyente.recibo);
  assert.equal(auditoria.ok, false, 'pero la auditoría independiente lo rechaza');
  assert.match(auditoria.motivo, /creyó al ejecutor|independiente/);
});

// Extras que el mismo acuerdo obliga.
test('solo quien figura como pauser puede pausar, y la operación pausada no ejecuta', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const op = f.abrir(PETICION, { now: T0 });
  assert.throws(() => f.pausar(op, 'agente-1'), /not authorized to pause/i);
  f.pausar(op, 'ana');
  const r = await f.correr(op, PETICION, { now: T0 });
  assert.equal(r.estado, 'pausado');
  assert.equal(f.efectos().length, 0, 'pausado no produce efecto');
});

test('lo que no cabe vuelve bloqueado con la razón escrita, no con un fallo mudo', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  const r = await f.ejecutar({ ...PETICION, unidades: '99', clave: 'pub-3' }, { now: T0 });
  assert.equal(r.estado, 'bloqueado');
  assert.ok(r.detalle.includes('99'), 'la razón dice la cantidad pedida');
  assert.ok(r.salida.includes('ana'), 'la salida nombra a la persona que puede resolverlo');
});

test('el registro es un archivo que la persona puede abrir sin Farolero', async () => {
  const dir = temporal();
  const f = taller(dir);
  f.otorgar(PERMISO);
  await f.ejecutar(PETICION, { now: T0 });
  const crudo = fs.readFileSync(path.join(dir, 'registro.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  assert.ok(crudo.length >= 2);
  assert.ok(crudo.some((l) => l.tipo === 'permiso'));
  assert.ok(crudo.some((l) => l.tipo === 'efecto'));
});
