# Estructura del Proyecto CIVET Web

## Resumen Ejecutivo

CIVET es una aplicación web para una clínica veterinaria que combina un **backend REST API** desarrollado en **Spring Boot** (Java 21) con un **frontend SPA** (Single Page Application) desarrollado en **JavaScript puro** con **jQuery** y **Bootstrap**. La aplicación permite gestionar pacientes, fichas médicas, productos y un carrito de compras.

## Arquitectura General

```
CIVET Web Application
├── Backend (Spring Boot)
│   ├── API REST (/api/*)
│   ├── JPA/Hibernate (ORM)
│   └── Base de Datos MySQL
└── Frontend (SPA Estática)
    ├── MVC en JavaScript
    ├── Bootstrap (UI)
    └── jQuery (DOM Manipulation)
```

### Tecnologías Principales
- **Backend**: Java 21, Spring Boot 3.4.5, Spring Data JPA, Hibernate, MySQL
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), jQuery, Bootstrap 5.3.3
- **Base de Datos**: MySQL 8.0
- **Documentación API**: Swagger/OpenAPI
- **Build Tool**: Maven

## Backend (Spring Boot)

### Estructura de Paquetes
```
src/main/java/com/civet/backend/
├── CivetApplication.java          # Clase principal
├── dto/                          # Data Transfer Objects
├── entity/                       # Entidades JPA
├── repo/                         # Repositories (Spring Data)
└── web/                          # Controladores REST
    ├── CarritoController.java
    ├── FichaController.java
    ├── MedicoController.java
    ├── PacienteController.java
    ├── ProductoController.java
    └── VentaController.java
```

### APIs REST Disponibles
- `GET/POST/PUT/DELETE /api/pacientes` - Gestión de pacientes
- `GET/POST/PUT/DELETE /api/fichas` - Fichas médicas
- `GET/POST/PUT/DELETE /api/productos` - Catálogo de productos
- `GET/POST/PUT/DELETE /api/carrito` - Carrito de compras
- `GET/POST/PUT/DELETE /api/medicos` - Médicos veterinarios
- `GET/POST/PUT/DELETE /api/ventas` - Ventas

### Configuración (application.properties)
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/civetdb
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Dependencias Clave (pom.xml)
- `spring-boot-starter-web` - Web MVC
- `spring-boot-starter-data-jpa` - ORM
- `mysql-connector-j` - Driver MySQL
- `springdoc-openapi-starter-webmvc-ui` - Swagger UI
- `spring-boot-starter-validation` - Validación

## Frontend (SPA Estática)

### Estructura de Archivos
```
src/main/resources/static/
├── index.html                    # Página principal
├── app.js                        # Inicialización y navegación
├── styles.css                    # Estilos personalizados
├── package.json                  # Metadatos (sitio estático)
├── controllers/                  # Controladores JS (MVC)
│   ├── carritoController.js
│   ├── fichaController.js
│   └── pacienteController.js
├── models/                       # Modelos JS (conexión API)
│   ├── carritoModel.js
│   ├── fichaModel.js
│   └── pacienteModel.js
├── views/                        # Vistas JS (renderizado)
│   ├── carritoView.js
│   ├── fichaView.js
│   └── pacienteView.js
├── images/                       # Imágenes estáticas
└── docs/                         # Documentación
```

### Arquitectura MVC en Frontend
- **Modelos**: Gestionan datos y comunicación con APIs REST
- **Vistas**: Renderizan HTML dinámicamente
- **Controladores**: Coordinan modelos y vistas, manejan eventos

### Módulos de la Aplicación
1. **Inicio** - Página de bienvenida
2. **Quiénes Somos** - Información de la clínica
3. **Pacientes** - Gestión de mascotas
4. **Ficha Paciente** - Registros médicos
5. **Contacto** - Información de contacto
6. **Tienda/Carrito** - E-commerce básico

### Navegación SPA
- Navegación sin recarga de página usando `data-module` attributes
- Transiciones suaves con jQuery fadeIn/fadeOut
- Estado activo en navegación

## Base de Datos

### Esquema (schema-mysql.sql)
```sql
-- Base de datos: civet
-- Tablas principales:
-- - productos (id, nombre, descripcion, precio, imagen)
-- - pacientes (id, nombre, especie, raza, edad, imagen)
-- - fichas (id, paciente_id, medico_id, fecha, diagnostico, tratamiento)
-- - carrito_items (id, producto_id, cantidad, precio_unitario)
-- - medicos (id, nombre, especialidad, telefono, email)
-- - ventas (id, fecha, total, items...)
```

### Configuración JPA
- `ddl-auto: update` - Actualización automática del esquema
- Dialecto: MySQL8Dialect
- Logging SQL activado para desarrollo

## Cómo Ejecutar el Proyecto

### Prerrequisitos
- Java 21+
- Maven 3.6+
- MySQL 8.0+
- Navegador web moderno

### Pasos de Ejecución
1. **Configurar Base de Datos**:
   ```bash
   # Crear base de datos y ejecutar scripts SQL
   mysql -u root -p < src/main/resources/sql/schema-mysql.sql
   mysql -u root -p < src/main/resources/sql/data-mysql.sql
   ```

2. **Ejecutar la Aplicación**:
   ```bash
   cd /ruta/al/proyecto
   mvn spring-boot:run
   ```

3. **Acceder a la Aplicación**:
   - Frontend: http://localhost:8080
   - API Docs (Swagger): http://localhost:8080/swagger-ui.html

### Desarrollo
- **Backend**: Modificar clases Java, ejecutar `mvn compile`
- **Frontend**: Editar archivos en `static/`, recargar navegador
- **Hot Reload**: DevTools activado para cambios en backend

## Puntos de Integración

### Frontend ↔ Backend
- AJAX calls usando jQuery `$.ajax()` o `fetch()`
- Endpoints REST consumidos por modelos JS
- CORS habilitado en controladores (`@CrossOrigin`)

### Backend ↔ Base de Datos
- Spring Data JPA repositories
- Hibernate como ORM
- Conexión JDBC a MySQL

## Consideraciones de Seguridad
- Sin autenticación implementada (mencionado en descripción)
- CORS habilitado globalmente
- Validación básica con Bean Validation
- Sin encriptación de contraseñas

## Próximas Mejoras Sugeridas
- Implementar autenticación/autorización
- Agregar tests unitarios e integración
- Implementar paginación en APIs
- Mejorar manejo de errores
- Agregar logging estructurado
- Implementar CI/CD pipeline</content>
<parameter name="filePath">c:\Users\Raulacate\Desktop\Jeny Manuel Belgrano\Proyectos\classic-version\estructura_civerweb.md