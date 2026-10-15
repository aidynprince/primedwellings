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

export function propertyPage(slug) {
  const p = properties.find((x) => x.slug === slug);
  if (!p) return notFoundPage();

  return {
    title: `${p.title} | ${firm.name}`,
    desc: `${p.title} — ${p.type} property in ${p.location}, Ghana. ${p.size}. Enquire with ${firm.name} for further information and viewing arrangements.`,
    html: `
    <div class="border-b border-rule bg-paper-2">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8 py-4">
        <nav class="flex flex-wrap items-center gap-2 label-sm text-muted" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-registry transition-colors">Home</a>
          <span class="text-rule">/</span>
          <a href="#/properties" class="hover:text-registry transition-colors">Properties</a>
          <span class="text-rule">/</span>
          <span class="text-registry">${p.ref}</span>
        </nav>
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
            <svg width="15" height="18" viewBox="0 0 15 18" aria-hidden="true"><path d="M7.5 0C3.4 0 0 3.3 0 7.4 0 12.8 7.5 18 7.5 18S15 12.8 15 7.4C15 3.3 11.6 0 7.5 0zm0 10.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z" fill="#b0562b"/></svg>
            ${p.location} &middot; ${p.region}
          </p>
        </div>
        <div class="lg:col-span-4 lg:text-right">
          <p class="label-sm text-muted">Price</p>
          <p class="mt-2 font-display text-registry text-[1.65rem] leading-tight tracking-[-0.02em] tnum">${p.price}</p>
          <p class="mt-2 label-sm text-muted">Guide price band to be confirmed by the firm</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 mt-10">
      <div class="grid gap-4 lg:grid-cols-12">
        <figure class="lg:col-span-8 relative">
          <img src="${p.image}" alt="${p.imageAlt}" class="w-full h-[300px] sm:h-[520px] object-cover border border-rule" />
          <div class="absolute inset-0 plan-grid opacity-40 pointer-events-none" aria-hidden="true"></div>
          <figcaption class="absolute left-0 bottom-0 bg-paper border-t border-r border-rule px-4 py-2.5 label-sm text-muted">
            Photograph 01 &mdash; ${p.type} &middot; ${p.location}
          </figcaption>
        </figure>
        <div class="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
          ${["Exterior", "Interior", "Additional view"]
            .map(
              (label, i) => `
            <div class="border border-dashed border-rule bg-paper-2 h-[130px] sm:h-auto flex flex-col items-center justify-center text-center px-3 py-5">
              <span class="label text-muted tnum">Photograph ${String(i + 2).padStart(2, "0")}</span>
              <span class="mt-2 text-[0.86rem] leading-snug text-muted">${label} &mdash; to be supplied by the firm</span>
            </div>`,
            )
            .join("")}
        </div>
      </div>
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
              <rect width="600" height="300" fill="#f0e9dd"></rect>
              <g stroke="#ddd3c3" stroke-width="1">
                ${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="300"/>`).join("")}
                ${Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="600" y2="${i * 60}"/>`).join("")}
              </g>
              <path d="M0 210 C 140 190, 260 250, 600 176" stroke="#b0562b" stroke-width="10" fill="none" opacity="0.55"/>
              <path d="M240 0 C 250 120, 210 180, 300 300" stroke="#2f6249" stroke-width="8" fill="none" opacity="0.35"/>
              <rect x="330" y="70" width="150" height="96" fill="#173a2c" opacity="0.85"/>
              <rect x="330" y="70" width="150" height="96" fill="none" stroke="#b0562b" stroke-width="2"/>
              <circle cx="405" cy="118" r="9" fill="#b0562b"/>
              <text x="330" y="188" fill="#6e6558" font-family="Archivo, sans-serif" font-size="15" letter-spacing="2">${p.ref}</text>
              <text x="24" y="284" fill="#6e6558" font-family="Archivo, sans-serif" font-size="15" letter-spacing="2">SCHEMATIC LOCATION INDICATION — NOT TO SCALE</text>
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
