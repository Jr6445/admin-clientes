# Sistema de Clientes - Frontend

Este proyecto representa el frontend del sistema de gestión de clientes. Proporciona una interfaz de usuario para interactuar con la API REST del backend.

## Características

- **Gestión de Clientes**: Crear, editar, eliminar y listar clientes.
- **Gestión de Direcciones y Documentos**: Asociar direcciones y documentos a los clientes.
- **Interfaz Moderna**: Utiliza Bootstrap para un diseño elegante y responsivo.
- **Notificaciones Interactivas**: Implementa alertas con SweetAlert2 para acciones críticas.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- Un backend configurado y funcionando ([Repositorio del Backend](https://github.com/Jr6445/Sistema-Clientes-API))

---

## Instalación

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/Sistema-Clientes-Frontend.git
   cd Sistema-Clientes-Frontend
   ```

2. **Instalar Dependencias**:

   ```bash
   npm install
   # o si usas yarn
   yarn install
   ```
---

## Uso

1. **Iniciar el Servidor de Desarrollo**:

   ```bash
   npm start
   # o si usas yarn
   yarn start
   ```

   La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

2. **Construir para Producción**:

   ```bash
   npm run build
   # o si usas yarn
   yarn build
   ```

   Esto generará una versión optimizada en la carpeta `build`.

---

## Estructura del Proyecto

```plaintext
Sistema-Clientes-Frontend/
├── public/                # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas principales
│   ├── services/          # Servicios API
│   ├── styles/            # Archivos de estilo
│   ├── App.js             # Punto de entrada de la aplicación
│   └── index.js           # Renderizado principal
├── .env                   # Variables de entorno
├── package.json           # Configuración de dependencias
└── README.md              # Documentación
```

---

## Tecnologías Utilizadas

- **React**: Framework de JavaScript para construir interfaces de usuario.
- **Bootstrap**: Biblioteca CSS para diseño responsivo.
- **SweetAlert2**: Para notificaciones interactivas.
- **Axios**: Cliente HTTP para comunicación con el backend.

---

## Funcionalidades

### Gestión de Clientes
- Crear clientes con información básica.
- Editar y actualizar detalles de clientes existentes.
- Eliminar clientes y registrar cambios en el backend.

### Gestión de Direcciones y Documentos
- Asociar múltiples direcciones y documentos a un cliente.
- Ver y gestionar direcciones/documentos desde modales interactivos.
