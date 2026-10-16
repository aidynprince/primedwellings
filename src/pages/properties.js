import {
  about,
  diaspora,
  firm,
  home,
  images,
  legal,
  properties,
  propertyTypes,
  priceBands,
  services,
  whatWeDo,
  whyClients,
} from "../data.js";
import { ctaBand, enquiryForm, pageHead, ph, phDark } from "../ui.js";
import { sectionHead } from "../pages.js";

export function propertyCard(p, inGrid = false) {
  return `
  <article class="property-tile ${inGrid ? "property-grid-tile w-full" : ""} group relative flex flex-col overflow-hidden bg-paper-2 shadow-sm hover:shadow-xl transition-all duration-300 snap-center sm:snap-start shrink-0 select-none border border-rule/50" data-slug="${p.slug}">
    <!-- Primary Click Link: Navigates to full property details -->
    <a href="#/properties/${p.slug}" class="absolute inset-0 z-10" aria-label="View details for ${p.title}">
      <span class="sr-only">View details for ${p.title}</span>
    </a>

    <!-- Picture gets its own clean square box -->
    <div class="relative aspect-square overflow-hidden bg-registry-deep">
      <img
        src="${p.image}"
        alt="${p.imageAlt}"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div class="absolute inset-0 plan-grid opacity-15 pointer-events-none" aria-hidden="true"></div>

      <!-- Badges on the picture -->
      <div class="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[0.625rem] font-bold tracking-widest uppercase bg-white/90 text-registry border border-rule shadow-xs">
          <span class="w-1.5 h-1.5 bg-laterite"></span>
          ${p.type}
        </span>
        <span class="text-[0.625rem] font-semibold tracking-wider text-muted font-mono uppercase bg-white/90 border border-rule px-2 py-0.5 shadow-xs">${p.ref}</span>
      </div>

      <!-- Quick View Action Button -->
      <button
        type="button"
        class="quick-view-btn absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center bg-paper/95 hover:bg-registry text-registry hover:text-paper border border-rule shadow-xs transition-all duration-200 active:scale-95"
        data-quickview="${p.slug}"
        title="Quick preview"
        aria-label="Quick preview of ${p.title}"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>

      <!-- Price plaque on the picture corner -->
      <div class="absolute bottom-3 left-3 right-3 z-20 flex justify-end pointer-events-none">
        <span class="max-w-[70%] flex items-start gap-1.5 px-2.5 py-1.5 bg-paper text-registry font-bold text-[0.68rem] sm:text-[0.75rem] leading-[1.35] tracking-tight uppercase text-left shadow-sm border border-rule [overflow-wrap:anywhere]">
          <span class="w-1.5 h-1.5 bg-laterite mt-1 shrink-0"></span>
          <span class="min-w-0">${p.price}</span>
        </span>
      </div>
    </div>

    <!-- Details below the picture -->
    <div class="relative z-20 flex flex-col flex-1 p-4 sm:p-5 pointer-events-none">
      <h3 class="font-display text-registry text-[1.12rem] sm:text-[1.22rem] leading-[1.25] font-semibold tracking-[-0.02em] line-clamp-2 group-hover:text-laterite transition-colors">
        ${p.title}
      </h3>

      <p class="mt-2 flex items-center gap-1.5 text-xs text-muted font-medium truncate">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="text-laterite shrink-0" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span class="truncate">${p.location}</span>
      </p>

      <div class="mt-3 flex flex-wrap items-center gap-1.5">
        ${
          p.beds
            ? `<span class="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-registry bg-registry/5 border border-rule px-2 py-0.5">
                ${p.beds} Beds &middot; ${p.baths} Baths
              </span>`
            : ""
        }
        ${
          p.size
            ? `<span class="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-muted border border-dashed border-rule px-2 py-0.5 truncate max-w-full">
                ${p.size.split("·")[0].replace("approx. ", "")}
              </span>`
            : ""
        }
      </div>

      <div class="mt-auto pt-4 border-t border-rule-soft flex items-center justify-between text-xs font-semibold text-muted group-hover:text-registry transition-colors">
        <span class="tracking-wider uppercase text-[0.625rem]">View Details</span>
        <span class="transform group-hover:translate-x-1.5 transition-transform duration-200 text-laterite font-bold">&rarr;</span>
      </div>
    </div>
  </article>`;
}

export function propertyCarousel(items, id = "property-carousel") {
  if (!items.length) return "";

  return `
  <div class="property-carousel-wrap relative select-none" data-carousel="${id}">
    <!-- Header with Counter, Swipe Indicator & Navigation -->
    <div class="flex items-center justify-between gap-4 mb-5">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-registry/10 text-registry font-bold label-sm border border-registry/15">
          <span class="w-2 h-2 bg-laterite"></span>
          <span class="tnum" data-carousel-current="${id}">01</span> / ${String(items.length).padStart(2, "0")} Available
        </span>
        
      </div>

      <!-- Mobile Touch Swipe Hint -->
      <div class="sm:hidden flex items-center gap-1.5 text-xs text-laterite font-semibold px-2.5 py-1 bg-laterite/10 border border-laterite/20" data-swipe-hint="${id}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-bounce-x"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
       
      </div>

      <!-- Prev / Next Arrow Navigation -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          data-carousel-prev="${id}"
          aria-label="Previous property"
          class="carousel-nav-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button
          type="button"
          data-carousel-next="${id}"
          aria-label="Next property"
          class="carousel-nav-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Swipe Track -->
    <div
      data-carousel-track="${id}"
      class="property-swipe-track flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none cursor-grab active:cursor-grabbing"
    >
      ${items.map((p) => propertyCard(p, false)).join("")}
    </div>

    <!-- Dot Pagination Indicators -->
    <div class="flex items-center justify-center gap-2 mt-4" data-carousel-dots="${id}">
      ${items
        .map(
          (_, i) => `
        <button
          type="button"
          class="carousel-dot ${i === 0 ? "w-7 bg-laterite" : "w-2 bg-rule hover:bg-muted"}"
          data-dot-index="${i}"
          aria-label="Go to property ${i + 1}"
        ></button>`,
        )
        .join("")}
    </div>
  </div>`;
}

export function propertyGrid(items) {
  if (!items.length) return "";

  return `
  <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    ${items.map((p) => propertyCard(p, true)).join("")}
  </div>`;
}

export function propertiesPage(query) {
  const type = query.get("type") || "";
  const location = query.get("location") || "";
  const band = query.get("band") || "";
  const keyword = (query.get("q") || "").trim().toLowerCase();
  const viewMode = query.get("view") || "swipe"; // 'swipe' or 'grid'

  const locations = Array.from(
    new Set(properties.map((p) => p.location)),
  ).sort();

  const results = properties.filter((p) => {
    if (type && p.type !== type) return false;
    if (location && p.location !== location) return false;
    if (band && p.priceBand !== band) return false;
    if (
      keyword &&
      !(
        p.title.toLowerCase().includes(keyword) ||
        p.location.toLowerCase().includes(keyword) ||
        p.ref.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword)
      )
    )
      return false;
    return true;
  });

  // Category counts
  const countAll = properties.length;
  const countRes = properties.filter((p) => p.type === "Residential").length;
  const countCom = properties.filter((p) => p.type === "Commercial").length;
  const countLand = properties.filter((p) => p.type === "Land").length;

  const makeCategoryUrl = (t) => {
    const params = new URLSearchParams(query);
    if (t) params.set("type", t);
    else params.delete("type");
    const qs = params.toString();
    return `#/properties${qs ? "?" + qs : ""}`;
  };

  const makeViewUrl = (mode) => {
    const params = new URLSearchParams(query);
    params.set("view", mode);
    const qs = params.toString();
    return `#/properties${qs ? "?" + qs : ""}`;
  };

  const filterBar = `
    <div class="space-y-6">
      <!-- Quick Category Filter Buttons -->
      <div class="flex flex-wrap items-center gap-2 pb-1">
        <a href="${makeCategoryUrl("")}" class="px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
          !type
            ? "bg-registry text-paper border-registry shadow-md"
            : "bg-paper-2 text-ink/75 border-rule hover:border-registry hover:text-registry"
        }">
          All Properties (${countAll})
        </a>
        <a href="${makeCategoryUrl("Residential")}" class="px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
          type === "Residential"
            ? "bg-registry text-paper border-registry shadow-md"
            : "bg-paper-2 text-ink/75 border-rule hover:border-registry hover:text-registry"
        }">
          Residential (${countRes})
        </a>
        <a href="${makeCategoryUrl("Commercial")}" class="px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
          type === "Commercial"
            ? "bg-registry text-paper border-registry shadow-md"
            : "bg-paper-2 text-ink/75 border-rule hover:border-registry hover:text-registry"
        }">
          Commercial (${countCom})
        </a>
        <a href="${makeCategoryUrl("Land")}" class="px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
          type === "Land"
            ? "bg-registry text-paper border-registry shadow-md"
            : "bg-paper-2 text-ink/75 border-rule hover:border-registry hover:text-registry"
        }">
          Land (${countLand})
        </a>
      </div>

      <!-- Advanced Filter Form -->
      <form id="property-filter" class="border border-rule bg-paper-2 shadow-sm overflow-hidden">
        <input type="hidden" name="view" value="${viewMode}" />
        <div class="grid gap-5 p-5 sm:p-7 md:grid-cols-2 xl:grid-cols-4 xl:items-end">
          <div>
            <label for="f-type" class="label text-muted">Property Type</label>
            <select id="f-type" name="type" class="field mt-2">
              <option value="">All types</option>
              ${propertyTypes
                .map(
                  (t) =>
                    `<option value="${t}" ${t === type ? "selected" : ""}>${t}</option>`,
                )
                .join("")}
            </select>
          </div>
          <div>
            <label for="f-location" class="label text-muted">Location</label>
            <select id="f-location" name="location" class="field mt-2">
              <option value="">Select Location</option>
              ${locations
                .map(
                  (l) =>
                    `<option value="${l}" ${l === location ? "selected" : ""}>${l}</option>`,
                )
                .join("")}
            </select>
          </div>
          <div>
            <label for="f-band" class="label text-muted">Price</label>
            <select id="f-band" name="band" class="field mt-2">
              ${priceBands
                .map(
                  (b) =>
                    `<option value="${b.value}" ${b.value === band ? "selected" : ""}>${b.label}</option>`,
                )
                .join("")}
            </select>
          </div>
          <div>
            <label for="f-q" class="label text-muted">Keyword</label>
            <input id="f-q" name="q" type="search" class="field mt-2" placeholder="e.g. East Legon" value="${(query.get("q") || "").replace(/"/g, "&quot;")}" />
          </div>
          <div class="md:col-span-2 xl:col-span-4 flex flex-wrap gap-3 pt-2">
            <button type="submit" class="btn btn-primary flex-1">Search Properties</button>
            <button type="button" id="filter-reset" class="btn btn-ghost !px-5">Reset</button>
          </div>
        </div>
      </form>
    </div>`;

  return {
    title: `Properties | ${firm.name}`,
    desc: "Explore available residential properties, commercial properties and land opportunities in Ghana. Filter by property type, location and price range.",
    html: `
    ${pageHead({
      eyebrow: "Property Register &amp; Showcase",
      title: "Find Property Opportunities in Ghana",
      lead: "Explore our premium residential, commercial and land opportunities.If you do not find exactly what you are looking for, contact us and tell us what you need. We may be able to assist you with your property search.",
      meta: `${properties.length} listings `,
    })}

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-10 sm:py-14">
      ${filterBar}

      <!-- Results Controls Ribbon -->
      <div class="mt-10 mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
        <div class="flex items-center gap-3">
          <p class="label text-muted">
            <span class="tnum text-registry font-bold text-sm sm:text-base">${String(results.length).padStart(2, "0")}</span>
            ${results.length === 1 ? "property" : "properties"} shown
          </p>
          
          
        </div>

        <!-- View Switcher -->
        <div class="flex items-center gap-1 bg-paper-3 p-1 border border-rule">
          <a
            href="${makeViewUrl("swipe")}"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all border ${
              viewMode === "swipe"
                ? "bg-paper text-registry border-rule shadow-xs"
                : "border-transparent text-muted hover:text-ink"
            }"
            title="Swipe Carousel View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Swipe Deck</span>
          </a>
          <a
            href="${makeViewUrl("grid")}"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all border ${
              viewMode === "grid"
                ? "bg-paper text-registry border-rule shadow-xs"
                : "border-transparent text-muted hover:text-ink"
            }"
            title="Gallery Grid View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Grid View</span>
          </a>
        </div>
      </div>

      <!-- Properties Display -->
      ${
        results.length
          ? `
        <div class="mt-6">
          ${viewMode === "grid" ? propertyGrid(results) : propertyCarousel(results, "main-properties")}
        </div>`
          : `
        <div class="mt-8 border border-dashed border-rule bg-paper-2 p-10 sm:p-16 text-center shadow-sm">
          <p class="label text-laterite">No matching properties</p>
          <h2 class="mt-5 font-display text-registry text-[1.9rem] leading-tight tracking-[-0.02em]">Nothing in the register matches those filters.</h2>
          <p class="mt-4 text-[1.03rem] leading-[1.8] text-ink/80 max-w-xl mx-auto">
            If you do not find exactly what you are looking for, contact us and tell us what you need. We may be able to assist you with your property search.
          </p>
          <div class="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="#/contact" class="btn btn-primary">Contact Us</a>
            <a href="#/properties" class="btn btn-ghost">Clear Filters</a>
          </div>
        </div>`
      }

      <div class="mt-16 grid gap-8 lg:grid-cols-12 items-start">
        <div class="lg:col-span-7">
          <h2 class="font-display text-registry text-[1.85rem] leading-[1.3] tracking-[-0.02em]">
            If you do not find exactly what you are looking for
          </h2>
          <p class="mt-4 text-[1.05rem] leading-[1.85] text-ink/82 max-w-2xl">
            Contact us and tell us what you need. We may be able to assist you with your property search, and with the appropriate checks and advisory support as you progress towards a transaction.
          </p>
        </div>
        <div class="lg:col-span-5">
          <div class="border border-rule p-7 bg-paper-2 shadow-xs">
            <p class="label text-laterite">Property Listing Disclaimer</p>
            <p class="mt-4 text-[0.98rem] leading-[1.8] text-ink/78">${legal.listing.body[1]}</p>
            <p class="mt-3 text-[0.98rem] leading-[1.8] text-ink/78">${legal.listing.body[2]}</p>
          </div>
        </div>
      </div>
    </section>

    ${ctaBand()}`,
  };
}
