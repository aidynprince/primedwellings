import "./index.css";
import { firm, services } from "./data.js";
import {
  aboutPage,
  contactPage,
  homePage,
  legalPage,
  notFoundPage,
  propertiesPage,
  propertyPage,
  servicesPage,
} from "./pages.js";
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
  if (canonical) canonical.setAttribute("href", "https://www.primedwellings.example" + path);

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
    address: { "@type": "PostalAddress", addressCountry: "GH", addressLocality: "Accra" },
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
    photoPlateMarkup();

  setMeta(page, route.path);
  markActiveNav(route.path);
  wireInteractions();

  if (route.anchor) {
    const target = document.getElementById(route.anchor);
    if (target) {
      window.requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" })
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
      <div class="border border-rule bg-paper p-2 shadow-[0_28px_60px_-20px_rgba(12,34,26,0.45)]">
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

  const canHover = window.matchMedia("(hover: hover) and (min-width: 1024px)").matches;
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
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
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

      const optionalEmail = form.querySelector('input[type="email"]:not([required])');
      if (optionalEmail && optionalEmail.value.trim()) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(optionalEmail.value.trim());
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
      form.querySelectorAll("input, select, textarea, button[type=submit]").forEach((el) => {
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
      })
    );
  }

  wireReveals();
  wireForms();
  wirePropertyFilter();
  wirePhotoPlate();
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
