<![CDATA[<div align="center">

# 🏠 David Villalba — Decorador & Interiorista

**Estudio de Interiorismo en Utrera, Sevilla**

Sitio web profesional para el estudio de diseño de interiores David Villalba.  
Diseño elegante, moderno y totalmente responsive.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

</div>

---

## 📋 Descripción

Página web corporativa para **David Villalba Decorador**, un estudio de interiorismo ubicado en Utrera (Sevilla). El sitio presenta el portafolio de proyectos realizados, los servicios ofrecidos, la filosofía de trabajo y un formulario de contacto integrado con WhatsApp.

### ✨ Características principales

- 🎨 **Diseño premium** — Estética sofisticada con tipografías serif (Cormorant Garamond) y sans-serif (Inter)
- 📱 **100% Responsive** — Adaptado a móvil, tablet y escritorio con menú hamburguesa
- 🖼️ **Hero con slider** — Carrusel de imágenes a pantalla completa con transiciones suaves
- 📂 **Galería de proyectos** — Grid de 12 proyectos con efecto hover overlay
- 🔄 **Navegación dinámica** — Navbar transparente que cambia al hacer scroll
- 📞 **Integración WhatsApp** — Botón flotante y enlace directo en la sección de contacto
- ⚖️ **Páginas legales** — Aviso legal y política de privacidad incluidos
- 🔍 **SEO optimizado** — Meta tags, Open Graph y estructura semántica HTML5
- 🎭 **Animaciones** — Efectos de aparición al scroll (reveal) y microanimaciones CSS

---

## 🗂️ Estructura del Proyecto

```
D.VILLALBA/
├── index.html                  # Página principal (SPA)
├── aviso-legal.html            # Aviso legal
├── politica-privacidad.html    # Política de privacidad
├── styles.css                  # Estilos globales
├── script.js                   # Lógica y animaciones
├── README.md
└── assets/
    └── img/
        ├── hero/               # Imágenes del carrusel hero
        ├── projects/           # Imágenes de los proyectos
        ├── exposicion/         # Imágenes de la sala de exposición
        ├── estudio/            # Imágenes del estudio
        ├── logo.png            # Logo principal (fondo transparente)
        └── favicon.png         # Favicon
```

---

## 🏗️ Secciones de la Web

| Sección | Descripción |
|---------|-------------|
| **Hero** | Slider a pantalla completa con título animado y CTA |
| **Filosofía** | Presentación del estudio con imagen destacada |
| **Servicios** | Panel interactivo con pestañas (Residencial, Comercial, Llaves en Mano) |
| **Proyectos** | Grid responsive de 12 proyectos con overlay |
| **Metodología** | Proceso de trabajo en 4 pasos con línea de tiempo |
| **Exposición** | Galería de la sala de exposición con lightbox |
| **Contacto** | Datos de contacto, mapa y enlace a WhatsApp |

---

## 🚀 Instalación y Uso

### Requisitos previos

No se requieren dependencias ni frameworks. El proyecto funciona con HTML, CSS y JavaScript puros.

### Ejecución local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/david-villalba-web.git
   cd david-villalba-web
   ```

2. **Iniciar un servidor local** (cualquiera de estas opciones):
   ```bash
   # Con Python 3
   python3 -m http.server 8080

   # Con Node.js (npx)
   npx serve .

   # Con VS Code
   # Instalar la extensión "Live Server" y hacer clic en "Go Live"
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:8080
   ```

---

## 🎨 Personalización

### Colores

Los colores se definen como variables CSS en `styles.css` (`:root`):

```css
:root {
  --bg:           #FAF8F5;    /* Fondo principal */
  --text:         #2C2C2C;    /* Texto */
  --accent:       #8B7355;    /* Marrón dorado (botones, acentos) */
  --accent-light: #A88B6A;    /* Marrón claro */
  --white:        #FFFFFF;
}
```

### Logo

El tamaño del logo se controla en `styles.css`:

| Ubicación | Selector CSS | Propiedad |
|-----------|-------------|-----------|
| Header (navbar) | `.navbar__logo-img` | `height: 100px` |
| Footer | `.footer__logo-img` | `height: 100px` |

### Tipografías

- **Títulos:** Cormorant Garamond (serif)
- **Cuerpo:** Inter (sans-serif)

Cargadas desde Google Fonts en el `<head>` de cada HTML.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|-----------|-----|
| **HTML5** | Estructura semántica |
| **CSS3** | Estilos, animaciones, grid, flexbox |
| **JavaScript ES6+** | Slider, scroll reveal, navbar dinámica |
| **Google Fonts** | Tipografías Cormorant Garamond + Inter |
| **Font Awesome** | Iconos (opcional) |

---

## 📱 Responsive Design

El sitio incluye breakpoints en:

| Breakpoint | Dispositivo |
|-----------|-------------|
| `≤ 768px` | Móvil — Menú hamburguesa, grid a 1 columna |
| `≤ 1024px` | Tablet — Grid a 2 columnas |
| `> 1024px` | Escritorio — Layout completo a 3 columnas |

---

## 📧 Contacto

- **Estudio:** David Villalba Decorador
- **Ubicación:** Utrera, Sevilla
- **Web:** [david-villalba.com](https://david-villalba.com)

---

## 📄 Licencia

Todos los derechos reservados © 2025 David Villalba Decorador.  
Este proyecto y su contenido (imágenes, textos, diseño) son propiedad exclusiva de David Villalba.

---

<div align="center">

**Hecho con ❤️ en Sevilla**

</div>
]]>
