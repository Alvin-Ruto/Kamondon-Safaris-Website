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

function packageCardMarkup(pkg) {
  const detailsId = `package-details-${pkg.id}`;
  const href = pkg.detailHref || pkg.enquiryHref || "contact.html#enquiry";
  if (!pkg.detailHref && !pkg.enquiryHref) console.warn(`Package "${pkg.id}" has no action route; using the enquiry page.`);
  return `<article class="flip-card reveal" data-package-card>
    <div class="flip-card-inner">
      <div class="package-card flip-card-face flip-card-front">
        <img src="${pkg.image}" alt="${pkg.imageAlt}" loading="lazy" decoding="async">
        <div class="card-body"><div class="meta-row"><span>${pkg.duration}</span><span>${pkg.location}</span></div><h3>${pkg.title}</h3><p>${pkg.summary}</p>
          <div class="trust-strip">${pkg.tags.map((tag, i) => `<span class="badge ${i ? "orange" : "dark"}">${tag}</span>`).join("")}</div>
          <div class="card-actions"><span class="price">${pkg.priceLabel}</span><a class="btn" data-card-action="true" href="${href}">${pkg.detailLabel}</a></div>
          <button class="flip-toggle" data-card-action="true" type="button" aria-expanded="false" aria-controls="${detailsId}">Show package details</button><span class="tap-hint" aria-hidden="true">Tap for details</span>
        </div>
      </div>
      <div class="package-card flip-card-face flip-card-back" id="${detailsId}" aria-hidden="true" inert>
        <div class="card-body package-card-back-content"><p class="eyebrow">${pkg.duration} · ${pkg.location}</p><h3>${pkg.reverse.heading}</h3><p class="package-intro">${pkg.reverse.introduction}</p><ul class="compact-list">${pkg.reverse.features.map(item => `<li>${item}</li>`).join("")}</ul>${pkg.reverse.note ? `<p class="package-note">${pkg.reverse.note}</p>` : ""}${pkg.reverse.exclusions ? `<p class="package-note">${pkg.reverse.exclusions}</p>` : ""}
          <span class="price">${pkg.priceLabel}</span><div class="card-actions package-card-back-actions"><a class="btn alt" data-card-action="true" href="${href}">${pkg.detailLabel}</a><a class="btn subtle" data-card-action="true" href="${pkg.enquiryHref}">Send enquiry</a></div>
          <button class="flip-toggle back-toggle" data-card-action="true" type="button" aria-expanded="true" aria-controls="${detailsId}">Show package summary</button>
        </div>
      </div>
    </div>
  </article>`;
}

function setupPackageCards() {
  const data = window.KAMONDON_DATA;
  document.querySelectorAll("[data-featured-packages]").forEach((grid) => {
    const retained = grid.querySelector("[data-retained-package]");
    grid.insertAdjacentHTML("afterbegin", data.packages.map(packageCardMarkup).join(""));
    if (retained) retained.remove();
  });
  const sections = document.querySelectorAll("[data-package-section]");
  sections.forEach((section) => {
    const cards = [...section.querySelectorAll("[data-package-card]")];
    let active = null, visible = false, timer, sequenceRuns = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setFlipped = (card, value) => {
      if (value && active && active !== card) setFlipped(active, false);
      card.classList.toggle("is-flipped", value);
      card.querySelector(".flip-card-front").toggleAttribute("inert", value);
      card.querySelector(".flip-card-front").setAttribute("aria-hidden", String(value));
      card.querySelector(".flip-card-back").toggleAttribute("inert", !value);
      card.querySelector(".flip-card-back").setAttribute("aria-hidden", String(!value));
      card.querySelectorAll(".flip-toggle").forEach(b => b.setAttribute("aria-expanded", String(value)));
      active = value ? card : (active === card ? null : active);
    };
    cards.forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest('a, button, input, select, textarea, [role="button"], [data-card-action="true"]') && !e.target.closest(".flip-toggle")) { clearTimeout(timer); return; }
        if (e.target.closest(".flip-toggle") || matchMedia("(hover: none), (pointer: coarse)").matches) { clearTimeout(timer); setFlipped(card, !card.classList.contains("is-flipped")); }
      });
      if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
        card.addEventListener("pointerenter", () => { clearTimeout(timer); setFlipped(card, true); });
        card.addEventListener("pointerleave", () => { setFlipped(card, false); schedule(); });
      }
      card.addEventListener("keydown", e => { if (e.key === "Escape") setFlipped(card, false); });
    });
    const schedule = () => {
      clearTimeout(timer);
      if (reduced || !visible || sequenceRuns >= 2 || document.visibilityState !== "visible") return;
      timer = setTimeout(async () => {
        sequenceRuns++;
        for (const card of cards) {
          if (!visible || document.visibilityState !== "visible" || section.matches(":hover") || section.contains(document.activeElement)) break;
          setFlipped(card, true); await new Promise(r => timer = setTimeout(r, 2400)); setFlipped(card, false); await new Promise(r => timer = setTimeout(r, 450));
        }
        timer = setTimeout(schedule, 12000);
      }, 4000);
    };
    new IntersectionObserver(([entry]) => { visible = entry.intersectionRatio >= .55; if (!visible) cards.forEach(c => setFlipped(c, false)); schedule(); }, { threshold: [.1, .55, .8] }).observe(section);
    ["pointerdown", "pointermove", "touchstart", "keydown", "focusin"].forEach(type => section.addEventListener(type, schedule, { passive: true }));
  });
}

function setupEnquiryPreselection() {
  const select = document.querySelector("#package-type");
  if (!select) return;
  const packages = {
    "maasai-mara-safari": "3 Days Maasai Mara Safari",
    "nairobi-circuit-day-trip": "Nairobi Circuit Day Trip",
    "diani-beach-holiday": "Diani Beach Holiday"
  };
  Object.entries(packages).forEach(([value, label]) => {
    const option = document.createElement("option"); option.value = value; option.textContent = label; select.append(option);
  });
  const requested = new URLSearchParams(location.search).get("package");
  if (requested && packages[requested]) select.value = requested;
}

function galleryItemMarkup(item, duplicate = false) {
  return `<button class="motion-gallery-item gallery-item" type="button" ${duplicate ? 'tabindex="-1" aria-hidden="true"' : ""} data-category="${item.category}"><img src="${item.src}" alt="${duplicate ? "" : item.alt}" loading="lazy" decoding="async"><span class="gallery-caption">${item.caption}</span></button>`;
}

function setupMotionGalleries() {
  const data = window.KAMONDON_DATA;
  document.querySelectorAll("[data-motion-gallery]").forEach(gallery => {
    const requested = gallery.dataset.limit ? data.gallery.slice(0, Number(gallery.dataset.limit)) : data.gallery;
    const rows = [...gallery.querySelectorAll("[data-gallery-row]")];
    rows.forEach((row, index) => {
      const items = requested.filter((_, i) => i % rows.length === index);
      row.innerHTML = items.concat(items).map((item, i) => galleryItemMarkup(item, i >= items.length)).join("");
    });
    let x = 0, last = performance.now(), dragging = false, startX = 0, baseX = 0, velocity = 0, visible = false, pauseUntil = 0, moved = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render = () => rows.forEach((row, i) => { const width = row.scrollWidth / 2; const offset = width ? ((x * [0.86, 1, 0.92][i] % width) + width) % width : 0; row.style.transform = `translate3d(${-offset}px,0,0)`; row.style.setProperty("--gallery-parallax", `${Math.max(-14, Math.min(14, velocity * .35))}px`); });
    function tick(now) { const dt = Math.min((now - last) / 1000, .05); last = now; if (visible && !reduced && !dragging && now > pauseUntil && document.visibilityState === "visible" && !gallery.matches(":hover") && !gallery.contains(document.activeElement)) { x += 16 * dt; velocity *= .9; render(); } requestAnimationFrame(tick); }
    gallery.addEventListener("pointerdown", e => { if (e.button !== 0) return; dragging = true; moved = false; startX = e.clientX; baseX = x; velocity = 0; gallery.setPointerCapture(e.pointerId); gallery.classList.add("is-dragging"); });
    gallery.addEventListener("pointermove", e => { if (!dragging) return; const delta = e.clientX - startX; if (Math.abs(delta) > 6) moved = true; velocity = -delta - (x - baseX); x = baseX - delta; render(); });
    const end = () => { if (!dragging) return; dragging = false; gallery.classList.remove("is-dragging"); pauseUntil = performance.now() + 2200; };
    gallery.addEventListener("pointerup", end); gallery.addEventListener("pointercancel", end);
    gallery.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopImmediatePropagation(); moved = false; } }, true);
    new IntersectionObserver(([entry]) => visible = entry.intersectionRatio >= .35, { threshold: [.1, .35] }).observe(gallery);
    requestAnimationFrame(tick);
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
  setupPackageCards();
  setupMotionGalleries();
  setupReveal();
  setupCounters();
  setupFaqs();
  setupStepForms();
  setupFilterChips();
  setupLightbox();
  setupForms();
  setupEnquiryPreselection();
  setupScrollButtons();
  handleScroll();
});
