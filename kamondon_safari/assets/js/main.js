const body = document.body;
const header = document.querySelector(".site-header");
const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const progressBar = document.querySelector(".progress-bar");

function setActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-cta a").forEach((link) => {
    const href = link.getAttribute("href");
    const target = href === "./" ? "index.html" : href;
    link.classList.toggle("active", target === current || (current === "" && target === "index.html"));
  });
}

function handleScroll() {
  const scrollTop = window.scrollY;
  if (header) {
    header.classList.toggle("scrolled", scrollTop > 28);
  }

  if (progressBar) {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }

  document.querySelectorAll("[data-parallax]").forEach((node) => {
    const speed = Number(node.dataset.parallax || 0.12);
    node.style.transform = `translateY(${scrollTop * speed}px)`;
  });
}

function setupMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector(".material-symbols-outlined").textContent = isOpen ? "close" : "menu";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector(".material-symbols-outlined").textContent = "menu";
    });
  });
}

function setupHeroCarousel() {
  document.querySelectorAll("[data-hero-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll(".hero-slide")];
    if (slides.length < 2) return;

    let index = 0;
    slides[0].classList.add("active");

    window.setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 5200);
  });
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  nodes.forEach((node) => observer.observe(node));
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const node = entry.target;
        const end = Number(node.dataset.count);
        const suffix = node.dataset.suffix || "";
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(end * eased);
          node.textContent = `${value}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(node);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((node) => observer.observe(node));
}

function setupFaqs() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const list = button.closest(".faq-list");
      const isActive = item.classList.contains("active");

      if (list) {
        list.querySelectorAll(".faq-item").forEach((faq) => {
          faq.classList.remove("active");
          const faqButton = faq.querySelector(".faq-question");
          if (faqButton) faqButton.setAttribute("aria-expanded", "false");
        });
      }

      if (!isActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function setupStepForms() {
  document.querySelectorAll("[data-step-form]").forEach((form) => {
    const steps = [...form.querySelectorAll(".form-step")];
    const dots = [...form.querySelectorAll(".step-dot")];
    if (!steps.length) return;

    let index = 0;

    function showStep(nextIndex) {
      index = Math.max(0, Math.min(nextIndex, steps.length - 1));
      steps.forEach((step, stepIndex) => step.classList.toggle("active", stepIndex === index));
      dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
      form.dataset.currentStep = String(index + 1);
    }

    form.addEventListener("click", (event) => {
      const action = event.target.closest("[data-step-action]");
      if (!action) return;

      event.preventDefault();
      if (action.dataset.stepAction === "next") showStep(index + 1);
      if (action.dataset.stepAction === "prev") showStep(index - 1);
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => showStep(dotIndex));
    });

    showStep(0);
  });
}

function setupFilterChips() {
  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      const group = select.closest("[data-filter-group]");
      if (!group) return;

      const filters = [...group.querySelectorAll("[data-filter]")];
      const cards = [...document.querySelectorAll("[data-card-tags]")];
      const active = filters.map((filter) => filter.value).filter(Boolean);

      cards.forEach((card) => {
        const tags = (card.dataset.cardTags || "").split(" ");
        const visible = active.every((filter) => tags.includes(filter));
        card.style.display = visible ? "" : "none";
      });
    });
  });
}

function setupLightbox() {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  const image = lightbox.querySelector("img");
  const close = lightbox.querySelector("button");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;

      image.src = img.src;
      image.alt = img.alt;
      lightbox.classList.add("active");
      close.focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    image.removeAttribute("src");
  }

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function setupForms() {
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Thank you. Kamondon Safaris will follow up with you shortly.";
      }
      form.reset();
    });
  });
}

function setupScrollButtons() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll);

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setupMenu();
  setupHeroCarousel();
  setupReveal();
  setupCounters();
  setupFaqs();
  setupStepForms();
  setupFilterChips();
  setupLightbox();
  setupForms();
  setupScrollButtons();
  handleScroll();
});
