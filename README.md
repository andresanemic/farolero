[![Farolero: bounded authority for AI agents](./assets/cover.png)](./assets/cover.png)

# Farolero

<p align="center">
  <a href="#english"><img src="https://img.shields.io/badge/status-kernel_refix_pending-D7B698?style=for-the-badge&labelColor=07111A" alt="Status: kernel refix pending"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-review--only-D7B698?style=for-the-badge&labelColor=07111A" alt="License: review only"></a>
  <a href="./docs/EVIDENCE.md"><img src="https://img.shields.io/badge/suite-8_of_13-E0C170?style=for-the-badge&labelColor=07111A" alt="Suite: 8 of 13 tests pass today"></a>
  <a href="./docs/HOW_IT_WORKS.md"><img src="https://img.shields.io/badge/agreement_before_code-D7B698?style=for-the-badge&labelColor=07111A" alt="Agreement before code"></a>
  <a href="https://github.com/andresanemic/vespi"><img src="https://img.shields.io/badge/built_with-Vespi_%C2%B7_Lore_Plugin-E0C170?style=for-the-badge&labelColor=07111A" alt="Built with Vespi and Lore Plugin"></a>
</p>

<p align="center">
  <b>Farolero gives AI agents authority that can be granted, narrowed, and checked.</b><br><br>
  A person sets the limits; delegation can only reduce them; anything outside them returns blocked with a reason and a human next step.
</p>

<p align="center">
  Do you build on Stellar, or are you judging Find Your Way or Meridian? Start here to see a project about agent authority built on Vespi and Lore Plugin.
</p>

<p align="center">
  This repository contains the project agreement, its operating model, test evidence, and limits. The code will open during the judges' review period under a review-only license.
</p>

---

<details>
<summary><b>Read in English</b></summary>

<a id="english"></a>

**Farolero makes the authority behind an AI agent's action explicit and checkable.**

> **The unit is a bounded permission: who may do what, to which subject, for which operation, until when, within what budget, and toward which destination.**

Farolero combines an organization's AI agent register with a layer of authority granted by a responsible person. Agents act only within their permissions. A delegate can pass on a subset, never more. A separate verifier rereads the local store and recomputes the receipt rather than trusting the executor's report.

**Why.** When an organization relies on prompts, cards, or chat to explain what an agent may do, it cannot readily show who authorized an action or whether the agent stayed within that authority. Farolero makes the permission concrete and makes an out-of-scope action stop visibly, so a person can decide what happens next.

**If you are judging Find Your Way or Meridian, start here.**

1. **What it is.** A local project for granting, narrowing, exercising, and checking AI agent permissions.
2. **What governs it.** Read the project agreement first in [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md), then compare its rules with the implementation when the code opens.
3. **What the suite says today.** [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) lists the 13 named tests and the result checked on 2026-10-03: 8 pass and 5 fail while the kernel pin is out of step with installed kernel 0.1.3.
4. **What to inspect.** Follow the example in [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md), then use the test names and rerun instructions in [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) when the code is available.
5. **What is not verified.** The kernel refix is pending, and a working path is not a finished or deployment-ready product. The project does not claim compliance with any law.

## In one minute

Imagine a fictional organization that asks one of its fictional agents to write a line to a local project record. A responsible person grants permission for that named operation, destination, time window, and budget. The agent may delegate only a smaller permission to another registered agent. If the delegated agent tries a different destination or exceeds the budget, Farolero blocks the action and returns the reason and a human next step. If it fits, the action writes one local line and creates a receipt. A separate verifier rereads the store and recomputes that receipt. The example stays local and uses fictional data; it does not contact an institution or network.

## Why Farolero

| You need | What it gives you | Where it lives |
|---|---|---|
| A permission with clear boundaries | A subject, object, operation, clock, budget, and destination that must all fit | [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) |
| Delegation without expanded authority | A delegate receives only a subset of the delegating permission | [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) |
| A visible stop when an action does not fit | A blocked result with its reason and a named human next step | [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) |
| A record that can be checked separately | A receipt recomputed by a verifier from the local store | [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) |
| Evidence of what has and has not passed | The 13 test names, the 8 of 13 result, and the kernel pin context | [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) |

**What it is not.** Farolero is not an identity system, a passive agent directory, a configuration dashboard, a legal compliance product, or an institutional integration. It does not use blockchain, payments, a testnet anchor, or a network connection in this project run.

## How it works

```
Person grants a bounded permission
              |
              v
Registered agent acts within its limits
              |
              +---- delegate receives a subset only
              |
              v
Permission check: subject, operation, time, budget, destination
       | fits                         | does not fit
       v                               v
One local reversible effect        Blocked result returns to the person
       |                               with reason and human next step
       v
Receipt is written to the local store
              |
              v
Separate verifier rereads the store and recomputes the receipt
```

| Actor | Rights | Limits |
|---|---|---|
| Granting person | Grant, delegate, pause, and revoke permissions | The person is the only authority for these actions in this project |
| Permitted agent | Perform an action within its granted permission | It cannot act beyond the permission's subject, operation, clock, budget, or destination |
| Delegate | Receive and exercise a narrower permission | It cannot pass on more than it received |
| Verifier | Recheck the effect and recompute a receipt from the store | It does not trust the executor's report or establish external truth |
| Named destination | Receive the local effect described by the permission | It is a destination, not an integrated institution in this project run |

The full walk-through and the person-facing meaning of each rule are in [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md).

## Evidence you can open

The source snapshot lists 13 named tests. As checked on 2026-10-03, eight pass and five fail. One failure is the explicit kernel digest check. The project was built against Vespi kernel commit `54c20c7`; each project fixes the kernel it consumes by digest and deliberately fails when that kernel moves. Against installed kernel 0.1.3, part of this suite fails until the pin is updated and checked again. That refix is pending. The captured output also shows four behavior checks returning blocked where verified was expected, or failing to find a local effect line. They need to be rerun after the pin is aligned to establish whether they pass against the recorded kernel. A working path against `54c20c7` is not a finished product or proof of readiness for use.

Before code, the adversarial RED phase wrote eight cases and observed each fail. The agreement states the rules they should protect, and the current suite names tests for permission scope, delegation, time and destination limits, budget, repeated effects, receipt integrity, independent verification, human pause authority, blocked returns, and a readable local record. The supplied sources do not map each of the eight original RED cases one by one to these current test names. [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) explains what the available results do and do not demonstrate, and how to run the suite when the code opens. There are no testnet transactions to inspect because this project does not use a blockchain or testnet.

## Farolero, Vespi and Lore Plugin

[Vespi](https://github.com/andresanemic/vespi) supplies the kernel Farolero consumes; Farolero does not modify it. The project uses granted authority, kernel receipts, a human gate for actions outside permission, verification separate from execution, and receipt-based continuity. [Lore Plugin](https://github.com/andresanemic/lore-plugin) is part of the project foundation. The project agreement and code boundary remain Farolero's own.

## What it does not do, and what is not verified

All example records and actors are fictional. There is no real personal, health, financial, or third-party data. Effects are local and reversible. The project does not send records to a network, operate a blockchain, make payments, anchor to testnet, or integrate with an institution. It does not claim legal compliance. As checked on 2026-10-03, the suite is 8 of 13 because its pinned kernel differs from installed kernel 0.1.3; refixing is pending. The nine coded projects were built on 2026-09-29 against the `54c20c7` kernel cut, and their records report green against that cut. Those records show a path that worked in that context, not a finished product or readiness for use. See [`docs/LEGAL_AND_LIMITS.md`](./docs/LEGAL_AND_LIMITS.md) and [`docs/EVIDENCE.md`](./docs/EVIDENCE.md).

## How to review this project

Start with the agreement translated into plain language in [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md). Then read [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) for the named tests, today's 8 of 13 result, and the steps to rerun them when the code opens. Read [`docs/LEGAL_AND_LIMITS.md`](./docs/LEGAL_AND_LIMITS.md) for the boundary of the legal claims. The code is not included today; [`CODE_NOT_INCLUDED.md`](./CODE_NOT_INCLUDED.md) explains when it will open. The review-only [`LICENSE`](./LICENSE) permits reading and cloning for evaluation and does not permit modifying the code.

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

**Farolero hace explícita y verificable la autoridad detrás de la acción de un agente de IA.**

> **La unidad es un permiso acotado: quién puede hacer qué, respecto de qué, para qué operación, hasta cuándo, con qué presupuesto y hacia qué destino.**

Farolero combina un registro de agentes de IA de una organización con una capa de autoridad que otorga una persona responsable. Los agentes actúan solo dentro de sus permisos. Un delegado puede transmitir un subconjunto, nunca más. Un verificador aparte vuelve a leer el almacén local y recalcula el recibo en vez de confiar en el informe del ejecutor.

**Por qué.** Cuando una organización depende de prompts, fichas o chats para explicar lo que puede hacer un agente, no puede mostrar fácilmente quién autorizó una acción ni si el agente se mantuvo dentro de esa autoridad. Farolero concreta el permiso y hace visible la detención de una acción fuera de alcance, para que una persona decida qué sigue.

**Si estás evaluando Find Your Way o Meridian, empieza aquí.**

1. **Qué es.** Un proyecto local para otorgar, acotar, ejercer y comprobar permisos de agentes de IA.
2. **Qué lo rige.** Lee primero el acuerdo del proyecto expresado en lenguaje claro en [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) y compáralo con la implementación cuando se abra el código.
3. **Qué dice la suite hoy.** [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) enumera las 13 pruebas y el resultado comprobado el 2026-10-03: 8 pasan y 5 fallan porque el pin del kernel no coincide con el kernel 0.1.3 instalado.
4. **Qué inspeccionar.** Sigue el ejemplo de [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) y luego usa los nombres de pruebas y las instrucciones para volver a correrlas en [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) cuando el código esté disponible.
5. **Qué no está verificado.** La refijación del kernel está pendiente, y un recorrido funcional no equivale a un producto terminado ni listo para desplegar. El proyecto no afirma cumplir ninguna ley.

## En un minuto

Imagina una organización ficticia que pide a uno de sus agentes ficticios escribir una línea en un registro local del proyecto. Una persona responsable concede permiso para esa operación, destino, plazo y presupuesto concretos. El agente puede delegar solo un permiso más acotado a otro agente registrado. Si el agente delegado intenta usar otro destino o exceder el presupuesto, Farolero bloquea la acción y devuelve el motivo y un siguiente paso para la persona. Si cabe en el permiso, la acción escribe una línea local y deja un recibo. Un verificador aparte vuelve a leer el almacén y recalcula ese recibo. El ejemplo es local y usa datos de fantasía; no contacta una institución ni una red.

## Por qué Farolero

| Necesitas | Qué te da | Dónde vive |
|---|---|---|
| Un permiso con límites claros | Sujeto, objeto, operación, reloj, presupuesto y destino que deben caber | [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) |
| Delegar sin ampliar autoridad | El delegado recibe solo un subconjunto del permiso de quien delega | [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) |
| Una detención visible cuando algo no cabe | Un bloqueo con su razón y un siguiente paso nombrado para la persona | [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) |
| Un registro que se comprueba por separado | Un verificador recalcula el recibo desde el almacén local | [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md) |
| Evidencia de lo que pasó y lo que no | Los 13 nombres de pruebas, el resultado 8 de 13 y el contexto del pin del kernel | [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) |

**Qué no es.** Farolero no es un sistema de identidad, un directorio pasivo de agentes, un panel de configuración, un producto de cumplimiento legal ni una integración institucional. Este recorrido no usa blockchain, pagos, anclaje en testnet ni conexión de red.

## Cómo funciona

```
La persona otorga un permiso acotado
                 |
                 v
El agente registrado actúa dentro de sus límites
                 |
                 +---- el delegado recibe solo un subconjunto
                 |
                 v
Comprobación: sujeto, operación, reloj, presupuesto, destino
       | cabe                                  | no cabe
       v                                       v
Un efecto local y reversible              Bloqueo que vuelve a la persona
       |                                   con razón y siguiente paso humano
       v
El recibo queda en el almacén local
                 |
                 v
Un verificador aparte relee el almacén y recalcula el recibo
```

| Actor | Derechos | Límites |
|---|---|---|
| Persona que otorga | Otorgar, delegar, pausar y revocar permisos | En este proyecto es la única autoridad para esas acciones |
| Agente con permiso | Ejecutar una acción dentro del permiso concedido | No puede salir del sujeto, operación, reloj, presupuesto o destino del permiso |
| Delegado | Recibir y ejercer un permiso más acotado | No puede transmitir más de lo que recibió |
| Verificador | Volver a comprobar el efecto y recalcular un recibo desde el almacén | No confía en el informe del ejecutor ni establece una verdad externa |
| Destino nombrado | Recibir el efecto local descrito en el permiso | Es un destino, no una institución integrada en este recorrido |

El recorrido completo y el sentido cotidiano de cada regla están en [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md).

## Evidencia que puedes abrir

La captura de fuentes enumera 13 pruebas. Según la comprobación del 2026-10-03, pasan 8 y fallan 5. Una falla es la comprobación explícita del digest del kernel. El proyecto se construyó sobre el commit `54c20c7` del kernel Vespi; cada proyecto fija por digest el kernel que consume y falla deliberadamente cuando ese kernel cambia. Contra el kernel 0.1.3 instalado, parte de esta suite falla hasta actualizar el pin y volver a comprobarlo. Esa refijación está pendiente. La salida también muestra cuatro comprobaciones de conducta que devuelven bloqueado donde se esperaba verificado, o no encuentran la línea del efecto local. Hay que volver a correrlas con el pin alineado para saber si pasan contra el kernel registrado. Un recorrido que funcionó contra `54c20c7` no es un producto terminado ni prueba que esté listo para usarse.

Antes del código, la fase RED adversarial escribió ocho casos y observó fallar cada uno. El acuerdo establece las reglas que debían proteger, y la suite actual nombra pruebas sobre alcance del permiso, delegación, límites de tiempo y destino, presupuesto, repetición de efectos, integridad del recibo, verificación independiente, autoridad para pausar, retorno bloqueado y registro local legible. Las fuentes suministradas no relacionan uno por uno los ocho casos RED originales con estos nombres de pruebas actuales. [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) explica qué demuestran los resultados disponibles y qué no, y cómo correr la suite cuando se abra el código. No hay transacciones de testnet que revisar porque este proyecto no usa blockchain ni testnet.

## Farolero, Vespi y Lore Plugin

[Vespi](https://github.com/andresanemic/vespi) aporta el kernel que Farolero consume; Farolero no lo modifica. El proyecto usa autoridad otorgada, recibos del kernel, una compuerta humana para acciones fuera de permiso, verificación separada de la ejecución y continuidad basada en recibos. [Lore Plugin](https://github.com/andresanemic/lore-plugin) forma parte de los cimientos del proyecto. El acuerdo y los límites del código pertenecen a Farolero.

## Lo que no hace y lo que no está verificado

Todos los registros y actores de ejemplo son de fantasía. No hay datos personales, de salud, financieros ni de terceros reales. Los efectos son locales y reversibles. El proyecto no envía registros a una red, no opera blockchain, no hace pagos, no ancla en testnet ni se integra con una institución. No afirma cumplir ninguna ley. Según la comprobación del 2026-10-03, la suite está 8 de 13 porque el kernel fijado difiere del 0.1.3 instalado; la refijación está pendiente. Los nueve proyectos con código se construyeron el 2026-09-29 contra el corte `54c20c7`, y sus registros reportan verde contra ese corte. Esos registros muestran un camino que funcionó en ese contexto, no un producto terminado ni listo para usarse. Consulta [`docs/LEGAL_AND_LIMITS.md`](./docs/LEGAL_AND_LIMITS.md) y [`docs/EVIDENCE.md`](./docs/EVIDENCE.md).

## Cómo revisar este proyecto

Empieza por la explicación en lenguaje claro del acuerdo en [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md). Después lee [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) para ver los nombres de pruebas, el resultado actual de 8 de 13 y cómo volver a correrlas cuando se abra el código. Consulta [`docs/LEGAL_AND_LIMITS.md`](./docs/LEGAL_AND_LIMITS.md) para conocer los límites de las afirmaciones legales. Hoy no se incluye el código; [`CODE_NOT_INCLUDED.md`](./CODE_NOT_INCLUDED.md) explica cuándo se abrirá. La [`LICENSE`](./LICENSE) de solo revisión permite leer y clonar para evaluar, no modificar el código.

## Autoría

**Autoridad del repositorio: Andrés Peña** (`andresanemic` en GitHub).

<p>
  <img src="./assets/icons/v2/telegram.svg" width="28" alt="Ícono de Telegram"> &nbsp;&nbsp;
  <img src="./assets/icons/v2/x.svg" width="28" alt="Ícono de X"> &nbsp;&nbsp;
  <img src="./assets/icons/v2/linkedin.svg" width="28" alt="Ícono de LinkedIn">
</p>

---

[Cómo funciona](./docs/HOW_IT_WORKS.md) · [Evidencia](./docs/EVIDENCE.md) · [Aspectos legales y límites](./docs/LEGAL_AND_LIMITS.md) · [Código no incluido](./CODE_NOT_INCLUDED.md) · [Licencia de solo revisión](./LICENSE) · [Vespi](https://github.com/andresanemic/vespi) · [Lore Plugin](https://github.com/andresanemic/lore-plugin)

</details>
