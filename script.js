/* ============================================
   DAVID VILLALBA DECORADOR — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // SANITY CMS CONFIG
  // ============================================
  // ⚠️ REEMPLAZA estos valores con los de tu proyecto Sanity
  const SANITY_PROJECT_ID = 'bsgsllv5';
  const SANITY_DATASET = 'production';
  const SANITY_API_VERSION = '2024-01-01';

  // ---- Dynamic Projects Loader ----
  const loadProjects = async () => {
    const grid = document.getElementById('projectsGrid');
    const loading = document.getElementById('projectsLoading');
    if (!grid) return;

    let projects = null;

    // 1) Intentar cargar desde Sanity CMS
    if (SANITY_PROJECT_ID !== 'TU_PROJECT_ID') {
      try {
        const query = encodeURIComponent('*[_type == "project"] | order(order asc) { title, type, "imageUrl": image.asset->url, "galleryUrls": gallery[].asset->url, alt, objectPosition, order }');
        const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.result && data.result.length > 0) {
            projects = data.result.map(p => {
              const gallery = [p.imageUrl];
              if (p.galleryUrls && p.galleryUrls.length > 0) {
                p.galleryUrls.forEach(url => {
                  if (url && !gallery.includes(url)) gallery.push(url);
                });
              }
              return {
                title: p.title,
                type: p.type,
                image: p.imageUrl,
                gallery: gallery,
                alt: p.alt || `${p.title} proyecto`,
                objectPosition: p.objectPosition || null
              };
            });
          }
        }
      } catch (err) {
        console.warn('Sanity CMS no disponible, cargando proyectos locales...', err);
      }
    }

    // 2) Fallback: cargar desde projects.json local
    if (!projects) {
      try {
        const response = await fetch('projects.json');
        if (response.ok) {
          projects = await response.json();
        }
      } catch (err) {
        console.error('Error cargando projects.json:', err);
      }
    }

    // 3) Renderizar proyectos
    if (projects && projects.length > 0) {
      renderProjects(grid, projects);
    } else {
      // Si todo falla, mostrar mensaje
      grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-light);">No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.</p>';
    }

    // Ocultar skeleton
    if (loading) loading.style.display = 'none';
  };

  const renderProjects = (container, projects) => {
    // Limpiar loading skeleton
    const loading = container.querySelector('.projects__loading');
    if (loading) loading.remove();

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';

      const img = document.createElement('img');
      img.src = project.image;
      img.alt = project.alt || `${project.title} proyecto`;
      img.loading = 'lazy';
      if (project.objectPosition) {
        img.style.objectPosition = project.objectPosition;
      }

      const overlay = document.createElement('div');
      overlay.className = 'project-card__overlay';

      const title = document.createElement('h3');
      title.className = 'project-card__title';
      title.textContent = project.title;

      const type = document.createElement('span');
      type.className = 'project-card__type';
      type.textContent = project.type;

      overlay.appendChild(title);
      overlay.appendChild(type);
      card.appendChild(img);
      card.appendChild(overlay);
      container.appendChild(card);

      // Lightbox: abrir galería al hacer clic
      const galleryImages = project.gallery && project.gallery.length > 0
        ? project.gallery
        : [project.image];
      card.addEventListener('click', () => {
        openLightbox(galleryImages, 0, project.title);
      });
    });

    // Re-initialize reveal observer for new cards
    const newCards = container.querySelectorAll('.project-card.reveal');
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    newCards.forEach(el => cardObserver.observe(el));
  };

  // Load projects immediately
  loadProjects().then(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
          window.scrollTo({
            top: target.offsetTop - navOffset,
            behavior: 'auto'
          });
        }
      }, 100);
    }
  });

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('inicio');

  const handleNavbarScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const highlightNav = () => {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Hero Slider ----
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  let currentSlide = 0;
  let slideInterval;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const startSlider = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const stopSlider = () => {
    clearInterval(slideInterval);
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopSlider();
      goToSlide(parseInt(dot.dataset.slide));
      startSlider();
    });
  });

  startSlider();

  // ---- Services Tabs ----
  const tabs = document.querySelectorAll('.services__tab');
  const panels = document.querySelectorAll('.services__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = `tab-${tab.dataset.tab}`;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Smooth Scroll for All # Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
        const targetPosition = target.offsetTop - navOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Contact Form Handler ----
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const projectType = formData.get('projectType');
    const message = formData.get('message');

    // Build WhatsApp message
    let waMessage = `Hola, soy ${name}.`;
    if (projectType) {
      const typeLabels = {
        reforma_parcial: 'Reforma parcial',
        reforma_integral: 'Reforma integral',
        vivienda_nueva: 'Construcción nueva vivienda',
        local: 'Diseño de local / negocio',
        decoracion: 'Decoración y amueblamiento',
        otro: 'Otro'
      };
      waMessage += ` Estoy interesado/a en: ${typeLabels[projectType] || projectType}.`;
    }
    if (message) {
      waMessage += ` ${message}`;
    }
    if (phone) {
      waMessage += ` Mi teléfono: ${phone}`;
    }

    const waUrl = `https://wa.me/34646201038?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');

    // Visual feedback
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = '¡Mensaje Enviado! ✓';
    btn.style.background = '#5C6B4F';
    btn.style.borderColor = '#5C6B4F';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      contactForm.reset();
    }, 3000);
  });

  // ---- Parallax Effect on Hero (subtle) ----
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero__content');
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
  }, { passive: true });

  // ============================================
  // LIGHTBOX / GALERÍA DE PROYECTO
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

    // Single image mode — hide arrows & counter
    if (images.length <= 1) {
      lightbox.classList.add('lightbox--single');
    } else {
      lightbox.classList.remove('lightbox--single');
    }

    // Set title
    lightboxTitle.textContent = title || '';

    // Show lightbox
    showLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Clear image after animation
    setTimeout(() => {
      lightboxImage.src = '';
      lightboxImage.classList.remove('loaded');
    }, 350);
  }

  function showLightboxImage() {
    const src = lightboxImages[lightboxCurrentIndex];
    lightboxImage.classList.remove('loaded');

    // Preload
    const preload = new Image();
    preload.onload = () => {
      lightboxImage.src = src;
      lightboxImage.alt = `Imagen ${lightboxCurrentIndex + 1}`;
      // Trigger loaded after a tiny delay for smooth transition
      requestAnimationFrame(() => {
        lightboxImage.classList.add('loaded');
      });
    };
    preload.src = src;

    // Update counter
    lightboxCounter.textContent = `${lightboxCurrentIndex + 1} / ${lightboxImages.length}`;

    // Preload next image
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

  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', lightboxGoNext);
  lightboxPrev.addEventListener('click', lightboxGoPrev);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxGoNext();
    if (e.key === 'ArrowLeft') lightboxGoPrev();
  });

  // Make openLightbox available globally (used by renderProjects)
  window.openLightbox = openLightbox;

});
