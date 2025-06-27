# app-web-2
## Base de datos

Se utilizó MongoDB para la base de datos.

Para cargar los datos iniciales, se incluyen los archivos JSON exportados desde MongoDB Compass en la carpeta `/database`.

Para restaurar la base de datos:

1. Crear una base llamada `appweb` en MongoDB.
2. Importar las colecciones desde los archivos JSON usando MongoDB Compass:
   - Abrir MongoDB Compass.
   - Seleccionar la base `appweb`.
   - Usar la opción de importación en cada colección (`productos`).
   - Seleccionar el archivo JSON correspondiente, por ejemplo, `productos.json`.
 ## 🧰 Stack utilizado

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Base de datos:** MongoDB (usando MongoDB Compass para la gestión)
- **Gestor de dependencias:** npm
- **Librerías y herramientas externas:**
  - `dotenv` (manejo de variables de entorno)
  - `mongoose` (ORM para MongoDB)
  - `nodemon` (desarrollo con recarga automática)
  - `cors`, `express.json`, entre otros.
