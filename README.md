![banner-SQLCollaborator](./assets/SQLCollaborator-banner.png)

---

# SQL Collaborator

Una plataforma colaborativa para la edición y ejecución de consultas SQL en tiempo real, construida con tecnologías modernas de frontend y backend.

## 🚀 Tecnologías Principales

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Rspack** - Bundler moderno y rápido (sucesor de Webpack)
- **TailwindCSS** - Framework de utilidades CSS
- **Monaco Editor** - Editor de código avanzado (VS Code editor)
- **Lucide React** - Iconos modernos
- **Motion** - Animaciones fluidas

### Backend
- **Bun** - Runtime JavaScript ultra-rápido
- **tRPC** - Framework para APIs type-safe
- **Zod** - Validación de esquemas TypeScript-first
- **TypeScript** - Desarrollo backend tipado

### Herramientas de Desarrollo
- **Biome** - Linter y formateador ultra-rápido
- **Husky** - Git hooks automatizados
- **Commitizen** - Commits convencionales
- **Commitlint** - Validación de mensajes de commit

## 📁 Estructura del Proyecto

```
sql-collaborator/
├── apps/
│   ├── frontend/          # Aplicación React con Rspack
│   │   ├── src/
│   │   │   ├── components/    # Componentes reutilizables
│   │   │   ├── editor/        # Editor SQL personalizado
│   │   │   ├── hooks/         # Custom hooks de React
│   │   │   ├── pages/         # Páginas de la aplicación
│   │   │   ├── store/         # Estado global
│   │   │   └── utils/         # Utilidades frontend
│   │   ├── biome.json         # Configuración Biome
│   │   ├── rspack.config.ts   # Configuración Rspack
│   │   └── package.json
│   └── backend/           # API servidor con tRPC
│       ├── src/
│       │   ├── db/            # Configuración base de datos
│       │   ├── sockets/       # WebSockets para colaboración
│       │   ├── trpc/          # Configuración tRPC
│       │   │   └── routers/   # Rutas de la API
│       │   │       ├── connect.ts  # Conexiones DB
│       │   │       ├── query.ts    # Ejecución consultas
│       │   │       └── schema.ts   # Esquemas de datos
│       │   └── utils/         # Utilidades backend
│       └── package.json
├── libs/
│   ├── helpers/           # Funciones auxiliares compartidas
│   └── types/             # Tipos TypeScript compartidos
├── docker/
│   └── docker-compose.yml # Configuración servicios
├── scripts/               # Scripts de automatización
└── package.json           # Configuración raíz del monorepo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Bun** >= 1.0.0 ([Instalar Bun](https://bun.sh/docs/installation))
- **Node.js** >= 18 (alternativo a Bun)
- **Git**

### Instalación Rápida

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd sql-collaborator
```

2. **Instalar dependencias del monorepo:**
```bash
bun install
```

3. **Instalar dependencias de las aplicaciones:**
```bash
# Frontend
cd apps/frontend
bun install

# Backend
cd ../backend
bun install
```

### Configuración de Desarrollo

1. **Configurar Git hooks (recomendado):**
```bash
bun run precommit
```

2. **Variables de entorno:**
```bash
# Crear archivos .env en cada aplicación
cp apps/frontend/.env.example apps/frontend/.env
cp apps/backend/.env.example apps/backend/.env
```

## 🚀 Ejecución del Proyecto

### Desarrollo Local

**Opción 1: Ejecutar servicios individualmente**

```bash
# Terminal 1 - Frontend (Puerto 3000)
cd apps/frontend
bun run dev

# Terminal 2 - Backend (Puerto 4000)
cd apps/backend
bun run dev
```

**Opción 2: Usando Docker (Recomendado)**

```bash
# Desde la raíz del proyecto
docker-compose -f docker/docker-compose.yml up -d
```

### Construcción para Producción

```bash
# Frontend
cd apps/frontend
bun run build

# Backend
cd apps/backend
bun run build
```

## 📜 Scripts Disponibles

### Scripts Globales (Raíz)
- `bun run precommit` - Instala hooks de Git
- `bun run biome:check` - Verifica código con Biome
- `bun run biome:format` - Formatea código automáticamente
- `bun run commit` - Crear commit convencional

### Scripts Frontend
- `bun run dev` - Servidor de desarrollo
- `bun run build` - Construcción para producción
- `bun run preview` - Vista previa de la build
- `bun run check` - Verificación y formato con Biome
- `bun run format` - Formateo de código

### Scripts Backend
- `bun run dev` - Servidor de desarrollo con hot reload
- `bun run start` - Servidor de producción
- `bun run build` - Transpilación TypeScript

## 🎯 Funcionalidades Principales

### Editor SQL Colaborativo
- **Editor Monaco** integrado con sintaxis SQL
- **Colaboración en tiempo real** mediante WebSockets
- **Autocompletado** inteligente de SQL
- **Resaltado de sintaxis** avanzado

### Gestión de Conexiones
- **Múltiples bases de datos** (MySQL, PostgreSQL, SQLite)
- **Conexiones seguras** con validación
- **Pool de conexiones** optimizado

### Ejecución de Consultas
- **Ejecución segura** de consultas SQL
- **Resultados en tiempo real**
- **Historial de consultas**
- **Exportación de resultados** (CSV, JSON)

### Colaboración
- **Salas de trabajo** compartidas
- **Cursores colaborativos** en tiempo real
- **Chat integrado** entre colaboradores
- **Control de versiones** de consultas

## 🔧 Configuración para Desarrollo Colaborativo

### Commits Convencionales
El proyecto utiliza **Commitizen** para commits estandarizados:

```bash
# En lugar de git commit, usar:
bun run commit
```

Tipos de commit disponibles:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Documentación
- `style`: Cambios de formato
- `refactor`: Refactorización
- `test`: Tests
- `chore`: Tareas de mantenimiento

### Linting y Formateo
- **Biome** configurado para linting y formateo automático
- **Husky** ejecuta verificaciones pre-commit
- **Configuración unificada** entre frontend y backend

### Flujo de Trabajo Recomendado

1. **Crear rama feature:**
```bash
git checkout -b feature/nueva-funcionalidad
```

2. **Desarrollar con verificaciones automáticas:**
```bash
bun run biome:check  # Antes de commit
```

3. **Commit con formato estándar:**
```bash
bun run commit
```

4. **Push y Pull Request:**
```bash
git push origin feature/nueva-funcionalidad
```

## 🧪 Testing y Calidad

### Verificación de Código
```bash
# Verificar todo el proyecto
bun run biome:check

# Solo frontend
cd apps/frontend && bun run check

# Formatear automáticamente
bun run biome:format
```

### Construcción de Verificación
```bash
# Verificar que la build funciona
cd apps/frontend && bun run build
cd apps/backend && bun run build
```

## 🚢 Despliegue

### Usando Docker

1. **Construir imágenes:**
```bash
docker-compose -f docker/docker-compose.yml build
```

2. **Desplegar:**
```bash
docker-compose -f docker/docker-compose.yml up -d
```

### Despliegue Manual

1. **Preparar archivos:**
```bash
bun run build  # En ambas apps
```

2. **Variables de entorno de producción:**
```bash
NODE_ENV=production
DATABASE_URL=<url-base-datos>
JWT_SECRET=<secret-jwt>
```

## 🤝 Contribución

1. **Fork** del repositorio
2. **Crear rama** feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** cambios (`bun run commit`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir Pull Request**

### Guías de Contribución
- Seguir **commits convencionales**
- **Tests** para nuevas funcionalidades
- **Documentación** actualizada
- **Code review** requerido

## 📚 Recursos Adicionales

### Documentación Técnica
- [React 19 Documentation](https://react.dev/)
- [Rspack Documentation](https://rspack.dev/)
- [tRPC Documentation](https://trpc.io/)
- [Bun Documentation](https://bun.sh/docs)
- [Biome Documentation](https://biomejs.dev/)

### Herramientas Recomendadas
- **VS Code** con extensiones:
  - Biome
  - TypeScript
  - Tailwind CSS IntelliSense
- **Postman** para testing de APIs
- **Docker Desktop** para contenedores

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**SQL Collaborator** - Desarrollado con ❤️ para la comunidad de desarrolladores