# NicaDistrib BI — Manual de Despliegue en cPanel / Apache

**Destino de Servidor:** `ingemaxwellchacon.com`  
**Usuario cPanel:** `ingefknc`  
**Directorio Destino:** `/home/ingefknc/public_html/Portafolio/NicaDistrib-BI`  
**Base de Datos MySQL:** `ingefknc_nicadistrib_dw`

---

## 1. Creación de la Base de Datos en cPanel

1. Iniciar sesión en cPanel (`https://business174.web-hosting.com/cpanel` o `http://ingemaxwellchacon.com/cpanel`).
2. Ir a la sección **Bases de datos MySQL**:
   - Crear base de datos: `ingefknc_nicadistrib_dw`.
   - Crear usuario: `ingefknc_nicabi` con contraseña asignada.
   - Vincular usuario a la base de datos y otorgar **TODOS LOS PRIVILEGIOS**.
3. Abrir **phpMyAdmin**, seleccionar la base de datos `ingefknc_nicadistrib_dw` e importar el archivo `database/schema.sql`.

---

## 2. Compilación y Despliegue Web

1. Compilar los archivos estáticos listos para producción:
   ```bash
   npm run build
   ```
2. La carpeta resultante `dist/` contiene los archivos optimizados (`index.html`, `assets/*.js`, `assets/*.css`).
3. Vía **Administrador de Archivos de cPanel** o FTP:
   - Crear la carpeta `/home/ingefknc/public_html/Portafolio/NicaDistrib-BI/`.
   - Subir el contenido de la carpeta `dist/` a este directorio.
   - Subir el archivo `apache/.htaccess` a `/home/ingefknc/public_html/Portafolio/NicaDistrib-BI/.htaccess`.

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
