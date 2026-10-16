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
import { propertyCarousel } from "./properties.js";
import { notFoundPage } from "./not-found.js";

export function propertyPage(slug) {
  const p = properties.find((x) => x.slug === slug);
  if (!p) return notFoundPage();

  const currentIndex = properties.findIndex((x) => x.slug === slug);
  const prevP = properties[(currentIndex - 1 + properties.length) % properties.length];
  const nextP = properties[(currentIndex + 1) % properties.length];
  const otherProperties = properties.filter((x) => x.slug !== slug);

  // Photograph set: the property's own image plus filler photographs so the
  // gallery can be swiped. Fillers are clearly captioned as placeholders.
  const fillerPool = Object.values(images).filter((src) => src !== p.image);
  const gallery = [
    {
      src: p.image,
      alt: p.imageAlt,
      caption: `Photograph 01 — ${p.type} · ${p.location}`,
    },
    ...fillerPool.slice(0, 3).map((src, i) => ({
      src,
      alt: "Placeholder photograph — to be supplied by the firm",
      caption: `Photograph ${String(i + 2).padStart(2, "0")} — placeholder · to be supplied by the firm`,
    })),
  ];

  return {
    title: `${p.title} | ${firm.name}`,
    desc: `${p.title} — ${p.type} property in ${p.location}, Ghana. ${p.size}. Enquire with ${firm.name} for further information and viewing arrangements.`,
    html: `
    <div class="border-b border-rule bg-paper-2 sticky top-[68px] sm:top-[76px] z-30 shadow-xs">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <nav class="flex flex-wrap items-center gap-2 label-sm text-muted" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-registry transition-colors">Home</a>
          <span class="text-rule">/</span>
          <a href="#/properties" class="hover:text-registry transition-colors">Properties</a>
          <span class="text-rule">/</span>
          <span class="text-registry font-bold">${p.ref}</span>
        </nav>

        <!-- Quick Switcher to Swipe/Browse Between Properties -->
        <div class="flex items-center gap-2">
          <a href="#/properties/${prevP.slug}" class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rule bg-paper hover:bg-registry hover:text-white text-xs font-semibold text-registry transition-all" title="View ${prevP.title}">
            <span>&larr;</span>
            <span class="hidden sm:inline">Prev:</span> ${prevP.ref}
          </a>
          <a href="#/properties/${nextP.slug}" class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rule bg-paper hover:bg-registry hover:text-white text-xs font-semibold text-registry transition-all" title="View ${nextP.title}">
            <span class="hidden sm:inline">Next:</span> ${nextP.ref}
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 pt-10 sm:pt-14">
      <div class="grid gap-8 lg:grid-cols-12 items-end">
        <div class="lg:col-span-8">
          <div class="flex flex-wrap items-center gap-3">
            <p class="label tnum text-laterite">${p.ref}</p>
            <span class="label-sm border border-rule px-2.5 py-1 text-muted">${p.type}</span>
            <span class="label-sm border border-dashed border-laterite/50 bg-laterite/8 px-2.5 py-1 text-laterite">Draft listing &middot; pending firm approval</span>
          </div>
          <h1 class="mt-5 font-display text-registry text-[clamp(2.15rem,5.2vw,3.9rem)] leading-[1.03] tracking-[-0.035em]">${p.title}</h1>
          <p class="mt-4 flex items-center gap-2 text-[1.06rem] text-ink/80">
            <svg width="15" height="18" viewBox="0 0 15 18" aria-hidden="true"><path d="M7.5 0C3.4 0 0 3.3 0 7.4 0 12.8 7.5 18 7.5 18S15 12.8 15 7.4C15 3.3 11.6 0 7.5 0zm0 10.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z" fill="#c5a044"/></svg>
            ${p.location} &middot; ${p.region}
          </p>
        </div>
        <div class="lg:col-span-4 lg:text-right">
          <p class="label-sm text-muted mb-2">Price</p>
          <div class="inline-flex items-start gap-2 px-4 py-2 bg-paper-2 border border-rule shadow-xs text-left">
            <span class="w-2 h-2 bg-laterite mt-1.5 shrink-0"></span>
            <span class="font-display text-registry text-[1.2rem] sm:text-[1.35rem] leading-[1.25] tracking-[-0.02em] font-semibold [overflow-wrap:anywhere]">${p.price}</span>
          </div>
          <p class="mt-2.5 label-sm text-muted">Guide price band to be confirmed by the firm</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 mt-10">
      <figure class="photo-gallery border border-rule bg-paper-2" data-gallery data-gallery-interval="10000">
        <div class="relative overflow-hidden bg-registry-deep h-[300px] sm:h-[460px] lg:h-[540px]" data-gallery-stage tabindex="0" role="group" aria-roledescription="carousel" aria-label="Property photographs for ${p.ref}">
          ${gallery
            .map(
              (g, i) => `
            <img
              src="${g.src}"
              alt="${g.alt}"
              data-gallery-img
              data-caption="${g.caption}"
              class="gallery-img absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${i === 0 ? "is-active" : "opacity-0 pointer-events-none"}"
            />`,
            )
            .join("")}
          <div class="absolute inset-0 plan-grid opacity-30 pointer-events-none" aria-hidden="true"></div>

          <!-- Tap edges to view other photographs -->
          <button type="button" class="gallery-edge is-left" data-gallery-prev aria-label="Previous photograph">
            <span class="gallery-edge-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
            </span>
          </button>
          <button type="button" class="gallery-edge is-right" data-gallery-next aria-label="Next photograph">
            <span class="gallery-edge-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
            </span>
          </button>

          <!-- Counter + auto-advance indicator -->
          <div class="absolute top-3 right-3 z-10 flex items-center gap-2">
            <span class="bg-paper/95 border border-rule px-2.5 py-1.5 label-sm tnum text-registry" data-gallery-count>01 / ${String(gallery.length).padStart(2, "0")}</span>
            <button type="button" class="bg-paper/95 border border-rule w-7 h-7 flex items-center justify-center text-registry hover:bg-registry hover:text-paper transition-colors" data-gallery-toggle aria-label="Pause slideshow" data-playing="true">
              <svg class="gallery-icon-pause" width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true"><rect x="0" y="0" width="3" height="12"/><rect x="7" y="0" width="3" height="12"/></svg>
              <svg class="gallery-icon-play hidden" width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true"><path d="M0 0l10 6-10 6z"/></svg>
            </button>
          </div>

          <p class="absolute left-0 bottom-0 bg-paper border-t border-r border-rule px-4 py-2.5 label-sm text-muted max-w-[85%]" data-gallery-caption>
            ${gallery[0].caption}
          </p>
        </div>

        <!-- Thumbnail strip for direct access -->
        <div class="flex gap-2 p-3 overflow-x-auto scrollbar-none border-t border-rule">
          ${gallery
            .map(
              (g, i) => `
            <button type="button" class="gallery-thumb shrink-0 ${i === 0 ? "is-active" : ""}" data-gallery-thumb="${i}" aria-label="View photograph ${i + 1}">
              <img src="${g.src}" alt="" loading="lazy" />
            </button>`,
            )
            .join("")}
          <p class="ml-auto self-center label-sm text-muted hidden sm:block pr-1 shrink-0">Swipe or tap edges </p>
        </div>
      </figure>
    </section>

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-14 sm:py-16">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <h2 class="label text-laterite">Property Description</h2>
          <p class="mt-5 text-[1.08rem] leading-[1.85] text-ink/85">${p.description}</p>

          <h2 class="mt-12 label text-laterite">Key Features</h2>
          <ul class="mt-6 grid gap-x-10 sm:grid-cols-2">
            ${p.features
              .map(
                (f) => `
              <li class="flex gap-3 border-t border-rule py-4">
                <span class="text-laterite" aria-hidden="true">&mdash;</span>
                <span class="text-[1.01rem] leading-[1.7] text-ink/85">${f}</span>
              </li>`,
              )
              .join("")}
          </ul>

          <h2 class="mt-12 label text-laterite">Property Information</h2>
          <div class="mt-5 border border-rule bg-paper-2 p-6">
            <p class="text-[1.01rem] leading-[1.8] text-ink/80">${p.info}</p>
          </div>

          <h2 class="mt-12 label text-laterite">Location Indication</h2>
          <div class="mt-5 border border-rule bg-paper-2 p-6">
            <svg viewBox="0 0 600 300" class="w-full h-auto" role="img" aria-label="Schematic location indication for ${p.location}">
              <rect width="600" height="300" fill="#e9e4d7"></rect>
              <g stroke="#e1e4e8" stroke-width="1">
                ${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="300"/>`).join("")}
                ${Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="600" y2="${i * 60}"/>`).join("")}
              </g>
              <path d="M0 210 C 140 190, 260 250, 600 176" stroke="#c5a044" stroke-width="10" fill="none" opacity="0.55"/>
              <path d="M240 0 C 250 120, 210 180, 300 300" stroke="#1d3f7e" stroke-width="8" fill="none" opacity="0.35"/>
              <rect x="330" y="70" width="150" height="96" fill="#0b1f4b" opacity="0.85"/>
              <rect x="330" y="70" width="150" height="96" fill="none" stroke="#c5a044" stroke-width="2"/>
              <circle cx="405" cy="118" r="9" fill="#c5a044"/>
              <text x="330" y="188" fill="#5d6b82" font-family="Archivo, sans-serif" font-size="15" letter-spacing="2">${p.ref}</text>
              <text x="24" y="284" fill="#5d6b82" font-family="Archivo, sans-serif" font-size="15" letter-spacing="2">SCHEMATIC LOCATION INDICATION — NOT TO SCALE</text>
            </svg>
            <p class="mt-4 text-[0.95rem] leading-[1.75] text-muted">
              This is a schematic indication only. A confirmed location map and survey plan particulars
              ${ph("location map")} are to be supplied by the firm before publication.
            </p>
          </div>
        </div>

        <aside class="lg:col-span-5">
          <div class="border border-rule bg-paper-2 lg:sticky lg:top-32">
            <div class="p-7 border-b border-rule">
              <p class="label text-muted">Enquire about this property</p>
              <h2 class="mt-4 font-display text-registry text-[1.65rem] leading-[1.25] tracking-[-0.02em]">Interested in this property?</h2>
              <p class="mt-4 text-[1.01rem] leading-[1.8] text-ink/80">
                Contact us for further information, viewing arrangements and appropriate property-related advisory support.
              </p>
              <div class="mt-6 space-y-3">
                <a href="#/properties/${p.slug}#property-enquiry" class="btn btn-accent w-full">Enquire About This Property</a>
                <a href="#/contact" class="btn btn-ghost w-full">WhatsApp Us</a>
              </div>
            </div>
            <dl class="p-7 space-y-5">
              <div class="border-b border-rule-soft pb-4">
                <dt class="label-sm text-muted">Reference</dt>
                <dd class="mt-1.5 label tnum text-registry">${p.ref}</dd>
              </div>
              <div class="border-b border-rule-soft pb-4">
                <dt class="label-sm text-muted">Property Type</dt>
                <dd class="mt-1.5 text-[1rem] text-ink/85">${p.type}</dd>
              </div>
              <div class="border-b border-rule-soft pb-4">
                <dt class="label-sm text-muted">Location</dt>
                <dd class="mt-1.5 text-[1rem] text-ink/85">${p.location}</dd>
              </div>
              <div class="border-b border-rule-soft pb-4">
                <dt class="label-sm text-muted">Size</dt>
                <dd class="mt-1.5 text-[1rem] text-ink/85 tnum">${p.size}</dd>
              </div>
              ${
                p.beds
                  ? `<div class="border-b border-rule-soft pb-4">
                      <dt class="label-sm text-muted">Bedrooms / Bathrooms</dt>
                      <dd class="mt-1.5 text-[1rem] text-ink/85 tnum">${p.beds} bedrooms &middot; ${p.baths} bathrooms</dd>
                    </div>`
                  : ""
              }
              <div>
                <dt class="label-sm text-muted">Direct contact</dt>
                <dd class="mt-2 space-y-2">
                  ${ph("telephone")}<br />${ph("whatsapp")}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>

    <!-- Swipe Option to View More Properties -->
    <section class="border-t border-rule bg-paper-2 py-14 sm:py-16">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p class="label text-laterite">Explore the Register</p>
            <h2 class="mt-2 font-display text-registry text-[clamp(1.75rem,3.8vw,2.5rem)] leading-tight tracking-[-0.02em]">
              More Properties to Explore
            </h2>
            <p class="mt-2 text-sm text-muted">Swipe or drag to browse available listings</p>
          </div>
          <a href="#/properties" class="btn btn-ghost !py-2.5 !px-5 self-start sm:self-auto">View All ${properties.length} Properties &rarr;</a>
        </div>
        ${propertyCarousel(otherProperties, "property-detail-more")}
      </div>
    </section>

    <section id="property-enquiry" class="border-t border-rule bg-paper-3 scroll-mt-32">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8 py-16">
        <div class="grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-5">
            ${sectionHead("04", "Enquiry", "Request further information.")}
            <p class="mt-7 text-[1.05rem] leading-[1.85] text-ink/82">
              Send us your details and reference <span class="tnum text-registry">${p.ref}</span>. A member of our team will get in touch with further information, viewing arrangements and the appropriate property-related advisory support.
            </p>
            <div class="mt-8 border-l-2 border-laterite pl-6">
              <p class="label text-laterite">Property Listing Disclaimer</p>
              <p class="mt-3 text-[0.98rem] leading-[1.8] text-ink/78">${legal.listing.body.join(" ")}</p>
            </div>
          </div>
          <div class="lg:col-span-7">
            <div class="border border-rule bg-paper-2 p-7 sm:p-9">
              ${enquiryForm({
                id: "property-enquiry-form",
                prefill: "Buying a property",
                heading: "Enquire About This Property",
                intro: `Reference ${p.ref} — ${p.title}.`,
              })}
            </div>
          </div>
        </div>
      </div>
    </section>`,
  };
}
