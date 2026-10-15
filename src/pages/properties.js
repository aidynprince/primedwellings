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

export function registerRow(p) {
  return `
  <a href="#/properties/${p.slug}" class="register-row group block border-t border-rule" data-photo="${p.image}">
    <div class="py-6 px-2 sm:px-4">

      <!-- Mobile register entry -->
      <div class="sm:hidden">
        <div class="flex gap-4">
          <img src="${p.image}" alt="${p.imageAlt}" loading="lazy" class="w-24 h-[4.5rem] object-cover border border-rule shrink-0" />
          <div class="min-w-0">
            <p class="label tnum register-ref text-muted">${p.ref}</p>
            <h3 class="mt-2 font-display text-[1.16rem] leading-[1.25] text-registry tracking-[-0.02em]">${p.title}</h3>
            <p class="mt-1.5 label-sm text-muted">${p.type} &middot; ${p.location}</p>
          </div>
        </div>
        <div class="mt-5 flex items-start justify-between gap-5">
          <div class="max-w-[55%]">
            <p class="label-sm text-muted">Size</p>
            <p class="mt-1 text-[0.9rem] leading-snug text-ink/80 tnum">${p.size}</p>
          </div>
          <div class="text-right">
            <p class="label-sm text-muted">Price</p>
            <p class="mt-1 label tnum text-registry">${p.price}</p>
          </div>
        </div>
        <div class="mt-5 flex items-center gap-2">
          <span class="label text-laterite">View Details</span>
          <span class="text-laterite text-lg leading-none">&rarr;</span>
        </div>
      </div>

      <!-- Desktop register entry -->
      <div class="hidden sm:grid grid-cols-12 gap-x-5 items-center">
        <div class="col-span-2">
          <p class="label tnum register-ref text-muted transition-colors">${p.ref}</p>
        </div>
        <div class="col-span-4">
          <h3 class="font-display text-[1.32rem] leading-[1.25] text-registry tracking-[-0.02em] group-hover:text-laterite transition-colors">${p.title}</h3>
          <p class="mt-1.5 label-sm text-muted">${p.type} &middot; ${p.location}</p>
        </div>
        <div class="col-span-2">
          <p class="text-[0.92rem] leading-snug text-ink/80 tnum">${p.size}</p>
        </div>
        <div class="col-span-2">
          <p class="label tnum text-registry">${p.price}</p>
        </div>
        <div class="col-span-2 flex justify-end items-center gap-3">
          <span class="label text-laterite">View Details</span>
          <span class="row-arrow text-laterite text-lg leading-none">&rarr;</span>
        </div>
      </div>

    </div>
  </a>`;
}
export function propertiesPage(query) {
  const type = query.get("type") || "";
  const location = query.get("location") || "";
  const band = query.get("band") || "";
  const keyword = (query.get("q") || "").trim().toLowerCase();

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

  const filterBar = `
    <form id="property-filter" class="border border-rule bg-paper-2">
      <div class="grid gap-5 p-6 sm:p-7 md:grid-cols-2 lg:grid-cols-5 lg:items-end">
        <div class="lg:col-span-1">
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
        <div class="lg:col-span-1">
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
        <div class="lg:col-span-1">
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
        <div class="lg:col-span-1">
          <label for="f-q" class="label text-muted">Keyword</label>
          <input id="f-q" name="q" type="search" class="field mt-2" placeholder="e.g. East Legon" value="${(query.get("q") || "").replace(/"/g, "&quot;")}" />
        </div>
        <div class="flex gap-3">
          <button type="submit" class="btn btn-primary flex-1">Search Properties</button>
          <button type="button" id="filter-reset" class="btn btn-ghost !px-4">Reset</button>
        </div>
      </div>
    </form>`;

  return {
    title: `Properties | ${firm.name}`,
    desc: "Explore available residential properties, commercial properties and land opportunities in Ghana. Filter by property type, location and price range.",
    html: `
    ${pageHead({
      eyebrow: "Property Listings",
      title: "Find Property Opportunities in Ghana",
      lead: "Explore our available residential properties, commercial properties and land opportunities. Each listing provides key information about the property and an opportunity to contact us for further information or assistance.",
      meta: `${properties.length} listings &middot; Register view`,
    })}

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-12 sm:py-16">
      ${filterBar}

      <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p class="label text-muted">
          <span class="tnum text-registry">${String(results.length).padStart(2, "0")}</span>
          ${results.length === 1 ? "property" : "properties"} shown
        </p>
        <p class="label-sm text-muted max-w-lg">
          Listings shown are drafts pending the firm's approval of photographs, prices and specifications.
        </p>
      </div>

      ${
        results.length
          ? `
        <div class="mt-6 border-b border-rule">
          <div class="hidden sm:grid grid-cols-12 gap-x-5 px-4 pb-3">
            <p class="col-span-2 label text-muted">Ref</p>
            <p class="col-span-4 label text-muted">Property</p>
            <p class="col-span-2 label text-muted">Size</p>
            <p class="col-span-2 label text-muted">Price</p>
            <p class="col-span-2 label text-muted text-right">Enquiry</p>
          </div>
          ${results.map(registerRow).join("")}
        </div>`
          : `
        <div class="mt-6 border border-dashed border-rule bg-paper-2 p-10 sm:p-16 text-center">
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

      <div class="mt-14 grid gap-8 lg:grid-cols-12 items-start">
        <div class="lg:col-span-7">
          <h2 class="font-display text-registry text-[1.85rem] leading-[1.3] tracking-[-0.02em]">
            If you do not find exactly what you are looking for
          </h2>
          <p class="mt-4 text-[1.05rem] leading-[1.85] text-ink/82 max-w-2xl">
            Contact us and tell us what you need. We may be able to assist you with your property search, and with the appropriate checks and advisory support as you progress towards a transaction.
          </p>
        </div>
        <div class="lg:col-span-5">
          <div class="border border-rule p-7 bg-paper-2">
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
