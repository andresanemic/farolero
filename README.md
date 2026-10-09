<p align="center">
  <a href="./assets/cover.png"><img src="./assets/cover.png" alt="Farolero: bounded authority for AI agents" width="100%"></a>
</p>

<h1 align="center">Farolero</h1>

<p align="center">
  <a href="#english"><img src="https://img.shields.io/badge/status-kernel_0.1.5_ed559e8-D7B698?style=for-the-badge&labelColor=07111A" alt="Status: kernel 0.1.5 (commit ed559e8)"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-review--only-D7B698?style=for-the-badge&labelColor=07111A" alt="License: review only"></a>
  <a href="./docs/EVIDENCE.md"><img src="https://img.shields.io/badge/suite-13_pass-E0C170?style=for-the-badge&labelColor=07111A" alt="Suite: 13 tests pass"></a>
  <a href="./docs/HOW_IT_WORKS.md"><img src="https://img.shields.io/badge/agreement-written_before_code-D7B698?style=for-the-badge&labelColor=07111A" alt="Agreement written before code"></a>
  <a href="https://github.com/andresanemic/vespi"><img src="https://img.shields.io/badge/built_with-Vespi_%C2%B7_Lore_Plugin-E0C170?style=for-the-badge&labelColor=07111A" alt="Built with Vespi and Lore Plugin"></a>
  <a href="https://github.com/andresanemic/vespi/tree/ed559e83c976dd6e6a379a5510db776206f670b4"><img src="https://img.shields.io/badge/kernel-0.1.5_release-ed559e8?style=for-the-badge&labelColor=07111A&color=E0C170" alt="Kernel: 0.1.5 release (commit ed559e8)"></a>
</p>

<p align="center"><b>Farolero</b> — give an AI agent a vague instruction and later nobody can say what it was allowed to do.<br>
The permission, the spending limit and a readable record of what the agent actually did. Evidence: 13/13 tests. Fictional data; the agent's effects are local and reversible.</p>

<p align="center"><b>We’re applying to the Find Your Way hackathon and plan to participate in Meridian.</b></p>
<p align="center"><b>For judges:</b> <a href="./docs/HOW_IT_WORKS.md">How it works</a> · <a href="./docs/EVIDENCE.md">Evidence</a> · <a href="./docs/LEGAL_AND_LIMITS.md">Limits</a> · <a href="./CODE_NOT_INCLUDED.md">Source and review terms</a>.<br>This public snapshot contains documentation and evidence, not runnable source.</p>

---

<details>
<summary><b>Read in English</b></summary>

<a id="english"></a>

**Farolero is designed to make an AI agent’s permission something a person can inspect.**

> **The unit is a bounded permission: who may do what, to which subject, for which operation, until when, within what budget, and toward which destination.**

## The problem

An organization may know that an agent is helping, yet still struggle to answer the questions that matter after an action: who authorized it, what exactly was allowed, and did the agent stay within that boundary? When the answer lives in a prompt, a card, or a chat, the explanation is easy to lose and hard to check from outside the conversation.

Farolero starts from that practical gap. A responsible person grants a specific permission. The agent may pass on only a narrower subset. A request that falls outside the permission returns as blocked, with a reason and a named next step for a person. That turns a vague instruction into a boundary the project can test and record.

## In one minute

Imagine a fictional archive that asks an agent to add a line to a local project record. A responsible person grants permission for that subject, operation, time window, budget, and destination. The agent may ask a second registered agent to do part of the work, but that delegated permission must fit inside the first one. If the second agent tries to write to a different destination, Farolero blocks the request and sends the reason back to a person. If the request fits, the described effect is one local, reversible file write. A separate verifier rereads the store and recomputes the receipt. The example uses fictional data and explains the agreed path; it is not a captured run or a real institution’s workflow.

## What it looks like in practice

The case below is fictional. It follows the agreement’s rules rather than pretending to show output from the program. The public snapshot contains no captured output for the walkthrough command, so the only terminal-style excerpts here are exact test names and statuses from the supplied suite capture.

Suppose a fictional community archive wants an agent called *Scribe* to add one entry to a local record. The person granting authority fixes the subject, operation, end time, budget, and destination. A second fictional agent, *Index*, can receive a smaller permission. The request to add the entry at the named local destination fits; a request to send it to another destination does not. That second request comes back blocked with a reason and a next step for the person, rather than being silently redirected.

```text
Fictional case, not program output

Subject       the fictional archive record
Operation     add one entry
Time          the period named in the permission
Budget        the limit named in the permission
Destination   the local project record
Delegation    a subset of Scribe’s permission only
```

The captured suite confirms that these boundaries are among the checks:

```text
✔ sin permiso, la ejecución queda bloqueada y vuelve a la persona con la salida
✔ un delegado no puede recibir más de lo que su delegante tiene
✔ con el mismo permiso y otro destino, el bloqueo nombra los dos destinos
✔ el presupuesto es un límite duro y se acumula entre ejecuciones
```

The names and marks above are copied from the captured test output. The example record is invented for explanation; it is not supplied project data or an actual execution.

## Why Farolero

| You need | What it gives you | Where it lives |
|---|---|---|
| To know who may do what | A permission tied to a subject, operation, clock, budget, and destination | [How it works](./docs/HOW_IT_WORKS.md) |
| To delegate without expanding authority | A child permission that must remain a subset of its parent | [How it works](./docs/HOW_IT_WORKS.md) |
| To see what happens when a request does not fit | A blocked return with a reason and a named human next step | [How it works](./docs/HOW_IT_WORKS.md) |
| To check a record independently | A verifier that rereads the local store and recomputes the receipt | [How it works](./docs/HOW_IT_WORKS.md) |
| To distinguish a design rule from current evidence | Named test results, the kernel pin context, and their limits | [Evidence](./docs/EVIDENCE.md) |

## How it works

```text
Person grants a bounded permission
              |
              v
Registered agent acts within its limits
              |
              +---- delegate receives a subset only
              |
              v
Check subject, operation, time, budget, and destination
        | fits                         | does not fit
        v                               v
Local reversible effect            Blocked return to a person
        |                            with reason and next step
        v
Receipt enters the local store
              |
              v
Separate verifier rereads the store and recomputes the receipt
```

| Actor | Rights | Limits |
|---|---|---|
| Granting person | Grant, delegate, pause, and revoke permission | The only authority for those actions in this project run |
| Permitted agent | Act within its granted permission | Cannot exceed its subject, operation, time, budget, or destination |
| Delegate | Receive and exercise a narrower permission | Cannot receive or pass on more than its delegator has |
| Verifier | Recheck the local effect and recompute the receipt from the store | Separate from execution; does not establish external truth |
| Named destination | Receive the effect described by the permission | A named destination, not an integrated institution in this run |

The receipt records what was requested, which permission applied or why it did not, what effect was made, who acted, what the verifier checked, and a content digest. The verifier reads the store again instead of treating the executor’s report as proof. See [the full walkthrough and rules](./docs/HOW_IT_WORKS.md).

## What Farolero is not

Farolero is not a passive directory, an identity system, a configuration dashboard, or a legal compliance product. In this project run it is not connected to an institution, network, blockchain, payment service, or testnet. Its described effect is a local and reversible file write.

## Evidence you can open

The captured suite dated 2026-10-09 reports 13 tests: 13 pass, none unsuccessful, none skipped, under Node v24.15.0. It covers permission boundaries, delegation, expiry, pausing authority, blocked returns, receipt tampering, verification, repeated effects, budget limits, and a readable local record. The 2026-10-03 capture was red because the project was pinned to an older kernel cut (0.1.3); that pin update to 0.1.5 (commit `ed559e8`) is now recorded and checked module by module in `docs/suite-2026-10-09.txt`.

The adversarial phase wrote eight project RED cases before code and observed each one stay red. The available sources do not map those original cases one by one to the current test names. These are project checks, not an external audit. Read [Evidence](./docs/EVIDENCE.md) for the names, phase record, and rerun instructions.

## Farolero, Vespi, and Lore Plugin

[Vespi](https://github.com/andresanemic/vespi) supplies the kernel Farolero consumes. Farolero does not change that kernel. This project uses its granted-authority model, kernel receipts, a human gate when an action is outside permission, verification separate from execution, and continuity based on receipts. [Lore Plugin](https://github.com/andresanemic/lore-plugin) is part of the project foundation; Farolero’s agreement and publication boundary remain its own.

**What this relationship means.** The project was built with Lore Plugin's method (its agreement and criterion live in the project, in `acuerdo.md` and `lore/`), and its operations, authority and receipts run on the Vespi kernel 0.1.5, in the pinned copy that Lore Plugin 2.5.1 distributes (`skills/vespi/core/kernel`). That copy sits in the project as `vendor/vespi-kernel` and the suite verifies it against its `SOURCE.md`. Lore Plugin does not run inside the project. This project does not use the kernel's newer capabilities (Stellar pubnet anchors, live x402 settlement, the ZK verifier, emergency access); it exercises the core of operations, authority and receipts.

## What is not verified

All sample agents and records are fictional. The current run has no real personal, health, financial, or third-party data, and no external effect. The materials do not establish legal identity, the truth of an input, anyone’s legal authority, legal admissibility, legal compliance, institutional adoption, or readiness for production or use. The cited Chilean Law 21.719 is problem context in the agreement; its primary text was not reviewed for this run, and the implementation was not checked against it. No legal professional reviewed these materials. More detail is in [Legal and limits](./docs/LEGAL_AND_LIMITS.md).

## How to review this project

Start with [How it works](./docs/HOW_IT_WORKS.md) for the agreement translated into the operating model. Then open [Evidence](./docs/EVIDENCE.md) for the captured suite and its limits, and [Legal and limits](./docs/LEGAL_AND_LIMITS.md) for the boundary of the claims. The source code is not included today; [Code not included](./CODE_NOT_INCLUDED.md) explains the publication condition. The [review-only license](./LICENSE) permits reading and cloning for evaluation, not modifying the code.

## Author

**Repository authority: Andrés Peña** (`andresanemic` on GitHub).

<p>
  <img src="./assets/icons/v2/telegram.svg" width="28" alt="Telegram icon"> &nbsp;&nbsp;
  <img src="./assets/icons/v2/x.svg" width="28" alt="X icon"> &nbsp;&nbsp;
  <img src="./assets/icons/v2/linkedin.svg" width="28" alt="LinkedIn icon">
</p>

---

[How it works](./docs/HOW_IT_WORKS.md) · [Evidence](./docs/EVIDENCE.md) · [Legal and limits](./docs/LEGAL_AND_LIMITS.md) · [Code not included](./CODE_NOT_INCLUDED.md) · [Review-only license](./LICENSE) · [Vespi](https://github.com/andresanemic/vespi) · [Lore Plugin](https://github.com/andresanemic/lore-plugin)

</details>

<details>
<summary><b>Leer en español</b></summary>

<a id="espanol"></a>

**Farolero es un proyecto para volver visible la autoridad de un agente de IA antes de que actúe.**

> **La unidad es un permiso acotado: quién puede hacer qué, respecto de qué sujeto, para qué operación, hasta cuándo, con qué presupuesto y hacia qué destino.**

## El problema

Una organización puede saber que un agente la está ayudando y, aun así, tener dificultades para responder las preguntas que importan después de una acción: quién la autorizó, qué estaba permitido exactamente y si el agente se mantuvo dentro de ese límite. Cuando la respuesta vive en un *prompt*, una ficha o un chat, es fácil perder la explicación y difícil comprobarla desde fuera de la conversación.

Farolero parte de esa brecha práctica. El acuerdo define cómo una persona responsable concede un permiso concreto, cómo el agente puede transmitir solo un subconjunto más estrecho y cómo una solicitud fuera del límite debe volver bloqueada, con una razón y un siguiente paso nombrado para una persona. Así, una instrucción vaga se convierte en un límite que el proyecto puede probar y registrar.

## Si estás evaluando Find Your Way o Meridian, empieza aquí

- Lee la base del proyecto y su recorrido. Empieza por [Cómo funciona](./docs/HOW_IT_WORKS.md).
- Abre el registro de pruebas. Consulta [Evidencia](./docs/EVIDENCE.md).
- Lee los límites jurídicos y de verificación. Consulta [Marco legal y límites](./docs/LEGAL_AND_LIMITS.md).
- Revisa las condiciones de publicación. Consulta [Código no incluido](./CODE_NOT_INCLUDED.md) y la [licencia de solo revisión](./LICENSE).

## En un minuto

Imagina un archivo comunitario ficticio que pide a un agente añadir una línea a un registro local del proyecto. Una persona responsable concede permiso para ese sujeto, operación, plazo, presupuesto y destino. El agente puede encargar parte del trabajo a un segundo agente registrado, pero ese permiso delegado debe caber dentro del primero. Si el segundo agente intenta escribir en otro destino, Farolero bloquea la solicitud y devuelve la razón a una persona. Si la solicitud cabe, el efecto descrito es escribir una línea local y reversible en un archivo. Un verificador aparte vuelve a leer el almacén y recalcula el recibo. El ejemplo usa datos de fantasía y explica el recorrido acordado; no es una corrida capturada ni el flujo de una institución real.

## Cómo se ve en la práctica

El caso siguiente es de fantasía. Sigue las reglas del acuerdo, no pretende mostrar la salida del programa. La captura pública no contiene la salida del comando de recorrido; por eso, los únicos extractos con aspecto de terminal aquí son nombres y estados exactos de pruebas de la captura suministrada.

Supongamos que un archivo comunitario ficticio quiere que un agente llamado *Escriba* añada una entrada a un registro local. La persona que otorga autoridad fija el sujeto, la operación, el vencimiento, el presupuesto y el destino. Un segundo agente ficticio, *Índice*, puede recibir un permiso más acotado. La solicitud de añadir una entrada al destino local nombrado cabe; una solicitud para enviarla a otro destino no. Esa segunda solicitud vuelve bloqueada, con una razón y un siguiente paso para la persona, en vez de redirigirse en silencio.

```text
Caso de fantasía, no es salida del programa

Sujeto        el registro del archivo ficticio
Operación     añadir una entrada
Plazo         el periodo indicado en el permiso
Presupuesto   el límite indicado en el permiso
Destino       el registro local del proyecto
Delegación    solo un subconjunto del permiso de Escriba
```

La suite capturada confirma que estos límites están entre las comprobaciones:

```text
✔ sin permiso, la ejecución queda bloqueada y vuelve a la persona con la salida
✔ un delegado no puede recibir más de lo que su delegante tiene
✔ con el mismo permiso y otro destino, el bloqueo nombra los dos destinos
✔ el presupuesto es un límite duro y se acumula entre ejecuciones
```

Los nombres y marcas anteriores se copian de la salida capturada de pruebas. El registro de ejemplo es inventado para explicar el caso; no proviene de los datos suministrados ni de una ejecución real.

## Por qué Farolero

| Necesitas | Qué te da | Dónde vive |
|---|---|---|
| Saber quién puede hacer qué | Un permiso ligado a sujeto, operación, reloj, presupuesto y destino | [Cómo funciona](./docs/HOW_IT_WORKS.md) |
| Delegar sin ampliar la autoridad | Un permiso derivado que debe seguir dentro del permiso de origen | [Cómo funciona](./docs/HOW_IT_WORKS.md) |
| Ver qué ocurre cuando una solicitud no cabe | Una devolución bloqueada con razón y siguiente paso para una persona | [Cómo funciona](./docs/HOW_IT_WORKS.md) |
| Comprobar un registro por separado | Un verificador que relee el almacén local y recalcula el recibo | [Cómo funciona](./docs/HOW_IT_WORKS.md) |
| Distinguir una regla de diseño de la evidencia actual | Resultados de pruebas con nombre, contexto del pin del kernel y sus límites | [Evidencia](./docs/EVIDENCE.md) |

## Cómo funciona

```text
La persona concede un permiso acotado
              |
              v
El agente registrado actúa dentro de sus límites
              |
              +---- el delegado recibe solo un subconjunto
              |
              v
Comprobación de sujeto, operación, plazo, presupuesto y destino
        | cabe                                  | no cabe
        v                                       v
Efecto local y reversible                Devolución bloqueada a una persona
        |                                  con razón y siguiente paso
        v
El recibo entra al almacén local
              |
              v
Un verificador aparte relee el almacén y recalcula el recibo
```

| Actor | Derechos | Límites |
|---|---|---|
| Persona que otorga | Conceder, delegar, pausar y revocar permisos | Única autoridad para esas acciones en este recorrido del proyecto |
| Agente con permiso | Actuar dentro del permiso concedido | No puede exceder sujeto, operación, plazo, presupuesto ni destino |
| Delegado | Recibir y ejercer un permiso más acotado | No puede recibir ni transmitir más de lo que tiene quien delega |
| Verificador | Volver a comprobar el efecto local y recalcular el recibo desde el almacén | Está separado de la ejecución y no establece una verdad externa |
| Destino nombrado | Recibir el efecto descrito por el permiso | Es un destino nombrado, no una institución integrada en este recorrido |

El recibo registra qué se pidió, qué permiso aplicó o por qué no, qué efecto se hizo, quién actuó, qué comprobó el verificador y un digest del contenido. El verificador vuelve a leer el almacén en vez de tratar el informe del ejecutor como prueba. Consulta [el recorrido completo y sus reglas](./docs/HOW_IT_WORKS.md).

## Qué no es Farolero

Farolero no es un directorio pasivo, un sistema de identidad, un panel de configuración ni un producto de cumplimiento legal. En este recorrido del proyecto no se conecta con una institución, red, blockchain, servicio de pagos ni testnet. El efecto descrito es escribir un archivo local y reversible.

## Evidencia que puedes abrir

La suite capturada el 2026-10-09 informa 13 pruebas: 13 pasan, ninguna sin pasar, ninguna omitida, con Node v24.15.0. Cubre límites de permisos, delegación, vencimiento, autoridad para pausar, devoluciones bloqueadas, manipulación de recibos, verificación, efectos repetidos, presupuesto y un registro local legible. La captura del 2026-10-03 quedó en rojo porque el proyecto estaba fijado a un corte viejo del kernel (0.1.3); esa actualización del pin a 0.1.5 (commit `ed559e8`) ya está registrada y comprobada módulo por módulo en `docs/suite-2026-10-09.txt`.

La fase adversarial escribió ocho casos RED del proyecto antes del código y observó fallar cada uno. Las fuentes disponibles no relacionan esos casos originales uno por uno con los nombres actuales de pruebas. Son comprobaciones del proyecto, no una auditoría externa. Consulta [Evidencia](./docs/EVIDENCE.md) para ver los nombres, el registro de fases y cómo repetirlas.

## Farolero, Vespi y Lore Plugin

[Vespi](https://github.com/andresanemic/vespi) aporta el kernel que consume Farolero. Farolero no modifica ese kernel. Este proyecto usa su modelo de autoridad otorgada, los recibos del kernel, una compuerta humana si una acción queda fuera del permiso, la verificación separada de la ejecución y la continuidad basada en recibos. [Lore Plugin](https://github.com/andresanemic/lore-plugin) forma parte de los cimientos del proyecto; el acuerdo y los límites de publicación de Farolero son propios.

**Qué significa esta relación.** El proyecto se construyó con el método de Lore Plugin (su acuerdo y su criterio viven en el proyecto, en `acuerdo.md` y `lore/`), y sus operaciones, autoridad y recibos corren sobre el kernel de Vespi 0.1.5, en la copia fijada que distribuye Lore Plugin 2.5.1 (`skills/vespi/core/kernel`). Esa copia está en el proyecto como `vendor/vespi-kernel` y la suite la verifica contra su `SOURCE.md`. Lore Plugin no corre dentro del proyecto. Este proyecto no usa las capacidades nuevas del kernel (anclas Stellar pubnet, liquidación x402 en vivo, el verificador ZK, el acceso de emergencia); ejerce el núcleo de operaciones, autoridad y recibos.

## Qué no está verificado

Todos los agentes y registros de ejemplo son ficticios. El recorrido actual no usa datos personales, de salud, financieros ni de terceros reales, y no produce efectos externos. Los materiales no establecen identidad legal, verdad de una entrada, autoridad jurídica de una persona, admisibilidad jurídica, cumplimiento legal, adopción institucional ni preparación para producción o uso. El acuerdo cita la Ley 21.719 de Chile como contexto del problema; en este recorrido no se revisó su texto primario ni se comprobó la implementación frente a ella. Ningún profesional del derecho revisó estos materiales. Hay más detalle en [Marco legal y límites](./docs/LEGAL_AND_LIMITS.md).

## Cómo revisar este proyecto

Empieza por [Cómo funciona](./docs/HOW_IT_WORKS.md), donde el acuerdo se expresa como modelo operativo. Después abre [Evidencia](./docs/EVIDENCE.md) para consultar la suite capturada y sus límites, y [Marco legal y límites](./docs/LEGAL_AND_LIMITS.md) para conocer la frontera de las afirmaciones. El código fuente no está incluido hoy; [Código no incluido](./CODE_NOT_INCLUDED.md) explica la condición de publicación. La [licencia de solo revisión](./LICENSE) permite leer y clonar para evaluar, no modificar el código.

## Autoría

**Autoridad del repositorio: Andrés Peña** (`andresanemic` en GitHub).

<p>
  <img src="./assets/icons/v2/telegram.svg" width="28" alt="Ícono de Telegram"> &nbsp;&nbsp;
  <img src="./assets/icons/v2/x.svg" width="28" alt="Ícono de X"> &nbsp;&nbsp;
  <img src="./assets/icons/v2/linkedin.svg" width="28" alt="Ícono de LinkedIn">
</p>

---

[Cómo funciona](./docs/HOW_IT_WORKS.md) · [Evidencia](./docs/EVIDENCE.md) · [Marco legal y límites](./docs/LEGAL_AND_LIMITS.md) · [Código no incluido](./CODE_NOT_INCLUDED.md) · [Licencia de solo revisión](./LICENSE) · [Vespi](https://github.com/andresanemic/vespi) · [Lore Plugin](https://github.com/andresanemic/lore-plugin)

</details>
