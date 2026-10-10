'use strict';

// La interfaz de Farolero: una terminal que una persona opera sin saber nada del
// kernel. Cada comando dice qué hizo, con qué permiso y qué puede hacer después.

const path = require('node:path');
const { Farolero } = require('./farolero.js');
const { verifyReceipt } = require('../vendor/vespi-kernel/receipt.js');

const AYUDA = `farolero — autoridad para agentes sin código

  farolero <comando> [--clave valor ...] [--registro <carpeta>]

  agente    --id --nombre --rol
  otorgar   --id --agente --accion --sujeto --operacion --destino --presupuesto --vence --por [--pauser a,b]
  delegar   --padre --id --agente --presupuesto [--accion --sujeto --operacion --destino --vence]
  ejecutar  --agente --accion --sujeto --operacion --destino --unidades --clave [--pausar quien] [--reanudar quien]
  permisos
  agentes
  efectos
  registro
  auditar   --clave

Datos de ejemplo. Sin red, sin blockchain, sin pagos y sin un tercero.`;

function flags(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      out[key] = true;
    } else {
      out[key] = next;
      i += 1;
    }
  }
  return out;
}

function linea(texto = '') {
  process.stdout.write(`${texto}\n`);
}

function mostrar(f) {
  if (!f) return;
  linea(`  estado:   ${f.estado}`);
  if (f.detalle) linea(`  detalle:  ${f.detalle}`);
  if (f.salida) linea(`  salida:   ${f.salida}`);
  if (f.recibo) {
    linea(`  recibo:   ${f.recibo.status} · sello ${String(f.recibo.digest).slice(0, 16)}…`);
    linea(`  anclaje:  ${f.recibo.anchor.status} en ${f.recibo.anchor.network} — nada llegó a la red; esta línea dice que eso NO se verificó afuera`);
  }
}

async function main(argv) {
  const [comando, ...resto] = argv;
  const f_ = flags(resto);
  const dir = f_.registro || path.join(__dirname, '..', 'datos');
  const f = new Farolero({ dir });

  if (!comando || f_.ayuda) {
    linea(AYUDA);
    return 0;
  }

  if (comando === 'agente') {
    const a = f.registrarAgente({ id: f_.id, nombre: f_.nombre, rol: f_.rol });
    linea(`agente anotado: ${a.id} (${a.rol})`);
    return 0;
  }

  if (comando === 'otorgar') {
    const p = f.otorgar({
      actuator: f_.por,
      id: f_.id,
      agente: f_.agente,
      accion: f_.accion,
      sujeto: f_.sujeto,
      operacion: f_.operacion,
      destino: f_.destino,
      presupuesto: f_.presupuesto,
      vence: f_.vence,
      pauser: typeof f_.pauser === 'string' ? f_.pauser.split(',') : [],
    });
    linea(`permiso ${p.id} otorgado por ${p.otorgado_por} a ${p.agente}: ${p.accion} sobre ${p.sujeto}, ${p.presupuesto} unidades, hasta ${p.vence}, solo hacia ${p.destino}`);
    return 0;
  }

  if (comando === 'delegar') {
    const padre = f.permisos().find((x) => x.id === f_.padre);
    const p = f.delegar({
      ...padre,
      actuator: padre.agente,
      padre: f_.padre,
      id: f_.id,
      agente: f_.agente,
      presupuesto: f_.presupuesto,
    });
    linea(`subdelegación ${p.id} de ${p.padre} a ${p.agente}: ${p.presupuesto} de ${padre.presupuesto} unidades, mismo destino y mismo reloj`);
    return 0;
  }

  if (comando === 'ejecutar') {
    const r = await f.ejecutar({
      agente: f_.agente,
      accion: f_.accion,
      sujeto: f_.sujeto,
      operacion: f_.operacion,
      destino: f_.destino,
      unidades: f_.unidades,
      clave: f_.clave,
    }, { now: f_.ahora, pausar: f_.pausar, reanudar: f_.reanudar });
    linea(`efecto «${f_.clave}» de ${f_.agente}: ${f_.accion} sobre ${f_.sujeto} hacia ${f_.destino}, ${f_.unidades} unidades`);
    mostrar(r);
    return r.estado === 'verificado' || r.estado === 'repetido' ? 0 : 1;
  }

  if (comando === 'permisos') {
    for (const p of f.permisos()) {
      linea(`${p.id}  ${p.agente}  ${p.accion} sobre ${p.sujeto}  ${p.presupuesto}u  hasta ${p.vence}  → ${p.destino}${p.delegado_de ? `  (de ${p.delegado_de})` : ''}`);
    }
    return 0;
  }

  if (comando === 'agentes') {
    for (const a of f.agentes()) linea(`${a.id}  ${a.nombre}  ${a.rol}`);
    return 0;
  }

  if (comando === 'efectos') {
    for (const e of f.efectos()) linea(`${e.clave}  ${e.cuerpo.unidades}u  ${e.cuerpo.accion} sobre ${e.cuerpo.sujeto} → ${e.cuerpo.destino}  por ${e.permiso}`);
    return 0;
  }

  if (comando === 'registro') {
    linea(require('node:fs').readFileSync(path.join(dir, 'registro.jsonl'), 'utf8').trim());
    return 0;
  }

  if (comando === 'auditar') {
    const recibo = f.recibos().find((r) => r.clave === f_.clave);
    if (!recibo) {
      linea(`no hay recibo para la clave ${String(f_.clave)}`);
      return 1;
    }
    linea(`sello del recibo: ${verifyReceipt(recibo.recibo).ok ? 'verifica' : 'NO verifica'}`);
    const a = f.auditar(recibo.recibo);
    linea(`auditoría independiente: ${a.ok ? 'pasa' : 'NO pasa'} — ${a.motivo}`);
    return a.ok ? 0 : 1;
  }

  linea(`comando desconocido: ${comando}`);
  linea(AYUDA);
  return 2;
}

module.exports = { main, AYUDA };

if (require.main === module) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; });
}
