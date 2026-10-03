# How Farolero works

## Scope

Farolero is an AI agent register joined to a layer of granted authority. This project run exercises a local, reversible path with fictional data. It does not connect to an institution, blockchain, payment service, or network.

## Actors and rights

| Actor | What they can do | Boundary |
|---|---|---|
| Granting person | Grant, delegate, pause, and revoke permission | Only this person can perform those authority actions in the project |
| Permitted agent | Act within the permission granted to it | It cannot exceed the subject, operation, time, budget, or destination |
| Delegate | Exercise a subset passed down by a permitted agent | It can never receive or pass on more than its delegator has |
| Verifier | Recheck the local effect and recompute the receipt from the store | It works separately from execution and does not rely on the executor's report |
| Named destination | Receive the described effect | It is a named destination, not an integrated institution in this run |

## Walk-through: one local record entry

Imagine a fictional organization with a fictional agent asked to add one line to a local project record. The example explains the rules; it is not a customer, institution, or real operation.

1. **Grant.** A responsible person grants the agent authority for a named subject and operation, for a defined time, within a budget, and toward one named destination. A permission missing one of these dimensions is rejected.
2. **Delegate.** The agent may pass a subset to another registered agent. The delegated action, scope, time, budget, and destination must fit within the permission it received. Delegation never expands authority.
3. **Check.** Before an effect, Farolero checks the permission boundaries. A different destination, an expired permission, an excessive budget, or a paused operation does not proceed.
4. **Act or return blocked.** If the action fits, it writes one line to the local project store. If it does not fit, Farolero returns a blocked result to the person, including the reason and a named next step. It does not force the action or silently discard the request.
5. **Receipt.** The operation leaves a receipt describing the request, the permission or reason it did not apply, the effect, who acted, what the verifier checked, and a content digest. Receipts are stored in a file that a person can read without Farolero.
6. **Verify separately.** A verifier rereads the store and recomputes the receipt. It does not accept the executor's report as proof. Editing a receipt by hand should make its seal fail verification.
7. **Repeat safely.** An effect with the same key is not performed twice. A second attempt returns the first receipt and does not touch the destination again.

The effect described here is a local file write. No record is sent to an external destination or network.

## What the agreement makes enforceable

- **Permission is relational.** A permission says who can do what, regarding which subject, within which operation, for how long, up to what budget, and toward which destination. These dimensions are checked separately.
- **Delegation only narrows.** A delegated permission is a subset of its parent's action, scope, time, budget, and destination. If it does not fit, it is not granted.
- **Budget is a hard ceiling.** An effect that exceeds the limit is blocked. It is not split into a smaller unauthorized effect.
- **Time closes authority.** A permission expires without someone needing to remember to disable it. An unused expired permission leaves a receipt and notifies its grantor.
- **Destination stays fixed.** A permission does not travel to another destination. Changing destination requires a new permission.
- **Pause authority is named.** Only the person listed as the pauser can pause or resume; the receipt records who and when.
- **Blocked actions return to a person.** The return includes a reason and a named alternative next step.
- **Receipts are sealed.** Farolero uses the same canonical digest as the consumed kernel. A hand-edited receipt should fail verification.
- **Verification recomputes.** The verifier reads the store and recalculates instead of trusting the execution report.
- **Simulation is identified.** Behavior that did not actually involve a network, blockchain, or outside party is described as local project behavior, not an external result.

## What the evidence can show

The named suite checks permission blocks and limits, delegation, expiry, pause authority, receipt tampering, repeat attempts, verifier independence, and whether the record is readable as a local file. The result checked on 2026-10-03 is 8 of 13. It is not a complete assurance of every possible input or deployment. The current kernel pin mismatch means the five failures need to be read in that context; see [`EVIDENCE.md`](EVIDENCE.md).

## What this does not prove

A receipt and a local file do not establish an agent's real-world identity, the truth of an input, a person's legal authority, or legal compliance. The example does not show an institutional integration, external effect, network operation, blockchain anchor, payment, or testnet transaction. The current results do not establish production readiness or readiness for use. The kernel refix is pending.

## Español

### Alcance

Farolero combina un registro de agentes de IA con una capa de autoridad otorgada. Este recorrido usa datos de fantasía y es local y reversible. No se conecta con una institución, blockchain, servicio de pagos ni red.

### Actores y derechos

| Actor | Qué puede hacer | Límite |
|---|---|---|
| Persona que otorga | Otorgar, delegar, pausar y revocar permisos | En el proyecto, solo esta persona puede realizar esas acciones de autoridad |
| Agente con permiso | Actuar dentro del permiso que recibió | No puede exceder sujeto, operación, plazo, presupuesto ni destino |
| Delegado | Ejercer un subconjunto que le transmite un agente autorizado | Nunca puede recibir ni transmitir más de lo que tiene quien delega |
| Verificador | Volver a comprobar el efecto local y recalcular el recibo desde el almacén | Trabaja por separado de la ejecución y no depende del informe del ejecutor |
| Destino nombrado | Recibir el efecto descrito | Es un destino nombrado, no una institución integrada en este recorrido |

### Recorrido: una línea en un registro local

Imagina una organización ficticia con un agente ficticio al que le piden agregar una línea a un registro local del proyecto. El ejemplo explica las reglas; no representa a un cliente, institución ni operación real.

1. **Otorgar.** Una persona responsable concede autoridad para un sujeto y una operación nombrados, durante un plazo definido, con un presupuesto y un destino. Si falta una dimensión, el permiso se rechaza.
2. **Delegar.** El agente puede transmitir un subconjunto a otro agente registrado. La acción, alcance, plazo, presupuesto y destino delegados deben caber dentro del permiso recibido. Delegar nunca amplía la autoridad.
3. **Comprobar.** Antes de un efecto, Farolero revisa los límites. Un destino distinto, un permiso vencido, un presupuesto excedido o una operación pausada no avanzan.
4. **Actuar o devolver bloqueado.** Si la acción cabe, escribe una línea en el registro local del proyecto. Si no cabe, Farolero devuelve el resultado bloqueado a la persona, con la razón y un siguiente paso nombrado. No fuerza la acción ni descarta la solicitud en silencio.
5. **Recibo.** La operación deja un recibo con la solicitud, el permiso aplicable o la razón por la que no aplica, el efecto, quién actuó, qué comprobó el verificador y un digest del contenido. Los recibos quedan en un archivo que una persona puede leer sin Farolero.
6. **Verificar por separado.** Un verificador vuelve a leer el almacén y recalcula el recibo. No acepta el informe del ejecutor como prueba. Editar un recibo a mano debería hacer fallar su sello.
7. **Evitar la repetición.** Un efecto con la misma clave no se ejecuta dos veces. El segundo intento devuelve el recibo del primero y no vuelve a tocar el destino.

El efecto descrito es escribir un archivo local. No se envía ningún registro a un destino externo ni a una red.

### Qué hace cumplir el acuerdo

- **El permiso es relacional.** Dice quién puede hacer qué, respecto de qué sujeto, dentro de qué operación, por cuánto tiempo, hasta qué presupuesto y hacia qué destino. Cada dimensión se comprueba por separado.
- **Delegar solo reduce.** El permiso delegado es un subconjunto de la acción, alcance, plazo, presupuesto y destino de su permiso de origen. Si no cabe, no se otorga.
- **El presupuesto es un techo duro.** Un efecto que excede el límite queda bloqueado. No se divide en un efecto menor que tampoco fue autorizado.
- **El reloj cierra la autoridad.** El permiso vence sin que alguien tenga que recordar desactivarlo. Si vence sin uso, deja un recibo y avisa a quien lo otorgó.
- **El destino queda fijado.** El permiso no se traslada a otro destino. Para cambiarlo se necesita un permiso nuevo.
- **La pausa tiene responsable.** Solo la persona indicada como quien puede pausar puede pausar o reanudar; el recibo deja constancia de quién y cuándo.
- **Las acciones bloqueadas vuelven a una persona.** El retorno incluye una razón y un siguiente paso alternativo nombrado.
- **Los recibos se sellan.** Farolero usa el mismo digest canónico que el kernel consumido. Un recibo editado a mano debería fallar al verificarse.
- **La verificación recalcula.** El verificador lee el almacén y vuelve a calcular en vez de confiar en el informe de ejecución.
- **La simulación se identifica.** Un comportamiento sin red, blockchain ni tercero externo se describe como comportamiento local, no como resultado externo.

### Qué puede mostrar la evidencia

Los nombres de las pruebas cubren bloqueos y límites de permisos, delegación, vencimiento, autoridad para pausar, manipulación de recibos, intentos repetidos, verificación independiente y legibilidad del registro local. Según la comprobación del 2026-10-03, la suite está 8 de 13. No ofrece garantía sobre toda entrada o despliegue posible. Las cinco fallas actuales deben leerse en el contexto del desajuste del pin del kernel; consulta [`EVIDENCE.md`](EVIDENCE.md).

### Qué no demuestra

Un recibo y un archivo local no establecen identidad real de un agente, la verdad de una entrada, autoridad jurídica de una persona ni cumplimiento legal. El ejemplo no demuestra integración institucional, efecto externo, operación de red, anclaje en blockchain, pagos ni transacciones de testnet. Los resultados actuales no prueban que esté listo para producción o para usarse. La refijación del kernel está pendiente.
