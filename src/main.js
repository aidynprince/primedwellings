import "./index.css";
import { firm, properties, services } from "./data.js";
import { aboutPage } from "./pages/about.js";
import { servicesPage } from "./pages/services.js";
import { contactPage } from "./pages/contact.js";
import { legalPage } from "./pages/legal.js";
import { notFoundPage } from "./pages/not-found.js";
import { propertyPage } from "./pages/property.js";
import { propertiesPage } from "./pages/properties.js";
import { homePage } from "./pages.js";
import { footer, formStyles, header } from "./ui.js";

const app = document.getElementById("app");

/* ----------------------------- Routing ----------------------------- */

function parseHash() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [pathAndQuery, anchor] = raw.split("#");
  const [path, queryString] = pathAndQuery.split("?");
  return {
    path: path || "/",
    query: new URLSearchParams(queryString || ""),
    anchor: anchor || "",
  };
}

function resolve(route) {
  const { path, query } = route;
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) return homePage();
  if (segments[0] === "about") return aboutPage();
  if (segments[0] === "services") return servicesPage();
  if (segments[0] === "properties") {
    return segments[1] ? propertyPage(segments[1]) : propertiesPage(query);
  }
  if (segments[0] === "contact") return contactPage();
  if (segments[0] === "privacy") return legalPage("privacy");
  if (segments[0] === "terms") return legalPage("terms");
  if (segments[0] === "disclaimer") return legalPage("disclaimer");
  return notFoundPage();
}

function setMeta(page, path) {
  document.title = page.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", page.desc);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical)
    canonical.setAttribute("href", "https://www.primedwellings.example" + path);

  let ld = document.getElementById("ld-json");
  if (!ld) {
    ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "ld-json";
    document.head.appendChild(ld);
  }
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: firm.name,
    description: page.desc,
    areaServed: "Ghana",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GH",
      addressLocality: "Accra",
    },
    knowsAbout: services.map((s) => s.title),
  });
}

function markActiveNav(path) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("data-nav").replace("#", "");
    const active = href === path || (href !== "/" && path.startsWith(href));
    link.classList.toggle("text-registry", active);
    link.classList.toggle("text-ink/80", !active);
    const underline = link.querySelector(".nav-underline");
    if (underline) underline.classList.toggle("scale-x-0", !active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

let lastPath = "";

function render() {
  const route = parseHash();
  const page = resolve(route);

  app.innerHTML =
    formStyles +
    header() +
    `<main id="main">${page.html}</main>` +
    footer() +
    photoPlateMarkup() +
    quickViewModalMarkup();

  setMeta(page, route.path);
  markActiveNav(route.path);
  wireInteractions();

  if (route.anchor) {
    const target = document.getElementById(route.anchor);
    if (target) {
      window.requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
      lastPath = route.path;
      return;
    }
  }

  if (route.path !== lastPath) {
    window.scrollTo({ top: 0, behavior: "auto" });
    lastPath = route.path;
  }
}

/* --------------------------- Photo plate --------------------------- */

function photoPlateMarkup() {
  return `
    <div id="photo-plate" class="photo-plate fixed z-30 hidden lg:block pointer-events-none w-[286px]">
      <div class="border border-rule bg-paper p-2 shadow-[0_28px_60px_-20px_rgba(7,21,52,0.45)]">
        <img id="photo-plate-img" src="" alt="" class="w-full h-[352px] object-cover" />
        <p class="mt-2 px-1 pb-1 label-sm text-muted" id="photo-plate-caption"></p>
      </div>
    </div>`;
}

function wirePhotoPlate() {
  const plate = document.getElementById("photo-plate");
  const img = document.getElementById("photo-plate-img");
  const caption = document.getElementById("photo-plate-caption");
  if (!plate || !img) return;

  const canHover = window.matchMedia(
    "(hover: hover) and (min-width: 1024px)",
  ).matches;
  if (!canHover) return;

  const rows = document.querySelectorAll(".register-row[data-photo]");

  rows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      img.src = row.getAttribute("data-photo");
      const ref = row.querySelector(".register-ref");
      caption.textContent = ref ? ref.textContent.trim() : "";
      plate.classList.add("is-on");
    });
    row.addEventListener("mouseleave", () => plate.classList.remove("is-on"));
  });

  if (window.__plateMoveWired) return;
  window.__plateMoveWired = true;

  document.addEventListener("mousemove", (e) => {
    const el = document.getElementById("photo-plate");
    if (!el || !el.classList.contains("is-on")) return;
    const w = 286;
    const h = 400;
    let x = e.clientX + 28;
    let y = e.clientY - h / 2;
    if (x + w > window.innerWidth - 16) x = e.clientX - w - 28;
    y = Math.max(16, Math.min(y, window.innerHeight - h - 16));
    el.style.left = x + "px";
    el.style.top = y + "px";
  });
}

/* ----------------------------- Reveals ----------------------------- */

function wireReveals() {
  const items = document.querySelectorAll(".reveal, .rule-draw");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  items.forEach((el) => observer.observe(el));
}

/* ------------------------------ Forms ------------------------------ */

function wireForms() {
  document.querySelectorAll(".enquiry-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const honeypot = form.querySelector('input[name="company"]');
      if (honeypot && honeypot.value) return; // spam submission: silently drop

      let valid = true;

      form.querySelectorAll("[required]").forEach((field) => {
        const wrap = field.closest("div");
        const error = wrap ? wrap.querySelector(".error-msg") : null;
        let ok = field.value.trim().length > 0;

        if (ok && field.type === "email") {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }
        if (ok && field.type === "tel") {
          ok = field.value.replace(/[^\d]/g, "").length >= 7;
        }

        field.classList.toggle("field-error", !ok);
        field.setAttribute("aria-invalid", ok ? "false" : "true");
        if (error) error.classList.toggle("hidden", ok);
        if (!ok) valid = false;
      });

      const optionalEmail = form.querySelector(
        'input[type="email"]:not([required])',
      );
      if (optionalEmail && optionalEmail.value.trim()) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          optionalEmail.value.trim(),
        );
        const wrap = optionalEmail.closest("div");
        const error = wrap ? wrap.querySelector(".error-msg") : null;
        optionalEmail.classList.toggle("field-error", !ok);
        if (error) error.classList.toggle("hidden", ok);
        if (!ok) valid = false;
      }

      if (!valid) {
        const firstError = form.querySelector(".field-error");
        if (firstError) firstError.focus();
        return;
      }

      const success = form.querySelector(".form-success");
      form
        .querySelectorAll("input, select, textarea, button[type=submit]")
        .forEach((el) => {
          if (el.name !== "company") el.disabled = true;
        });
      if (success) {
        success.classList.remove("hidden");
        success.setAttribute("tabindex", "-1");
        success.focus({ preventScroll: true });
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => {
        field.classList.remove("field-error");
        const wrap = field.closest("div");
        const error = wrap ? wrap.querySelector(".error-msg") : null;
        if (error) error.classList.add("hidden");
      });
    });
  });
}

function wirePropertyFilter() {
  const form = document.getElementById("property-filter");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((value, key) => {
      if (String(value).trim()) params.set(key, String(value).trim());
    });
    const qs = params.toString();
    window.location.hash = "#/properties" + (qs ? "?" + qs : "");
  });

  const reset = document.getElementById("filter-reset");
  if (reset) {
    reset.addEventListener("click", () => {
      window.location.hash = "#/properties";
    });
  }
}

function wireCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const id = root.getAttribute("data-carousel");
    const track = root.querySelector(`[data-carousel-track="${id}"]`);
    const prev = root.querySelector(`[data-carousel-prev="${id}"]`);
    const next = root.querySelector(`[data-carousel-next="${id}"]`);
    const currentCounter = root.querySelector(`[data-carousel-current="${id}"]`);
    const dotsContainer = root.querySelector(`[data-carousel-dots="${id}"]`);
    const swipeHint = root.querySelector(`[data-swipe-hint="${id}"]`);
    if (!track) return;

    const cards = track.querySelectorAll(".property-tile, .property-card");
    if (!cards.length) return;

    const step = () => {
      const card = cards[0];
      const style = getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap) || 20;
      return card.getBoundingClientRect().width + gap;
    };

    const update = () => {
      const st = step();
      const currentIdx = Math.round(track.scrollLeft / st);
      const clampedIdx = Math.max(0, Math.min(currentIdx, cards.length - 1));

      if (currentCounter) {
        currentCounter.textContent = String(clampedIdx + 1).padStart(2, "0");
      }

      if (dotsContainer) {
        dotsContainer.querySelectorAll("[data-dot-index]").forEach((dot, idx) => {
          const isActive = idx === clampedIdx;
          dot.className = `carousel-dot ${
            isActive ? "w-7 bg-laterite" : "w-2 bg-rule hover:bg-muted"
          }`;
        });
      }

      if (prev && next) {
        const max = track.scrollWidth - track.clientWidth - 4;
        prev.disabled = track.scrollLeft <= 4;
        next.disabled = track.scrollLeft >= max;
      }
    };

    if (prev) {
      prev.addEventListener("click", () => {
        track.scrollBy({ left: -step(), behavior: "smooth" });
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        track.scrollBy({ left: step(), behavior: "smooth" });
      });
    }

    if (dotsContainer) {
      dotsContainer.querySelectorAll("[data-dot-index]").forEach((dot) => {
        dot.addEventListener("click", () => {
          const idx = parseInt(dot.getAttribute("data-dot-index"), 10);
          track.scrollTo({ left: idx * step(), behavior: "smooth" });
        });
      });
    }

    // Touch and scroll events
    track.addEventListener(
      "scroll",
      () => {
        update();
        if (swipeHint) swipeHint.classList.add("hidden");
      },
      { passive: true },
    );
    window.addEventListener("resize", update);

    // Mouse drag-to-scroll swipe support on desktop
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    track.addEventListener("mousedown", (e) => {
      if (e.target.closest("button, a")) return;
      isDown = true;
      isDragging = false;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.classList.add("cursor-grabbing");
    });

    track.addEventListener("mouseleave", () => {
      isDown = false;
      track.classList.remove("cursor-grabbing");
    });

    track.addEventListener("mouseup", () => {
      isDown = false;
      track.classList.remove("cursor-grabbing");
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.4;
      if (Math.abs(walk) > 4) isDragging = true;
      track.scrollLeft = scrollLeft - walk;
    });

    // Prevent link click when completing a drag swipe
    track.addEventListener(
      "click",
      (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          isDragging = false;
        }
      },
      true,
    );

    update();
  });
}

/* --------------------------- Quick View Modal --------------------------- */

function quickViewModalMarkup() {
  return `
    <div id="quick-view-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 sm:p-6 bg-registry-deep/85 backdrop-blur-md transition-all duration-300 opacity-0" role="dialog" aria-modal="true" aria-hidden="true">
      <div id="quick-view-backdrop" class="absolute inset-0"></div>
      <div id="quick-view-card" class="relative z-10 w-full max-w-3xl bg-paper-2 shadow-2xl border border-rule overflow-hidden transform scale-95 transition-transform duration-300 flex flex-col max-h-[92vh]">
        <button id="quick-view-close" type="button" class="absolute top-4 right-4 z-30 w-10 h-10 bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg" aria-label="Close quick preview">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div id="quick-view-content" class="overflow-y-auto"></div>
      </div>
    </div>`;
}

function renderQuickViewCard(p) {
  const currentIndex = properties.findIndex((x) => x.slug === p.slug);
  const prevP = properties[(currentIndex - 1 + properties.length) % properties.length];
  const nextP = properties[(currentIndex + 1) % properties.length];

  return `
    <div class="grid md:grid-cols-12">
      <!-- Main Tile / Image Hero -->
      <div class="relative md:col-span-6 h-[260px] md:h-auto min-h-[260px] overflow-hidden bg-registry-deep">
        <img src="${p.image}" alt="${p.imageAlt}" class="w-full h-full object-cover" />
        <div class="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>
        <div class="absolute inset-x-0 bottom-0 h-2/5  from-registry-deep to-transparent pointer-events-none"></div>
        <div class="absolute inset-0 plan-grid opacity-15 pointer-events-none"></div>

        <!-- Corner Price Plaque - wraps cleanly on narrow screens -->
        <div class="absolute bottom-4 left-4 right-4 z-10 max-w-[280px]">
          <span class="flex items-start gap-1.5 px-2.5 py-1.5 bg-paper text-registry font-bold text-[0.68rem] sm:text-xs leading-[1.35] tracking-tight uppercase text-left shadow-sm border border-white/80 [overflow-wrap:anywhere]">
            <span class="w-1.5 h-1.5 bg-laterite mt-1 shrink-0"></span>
            <span class="min-w-0">${p.price}</span>
          </span>
        </div>

        <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span class="px-2.5 py-0.5 text-[0.625rem] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md text-paper border border-white/30">
            ${p.type}
          </span>
          <span class="text-[0.625rem] font-semibold text-paper/85 font-mono bg-black/40 px-2 py-0.5 border border-white/10">${p.ref}</span>
        </div>
      </div>

      <!-- Content Details -->
      <div class="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <h3 class="font-display text-registry text-xl sm:text-2xl font-semibold leading-tight tracking-[-0.02em]">
            ${p.title}
          </h3>
          <p class="mt-2 flex items-center gap-1.5 text-xs text-muted font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-laterite shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${p.location} &middot; ${p.region}
          </p>

          <!-- Specs Chips -->
          <div class="mt-4 flex flex-wrap gap-2">
            ${p.beds ? `<span class="px-2.5 py-1 text-xs font-semibold bg-registry/5 border border-rule text-registry">${p.beds} Beds &middot; ${p.baths} Baths</span>` : ""}
            ${p.size ? `<span class="px-2.5 py-1 text-xs font-semibold bg-registry/5 border border-rule text-registry">${p.size}</span>` : ""}
          </div>

          <!-- Description -->
          <p class="mt-4 text-xs sm:text-sm leading-relaxed text-ink/80 line-clamp-4">
            ${p.description}
          </p>

          <!-- Key Highlights -->
          <div class="mt-4 border-t border-rule pt-3">
            <p class="label-sm text-laterite mb-2">Key Highlights</p>
            <ul class="space-y-1 text-xs text-ink/75">
              ${p.features.slice(0, 3).map((f) => `<li class="flex items-center gap-1.5"><span class="text-laterite">&bull;</span> <span class="truncate">${f}</span></li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- Swipe Stepper & Direct Buttons -->
        <div class="mt-6 pt-4 border-t border-rule space-y-3">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-1.5">
              <button type="button" class="quick-modal-step px-3 py-1.5 border border-rule hover:bg-registry hover:text-white text-xs font-semibold text-registry transition-all flex items-center gap-1 active:scale-95" data-quickslug="${prevP.slug}">
                <span>&larr;</span> Prev
              </button>
              <button type="button" class="quick-modal-step px-3 py-1.5 border border-rule hover:bg-registry hover:text-white text-xs font-semibold text-registry transition-all flex items-center gap-1 active:scale-95" data-quickslug="${nextP.slug}">
                Next <span>&rarr;</span>
              </button>
            </div>
            <span class="label-sm text-muted tnum">${currentIndex + 1} of ${properties.length}</span>
          </div>

          <div class="flex gap-2">
            <a href="#/properties/${p.slug}" class="btn btn-primary flex-1 !py-2.5 !text-xs text-center" id="quick-view-full-btn">
              View Full Details &rarr;
            </a>
            <a href="#/properties/${p.slug}#property-enquiry" class="btn btn-ghost !py-2.5 !px-4 !text-xs" id="quick-view-enquire-btn">
              Enquire
            </a>
          </div>
        </div>
      </div>
    </div>`;
}

function wireQuickView() {
  const modal = document.getElementById("quick-view-modal");
  const card = document.getElementById("quick-view-card");
  const content = document.getElementById("quick-view-content");
  const closeBtn = document.getElementById("quick-view-close");
  const backdrop = document.getElementById("quick-view-backdrop");
  if (!modal || !content) return;

  const openModal = (slug) => {
    const p = properties.find((x) => x.slug === slug);
    if (!p) return;
    content.innerHTML = renderQuickViewCard(p);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      if (card) {
        card.classList.remove("scale-95");
        card.classList.add("scale-100");
      }
    });

    content.querySelectorAll(".quick-modal-step").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextSlug = btn.getAttribute("data-quickslug");
        if (nextSlug) openModal(nextSlug);
      });
    });

    content.querySelectorAll("#quick-view-full-btn, #quick-view-enquire-btn").forEach((link) => {
      link.addEventListener("click", () => {
        closeModal();
      });
    });
  };

  const closeModal = () => {
    modal.classList.add("opacity-0");
    if (card) {
      card.classList.remove("scale-100");
      card.classList.add("scale-95");
    }
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      content.innerHTML = "";
    }, 200);
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  if (backdrop) backdrop.onclick = closeModal;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Touch swipe support inside the modal card
  let touchStartX = 0;
  let touchEndX = 0;

  content.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  content.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        const nextBtn = content.querySelector('.quick-modal-step[data-quickslug]:last-child');
        const prevBtn = content.querySelector('.quick-modal-step[data-quickslug]:first-child');
        if (diff < 0 && nextBtn) {
          openModal(nextBtn.getAttribute("data-quickslug"));
        } else if (diff > 0 && prevBtn) {
          openModal(prevBtn.getAttribute("data-quickslug"));
        }
      }
    },
    { passive: true },
  );

  document.querySelectorAll("[data-quickview]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const slug = btn.getAttribute("data-quickview");
      if (slug) openModal(slug);
    });
  });
}

/* --------------------------- Photo gallery --------------------------- */

function wireGalleries() {
  document.querySelectorAll("[data-gallery]").forEach((root) => {
    const stage = root.querySelector("[data-gallery-stage]");
    const imgs = Array.from(root.querySelectorAll("[data-gallery-img]"));
    const captionEl = root.querySelector("[data-gallery-caption]");
    const countEl = root.querySelector("[data-gallery-count]");
    const toggleBtn = root.querySelector("[data-gallery-toggle]");
    const thumbs = Array.from(root.querySelectorAll("[data-gallery-thumb]"));
    if (!stage || imgs.length < 2) return;

    const captions = imgs.map(
      (img) => img.getAttribute("data-caption") || "",
    );

    const interval = parseInt(root.getAttribute("data-gallery-interval") || "10000", 10);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = 0;
    let playing = !reducedMotion;
    let timer = null;

    const show = (n) => {
      index = (n + imgs.length) % imgs.length;
      imgs.forEach((img, i) => {
        const active = i === index;
        img.classList.toggle("is-active", active);
        img.classList.toggle("opacity-0", !active);
        img.classList.toggle("pointer-events-none", !active);
      });
      thumbs.forEach((t, i) => t.classList.toggle("is-active", i === index));
      if (captionEl && captions[index]) captionEl.textContent = captions[index];
      if (countEl)
        countEl.textContent = `${String(index + 1).padStart(2, "0")} / ${String(imgs.length).padStart(2, "0")}`;
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      stop();
      if (!playing) return;
      timer = setInterval(() => show(index + 1), interval);
    };

    const setPlaying = (on) => {
      playing = on;
      if (toggleBtn) {
        toggleBtn.setAttribute("data-playing", String(on));
        toggleBtn.setAttribute("aria-label", on ? "Pause slideshow" : "Play slideshow");
        toggleBtn.querySelector(".gallery-icon-pause")?.classList.toggle("hidden", !on);
        toggleBtn.querySelector(".gallery-icon-play")?.classList.toggle("hidden", on);
      }
      on ? start() : stop();
    };

    const go = (n) => {
      show(n);
      start(); // reset the 10s timer after manual navigation
    };

    root.querySelector("[data-gallery-prev]")?.addEventListener("click", (e) => {
      e.preventDefault();
      go(index - 1);
    });
    root.querySelector("[data-gallery-next]")?.addEventListener("click", (e) => {
      e.preventDefault();
      go(index + 1);
    });
    thumbs.forEach((t) =>
      t.addEventListener("click", () => go(parseInt(t.getAttribute("data-gallery-thumb"), 10))),
    );
    toggleBtn?.addEventListener("click", () => setPlaying(!playing));

    // Keyboard control when the stage is focused
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      }
    });

    // Touch swipe on the stage
    let touchX = null;
    stage.addEventListener(
      "touchstart",
      (e) => {
        touchX = e.changedTouches[0].clientX;
      },
      { passive: true },
    );
    stage.addEventListener(
      "touchend",
      (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        touchX = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      },
      { passive: true },
    );

    // Pause auto-advance while hovering/focusing, resume after
    stage.addEventListener("mouseenter", stop);
    stage.addEventListener("mouseleave", () => playing && start());
    stage.addEventListener("focusin", stop);
    stage.addEventListener("focusout", () => playing && start());
    document.addEventListener("visibilitychange", () => {
      document.hidden ? stop() : playing && start();
    });

    show(0);
    setPlaying(playing);
  });
}

/* --------------------------- Interactions --------------------------- */

function wireInteractions() {
  const toggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("hidden") === false;
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileNav.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
      }),
    );
  }

  wireReveals();
  wireForms();
  wirePropertyFilter();
  wirePhotoPlate();
  wireCarousels();
  wireGalleries();
  wireQuickView();
}

/* ------------------------------- Boot ------------------------------- */

function onHashChange() {
  const raw = window.location.hash.replace(/^#/, "");

  // In-page anchors (e.g. #main) must not be treated as routes.
  if (raw && !raw.startsWith("/")) {
    const el = document.getElementById(raw);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  render();
}

window.addEventListener("hashchange", onHashChange);
render();
