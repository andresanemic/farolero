'use strict';

// Farolero — proyecto 8 de los diez de Vespi: autoridad para agentes sin código.
//
// Este archivo es la carrocería; el núcleo ejecutable es el kernel de Vespi, que
// este proyecto consume sin modificar. El predicado de suficiencia, la puerta, la
// pausa, la verificación separada y el recibo sellado son del núcleo. Lo que el
// núcleo no puede expresar y este proyecto agrega son las tres dimensiones
// relacionales —agente, sujeto y operación—, la contabilidad acumulada del
// presupuesto y el texto humano del bloqueo con su salida.

const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

// El núcleo se carga desde la copia vendorizada que Lore Plugin instala en los
// hosts, no desde el árbol de desarrollo: esa copia está fijada al corte y sus
// bytes están declarados en su `SOURCE.md`, mientras el árbol de desarrollo avanza
// (otro agente estaba trabajándolo mientras esto se escribía). `test/kernel.test.js`
// verifica esas huellas, así que si el corte se mueve, esta suite lo dice.
const KERNEL = '../vendor/vespi-kernel';

const { sufficient } = require(`${KERNEL}/authority.js`);
const { createOperation, runOperation, pauseOperation, resumeOperation, STATES } = require(`${KERNEL}/operation.js`);
const { verifyReceipt } = require(`${KERNEL}/receipt.js`);

const REGISTRO = 'registro.jsonl';

// Las cuatro comprobaciones que el verificador independiente tiene que recalcular
// desde el almacén. Un verificador que no produce exactamente este conjunto no
// verificó nada: devolver un subconjunto, o añadir uno propio, es creerle al
// ejecutor en vez de mirar.
const CHECKS_INDEPENDIENTES = ['permiso-cubria', 'efecto-en-almacen', 'ejecutado-una-vez', 'presupuesto-dentro'];

function entero(value) {
  if (typeof value === 'bigint') return value >= 0n ? value : null;
  if (typeof value === 'number') return Number.isSafeInteger(value) && value >= 0 ? BigInt(value) : null;
  return typeof value === 'string' && /^\d+$/.test(value) ? BigInt(value) : null;
}

function texto(value) {
  return typeof value === 'string' && value.length > 0;
}

function huella(value) {
  return createHash('sha256').update(JSON.stringify(value), 'utf8').digest('hex');
}

function iso(now) {
  if (now === undefined || now === null) return new Date().toISOString();
  const ms = Date.parse(now);
  return Number.isNaN(ms) ? new Date().toISOString() : new Date(ms).toISOString();
}

const SALIDA = 'vuelve a la persona que otorgó el permiso y otorga uno nuevo, o deja la tarea anotada como pendiente';

class Farolero {
  constructor({ dir } = {}) {
    this.dir = dir;
    this.ruta = path.join(dir, REGISTRO);
    fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.ruta)) fs.writeFileSync(this.ruta, '', 'utf8');
  }

  leer() {
    const crudo = fs.readFileSync(this.ruta, 'utf8');
    return crudo.split('\n').filter((l) => l.trim().length > 0).map((l) => JSON.parse(l));
  }

  escribir(linea) {
    fs.appendFileSync(this.ruta, `${JSON.stringify(linea)}\n`, 'utf8');
    return linea;
  }

  lineas(tipo) {
    return this.leer().filter((l) => l.tipo === tipo);
  }

  // --- El registro de agentes: la mitad de una organización que usa agentes ---
  registrarAgente({ id, nombre, rol }) {
    if (!texto(id)) throw new Error('un agente necesita id');
    if (this.lineas('agente').some((a) => a.id === id)) return this.lineas('agente').find((a) => a.id === id);
    return this.escribir({ tipo: 'agente', id, nombre: nombre || id, rol: rol || 'sin rol', en: iso() });
  }

  agentes() {
    return this.lineas('agente');
  }

  permisos() {
    return this.lineas('permiso');
  }

  efectos() {
    return this.lineas('efecto');
  }

  recibos() {
    return this.lineas('recibo');
  }

  // --- Otorgar: la persona, nunca el agente ---
  otorgar(spec) {
    return this.escribir(this.armarPermiso(spec));
  }

  delegar(spec) {
    const padre = this.permisos().find((p) => p.id === spec.padre);
    if (!padre) throw new Error(`no hay permiso ${String(spec.padre)} que delegar`);
    if (spec.actuator !== padre.agente) {
      throw new Error(`solo quien tiene el permiso ${padre.id} puede delegarlo (actuador: ${String(spec.actuator)})`);
    }
    const hijo = this.armarPermiso({ ...spec, pauser: Array.isArray(spec.pauser) && spec.pauser.length > 0 ? spec.pauser : padre.pauser });
    for (const [que, campo, mejor] of [
      ['acción', 'accion', (a, b) => a === b],
      ['sujeto', 'sujeto', (a, b) => a === b],
      ['operación', 'operacion', (a, b) => a === b],
      ['destino', 'destino', (a, b) => a === b],
    ]) {
      if (!mejor(hijo[campo], padre[campo])) {
        throw new Error(`una subdelegación que cambia la ${que} amplifica el permiso: ${padre[campo]} → ${hijo[campo]}`);
      }
    }
    const h = entero(hijo.presupuesto);
    const p = entero(padre.presupuesto);
    if (h === null || p === null || h > p) {
      throw new Error(`una subdelegación que agranda el presupuesto amplifica el permiso: ${padre.presupuesto} → ${hijo.presupuesto}`);
    }
    if (Date.parse(hijo.vence) > Date.parse(padre.vence)) {
      throw new Error(`una subdelegación que agranda el reloj amplifica el permiso: ${padre.vence} → ${hijo.vence}`);
    }
    return this.escribir(hijo);
  }

  armarPermiso(spec) {
    for (const campo of ['id', 'agente', 'accion', 'sujeto', 'operacion', 'destino', 'presupuesto', 'vence']) {
      if (!texto(spec[campo])) throw new Error(`un permiso necesita ${campo}: no hay permiso sin él`);
    }
    if (entero(spec.presupuesto) === null) throw new Error('el presupuesto es un número entero de unidades');
    if (Number.isNaN(Date.parse(spec.vence))) throw new Error('el reloj del permiso no es una hora');
    if (this.permisos().some((p) => p.id === spec.id)) throw new Error(`ya existe el permiso ${spec.id}`);
    return {
      tipo: 'permiso',
      id: spec.id,
      agente: spec.agente,
      accion: spec.accion,
      sujeto: spec.sujeto,
      operacion: spec.operacion,
      destino: spec.destino,
      presupuesto: spec.presupuesto,
      consumido: '0',
      vence: iso(spec.vence),
      pauser: Array.isArray(spec.pauser) ? spec.pauser.filter((p) => texto(p)) : [],
      otorgado_por: texto(spec.actuator) ? spec.actuator : 'sin nombre',
      otorgado_en: iso(),
      delegado_de: texto(spec.padre) ? spec.padre : null,
    };
  }

  // La autoridad que el núcleo entiende: destino y presupuesto viajan en el mismo
  // grant, y el presupuesto que se le enseña es el que queda, no el declarado.
  autoridadDe(permiso, restante) {
    const libre = entero(restante === undefined ? String(entero(permiso.presupuesto) - this.consumoDe(permiso.id)) : restante);
    return {
      spend: [{
        asset: `accion:${permiso.accion}`,
        maxAmount: String(libre < 0n ? 0n : libre),
        to: `destino:${permiso.destino}`,
        expiresAt: permiso.vence,
      }],
      ...(permiso.pauser.length > 0 ? { pausers: [...permiso.pauser] } : {}),
    };
  }

  consumoDe(id) {
    return this.efectos()
      .filter((e) => e.permiso === id)
      .reduce((suma, e) => suma + entero(e.cuerpo.unidades), 0n);
  }

  // La puerta del proyecto. Usa el predicado del núcleo para el grant y agrega lo
  // que el grant no puede decir: quién, sobre qué y en qué operación.
  evaluar(peticion, now) {
    const candidates = this.permisos().filter((p) => p.agente === peticion.agente
      && p.accion === peticion.accion
      && p.sujeto === peticion.sujeto
      && p.operacion === peticion.operacion);
    if (candidates.length === 0) {
      return {
        ok: false,
        motivo: `no hay permiso de ${peticion.agente} para ${peticion.accion} sobre ${peticion.sujeto} en ${peticion.operacion}`,
        salida: `vuelve a quien otorga (${candidates.length === 0 ? 'la persona de la organización' : 'sin nombre'}) y otorga ese permiso, o deja la tarea anotada como pendiente`,
      };
    }
    const unidades = entero(peticion.unidades);
    if (unidades === null) return { ok: false, motivo: 'las unidades pedidas no son un número', salida: SALIDA };
    for (const permiso of candidates) {
      const restante = entero(permiso.presupuesto) - this.consumoDe(permiso.id);
      const check = sufficient(
        [{ asset: `accion:${peticion.accion}`, amount: peticion.unidades, to: `destino:${peticion.destino}` }],
        this.autoridadDe(permiso, restante),
        { now },
      );
      if (!check.ok) return { ok: false, motivo: this.traducir(check.reason, permiso, peticion, restante), salida: this.salidaDe(permiso), permiso };
    }
    const elegido = candidates[0];
    return { ok: true, permiso: elegido, restante: String(entero(elegido.presupuesto) - this.consumoDe(elegido.id)) };
  }

  // La salida nombra a quien puede resolverlo: un bloqueo sin nombre es un callejón.
  salidaDe(permiso) {
    const quien = permiso && texto(permiso.otorgado_por) ? permiso.otorgado_por : 'la persona que otorga';
    return `vuelve a ${quien}: otorga otro permiso que alcance, o deja la tarea anotada como pendiente`;
  }

  // El núcleo razona en inglés y con sus palabras; la persona lee esto.
  traducir(motivo, permiso, peticion, restante) {
    if (/expired/.test(motivo)) {
      const cuando = (motivo.match(/expired at (\S+)/) || [])[1] || permiso.vence;
      return `el permiso ${permiso.id} venció el ${cuando} y una autoridad que murió con su reloj no vuelve sola`;
    }
    if (/no grant for asset .* to /.test(motivo)) {
      return `el permiso ${permiso.id} llega a ${permiso.destino} y el efecto pide ${peticion.destino}: cambiar de destino es otro permiso`;
    }
    if (/consume/.test(motivo)) {
      return `el presupuesto del permiso ${permiso.id} es de ${permiso.presupuesto} unidades y ya gastó ${this.consumoDe(permiso.id)}; el efecto pide ${peticion.unidades} y solo quedan ${String(restante)}`;
    }
    return motivo;
  }

  // --- El efecto: una vez, y con recibo ---
  abrir(peticion, opciones = {}) {
    const puerta = this.evaluar(peticion, opciones.now);
    const autoridad = puerta.ok ? this.autoridadDe(puerta.permiso, puerta.restante) : { spend: [] };
    const op = createOperation({
      goal: `${peticion.accion} sobre ${peticion.sujeto} en ${peticion.operacion} hacia ${peticion.destino}`,
      action: `farolero:${peticion.accion}`,
      agent: peticion.agente,
      exit: puerta.ok ? null : puerta.salida,
      authority: autoridad,
    });
    op.peticion = { ...peticion };
    op.puerta = puerta;
    return this.guardar(op);
  }

  // La operación abierta se guarda para que la persona pueda pausarla, dejar el
  // proceso y retomarla después desde la terminal, sin que nada viva en memoria.
  guardar(op) {
    const previa = this.retomar(op.id);
    if (previa) return previa;
    this.escribir({ tipo: 'operacion', id: op.id, estado: op.state, operacion: op });
    return op;
  }

  retomar(id) {
    const linea = this.lineas('operacion').find((l) => l.id === id);
    return linea ? linea.operacion : null;
  }

  pausar(op, quien) {
    return pauseOperation(op, quien);
  }

  reanudar(op, quien) {
    return resumeOperation(op, quien);
  }

  capacidad(peticion, puerta, verificador) {
    const self = this;
    return {
      id: `farolero:${peticion.accion}`,
      required: () => {
        if (!puerta.ok) return { impossible: true, reason: puerta.motivo, exit: puerta.salida };
        return {
          spend: [{
            asset: `accion:${peticion.accion}`,
            amount: peticion.unidades,
            to: `destino:${peticion.destino}`,
          }],
        };
      },
      perform: async () => {
        const cuerpo = {
          clave: peticion.clave,
          agente: peticion.agente,
          accion: peticion.accion,
          sujeto: peticion.sujeto,
          operacion: peticion.operacion,
          destino: peticion.destino,
          unidades: peticion.unidades,
          por: puerta.permiso.id,
          en: iso(),
        };
        const linea = {
          tipo: 'efecto',
          clave: peticion.clave,
          permiso: puerta.permiso.id,
          cuerpo,
          huella: huella(cuerpo),
        };
        self.escribir(linea);
        return {
          ok: true,
          evidence: { operationId: peticion.clave, type: 'efecto', status: 'escrito', amount: peticion.unidades, code: linea.huella },
        };
      },
      io: { verify: this.verificadorDe(verificador) },
    };
  }

  // El verificador se puede pasar como función o como un agente con `verificar`;
  // en los dos casos lo que importa es que sea él quien mire el almacén.
  verificadorDe(verificador) {
    if (verificador && typeof verificador.verificar === 'function') {
      return (evidencia) => verificador.verificar(evidencia);
    }
    if (typeof verificador === 'function') return verificador;
    return (evidencia) => this.verificar(evidencia);
  }

  // El verificador independiente: recalcula desde el almacén, no desde el informe.
  async verificar(evidencia) {
    const clave = evidencia && evidencia.operationId;
    const efectos = this.efectos().filter((e) => e.clave === clave);
    const checks = {
      'permiso-cubria': efectos.length > 0 && this.permisos().some((p) => p.id === efectos[0].permiso),
      'efecto-en-almacen': efectos.length === 1 && efectos[0].huella === huella(efectos[0].cuerpo),
      'ejecutado-una-vez': efectos.length === 1,
      'presupuesto-dentro': efectos.length === 1 && this.consumoDe(efectos[0].permiso) <= entero(this.permisos().find((p) => p.id === efectos[0].permiso).presupuesto),
    };
    const verified = Object.values(checks).every((v) => v === true);
    return { verified, checks, reason: verified ? 'recomputado desde el almacén' : 'el almacén no respalda el efecto' };
  }

  async correr(op, peticion, opciones = {}) {
    if (op.state === STATES.PAUSED) {
      return { estado: 'pausado', detalle: 'la operación está pausada por quien tiene el permiso para pausarla', salida: 'reanuda la operación o cancélala', recibo: null };
    }
    const previo = this.recibos().find((r) => r.clave === peticion.clave);
    if (previo) {
      return { estado: 'repetido', detalle: `el efecto ${peticion.clave} ya ocurrió; no se repite`, salida: 'nada que hacer', recibo: previo.recibo };
    }
    const cap = this.capacidad(peticion, op.puerta, opciones.verificador);
    // El kernel 0.1.5 usa el reloj real salvo que se le inyecte `now`; se le pasa
    // el mismo `now` que evaluar() usó para la puerta, o el permiso vence el 2026-10-01.
    const io = { verify: cap.io.verify, ask: async () => ({ approved: false, by: 'nadie' }) };
    if (typeof opciones.now === 'function') io.now = opciones.now;
    else if (opciones.now !== undefined && opciones.now !== null) io.now = () => opciones.now;
    const resultado = await runOperation(op, cap, io);
    const recibo = resultado.receipt;
    // El efecto y su recibo son dos líneas y no una: el efecto es lo que pasó y
    // no se reescribe; el recibo es lo que el núcleo dijo de él.
    if (recibo && recibo.status === 'verified') {
      this.escribir({ tipo: 'recibo', clave: peticion.clave, recibo });
    }
    return { ...this.traducirResultado(resultado, op), recibo };
  }

  async ejecutar(peticion, opciones = {}) {
    const op = opciones.operacion ? this.retomar(opciones.operacion) : this.abrir(peticion, opciones);
    if (!op) throw new Error(`no hay operación abierta con id ${String(opciones.operacion)}`);
    if (opciones.pausar) pauseOperation(op, opciones.pausar);
    if (opciones.reanudar) resumeOperation(op, opciones.reanudar);
    return this.correr(op, op.peticion || peticion, opciones);
  }

  traducirResultado(resultado, op) {
    const recibo = resultado.receipt;
    const estado = resultado.status;
    if (estado === 'verified') {
      return { estado: 'verificado', detalle: 'el efecto ocurrió dentro del permiso y el verificador lo recomputó desde el almacén', salida: null };
    }
    if (estado === 'paused') return { estado: 'pausado', detalle: 'pausada', salida: 'reanuda o cancela', recibo: null };
    return {
      estado: 'bloqueado',
      detalle: (recibo && (recibo.detail || recibo.reason)) || 'no se pudo ejecutar',
      salida: (op && op.exit) || (recibo && recibo.exit) || SALIDA,
    };
  }

  // --- La auditoría: tercera parte, lee el almacén y el recibo y no cree a nadie ---
  auditar(recibo) {
    const sello = verifyReceipt(recibo);
    if (!sello.ok) return { ok: false, motivo: `el recibo no verifica: ${sello.reason}` };
    const clave = recibo.evidence && recibo.evidence.operationId;
    const efectos = this.efectos().filter((e) => e.clave === clave);
    if (efectos.length === 0) return { ok: false, motivo: 'el recibo dice que hubo un efecto y el almacén no lo tiene' };
    if (efectos.length > 1) return { ok: false, motivo: `el efecto ${clave} aparece ${efectos.length} veces en el almacén` };
    if (efectos[0].huella !== huella(efectos[0].cuerpo)) {
      return { ok: false, motivo: 'el efecto fue editado después de escrito: su huella ya no calza' };
    }
    const cubiertos = (recibo.coverage || []).filter((c) => CHECKS_INDEPENDIENTES.includes(c));
    const faltan = CHECKS_INDEPENDIENTES.filter((c) => !cubiertos.includes(c));
    if (faltan.length > 0) {
      return {
        ok: false,
        motivo: `el verificador creyó al ejecutor: no recomputó ${faltan.join(', ')} desde el almacén, y una verificación independiente no puede dar por bueno lo que no midió`,
       checks: cubiertos,
      };
    }
    return { ok: true, motivo: 'el almacén, el permiso y el recibo dicen lo mismo', checks: cubiertos };
  }
}

module.exports = { Farolero, CHECKS_INDEPENDIENTES };
