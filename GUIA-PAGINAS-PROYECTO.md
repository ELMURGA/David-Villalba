# Páginas de Detalle de Proyecto — Guía de Configuración

## ¿Qué hemos hecho?

Antes, al hacer clic en un proyecto del home se abría un **lightbox** (galería emergente).  
Ahora, cada proyecto tiene **su propia página** (`proyecto.html?slug=nombre-del-proyecto`) con:

- **Hero** a pantalla completa con la imagen principal y el título
- **Galería** de imágenes en grid de 3 columnas (1 en móvil)
- **Lightbox** — al hacer clic en cualquier foto, se abre en grande con flechas para navegar
- **Botón "Volver a Proyectos"** para regresar al home
- **CTA** para solicitar presupuesto

Todo se gestiona desde **Sanity Studio** — tu cliente controla qué imagen aparece en el home y qué imágenes aparecen en la página de detalle.

---

## Archivos Nuevos

| Archivo | Qué es |
|---------|--------|
| `proyecto.html` | La página de detalle del proyecto |
| `proyecto.js` | El script que carga los datos desde Sanity |

## Archivos Modificados

| Archivo | Qué cambió |
|---------|------------|
| `studio/schemas/project.js` | Se añadió el campo **"URL del Proyecto"** (slug) |
| `script.js` | Las tarjetas del home ahora enlazan a la página de detalle |
| `styles.css` | Estilos para el hero, la galería y el responsive de la nueva página |

---

## Configuración Paso a Paso

### Paso 1: Desplegar el Schema de Sanity

El schema de Sanity tiene un campo nuevo (`slug`). Hay que desplegarlo para que aparezca en Sanity Studio.

```bash
cd /Users/usuario/Documents/WEBS/TRABAJO/D.VILLALBA/studio
npx sanity deploy
```

> Si te pide un nombre de estudio, usa el mismo que ya tenías.

---

### Paso 2: Generar los Slugs de los Proyectos Existentes

Una vez desplegado, abre Sanity Studio en el navegador:

1. Ve a **Sanity Studio** (la URL que te da después del deploy, ej: `https://tu-estudio.sanity.studio`)
2. Abre cada proyecto existente
3. Verás un nuevo campo llamado **"URL del Proyecto"**
4. Haz clic en el botón **"Generate"** que aparece al lado
5. Se generará automáticamente algo como: `la-catalina`, `almazara-club`, etc.
6. Haz clic en **"Publish"** para guardar

> **⚠️ Importante:** Si no generas el slug, ese proyecto seguirá abriendo el lightbox antiguo en vez de la página de detalle.

---

### Paso 3: Subir los Archivos al Servidor

Sube estos archivos al servidor web (donde tengas alojado `david-villalba.com`):

- `proyecto.html` ← NUEVO
- `proyecto.js` ← NUEVO
- `script.js` ← MODIFICADO
- `styles.css` ← MODIFICADO

---

### Paso 4: Verificar que Funciona

1. Abre `david-villalba.com` en el navegador
2. Haz scroll hasta la sección de **Proyectos**
3. Haz clic en cualquier proyecto
4. Debería abrirse la página de detalle con el hero y la galería de fotos
5. Haz clic en una foto → debería abrirse el lightbox
6. Haz clic en **"← Volver a Proyectos"** → debería volver al home

---

## Cómo lo Usa el Cliente

### Crear un Proyecto Nuevo

En Sanity Studio:

1. Crear un nuevo documento tipo **"Proyecto"**
2. Rellenar **Nombre del Proyecto** (ej: "Vivienda Gavidia")
3. Hacer clic en **"Generate"** en el campo **"URL del Proyecto"**
4. Subir la **Foto del Proyecto** — esta se usa como imagen del home Y como hero de la página de detalle
5. Subir fotos en **Galería de Fotos** — estas aparecen en el grid de la página de detalle
6. Rellenar los demás campos (tipo, orden, descripción SEO)
7. **Publish**

### Editar un Proyecto

El cliente puede en cualquier momento:

- **Cambiar la foto principal** → se actualiza en el home y en el hero
- **Añadir/quitar fotos de la galería** → se actualiza automáticamente en la página de detalle
- **Cambiar el nombre** → se actualiza en todas partes (pero si cambia el nombre, debe regenerar el slug)
- **Eliminar un proyecto** → desaparece del home y la página de detalle deja de funcionar

---

## Estructura de URLs

Las páginas de detalle siguen este formato:

```
https://david-villalba.com/proyecto.html?slug=nombre-del-proyecto
```

Ejemplos:
- `proyecto.html?slug=la-catalina`
- `proyecto.html?slug=almazara-club`
- `proyecto.html?slug=vivienda-gavidia`

El slug se genera automáticamente desde el nombre del proyecto.
