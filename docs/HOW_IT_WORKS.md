# How Farolero works

## Scope

Farolero joins an organization’s AI agent register to a layer of authority granted by a responsible person. A permission is relational: it identifies who may act, on which subject, for which operation, for how long, up to what budget, and toward which destination. The project’s agreed walkthrough uses fictional data and a local, reversible file effect. It has no institutional, network, blockchain, payment, or testnet integration.

The agreement was written before code. It sets the project boundary and the behaviors the implementation is meant to make visible: authority belongs to a person, delegation narrows it, out-of-scope work returns to a person, and a verifier checks the local effect independently. The current test record is reported separately in [`EVIDENCE.md`](EVIDENCE.md).

## Actors and rights

| Actor | What they can do | Boundary |
|---|---|---|
| Granting person | Grant, delegate, pause, and revoke permission | The only person authorized for those authority actions in this project run |
| Permitted agent | Act within the permission granted to it | Cannot exceed the subject, operation, time, budget, or destination |
| Delegate | Exercise a subset passed down by a permitted agent | Cannot receive or pass on more than its delegator has |
| Verifier | Reread the local store and recompute the receipt | Separate from execution; it does not rely on the executor’s report |
| Named destination | Receive the effect described by the permission | A named destination, not an integrated institution in this run |

## Walkthrough: one local record entry

The following case is fictional and explanatory. The public evidence snapshot does not contain the walkthrough command’s output, so this is a description of the agreed rules, not a transcript from a run.

Imagine a fictional community archive with a fictional agent asked to add one entry to a local project record. The responsible person grants authority for a named subject and operation, a defined time window, a budget ceiling, and one named destination. If any required dimension is missing, the permission is rejected rather than saved as an open-ended instruction.

The agent may pass work to a second registered agent only by granting a subset. The child permission must fit within the parent’s action, scope, time, budget, and destination. A delegation that widens even one of those dimensions does not fit.

Before the effect, Farolero checks the permission boundaries. An expired permission, a different destination, an excessive budget, or a paused operation does not proceed. If the request fits, the described effect is one local line written to the project record. If it does not fit, the return is blocked and includes the reason and a named next step for the person. It is not silently discarded or redirected.

The operation is meant to leave a receipt that describes the request, the permission that applied or the reason it did not, the effect, the actor, the verifier’s check, and a content digest. A separate verifier rereads the local store and recomputes the receipt; it does not accept the executor’s report as proof. An effect with the same key is meant to return the first receipt on a repeat attempt without touching the destination again. These are project rules; current test outcomes and failures are listed in [`EVIDENCE.md`](EVIDENCE.md).

## What the agreement makes enforceable

- **Permission is relational.** The subject, operation, time, budget, and destination are each part of the grant and are checked separately.
- **Delegation only narrows.** The delegate receives a subset of the authority already granted, never an amplified version.
- **Budget is a ceiling.** An over-budget effect is meant to return blocked, not to be split into a smaller unauthorized action.
- **Time closes authority.** A permission expires without depending on someone remembering to turn it off; an unused expiry is meant to leave a receipt and notify its grantor.
- **Destination stays fixed.** A permission does not transfer to another destination; a change requires a new grant.
- **Pause authority is named.** Only the person identified as pauser may pause or resume, with the action recorded in the receipt.
- **Blocked actions return to a person.** A blocked result gives a reason and a named alternative next step.
- **Receipts are sealed.** The project uses the canonical digest of the consumed kernel. A hand-edited receipt is meant to fail verification.
- **Verification recomputes.** The verifier reads the local store and recalculates instead of trusting the execution report.
- **Simulation is identified.** Behavior without a network, blockchain, or outside party is described as local project behavior, not an external result.

These are the rules in the agreement, not a claim that every rule currently passes. See [`EVIDENCE.md`](EVIDENCE.md) for the captured result.

## What this walkthrough does not show

The example does not show a real institution, real data, a real external destination, or a production deployment. A local receipt cannot establish an agent’s real-world identity, the truth of an input, a person’s legal authority, or legal compliance. There is no network transaction, blockchain anchor, payment, or testnet record in this project run.

## Español

### Alcance

Farolero combina el registro de agentes de IA de una organización con una capa de autoridad otorgada por una persona responsable. El permiso es relacional: indica quién puede actuar, sobre qué sujeto, para qué operación, durante cuánto tiempo, hasta qué presupuesto y hacia qué destino. El recorrido acordado usa datos de fantasía y un efecto local y reversible en un archivo. No tiene integración institucional, de red, blockchain, pagos ni testnet.

El acuerdo se escribió antes del código. Define los límites del proyecto y las conductas que la implementación busca volver visibles: la autoridad pertenece a una persona, delegar la reduce, lo que queda fuera vuelve a una persona y un verificador comprueba el efecto local por separado. El registro actual de pruebas se presenta en [`EVIDENCE.md`](EVIDENCE.md).

### Actores y derechos

| Actor | Qué puede hacer | Límite |
|---|---|---|
| Persona que otorga | Conceder, delegar, pausar y revocar permisos | Única persona autorizada para esas acciones de autoridad en este recorrido |
| Agente con permiso | Actuar dentro del permiso concedido | No puede exceder sujeto, operación, plazo, presupuesto ni destino |
| Delegado | Ejercer un subconjunto transmitido por un agente con permiso | No puede recibir ni transmitir más de lo que tiene quien delega |
| Verificador | Volver a leer el almacén local y recalcular el recibo | Está separado de la ejecución; no depende del informe del ejecutor |
| Destino nombrado | Recibir el efecto descrito en el permiso | Es un destino nombrado, no una institución integrada en este recorrido |

### Recorrido: una entrada en un registro local

El caso siguiente es ficticio y explicativo. La captura pública de evidencia no incluye la salida del comando de recorrido, así que esta es una descripción de las reglas acordadas, no la transcripción de una corrida.

Imagina un archivo comunitario ficticio con un agente ficticio al que le piden añadir una entrada a un registro local del proyecto. La persona responsable concede autoridad para un sujeto y una operación nombrados, un plazo definido, un límite de presupuesto y un destino concreto. Si falta una dimensión necesaria, el permiso se rechaza en vez de guardarse como una instrucción abierta.

El agente puede transmitir trabajo a otro agente registrado solo mediante un subconjunto. El permiso derivado debe caber dentro de la acción, alcance, plazo, presupuesto y destino del permiso de origen. Si la delegación amplía aunque sea una dimensión, no cabe.

Antes del efecto, Farolero comprueba los límites del permiso. Un permiso vencido, otro destino, un presupuesto excedido o una operación pausada no avanzan. Si la solicitud cabe, el efecto descrito es escribir una línea local en el registro del proyecto. Si no cabe, la devolución queda bloqueada e incluye la razón y un siguiente paso nombrado para la persona. No se descarta ni redirige en silencio.

La operación debe dejar un recibo que describa la solicitud, el permiso que aplicó o la razón por la que no, el efecto, quién actuó, la comprobación del verificador y un digest del contenido. Un verificador aparte vuelve a leer el almacén local y recalcula el recibo; no acepta el informe del ejecutor como prueba. Si se intenta repetir un efecto con la misma clave, la regla del proyecto es devolver el primer recibo sin volver a tocar el destino. Las reglas y los resultados actuales de las pruebas no son lo mismo: [`EVIDENCE.md`](EVIDENCE.md) presenta los resultados y fallos capturados.

### Qué hace cumplir el acuerdo

- **El permiso es relacional.** Sujeto, operación, plazo, presupuesto y destino forman parte de la concesión y se comprueban por separado.
- **Delegar solo reduce.** El delegado recibe un subconjunto de la autoridad otorgada, nunca una versión ampliada.
- **El presupuesto es un techo.** Un efecto que lo excede debe volver bloqueado; no debe dividirse en una acción menor que tampoco fue autorizada.
- **El tiempo cierra la autoridad.** El permiso vence sin depender de que alguien recuerde apagarlo; un vencimiento sin uso debe dejar un recibo y avisar a quien lo otorgó.
- **El destino queda fijado.** El permiso no se traslada a otro destino; para cambiarlo hace falta una nueva concesión.
- **La pausa tiene responsable.** Solo la persona identificada como quien puede pausar puede pausar o reanudar, y la acción queda registrada en el recibo.
- **Las acciones bloqueadas vuelven a una persona.** El resultado bloqueado entrega una razón y un siguiente paso alternativo nombrado.
- **Los recibos se sellan.** El proyecto usa el digest canónico del kernel consumido. Un recibo editado a mano debe fallar al verificarse.
- **La verificación recalcula.** El verificador lee el almacén local y vuelve a calcular, en vez de confiar en el informe de ejecución.
- **La simulación se identifica.** La conducta sin red, blockchain ni tercero externo se describe como comportamiento local, no como resultado externo.

Estas son reglas del acuerdo, no una afirmación de que todas pasen hoy. Consulta [`EVIDENCE.md`](EVIDENCE.md) para ver la captura.

### Qué no muestra este recorrido

El ejemplo no muestra una institución real, datos reales, un destino externo ni un despliegue de producción. Un recibo local no establece la identidad real de un agente, la verdad de una entrada, la autoridad jurídica de una persona ni el cumplimiento legal. En este recorrido no hay transacción de red, anclaje en blockchain, pago ni registro de testnet.
