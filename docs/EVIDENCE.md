# Farolero evidence

## What was available for this review

The review snapshot includes the project agreement, phase record, and a captured test output dated 2026-10-03. It does not include the source code, a testnet run, or public transaction evidence. The agreement says the example data is synthetic, the effect is local and reversible, and the project has no blockchain, payment, network, or institutional integration.

## Today’s suite result

The captured output reports 13 tests: 8 pass and 5 fail. The names below are copied from the supplied test output; status is from that capture.

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

## Why the kernel check fails, and what the other failures mean

Farolero was built against the Vespi kernel cut `54c20c7`. The project records the kernel it consumes by digest, module by module, and deliberately checks that the installed files still match that recorded cut. In the supplied capture, the digest differs in `continuity.js`; the kernel installed at the time was 0.1.3. The kernel refix is pending. The module-header test passes, but matching commit declarations do not make a changed file digest match.

The other four failures are behavior checks: three return `bloqueado` where `verificado` was expected, and one cannot find an effect line in the local record. They were also run against the moved kernel. The available evidence does not establish whether these checks pass against the recorded `54c20c7` context. Aligning the kernel pin and rerunning the suite is required to answer that. The current failures do not show that these behaviors are ready for use, and the earlier green state reported for the recorded cut is not a product-readiness claim.

## What the adversarial phase found

The phase record says eight project RED cases were written before code and that each failure was observed. The agreement defines the behaviors those cases concern: absent or expired authority, destination and budget limits, narrowing delegation, repeated effects, receipt integrity, verification separate from execution, who may pause, blocked returns to a person, and a readable local record. The supplied snapshot does not map each original RED case one by one to the current named tests. These are project adversarial checks, not an independent audit; no separate independent-review report is included.

## How to rerun when the code opens

When source code is published, inspect the pinned kernel digest and exact dependency versions first. After the pending kernel refix is recorded, run `npm test` from the repository root in a fresh session. Compare the result with today’s 13 named tests and 8-of-13 baseline, and inspect each changed result and the receipt artifacts before describing the suite as green. The supplied package manifest also lists `npm run recorrido` for the local walkthrough. These commands come from that manifest; this review did not run them because the source code is not included.

There are no testnet transaction hashes to inspect. The agreement says Farolero does not use blockchain or a testnet anchor.

## Limits of this evidence

This is one captured suite result. It does not establish behavior for every input, a production deployment, adoption by an organization, legal compliance, or readiness for use. It does not prove anything about an external system because the described project run has no external effects.

## Español

### Material disponible para esta revisión

La captura de revisión incluye el acuerdo del proyecto, el registro de fases y una salida de pruebas fechada el 2026-10-03. No incluye el código fuente, una corrida en testnet ni evidencia pública de transacciones. El acuerdo dice que los datos de ejemplo son sintéticos, que el efecto es local y reversible, y que el proyecto no tiene blockchain, pagos, red ni integración institucional.

### Resultado de la suite hoy

La salida capturada informa 13 pruebas: 8 pasan y 5 fallan. Los nombres siguientes se copian de la salida suministrada; el estado corresponde a esa captura.

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

### Por qué falla la comprobación del kernel y qué significan los demás fallos

Farolero se construyó sobre el corte `54c20c7` del kernel Vespi. El proyecto registra por digest, módulo a módulo, el kernel que consume y comprueba que los archivos instalados sigan coincidiendo con ese corte. En la captura suministrada, el digest difiere en `continuity.js`; el kernel instalado en ese momento era 0.1.3. La refijación está pendiente. La prueba de los encabezados de módulos pasa, pero que declaren el mismo commit no hace que el digest de un archivo cambiado coincida.

Los otros cuatro fallos son comprobaciones de conducta: tres devuelven `bloqueado` donde se esperaba `verificado`, y una no encuentra la línea del efecto en el registro local. También se ejecutaron contra el kernel movido. La evidencia disponible no establece si estas pruebas pasan contra el contexto registrado `54c20c7`. Para responderlo hace falta alinear el pin y volver a correr la suite. Los fallos actuales no demuestran que estas conductas estén listas para usarse, y el estado verde anterior reportado para el corte registrado no es una afirmación de preparación del producto.

### Qué encontró la fase adversarial

El registro de fases dice que los ocho casos RED del proyecto se escribieron antes del código y que se observó fallar cada uno. El acuerdo define las conductas que cubrían: autoridad ausente o vencida, límites de destino y presupuesto, delegación que reduce, efectos repetidos, integridad del recibo, verificación separada de la ejecución, quién puede pausar, devoluciones bloqueadas a una persona y un registro local legible. La captura suministrada no relaciona uno por uno los casos RED originales con las pruebas actuales. Son comprobaciones adversariales del proyecto, no una auditoría independiente; no se incluye un informe separado de revisión independiente.

### Cómo volver a correr las pruebas cuando se abra el código

Cuando se publique el código fuente, primero revisa el digest fijado del kernel y las versiones exactas de dependencias. Después de registrar la refijación pendiente, ejecuta `npm test` desde la raíz del repositorio en una sesión nueva. Compara el resultado con los 13 nombres y la base actual de 8 de 13, y revisa cada resultado que cambie y los artefactos de recibos antes de describir la suite como verde. El manifiesto suministrado también lista `npm run recorrido` para el recorrido local. Estos comandos constan en ese manifiesto; esta revisión no los ejecutó porque no se incluye el código fuente.

No hay hashes de transacciones de testnet que revisar. El acuerdo dice que Farolero no usa blockchain ni anclaje en testnet.

### Límites de esta evidencia

Esta es una captura de una corrida de la suite. No demuestra conducta para toda entrada, un despliegue en producción, adopción por una organización, cumplimiento legal ni preparación para usarse. No demuestra nada sobre sistemas externos porque el recorrido descrito no produce efectos externos.
