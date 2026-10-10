# Farolero evidence

## What was available for this review

The review snapshot includes the project agreement, phase record, and a captured test output dated 2026-10-09 (`docs/suite-2026-10-09.txt`). The source code is in this repository under the review-only license; the review snapshot itself does not include a testnet run or public transaction evidence. The agreement says the example data is synthetic, the effect is local and reversible, and the project has no blockchain, payment, network, or institutional integration.

## Today’s suite result

The captured output reports 13 tests: 13 pass, none unsuccessful, none skipped, under Node v24.15.0. The run used `node --test test/*.test.js` in a clean clone, with empty HOME and no network. The names below are copied from the supplied test output; status is from that capture. The kernel consumed is Vespi 0.1.5 (commit `ed559e83c976dd6e6a379a5510db776206f670b4`), copied in `vendor/vespi-kernel` and checked against its SOURCE.md digest module by module.

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
| `un verificador que solo cree al ejecutor no puede producir un verde en la auditoría` | Pass |

### Budget, repeat prevention, and readable record

| Test name | Result |
|---|---|
| `el presupuesto es un límite duro y se acumula entre ejecuciones` | Pass |
| `el mismo efecto no se ejecuta dos veces: el segundo intento devuelve el recibo del primero` | Pass |
| `el registro es un archivo que la persona puede abrir sin Farolero` | Pass |

### Consumed kernel pin

| Test name | Result |
|---|---|
| `el núcleo que consume Farolero es el corte fijado, módulo por módulo` | Pass |
| `el encabezado de los cinco módulos declara el mismo commit` | Pass |

## Why the earlier capture was red

The 2026-10-03 capture was red because the project was pinned to an older kernel cut (0.1.3). That pin update to 0.1.5 (commit `ed559e8`) is now recorded, and the 2026-10-09 capture checks the vendored copy module by module against its SOURCE.md. A green suite covers only what those named tests check.

## What the adversarial phase found

The phase record says eight project RED cases were written before code and that each one stayed red when observed. The agreement defines the behaviors those cases concern: absent or expired authority, destination and budget limits, narrowing delegation, repeated effects, receipt integrity, verification separate from execution, who may pause, blocked returns to a person, and a readable local record. The supplied snapshot does not map each original RED case one by one to the current named tests. These are project adversarial checks, not an independent audit; no separate independent-review report is included.

## How to rerun the suite

The source code is in this repository under the review-only license (reading and cloning for evaluation; no modification or redistribution). Inspect the pinned kernel digest and exact dependency versions first. Run `npm test` on Node 24 from the repository root in a fresh session. The suite must report the same 13 named tests with 13 passing, and `docs/suite-2026-10-09.txt` is the reference to compare against. Inspect each changed result and the receipt artifacts before describing the suite as green. The supplied package manifest also lists `npm run recorrido` for the local walkthrough. These commands come from that manifest; this documentation review did not run them.

There are no testnet transaction hashes to inspect. The agreement says Farolero does not use blockchain or a testnet anchor.

## Limits of this evidence

This is one captured suite result. It does not establish behavior for every input, a production deployment, adoption by an organization, legal compliance, or readiness for use. It does not prove anything about an external system because the described project run has no external effects.

# Español

## Material disponible para esta revisión

La captura de revisión incluye el acuerdo del proyecto, el registro de fases y una salida de pruebas fechada el 2026-10-09 (`docs/suite-2026-10-09.txt`). El código fuente está en este repositorio bajo la licencia de solo revisión; la captura de revisión en sí no incluye una corrida en testnet ni evidencia pública de transacciones. El acuerdo dice que los datos de ejemplo son sintéticos, que el efecto es local y reversible, y que el proyecto no tiene blockchain, pagos, red ni integración institucional.

## Resultado de la suite hoy

La salida capturada informa 13 pruebas: 13 pasan, ninguna sin pasar, ninguna omitida, con Node v24.15.0. La corrida usó `node --test test/*.test.js` en un clon limpio, con HOME vacío y sin red. Los nombres siguientes se copian de la salida suministrada; el estado corresponde a esa captura. El kernel consumido es Vespi 0.1.5 (commit `ed559e83c976dd6e6a379a5510db776206f670b4`), copiado en `vendor/vespi-kernel` y comprobado contra su SOURCE.md digest módulo por módulo.

### Límites del permiso y autoridad

| Nombre de la prueba | Resultado |
|---|---|
| `sin permiso, la ejecución queda bloqueada y vuelve a la persona con la salida` | Pasa |
| `con el permiso vencido, el bloqueo nombra la hora en que murió` | Pasa |
| `con el mismo permiso y otro destino, el bloqueo nombra los dos destinos` | Pasa |
| `un delegado no puede recibir más de lo que su delegante tiene` | Pasa |
| `solo quien figura como pauser puede pausar, y la operación pausada no ejecuta` | Pasa |
| `lo que no cabe vuelve bloqueado con la razón escrita, no con un fallo mudo` | Pasa |

### Recibos y verificación

| Nombre de la prueba | Resultado |
|---|---|
| `un recibo editado a mano no verifica` | Pasa |
| `un verificador que solo cree al ejecutor no puede producir un verde en la auditoría` | Pasa |

### Presupuesto, repetición y registro legible

| Nombre de la prueba | Resultado |
|---|---|
| `el presupuesto es un límite duro y se acumula entre ejecuciones` | Pasa |
| `el mismo efecto no se ejecuta dos veces: el segundo intento devuelve el recibo del primero` | Pasa |
| `el registro es un archivo que la persona puede abrir sin Farolero` | Pasa |

### Pin del kernel consumido

| Nombre de la prueba | Resultado |
|---|---|
| `el núcleo que consume Farolero es el corte fijado, módulo por módulo` | Pasa |
| `el encabezado de los cinco módulos declara el mismo commit` | Pasa |

## Por qué la captura anterior quedó en rojo

La captura del 2026-10-03 quedó en rojo porque el proyecto estaba fijado a un corte viejo del kernel (0.1.3). Esa actualización del pin a 0.1.5 (commit `ed559e8`) ya está registrada, y la captura del 2026-10-09 comprueba la copia interna módulo por módulo contra su SOURCE.md. Una suite en verde cubre solo lo que esas pruebas nombran.

## Qué encontró la fase adversarial

El registro de fases dice que los ocho casos RED del proyecto se escribieron antes del código y que se observó fallar cada uno. El acuerdo define las conductas que cubrían: autoridad ausente o vencida, límites de destino y presupuesto, delegación que reduce, efectos repetidos, integridad del recibo, verificación separada de la ejecución, quién puede pausar, devoluciones bloqueadas a una persona y un registro local legible. La captura suministrada no relaciona uno por uno los casos RED originales con las pruebas actuales. Son comprobaciones adversariales del proyecto, no una auditoría externa; no se incluye un informe separado de revisión externa.

## Cómo volver a correr las pruebas

El código fuente está en este repositorio bajo la licencia de solo revisión (permite leer y clonar para evaluar, no modificar ni redistribuir). Primero revisa el digest fijado del kernel y las versiones exactas de dependencias. Ejecuta `npm test` con Node 24 desde la raíz del repositorio en una sesión nueva. La suite debe informar las mismas 13 pruebas nombradas con 13 que pasan, y `docs/suite-2026-10-09.txt` es la referencia para comparar. Revisa cada resultado que cambie y los artefactos de recibos antes de describir la suite como verde. El manifiesto suministrado también lista `npm run recorrido` para el recorrido local. Estos comandos constan en ese manifiesto; esta revisión documental no los ejecutó.

No hay hashes de transacciones de testnet que revisar. El acuerdo dice que Farolero no usa blockchain ni anclaje en testnet.

## Límites de esta evidencia

Esta es una captura de una corrida de la suite. No demuestra conducta para toda entrada, un despliegue en producción, adopción por una organización, cumplimiento legal ni preparación para usarse. No demuestra nada sobre sistemas externos porque el recorrido descrito no produce efectos externos.
