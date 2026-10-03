# Farolero evidence

## What was available for this review

The supplied project snapshot contains `suite-hoy.txt`, the agreement, and the phase record. It does not contain public transaction evidence or a testnet run. The project agreement says the effects are local and reversible, all data is synthetic, and there is no blockchain, payment, network, or institutional integration.

## Today's suite result

The captured output checked on 2026-10-03 reports 13 tests: 8 pass and 5 fail. The names below are copied from `suite-hoy.txt`; status is from that output.

### Permission boundaries and authority

| Test name | Result |
|---|---|
| `sin permiso, la ejecución queda bloqueada y vuelve a la persona con la salida` | Pass |
| `con el permiso vencido, el bloqueo nombra la hora en que murió` | Pass |
| `con el mismo permiso y otro destino, el bloqueo nombra los dos destinos` | Pass |
| `un delegado no puede recibir más de lo que su delegante tiene` | Pass |
| `solo quien figura como pauser puede pausar, y la operación pausada no ejecuta` | Pass |
| `lo que no cabe vuelve bloqueado con la razón escrita, no con un fallo mudo` | Pass |

### Receipt and verification behavior

| Test name | Result |
|---|---|
| `un recibo editado a mano no verifica` | Pass |
| `un verificador que solo cree al ejecutor no puede producir un verde en la auditoría` | Fail |

### Budget, repeat prevention, and readable record

| Test name | Result |
|---|---|
| `el presupuesto es un límite duro y se acumula entre ejecuciones` | Fail |
| `el mismo efecto no se ejecuta dos veces: el segundo intento devuelve el recibo del primero` | Fail |
| `el registro es un archivo que la persona puede abrir sin Farolero` | Fail |

### Consumed kernel pin

| Test name | Result |
|---|---|
| `el núcleo que consume Farolero es el corte fijado, módulo por módulo` | Fail |
| `el encabezado de los cinco módulos declara el mismo commit` | Pass |

## Why five fail today

The project was built on the Vespi kernel cut `54c20c7`, and the coded projects fix the kernel they consume by digest. They deliberately fail when the consumed kernel moves. The supplied suite output shows a digest mismatch in `continuity.js`. The installed kernel is 0.1.3 as checked on 2026-10-03. As a result, part of each suite fails against the installed kernel until the project is pinned again. That refix is pending. In this capture, the other four failing checks report a blocked result where verification was expected, or a missing effect line in the local record. They also ran against the moved kernel. Rerunning after the pin is aligned is necessary to see whether those checks pass in the recorded `54c20c7` context. The current failures are not evidence that those underlying behaviors are ready for use, and the reported green state against `54c20c7` is not a claim of a finished product.

## What the adversarial phase found

`FASES.md` records that eight project RED cases were written before code and each failure was observed. The agreement sets rules concerning absent or expired authority, destination and budget limits, narrowing delegation, repeated effects, receipt integrity, verification separate from execution, who may pause, blocked actions that return to a person, and a readable local record. The source snapshot does not map each original RED case one by one to the current suite names. These are project adversarial checks, not findings from an external audit. The current named suite output is the evidence available here; the source snapshot does not include a separate report from an independent reviewer.

## How to rerun when the code opens

When the source code is published, first inspect the pinned kernel digest and the exact dependency versions. After the pending kernel refix is recorded, run `npm test` from the repository root in a fresh session. Compare the result with the 13 test names and today's 8 of 13 baseline above. Review every changed result and the receipt artifacts before describing the suite as green. The source manifest also lists `npm run recorrido` for the local walkthrough. These commands are documented from the supplied `package.json`; this review did not run them because source code is not included.

There are no testnet transaction hashes to open or recheck. The agreement explicitly says Farolero has no blockchain or testnet anchor.

## Limits of this evidence

The output is one captured suite result. It does not establish behavior for every input, a production deployment, adoption by an organization, legal compliance, or readiness for use. It does not prove anything about external systems because the project has no external effects in this run.

## Español

### Material disponible para esta revisión

La captura suministrada del proyecto contiene `suite-hoy.txt`, el acuerdo y el registro de fases. No contiene evidencia pública de transacciones ni una corrida en testnet. El acuerdo dice que los efectos son locales y reversibles, que todos los datos son sintéticos y que no hay blockchain, pagos, red ni integración institucional.

<a id="resultado-de-la-suite-hoy"></a>

### Resultado de la suite hoy

La salida capturada y comprobada el 2026-10-03 informa 13 pruebas: 8 pasan y 5 fallan. Los nombres siguientes se copian de `suite-hoy.txt`; el resultado corresponde a esa salida.

#### Límites del permiso y autoridad

| Nombre de la prueba | Resultado |
|---|---|
| `sin permiso, la ejecución queda bloqueada y vuelve a la persona con la salida` | Pasa |
| `con el permiso vencido, el bloqueo nombra la hora en que murió` | Pasa |
| `con el mismo permiso y otro destino, el bloqueo nombra los dos destinos` | Pasa |
| `un delegado no puede recibir más de lo que su delegante tiene` | Pasa |
| `solo quien figura como pauser puede pausar, y la operación pausada no ejecuta` | Pasa |
| `lo que no cabe vuelve bloqueado con la razón escrita, no con un fallo mudo` | Pasa |

#### Recibos y verificación

| Nombre de la prueba | Resultado |
|---|---|
| `un recibo editado a mano no verifica` | Pasa |
| `un verificador que solo cree al ejecutor no puede producir un verde en la auditoría` | Falla |

#### Presupuesto, repetición y registro legible

| Nombre de la prueba | Resultado |
|---|---|
| `el presupuesto es un límite duro y se acumula entre ejecuciones` | Falla |
| `el mismo efecto no se ejecuta dos veces: el segundo intento devuelve el recibo del primero` | Falla |
| `el registro es un archivo que la persona puede abrir sin Farolero` | Falla |

#### Pin del kernel consumido

| Nombre de la prueba | Resultado |
|---|---|
| `el núcleo que consume Farolero es el corte fijado, módulo por módulo` | Falla |
| `el encabezado de los cinco módulos declara el mismo commit` | Pasa |

### Por qué fallan cinco hoy

El proyecto se construyó sobre el corte `54c20c7` del kernel Vespi y los proyectos con código fijan por digest el kernel que consumen. Fallan deliberadamente cuando el kernel cambia. La salida suministrada muestra un digest distinto en `continuity.js`. El kernel instalado era 0.1.3 al comprobarlo el 2026-10-03. Por eso parte de cada suite falla contra el kernel instalado hasta volver a fijar la versión consumida. Esa refijación está pendiente. En esta captura, las otras cuatro comprobaciones fallidas devuelven un resultado bloqueado donde se esperaba verificar, o no encuentran la línea del efecto en el registro local. También corrieron contra el kernel movido. Hace falta volver a correrlas después de alinear el pin para saber si pasan en el contexto registrado de `54c20c7`. Las fallas actuales no prueban que esas conductas subyacentes estén listas para usarse, y el estado verde reportado contra `54c20c7` no significa que el producto esté terminado.

### Qué encontró la fase adversarial

`FASES.md` registra que los ocho casos RED del proyecto se escribieron antes del código y que se observó fallar cada uno. El acuerdo establece reglas sobre autoridad ausente o vencida, límites de destino y presupuesto, delegación que reduce el permiso, efectos repetidos, integridad del recibo, verificación separada de la ejecución, quién puede pausar, acciones bloqueadas que vuelven a una persona y un registro local legible. La captura no relaciona uno por uno los casos RED originales con los nombres actuales de la suite. Son comprobaciones adversariales del proyecto, no hallazgos de una auditoría externa. La salida de la suite nombrada es la evidencia disponible aquí; la captura no incluye un informe separado de una persona revisora independiente.

<a id="como-volver-a-correr-las-pruebas-cuando-se-abra-el-codigo"></a>

### Cómo volver a correr las pruebas cuando se abra el código

Cuando se publique el código fuente, primero revisa el digest fijado del kernel y las versiones exactas de dependencias. Después de registrar la refijación pendiente, ejecuta `npm test` desde la raíz del repositorio en una sesión nueva. Compara el resultado con los 13 nombres y la base actual de 8 de 13. Revisa cada resultado que cambie y los recibos antes de describir la suite como verde. El manifiesto también registra `npm run recorrido` para el recorrido local. Estos comandos constan en el `package.json` suministrado; esta revisión no los ejecutó porque no se incluye el código fuente.

No hay hashes de transacciones de testnet que abrir o revisar. El acuerdo dice explícitamente que Farolero no usa blockchain ni anclaje en testnet.

<a id="limites-de-esta-evidencia"></a>

### Límites de esta evidencia

La salida es una captura de una corrida de la suite. No demuestra comportamiento para toda entrada, despliegue en producción, adopción por una organización, cumplimiento legal ni preparación para usarse. No demuestra nada sobre sistemas externos porque este recorrido no tiene efectos externos.
