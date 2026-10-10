'use strict';

// El recorrido de Farolero, de la persona que otorga a la tercera parte que audita.
// Cada línea sale de una ejecución real: no hay dato maquetado ni hash inventado.
// La organización es ficticia y no se reclama ningún permiso de nadie.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { Farolero } = require('./farolero.js');
const { verifyReceipt } = require('../vendor/vespi-kernel/receipt.js');

const T0 = '2026-09-29T12:00:00.000Z';
const T1 = '2026-09-29T13:00:00.000Z';
const T2 = '2026-10-03T09:00:00.000Z';

function linea(t = '') { process.stdout.write(`${t}\n`); }
function titulo(t) { linea(`\n── ${t}`); }

async function main() {
  const dir = process.argv[2] || fs.mkdtempSync(path.join(os.tmpdir(), 'farolero-recorrido-'));
  const f = new Farolero({ dir });
  linea(`Farolero — recorrido completo. Registro en: ${path.join(dir, 'registro.jsonl')}`);
  linea('Organización, agentes y datos son de EJEMPLO. Sin red, sin blockchain, sin pagos, sin un tercero.');

  titulo('1. La organización anota sus agentes de IA');
  f.registrarAgente({ id: 'agente-1', nombre: 'Cosechador', rol: 'redactor' });
  f.registrarAgente({ id: 'agente-2', nombre: 'Escribano', rol: 'revisor' });
  for (const a of f.agentes()) linea(`  ${a.id}  ${a.nombre}  ${a.rol}`);

  titulo('2. La persona otorga un permiso acotado');
  const permiso = f.otorgar({
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
  });
  linea(`  ${permiso.id}: ${permiso.agente} puede ${permiso.accion} sobre ${permiso.sujeto}, ${permiso.presupuesto} unidades,`);
  linea(`  hasta ${permiso.vence}, solo hacia ${permiso.destino}. Solo ${permiso.otorgado_por} puede pausar.`);

  const peticion = {
    agente: 'agente-1',
    accion: 'publicar',
    sujeto: 'boletin-9',
    operacion: 'boletin-9-semana-32',
    destino: 'canal:boletin',
    unidades: '3',
    clave: 'pub-1',
  };

  titulo('3. El agente ejecuta dentro del permiso');
  const uno = await f.ejecutar(peticion, { now: T0 });
  linea(`  estado:  ${uno.estado}`);
  linea(`  detalle: ${uno.detalle}`);
  linea(`  recibo:  ${uno.recibo.status} · sello ${uno.recibo.digest.slice(0, 16)}…`);
  linea(`  anclaje: ${uno.recibo.anchor.status} en ${uno.recibo.anchor.network} — nada llegó a una red; esto NO está verificado afuera`);
  linea(`  cobertura del verificador: ${uno.recibo.coverage.join(', ')}`);

  titulo('4. Quiere repetir el mismo efecto: no se repite');
  const repetido = await f.ejecutar(peticion, { now: T1 });
  linea(`  estado:  ${repetido.estado} — ${repetido.detalle}`);
  linea(`  mismo sello que el primero: ${repetido.recibo.digest === uno.recibo.digest}`);
  linea(`  efectos en el almacén: ${f.efectos().length}`);

  titulo('5. Quiere ir a otro destino: bloqueado con salida');
  const otroDestino = await f.ejecutar({ ...peticion, destino: 'canal:otro', clave: 'pub-2' }, { now: T1 });
  linea(`  estado:  ${otroDestino.estado}`);
  linea(`  detalle: ${otroDestino.detalle}`);
  linea(`  salida:  ${otroDestino.salida}`);

  titulo('6. Quiere gastar más de lo que le queda: bloqueado con la cuenta');
  const sobre = await f.ejecutar({ ...peticion, unidades: '9', clave: 'pub-3' }, { now: T1 });
  linea(`  estado:  ${sobre.estado}`);
  linea(`  detalle: ${sobre.detalle}`);

  titulo('7. La persona delega un subconjunto');
  const padre = f.permisos().find((p) => p.id === 'perm-1');
  const sub = f.delegar({ ...padre, actuator: 'agente-1', padre: 'perm-1', id: 'perm-2', agente: 'agente-2', presupuesto: '4' });
  linea(`  ${sub.id}: ${sub.agente} puede ${sub.accion} sobre ${sub.sujeto}, ${sub.presupuesto} de ${padre.presupuesto} unidades, mismo destino, mismo reloj`);
  try {
    f.delegar({ ...padre, actuator: 'agente-1', padre: 'perm-1', id: 'perm-3', agente: 'agente-2', presupuesto: '99' });
  } catch (err) {
    linea(`  intento de ampliar a 99 unidades → ${err.message}`);
  }

  titulo('8. El delegado ejerce solo su subconjunto');
  const del = await f.ejecutar({ ...peticion, agente: 'agente-2', unidades: '2', clave: 'pub-4' }, { now: T1 });
  linea(`  estado:  ${del.estado} — ${del.detalle}`);
  const fuera = await f.ejecutar({ ...peticion, agente: 'agente-2', unidades: '5', clave: 'pub-5' }, { now: T1 });
  linea(`  el delegado pide 5 más y se pasa de su 4 → ${fuera.estado}: ${fuera.detalle}`);

  titulo('9. La persona pausa antes del siguiente paso');
  const op = f.abrir({ ...peticion, clave: 'pub-6', unidades: '1' }, { now: T1 });
  linea(`  operación abierta: ${op.id}`);
  try {
    f.pausar(op, 'agente-1');
  } catch (err) {
    linea(`  un agente intenta pausar → ${err.message}`);
  }
  f.pausar(op, 'ana');
  const pausada = await f.correr(op, op.peticion, { now: T1 });
  linea(`  estado:  ${pausada.estado} — ${pausada.detalle}`);
  linea(`  efectos hasta acá: ${f.efectos().length}`);

  titulo('10. Pasó la fecha: la autoridad muere con su reloj');
  const vencido = await f.ejecutar({ ...peticion, clave: 'pub-7', unidades: '1' }, { now: T2 });
  linea(`  estado:  ${vencido.estado}`);
  linea(`  detalle: ${vencido.detalle}`);

  titulo('11. La tercera parte audita sin creer a nadie');
  for (const r of f.recibos()) {
    const sello = verifyReceipt(r.recibo);
    const a = f.auditar(r.recibo);
    linea(`  ${r.clave}: sello ${sello.ok ? 'verifica' : 'NO verifica'} · auditoría ${a.ok ? 'pasa' : 'NO pasa'}`);
    if (!a.ok) linea(`      ${a.motivo}`);
  }
  const creyente = { id: 'verificador-creyente', verificar: async () => ({ verified: true, checks: { me_lo_creo: true }, reason: 'me lo creo' }) };
  const conCreyente = await f.ejecutar({ ...peticion, clave: 'pub-8', unidades: '1' }, { now: T1, verificador: creyente });
  const aCreyente = f.auditar(conCreyente.recibo);
  linea(`  pub-8 con un verificador que solo cree al ejecutor:`);
  linea(`      el ejecutor dice ${conCreyente.estado}; la auditoría dice ${aCreyente.ok ? 'pasa' : 'NO pasa'} — ${aCreyente.motivo}`);

  titulo('12. Lo que este recorrido NO demuestra');
  linea('  - No cumple la Ley 21.719 ni ninguna otra norma: la norma primaria no se leyó aquí.');
  linea('  - No hay hash en testnet ni recibo en explorador: el anclaje quedó en `pending` a propósito.');
  linea('  - No hay adopción, ni permiso de ninguna institución real, ni dato de ningún tercero.');
  linea('  - La organización, los agentes y los datos son de ejemplo.');
  linea('');
  return dir;
}

if (require.main === module) {
  main().then((dir) => { process.stdout.write(`registro: ${path.join(dir, 'registro.jsonl')}\n`); });
}

module.exports = { main };
