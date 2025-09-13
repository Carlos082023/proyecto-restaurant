// Menú móvil
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Efecto de revelado al hacer scroll
  const revealElements = document.querySelectorAll(
    ".feature-card, .about-image, .about-text"
  );

  function revealOnScroll() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Ejecutar una vez al cargar
});

// Script para la navegación del menú
document.addEventListener("DOMContentLoaded", function () {
  // Navegación sticky para el menú
  const menuNav = document.querySelector(".menu-nav");
  const menuNavOffset = menuNav.offsetTop;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset >= menuNavOffset) {
      menuNav.classList.add("sticky");
    } else {
      menuNav.classList.remove("sticky");
    }
  });

  // Navegación suave para los enlaces del menú
  document.querySelectorAll(".menu-nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const menuNavHeight = document.querySelector(".menu-nav").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          menuNavHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Actualizar enlace activo al desplazarse
  const sections = document.querySelectorAll(".menu-category");
  const navLinks = document.querySelectorAll(".menu-nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

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
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Funcionalidad de pestañas de locales
  const locationTabs = document.querySelectorAll(".location-tab");
  const locationContents = document.querySelectorAll(".location-content");

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
      // Remover clase active de todas las pestañas y contenidos
      locationTabs.forEach((t) => t.classList.remove("active"));
      locationContents.forEach((c) => c.classList.remove("active"));

      // Activar la pestaña y contenido correspondiente
      document
        .querySelector(`.location-tab[data-location="${hash}"]`)
        .classList.add("active");
      document.getElementById(`${hash}-content`).classList.add("active");

      // Desplazarse suavemente hacia la sección
      setTimeout(() => {
        document
          .querySelector(".locations-container")
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Animación de aparición de artículos al hacer scroll
  const newsArticles = document.querySelectorAll(".news-article");

  function checkVisibility() {
    newsArticles.forEach((article) => {
      const rect = article.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        article.classList.add("visible");
      }
    });
  }

  // Verificar visibilidad al cargar y al hacer scroll
  checkVisibility();
  window.addEventListener("scroll", checkVisibility);

  // Manejo del formulario de newsletter
  const newsletterForm = document.querySelector(".newsletter-form");
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
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

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
            // Mostrar mensaje de éxito
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
