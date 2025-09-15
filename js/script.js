document.addEventListener("DOMContentLoaded", function () {
  // Variables globales
  const header = document.querySelector(".header");
  const menuNav = document.querySelector(".menu-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link, .menu-nav-link");
  const allAnchors = document.querySelectorAll('a[href^="#"]');
  const revealElements = document.querySelectorAll(".feature-card, .about-image, .about-text, .news-article");
  const locationTabs = document.querySelectorAll(".location-tab");
  const locationContents = document.querySelectorAll(".location-content");
  const newsletterForm = document.querySelector(".newsletter-form");
  const contactForm = document.getElementById("contactForm");

  // Funciones de utilidad
  function smoothScroll(targetId, offsetAdjustment = 0) {
    if (targetId === "#") return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + 
                            window.pageYOffset - 
                            headerHeight - 
                            offsetAdjustment;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  }

  function setActiveLink() {
    const sections = document.querySelectorAll(".menu-category");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  function checkElementVisibility() {
    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 150) {
        element.classList.add("active");
      }
    });
  }

  // Menú móvil
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (nav) nav.classList.remove("active");
      if (menuToggle) menuToggle.classList.remove("active");
    });
  });

  // Scroll suave para enlaces internos
  allAnchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      
      // Para enlaces del menú de categorías, añadir offset del menú sticky
      const isMenuNavLink = this.classList.contains("menu-nav-link");
      const offsetAdjustment = isMenuNavLink && menuNav ? menuNav.offsetHeight : 0;
      
      smoothScroll(targetId, offsetAdjustment);
    });
  });

  // Efecto de revelado al hacer scroll
  window.addEventListener("scroll", function () {
    checkElementVisibility();
    
    // Navegación sticky para el menú de categorías
    if (menuNav) {
      const menuNavOffset = menuNav.offsetTop;
      if (window.pageYOffset >= menuNavOffset) {
        menuNav.classList.add("sticky");
      } else {
        menuNav.classList.remove("sticky");
      }
    }
    
    // Actualizar enlace activo en menú de categorías
    setActiveLink();
  });

  // Ejecutar una vez al cargar
  checkElementVisibility();

  // Funcionalidad de pestañas de locales
  locationTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const location = this.getAttribute("data-location");

      // Remover clase active de todas las pestañas y contenidos
      locationTabs.forEach((t) => t.classList.remove("active"));
      locationContents.forEach((c) => c.classList.remove("active"));

      // Agregar clase active a la pestaña clickeada
      this.classList.add("active");

      // Mostrar el contenido correspondiente
      document.getElementById(`${location}-content`).classList.add("active");
    });
  });

  // Verificar si hay un hash en la URL para mostrar un local específico
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (["palermo", "sanisidro", "madero"].includes(hash)) {
      // Activar la pestaña y contenido correspondiente
      const tab = document.querySelector(`.location-tab[data-location="${hash}"]`);
      if (tab) {
        tab.classList.add("active");
        document.getElementById(`${hash}-content`).classList.add("active");

        // Desplazarse suavemente hacia la sección después de un breve delay
        setTimeout(() => {
          const locationsContainer = document.querySelector(".locations-container");
          if (locationsContainer) {
            locationsContainer.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }

  // Manejo del formulario de newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      // Aquí iría la lógica para enviar el email a tu servidor
      alert(
        `¡Gracias por suscribirte con el email: ${email}! Te mantendremos informado sobre nuestras novedades.`
      );
      this.reset();
    });
  }

  // Manejo del formulario de contacto
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Mostrar indicador de carga
      const submitBtn = this.querySelector(".btn-submit");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      // Recoger datos del formulario
      const formData = new FormData(this);

      // Enviar por AJAX
      fetch("envio/envio.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
            contactForm.reset();
          } else {
            alert("Error: " + data.message);
          }
        })
        .catch((error) => {
          alert("Error de conexión. Por favor, inténtelo de nuevo.");
        })
        .finally(() => {
          // Restaurar botón
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});

// Escuchar cuando se carga el header
document.addEventListener("componentLoaded", (e) => {
  if (e.detail.component.includes("header.html")) {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuToggle.classList.toggle("active");
      });
    }
  }
});
