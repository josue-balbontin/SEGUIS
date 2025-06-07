# SEGUIS - Sistema de Seguimiento de Pedidos por Número de Seguimiento y Entrega por Ciudad

## Instalación y Ejecución

1. Asegúrate de tener instalado **Node.js** y **Angular CLI**.
2. Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
3. Navega al directorio del proyecto
4. Instala las dependencias:
    ```bash
    npm install
    ```
5. Inicia el servidor:
    ```bash
    ng serve
    ```
6. Abre tu navegador y accede a `http://localhost:4200` para ver la aplicación en funcionamiento.

## Organización del Proyecto

```
SEGUIS/
├── .vscode/                     # Configuración Visual Studio Code
├── public/                      # Recursos estáticos públicos
├── src/                         # Código fuente principal
│   ├── app/                    # Aplicación Angular
│   │   ├── Componentes/        # Componentes de la interfaz
│   │   │   ├── admin_modulo/   # Módulo de administración
│   │   │   │   ├── administrador/ # Componente administrador
│   │   │   │   └── tablas/     # Gestión de datos tabulares
│   │   │   │       └── pedidos/ # Gestión completa de pedidos
│   │   │   │           ├── buscar-pedidos/         # Búsqueda por número
│   │   │   │           ├── colas-entrega/          # Colas FIFO por ciudad
│   │   │   │           ├── estadisticas/           # Métricas y reportes
│   │   │   │           ├── historial-pedidos/      # Lista ordenada por número
│   │   │   │           └── nuevo-pedido/           # Registro de nuevos pedidos
│   │   │   ├── aviso/          # Sistema de notificaciones
│   │   │   ├── carrito/       # Sistema de carrito de compras
│   │   │   ├── formulario-compra/ # Proceso de compra (legacy)
│   │   │   ├── home/            # Página principal
│   │   │   │   └── grupoequipos/ # Catálogo de productos
│   │   │   ├── navbar/          # Barra de navegación
│   │   │   │   └── usuarioprevio/ # lista de opciones de usuario
│   │   │   └── producto/        # Vista detalle de producto
│   │   ├── Logica/             # Lógica de negocio y estructuras de datos
│   │   │   ├── HashMapPedidos/ # HashMap personalizado para ciudades
│   │   │   ├── Hashmap Historial /     # HashMap para historial de pedidos
│   │   │   └── Cola /   # Cola FIFO para pedidos por ciudad
│   │   ├── Modulos/            # Modelos e interfaces
│   │   ├── Servicios/          # Servicios Angular
│   │   │   ├── carritos/        # Servicio gestión de carrito y persistencia
│   │   │   ├── equipos/       # Servicio gestión de equipos y persistencia
│   │   │   └── pedidos/        # Servicio gestión de pedidos y persistencia
│   │   ├── app.component.html  # Template componente raíz
│   │   ├── app.component.css   # Estilos componente raíz
│   │   ├── app.component.spec.ts # Tests componente raíz
│   │   ├── app.component.ts    # Lógica componente raíz
│   │   ├── app.config.ts       # Configuración de la aplicación
│   │   └── app.routes.ts       # Configuración de rutas
│   ├── index.html             # Página HTML principal
│   ├── main.ts                # Punto de entrada de la aplicación
│   ├── styles.css             # Estilos globales
├── .editorconfig              # Configuración del editor
├── .gitignore                 # Archivos ignorados por Git
├── angular.json               # Configuración del proyecto Angular
├── LICENSE                    # Licencia MIT
├── package.json               # Dependencias y scripts npm
├── package-lock.json          # Lock de versiones exactas
├── README.md                  # Documentación principal
├── tsconfig.app.json          # Config TypeScript para la app
├── tsconfig.json              # Configuración base TypeScript
└── tsconfig.spec.json         # Config TypeScript para tests
```

## 📋 Introducción

En la asignatura de **Estructuras de Datos**, resulta valioso aplicar conceptos fundamentales para resolver problemas reales de manera eficiente. Este proyecto describe un sistema de seguimiento de pedidos que utiliza **dos tablas hash** con el fin de gestionar tanto un historial permanente de todos los pedidos como las colas de entrega agrupadas por ciudad.

La aplicación se desarrolla en **Angular con TypeScript**, sin respaldo de backend ni base de datos externa, de modo que toda la lógica y datos residen en memoria. Con esta aproximación se busca ejemplificar el uso de tablas hash para realizar accesos, inserciones en tiempo promedio constante, al mismo tiempo que se mantienen **colas FIFO** (primero en entrar, primero en salir) para la distribución en cada ciudad.

## 🎯 Objetivos

### 🎖️ Objetivo General
Desarrollar un prototipo en Angular que permita gestionar pedidos como una empresa de logística demostrando la eficiencia de las estructuras de datos utilizadas en tiempo de acceso y modificación.

### 📌 Objetivos Específicos
- ✅ Implementar un **hashmap** que funcione como historial de todos los pedidos, con inserciones permanentes de cada registro
- ✅ Implementar un segundo **hashmap** donde cada clave sea una ciudad y cada valor sea una cola de pedidos pendientes de entrega para esa ciudad
- ✅ Asegurar que el número de seguimiento crezca de manera secuencial (por ejemplo: 1001, 1002, 1003, …), de modo que el hashmap del historial pueda recorrerse en orden numérico ascendente con complejidad lineal
- ✅ Permitir registrar nuevos pedidos, garantizando unicidad y almacenar simultáneamente en el historial y en la cola correspondiente
- ✅ Mostrar el listado general de pedidos en orden de número de seguimiento, aprovechando la propiedad de orden ascendente de claves numéricas en el hashmap
- ✅ Mostrar la cola de entrega para una ciudad específica, respetando el orden FIFO de llegada y permitiendo un desencolado en O(1)
- ✅ Marcar pedidos como entregados, eliminándolos de la cola de la ciudad y conservándolos en el historial con su estado actualizado
- ✅ Consultar la ciudad asociada a un número de seguimiento a partir del historial
- ✅ Explicar cómo y por qué se utilizan estas dos estructuras, detallando sus características, complejidad promedio de operaciones y los beneficios de mantener un historial ordenado por claves numéricas

## 🚀 Descripción del Problema

La empresa de logística necesita gestionar de manera eficiente el recorrido de cada pedido desde su registro hasta su entrega. Cada envío se identifica mediante un **número de seguimiento único**, asignado de forma incremental (por ejemplo, comenzando en 1001 y aumentando en uno cada vez). Los requisitos fundamentales son:

### 📝 Registro de Pedidos
- Capturar el número de seguimiento (que crece secuencialmente), nombre del cliente y ciudad de destino
- Evitar duplicados en el número de seguimiento, de modo que cada pedido sea identificable de forma inequívoca

### 📚 Historial Permanente
- Conservar todos los pedidos registrados en un hashmap que funcione como un histórico inmutable
- Dado que los números de seguimiento crecen linealmente y sin saltos, la colección de claves permanece ordenada de forma natural
- Esta característica facilita la visualización de todo el historial en orden numérico con complejidad **O(n)**, donde n es la cantidad total de pedidos almacenados

### 🏙️ Colas de Entrega por Ciudad
- Para optimizar la logística de reparto, agrupar los pedidos pendientes de cada ciudad en un hashmap distinto
- Cada clave en ese segundo hashmap corresponde al nombre de la ciudad, y el valor es una cola que contiene referencias a los pedidos en orden de llegada a esa ciudad

### ✅ Marcar Pedido como Entregado
- Cuando se marca un pedido como entregado, se elimina de la cola correspondiente a la ciudad de destino mediante una operación de desencolado en **O(1)**, de modo que el siguiente pedido en esa ciudad avanza en la cola
- El historial conserva la marca de "entregado" pero no elimina la entrada

### 🔍 Consulta de Ciudad por Número de Seguimiento
- Dado un número de seguimiento, el sistema debe reportar de forma eficiente la ciudad de destino que figura en el historial
- Al no contar con un backend ni base de datos, toda la información se maneja en memoria, usando dos hashmaps que se actualizan conforme se registran, entregan o consultan pedidos

## 🏗️ Análisis Funcional

### 📦 Entidades y Almacenamiento en Memoria

#### Pedido (estructura conceptual)
- **Número de seguimiento**: Entero secuencial (por ejemplo, 1001, 1002, 1003, …)
- **Cliente**: Cadena de texto con el nombre del receptor
- **Ciudad destino**: Cadena de texto que indica la ciudad donde debe entregarse el pedido
- **Estado**: Cadena de texto con los valores "pendiente" o "entregado"
- **Fecha**: Cadena de texto con la fecha del pedido
- **Entregado**: Booleano que determina si el pedido fue entregado o no
- **Total**: Número decimal que determina cuánto dinero se utilizó en el pedido
- **Equipos**: Array que contiene todos los productos del pedido

#### 🗂️ Hashmap de Historial de Pedidos
- **Propósito**: Mantener cada pedido registrado de forma definitiva
- **Clave**: El número de seguimiento
- **Valor**: El objeto "Pedido" completo

**Complejidad (Operaciones en promedio):**
- Inserción de un nuevo pedido: **O(1)** - pues basta adicionar la clave-número y su valor a la tabla
- Búsqueda de un pedido por su número: **O(1)** promedio - aprovechando su número de seguimiento como índice
- Actualización de estado (marcar como entregado): **O(1)** - al cambiar solo una propiedad del objeto mediante el número de seguimiento
- Recorrido completo para listar el historial en orden: **O(n)** - donde n es la cantidad total de pedidos, pues basta iterar sobre las claves ascendentes para recuperar cada objeto en secuencia

#### 🏙️ Hashmap de Colas de Entrega por Ciudad
- **Propósito**: Mantener únicamente los pedidos pendientes, agrupados según la ciudad de destino, en colas que respetan el orden de llegada
- **Clave**: Nombre de la ciudad
- **Valor**: Cola (estructura FIFO) de referencias a objetos "Pedido" que aún no han sido entregados en esa ciudad

**Complejidad (Operaciones en promedio):**
- Inserción en la cola: **O(1)** - Al registrar un pedido, se inserta al final de la cola de la ciudad
- Desencolado (eliminar primer elemento): **O(1)** - Naturaleza FIFO, para marcar un pedido como entregado, se realiza el desencolado sin necesidad de desplazar elementos
- Acceso a la cola de una ciudad: **O(1)** - para localizar la estructura dentro del hashmap

## 📊 Flujo de Casos de Uso

### 1️⃣ Registrar un Nuevo Pedido

**Proceso de Registro:**
- Crear internamente un objeto "Pedido" con su número de seguimiento (siguiente valor secuencial), nombre de cliente, ciudad de destino y estado = "pendiente"
- Insertar este objeto en el hashmap de historial, usando la clave igual al número de seguimiento
- Insertar el objeto en la cola de entrega de la ciudad correspondiente dentro del segundo hashmap
- **Salida**: Mensaje en la interfaz confirmando que el pedido fue registrado correctamente

### 2️⃣ Mostrar Historial de Pedidos en Orden de Número de Seguimiento

**Proceso:**
- Por cada clave, recuperar el objeto "Pedido" asociado y preparar la lista de presentación
- **Salida en la Interfaz**: Tabla que muestra todos los pedidos realizados y almacenados en el hashmap de historial

### 3️⃣ Mostrar la Cola de Entrega de una Ciudad Específica

**Proceso:**
- Acceder al hashmap de colas con clave "ciudad"
- Recorrer los elementos desde el frente hasta el final para mostrarlos en la interfaz
- **Salida en la Interfaz**: Tabla con cada pedido en la interfaz

### 4️⃣ Marcar un Pedido como Entregado

**Proceso:**
- Identificar el primer elemento de la cola de la ciudad y pulsar "Entregar"
- Cambiar el estado del objeto en el hashmap de historial a "entregado"
- Realizar el desencolado en la cola de la ciudad (eliminar el primer elemento), actualizando el apuntador al frente de la cola

### 5️⃣ Consultar Ciudad por Número de Seguimiento

**Proceso:**
- Buscar en el hashmap de historial el objeto con clave igual al número de seguimiento
- **Salida en la Interfaz**: Tabla que muestra el pedido encontrado por su número de seguimiento y mostrando todas sus características incluyendo la ciudad

## ⚙️ Justificación Técnica

### 🗂️ Hashmap de Historial de Pedidos (clave = Número de Seguimiento → valor = Pedido)

**Naturaleza y Ventajas del Hashmap:**

La tabla hash asocia cada número de seguimiento (entero incremental) con su objeto "Pedido" en tiempo promedio constante para inserciones y búsquedas (**O(1)**).

Como los números de seguimiento se asignan de forma secuencial sin huecos (1001, 1002, 1003, …), al iterar sobre las claves numéricas en TypeScript se respeta el orden ascendente de menor a mayor. Esto permite presentar el historial ordenado sin necesidad de aplicar un algoritmo de ordenación adicional.

El historial es permanente e inmutable: una vez insertado el objeto "Pedido" (con estado inicial "pendiente"), solo cambia su propiedad "estado" cuando se marca como entregado. Esto conserva trazabilidad completa.

**Complejidad de Operaciones:**
| Operación | Complejidad |
|-----------|-------------|
| Inserción (registrar pedido) | O(1) |
| Búsqueda (consultar ciudad o estado) | O(1) |
| Actualización de estado (marcar como entregado) | O(1) |
| Listado completo en orden numérico | O(n) |

**Beneficios Didácticos y Prácticos:**
- ✅ Ilustra el concepto de tabla hash y su eficiencia en tiempo promedio constante para operaciones puntuales
- ✅ Demuestra cómo, con claves numéricas secuenciales, se obtiene orden natural sin sobrecarga de ordenación
- ✅ Permite consultar rápidamente cualquier pedido por su número de seguimiento para conocer detalles o estado

### 🏙️ Hashmap de Colas de Entrega por Ciudad (clave = Ciudad → valor = Cola FIFO)

**Naturaleza de la Cola FIFO y Hashmap:**

El hashmap agrupa los pedidos pendientes por ciudad. Cada vez que se registra un nuevo pedido, se agrega al final de la cola de su ciudad (encolado en **O(1)**).

**Complejidad de Operaciones:**
| Operación | Complejidad |
|-----------|-------------|
| Acceso a la cola de una ciudad | O(1) |
| Inserción en cola (encolar al final) | O(1) |
| Desencolado (eliminar primer elemento de la cola) | O(1) |

## 🌟 Beneficios Generales del Enfoque

### ⚡ Eficiencia en Acceso y Modificación
Ambos hashmaps operan con complejidad promedio **O(1)** en sus principales operaciones (inserción, búsqueda y actualización), garantizando que, incluso con un gran número de pedidos, el sistema responda ágilmente.

### 📈 Ordenación Implícita del Historial
Al asignar números de seguimiento de manera incremental (1001, 1002, 1003, …) y almacenar en un hashmap con claves numéricas, la iteración sobre las claves se realiza en orden ascendente. De esta forma, se elimina la necesidad de aplicar algoritmos de ordenamiento cada vez que se muestre el historial, ahorrando tiempo de ejecución.

### 🚀 Desencolado en Tiempo Constante
La cola por ciudad está diseñada para que su operación de desencolado (eliminar el primer pedido) sea **O(1)**. Esto evita penalizaciones en el rendimiento y ahorro de recursos.

---

