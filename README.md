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

1. **What it is and what governs it.** Read the [project scope and agreement](./docs/HOW_IT_WORKS.md#scope).
2. **What the evidence shows.** See the [suite results and their limits](./docs/EVIDENCE.md#todays-suite-result).
3. **What to inspect.** Follow the [local walkthrough](./docs/HOW_IT_WORKS.md#walk-through-one-local-record-entry) and the [rerun instructions](./docs/EVIDENCE.md#how-to-rerun-when-the-code-opens) when the code is available.
4. **What is not verified.** Read the [evidence limits](./docs/EVIDENCE.md#limits-of-this-evidence) and [project limits](./docs/LEGAL_AND_LIMITS.md#project-limits).

## In one minute

For the detailed fictional example of a permission, local effect, blocked return, and separate verification, see the [walkthrough](./docs/HOW_IT_WORKS.md#walk-through-one-local-record-entry).

## Why Farolero

For the rules behind bounded permissions, delegation, blocked returns, and independent receipt checks, read [how Farolero works](./docs/HOW_IT_WORKS.md#what-the-agreement-makes-enforceable).

For what Farolero does not claim or connect to in this project run, see [legal and project limits](./docs/LEGAL_AND_LIMITS.md#what-the-project-does-not-claim).

## How it works

The full walkthrough, actor rights, and person-facing meaning of each rule are in [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md).

## Evidence you can open

The [evidence record](./docs/EVIDENCE.md) gives the named test results, the kernel pin context, the limits of the original adversarial cases, and instructions for rerunning the suite when the code opens. It also explains why there are no testnet transactions to inspect.

## Farolero, Vespi and Lore Plugin

[Vespi](https://github.com/andresanemic/vespi) supplies the kernel Farolero consumes; Farolero does not modify it. The project uses granted authority, kernel receipts, a human gate for actions outside permission, verification separate from execution, and receipt-based continuity. [Lore Plugin](https://github.com/andresanemic/lore-plugin) is part of the project foundation. The project agreement and code boundary remain Farolero's own.

## What it does not do, and what is not verified

The [project limits](./docs/LEGAL_AND_LIMITS.md#project-limits) and [evidence limits](./docs/EVIDENCE.md#limits-of-this-evidence) describe the fictional data, local reversible effects, unverified behaviors, pending kernel refix, and claims this project does not make.

## How to review this project

Read [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md), [`docs/EVIDENCE.md`](./docs/EVIDENCE.md), and [`docs/LEGAL_AND_LIMITS.md`](./docs/LEGAL_AND_LIMITS.md) for the agreement, evidence, and limits. The code is not included today; [`CODE_NOT_INCLUDED.md`](./CODE_NOT_INCLUDED.md) explains when it will open. The review-only [`LICENSE`](./LICENSE) permits reading and cloning for evaluation and does not permit modifying the code.

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

1. **Qué es y qué lo rige.** Lee el [alcance y el acuerdo del proyecto](./docs/HOW_IT_WORKS.md#alcance).
2. **Qué muestra la evidencia.** Consulta los [resultados de la suite y sus límites](./docs/EVIDENCE.md#resultado-de-la-suite-hoy).
3. **Qué inspeccionar.** Sigue el [recorrido local](./docs/HOW_IT_WORKS.md#recorrido-una-linea-en-un-registro-local) y las [instrucciones para volver a correr las pruebas](./docs/EVIDENCE.md#como-volver-a-correr-las-pruebas-cuando-se-abra-el-codigo) cuando el código esté disponible.
4. **Qué no está verificado.** Lee los [límites de la evidencia](./docs/EVIDENCE.md#limites-de-esta-evidencia) y los [límites del proyecto](./docs/LEGAL_AND_LIMITS.md#limites-del-proyecto).

## En un minuto

Para el ejemplo ficticio detallado de un permiso, un efecto local, una devolución bloqueada y una verificación separada, consulta el [recorrido](./docs/HOW_IT_WORKS.md#recorrido-una-linea-en-un-registro-local).

## Por qué Farolero

Para las reglas de permisos acotados, delegación, bloqueos y comprobación independiente de recibos, lee [cómo funciona Farolero](./docs/HOW_IT_WORKS.md#que-hace-cumplir-el-acuerdo).

Consulta los [límites y lo que el proyecto no afirma](./docs/LEGAL_AND_LIMITS.md#lo-que-el-proyecto-no-afirma).

## Cómo funciona

El recorrido completo, los derechos de cada actor y el sentido cotidiano de cada regla están en [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md).

## Evidencia que puedes abrir

El [registro de evidencia](./docs/EVIDENCE.md) presenta los resultados con nombre, el contexto del pin del kernel, los límites de los casos adversariales originales y las instrucciones para volver a correr la suite cuando se abra el código. También explica por qué no hay transacciones de testnet que revisar.

## Farolero, Vespi y Lore Plugin

[Vespi](https://github.com/andresanemic/vespi) aporta el kernel que Farolero consume; Farolero no lo modifica. El proyecto usa autoridad otorgada, recibos del kernel, una compuerta humana para acciones fuera de permiso, verificación separada de la ejecución y continuidad basada en recibos. [Lore Plugin](https://github.com/andresanemic/lore-plugin) forma parte de los cimientos del proyecto. El acuerdo y los límites del código pertenecen a Farolero.

## Lo que no hace y lo que no está verificado

Los [límites del proyecto](./docs/LEGAL_AND_LIMITS.md#limites-del-proyecto) y los [límites de la evidencia](./docs/EVIDENCE.md#limites-de-esta-evidencia) describen los datos ficticios, los efectos locales y reversibles, las conductas no verificadas, la refijación pendiente y lo que el proyecto no afirma.

## Cómo revisar este proyecto

Lee [`docs/HOW_IT_WORKS.md`](./docs/HOW_IT_WORKS.md), [`docs/EVIDENCE.md`](./docs/EVIDENCE.md) y [`docs/LEGAL_AND_LIMITS.md`](./docs/LEGAL_AND_LIMITS.md) para consultar el acuerdo, la evidencia y los límites. Hoy no se incluye el código; [`CODE_NOT_INCLUDED.md`](./CODE_NOT_INCLUDED.md) explica cuándo se abrirá. La [`LICENSE`](./LICENSE) de solo revisión permite leer y clonar para evaluar, no modificar el código.

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
