# MaxwellDistrib BI — Manual de Despliegue en cPanel / Apache

**Destino de Servidor:** `ingemaxwellchacon.com`  
**Directorio Destino:** `public_html/Portafolio/NicaDistrib-BI/`  
**Base de Datos MySQL:** `nicadistrib_dw` (o SQLite para modo demo)

---

## 1. Creación de la Base de Datos en cPanel

1. Iniciar sesión en cPanel.
2. Ir a la sección **Bases de datos MySQL**:
   - Crear base de datos para el Data Warehouse.
   - Crear usuario con permisos asignados.
   - Vincular usuario a la base de datos y otorgar **TODOS LOS PRIVILEGIOS**.
3. Abrir **phpMyAdmin**, seleccionar la base de datos e importar el archivo `database/schema.sql`.
   *(Alternativa Demo: Usar el archivo SQLite `database/maxwelldistrib_demo.sqlite` sin necesidad de configurar MySQL).*

---

## 2. Compilación y Despliegue Web

1. Compilar los archivos estáticos listos para producción:
   ```bash
   npm run build
   ```
2. La carpeta resultante `dist/` contiene los archivos optimizados (`index.html`, `assets/*.js`, `assets/*.css`).
3. Vía **Administrador de Archivos de cPanel** o FTP:
   - Crear la carpeta `public_html/Portafolio/NicaDistrib-BI/`.
   - Subir el contenido de la carpeta `dist/` a este directorio.
   - Subir el archivo `apache/.htaccess` a `public_html/Portafolio/NicaDistrib-BI/.htaccess`.

---

## 3. Configuración de Reglas mod_rewrite (.htaccess)

Para que rutas como `/Portafolio/NicaDistrib-BI/dashboard` o `/Portafolio/NicaDistrib-BI/inventario` no arrojen error **404 Not Found** al recargar la página, el archivo `.htaccess` redirige las peticiones que no correspondan a archivos físicos hacia `index.html`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /Portafolio/NicaDistrib-BI/
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /Portafolio/NicaDistrib-BI/index.html [L]
</IfModule>
```
