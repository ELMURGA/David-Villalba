/* ============================================
   DAVID VILLALBA — Página de Detalle de Proyecto
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // SANITY CMS CONFIG
    // ============================================
    const SANITY_PROJECT_ID = 'bsgsllv5';
    const SANITY_DATASET = 'production';
    const SANITY_API_VERSION = '2024-01-01';

    // ============================================
    // GET SLUG FROM URL
    // ============================================
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        window.location.href = 'index.html#proyectos';
        return;
    }

    // ============================================
    // LOAD PROJECT FROM SANITY
    // ============================================
    const loadProject = async () => {
        const heroImage = document.getElementById('projectHeroImage');
        const titleEl = document.getElementById('projectTitle');
        const typeEl = document.getElementById('projectType');
        const galleryGrid = document.getElementById('projectGalleryGrid');

        try {
            const query = encodeURIComponent(
                `*[_type == "project" && slug.current == "${slug}"][0] {
          title,
          type,
          "imageUrl": image.asset->url,
          "galleryUrls": gallery[].asset->url,
          alt,
          slug
        }`
            );
            const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error('Sanity API error');

            const data = await response.json();
            const project = data.result;

            if (!project) {
                // Project not found
                titleEl.textContent = 'Proyecto no encontrado';
                galleryGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-light); padding: 2rem;">Este proyecto no existe o ha sido eliminado.</p>';
                return;
            }

            // ---- Update SEO ----
            document.title = `${project.title} — David Villalba Decorador`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.content = `${project.title} — Proyecto de ${project.type || 'interiorismo'} por David Villalba Decorador en Sevilla.`;

            // ---- Render Hero ----
            heroImage.src = project.imageUrl;
            heroImage.alt = project.alt || `${project.title} proyecto`;
            titleEl.textContent = project.title;
            typeEl.textContent = project.type || '';

            // ---- Build gallery images array ----
            const allImages = [];
            if (project.imageUrl) allImages.push(project.imageUrl);
            if (project.galleryUrls && project.galleryUrls.length > 0) {
                project.galleryUrls.forEach(imgUrl => {
                    if (imgUrl && !allImages.includes(imgUrl)) allImages.push(imgUrl);
                });
            }

            // ---- Render Gallery Grid ----
            renderGallery(galleryGrid, allImages, project.title);

        } catch (err) {
            console.error('Error loading project:', err);
            titleEl.textContent = 'Error al cargar';
            galleryGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-light); padding: 2rem;">No se pudo cargar el proyecto. Inténtalo de nuevo más tarde.</p>';
        }
    };

    // ============================================
    // RENDER GALLERY
    // ============================================
    const renderGallery = (container, images, projectTitle) => {
        // Remove loading skeleton
        const loading = container.querySelector('.project-gallery__loading');
        if (loading) loading.remove();

        images.forEach((imgUrl, index) => {
            const item = document.createElement('div');
            item.className = 'project-gallery__item reveal';

            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = `${projectTitle} — foto ${index + 1}`;
            img.loading = index < 6 ? 'eager' : 'lazy';

            item.appendChild(img);
            container.appendChild(item);

            // Open lightbox on click
            item.addEventListener('click', () => {
                openLightbox(images, index, projectTitle);
            });
        });

        // Initialize reveal animations for gallery items
        const revealItems = container.querySelectorAll('.project-gallery__item.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });
        revealItems.forEach(el => observer.observe(el));
    };

    // ============================================
    // LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let lightboxImages = [];
    let lightboxCurrentIndex = 0;

    function openLightbox(images, startIndex, title) {
        lightboxImages = images;
        lightboxCurrentIndex = startIndex || 0;

        if (images.length <= 1) {
            lightbox.classList.add('lightbox--single');
        } else {
            lightbox.classList.remove('lightbox--single');
        }

        lightboxTitle.textContent = title || '';
        showLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImage.src = '';
            lightboxImage.classList.remove('loaded');
        }, 350);
    }

    function showLightboxImage() {
        const src = lightboxImages[lightboxCurrentIndex];
        lightboxImage.classList.remove('loaded');

        const preload = new Image();
        preload.onload = () => {
            lightboxImage.src = src;
            lightboxImage.alt = `Imagen ${lightboxCurrentIndex + 1}`;
            requestAnimationFrame(() => {
                lightboxImage.classList.add('loaded');
            });
        };
        preload.src = src;

        lightboxCounter.textContent = `${lightboxCurrentIndex + 1} / ${lightboxImages.length}`;

        // Preload next
        if (lightboxCurrentIndex + 1 < lightboxImages.length) {
            const nextPreload = new Image();
            nextPreload.src = lightboxImages[lightboxCurrentIndex + 1];
        }
    }

    function lightboxGoNext() {
        if (lightboxImages.length <= 1) return;
        lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
        showLightboxImage();
    }

    function lightboxGoPrev() {
        if (lightboxImages.length <= 1) return;
        lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
        showLightboxImage();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', lightboxGoNext);
    lightboxPrev.addEventListener('click', lightboxGoPrev);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lightboxGoNext();
        if (e.key === 'ArrowLeft') lightboxGoPrev();
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
        document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // LOAD PROJECT
    // ============================================
    loadProject();

});
