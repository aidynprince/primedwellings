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
} from "./data.js";
import { ctaBand, enquiryForm, pageHead, ph, phDark } from "./ui.js";

const sectionHead = (num, kicker, title, lead = "") => `
  <div class="reveal">
    <div class="flex items-baseline gap-4">
      <span class="label text-laterite tnum">§ ${num}</span>
      <span class="rule-draw h-px flex-1 bg-rule"></span>
      <span class="label text-muted">${kicker}</span>
    </div>
    <h2 class="mt-6 font-display text-registry leading-[1.03] tracking-[-0.03em] text-[clamp(2.1rem,4.6vw,3.4rem)] max-w-3xl">${title}</h2>
    ${
      lead
        ? `<p class="mt-5 max-w-2xl text-[1.05rem] leading-[1.8] text-ink/80">${lead}</p>`
        : ""
    }
  </div>`;

/* ------------------------- Property register row ------------------------- */

function registerRow(p) {
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

/* ------------------------------- HOME ------------------------------- */

export function homePage() {
  return {
    title: `${firm.name} | Real Estate & Property Advisory, Ghana`,
    desc: "Property decisions informed by experience. Prime Dwellings and Properties Limited provides property sales, property management, real estate advisory, due diligence and land registration advisory in Ghana — for clients in Ghana and the diaspora.",
    html: `
    <section class="relative bg-paper overflow-hidden border-b border-rule">
      <div class="absolute inset-0 plan-grid" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-12 pb-14 sm:pt-20 sm:pb-20">
          <div class="lg:col-span-7">
            <p class="label text-laterite reveal">${firm.descriptor}</p>
            <h1 class="mt-7 font-display text-registry text-[clamp(2.9rem,8vw,6.2rem)] leading-[0.92] tracking-[-0.045em] reveal" style="--reveal-delay:80ms">
              <span class="block font-semibold">Property Decisions.</span>
              <span class="block font-light text-registry-mid">Informed by Experience.</span>
            </h1>
            <p class="mt-8 max-w-[38rem] text-[1.08rem] sm:text-[1.16rem] leading-[1.78] text-ink/85 reveal" style="--reveal-delay:160ms">
              ${home.supporting}
            </p>
            <div class="mt-9 flex flex-wrap gap-3 reveal" style="--reveal-delay:220ms">
              <a href="#/properties" class="btn btn-primary">${home.ctaPrimary}</a>
              <a href="#/contact" class="btn btn-ghost">${home.ctaSecondary}</a>
            </div>
            <div class="mt-10 pt-6 border-t border-rule reveal" style="--reveal-delay:280ms">
              <p class="label-sm text-muted">Registered &amp; regulated practice &middot; Accra</p>
              <ul class="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                ${["Property Sales", "Property Management", "Real Estate Advisory", "Due Diligence", "Land & Registration", "Legal Counsel"]
                  .map(
                    (t) =>
                      `<li class="label-sm text-ink/70 before:content-['—'] before:text-laterite before:mr-2">${t}</li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>

          <div class="lg:col-span-5 relative reveal" style="--reveal-delay:140ms">
            <div class="relative lg:w-[calc(100%+7vw)]">
              <img src="${images.hero}" alt="Contemporary residence in Accra in late-afternoon light" class="w-full h-[380px] sm:h-[520px] lg:h-[620px] object-cover" />
              <div class="absolute inset-0 plan-grid opacity-60 mix-blend-multiply" aria-hidden="true"></div>
              <div class="absolute left-0 bottom-0 bg-paper border-t border-rule px-5 py-4 max-w-[16rem]">
                <p class="label-sm text-laterite tnum">Fig. 01 &mdash; Residential</p>
                <p class="mt-1.5 text-[0.86rem] leading-snug text-ink/80">Property identified, assessed and supported through to completion.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-paper-3 border-b border-rule">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8 py-6">
        <div class="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p class="label text-registry">Serving clients in Ghana &amp; the Diaspora</p>
          <span class="hidden sm:block h-px flex-1 bg-rule"></span>
          <p class="label-sm text-muted">Property identification &middot; Due diligence &middot; Documentation &middot; Registration advisory &middot; Management</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-24">
      ${sectionHead("01", "What We Do", "Six core areas of real estate and property work.")}
      <div class="mt-12 grid gap-x-14 md:grid-cols-2">
        ${whatWeDo
          .map(
            (s, i) => `
          <a href="${s.href}" class="group reveal border-t border-rule py-7 flex gap-6 hover:bg-paper-2 transition-colors px-2 -mx-2" style="--reveal-delay:${i * 60}ms">
            <span class="label tnum text-laterite pt-1">${s.n}</span>
            <div class="flex-1">
              <h3 class="font-display text-[1.45rem] leading-tight text-registry tracking-[-0.02em] group-hover:text-laterite transition-colors">${s.title}</h3>
              <p class="mt-3 text-[1rem] leading-[1.75] text-ink/78">${s.body}</p>
              <span class="mt-4 inline-flex items-center gap-2 label text-muted group-hover:text-laterite transition-colors">
                Read more <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </div>
          </a>`
          )
          .join("")}
      </div>
    </section>

    <section class="border-y border-rule bg-paper-2">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-24">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          ${sectionHead("02", "Selected Properties", "A selection of currently listed opportunities.", "Each listing is presented with its key particulars and an enquiry route to our team. Full availability, pricing and documentation are confirmed directly with the firm.")}
          <a href="#/properties" class="btn btn-ghost shrink-0">View All Properties</a>
        </div>
        <div class="mt-12 border-b border-rule">
          ${properties.slice(0, 3).map(registerRow).join("")}
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-24">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-32">
            ${sectionHead("03", "Why Clients Work With Us", "Professional judgement, applied to your particular property.")}
            <p class="mt-7 max-w-md text-[1.03rem] leading-[1.82] text-ink/80">
              ${about.intro}
            </p>
            <a href="#/about" class="btn btn-ghost mt-8">About the Firm</a>
          </div>
        </div>
        <div class="lg:col-span-7">
          ${whyClients
            .map(
              (w, i) => `
            <div class="reveal border-t border-rule py-8" style="--reveal-delay:${i * 70}ms">
              <div class="flex gap-6">
                <span class="label tnum text-laterite pt-1.5">${w.n}</span>
                <div>
                  <h3 class="font-display text-[1.42rem] leading-tight text-registry tracking-[-0.02em]">${w.title}</h3>
                  <p class="mt-3 text-[1.02rem] leading-[1.8] text-ink/78 max-w-2xl">${w.body}</p>
                </div>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden border-y border-rule">
      <img src="${images.documents}" alt="Survey plan and property documentation on a desk" class="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
      <div class="absolute inset-0 bg-registry-deep/[0.86]" aria-hidden="true"></div>
      <div class="absolute inset-0 plan-grid-light opacity-50" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-24">
        <div class="grid gap-10 lg:grid-cols-12 items-start">
          <div class="lg:col-span-6">
            <p class="label text-laterite-soft">For Clients Abroad</p>
            <h2 class="mt-6 font-display text-paper text-[clamp(2.15rem,5vw,3.55rem)] leading-[1.02] tracking-[-0.035em]">${diaspora.title}</h2>
            <p class="mt-7 text-[1.06rem] leading-[1.82] text-registry-soft/90">${diaspora.body.split("\n\n")[0]}</p>
            <p class="mt-5 text-[1.06rem] leading-[1.82] text-registry-soft/90">${diaspora.body.split("\n\n")[1]}</p>
            <a href="#/contact" class="btn btn-light mt-9">${diaspora.cta}</a>
          </div>
          <div class="lg:col-span-5 lg:col-start-8">
            <div class="border border-paper/20 p-7">
              <p class="label text-laterite-soft">What we can do remotely</p>
              <ul class="mt-6 space-y-4">
                ${[
                  "Property identification on the client's behalf",
                  "Transaction-related checks and due diligence",
                  "Land and registration advisory",
                  "Accompanying correspondence and feedback throughout",
                ]
                  .map(
                    (t) => `
                  <li class="flex gap-4 border-b border-paper/12 pb-4 last:border-0 last:pb-0">
                    <span class="text-laterite-soft" aria-hidden="true">&mdash;</span>
                    <span class="text-[1rem] leading-[1.7] text-registry-soft/90">${t}</span>
                  </li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${ctaBand()}`,
  };
}

/* ------------------------------- ABOUT ------------------------------- */

export function aboutPage() {
  return {
    title: `About Us | ${firm.name}`,
    desc: "Prime Dwellings and Properties Limited is a professional real estate and property advisory firm serving persons acquiring interests in immovable property in Ghana and abroad.",
    html: `
    ${pageHead({
      eyebrow: "About the Firm",
      title: "A professional firm for significant property decisions.",
      lead: about.intro,
      meta: "Company profile &middot; Approach &middot; Clients in Ghana and abroad",
    })}

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-20">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="label text-laterite">Company Profile</p>
          <p class="mt-6 font-display text-[1.55rem] sm:text-[1.85rem] leading-[1.45] text-registry tracking-[-0.02em]">${about.sub}</p>
          <div class="mt-9 space-y-6">
            ${about.paragraphs
              .map(
                (p) =>
                  `<p class="text-[1.05rem] leading-[1.85] text-ink/82">${p}</p>`
              )
              .join("")}
          </div>
        </div>
        <aside class="lg:col-span-4 lg:col-start-9">
          <div class="border border-rule bg-paper-2 p-7 lg:sticky lg:top-32">
            <p class="label text-registry">At a glance</p>
            <dl class="mt-6 space-y-5">
              ${[
                ["Services", "Property management, sales, advisory, due diligence, land &amp; registration"],
                ["Clients", "Individuals, families, investors and owners in Ghana and the diaspora"],
                ["Focus", "Property transactions, due diligence and advisory"],
              ]
                .map(
                  ([k, v]) => `
                <div class="border-b border-rule-soft pb-5 last:border-0 last:pb-0">
                  <dt class="label-sm text-muted">${k}</dt>
                  <dd class="mt-2 text-[0.98rem] leading-[1.7] text-ink/85">${v}</dd>
                </div>`
                )
                .join("")}
            </dl>
            <a href="#/contact" class="btn btn-primary w-full mt-7">Speak to an Adviser</a>
          </div>
        </aside>
      </div>
    </section>

    <section class="border-y border-rule bg-paper-2">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-24">
        <div class="grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-5">
            ${sectionHead("01", "Our Approach", "A transaction should be understood, not simply completed.")}
            <p class="mt-7 text-[1.05rem] leading-[1.85] text-ink/82">${about.approachLead}</p>
          </div>
          <div class="lg:col-span-6 lg:col-start-7">
            <p class="label text-muted">${about.approachIntro}</p>
            <ol class="mt-7">
              ${about.approach
                .map(
                  (a, i) => `
                <li class="reveal flex gap-6 border-t border-rule py-6" style="--reveal-delay:${i * 60}ms">
                  <span class="label tnum text-laterite pt-1">${String(i + 1).padStart(2, "0")}</span>
                  <p class="text-[1.04rem] leading-[1.8] text-ink/85">${a}</p>
                </li>`
                )
                .join("")}
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-24">
      <div class="grid gap-12 lg:grid-cols-12 items-start">
        <div class="lg:col-span-6">
          <img src="${images.documents}" alt="Property documentation and survey plans under review" class="w-full h-[360px] sm:h-[520px] object-cover border border-rule" />
          <p class="mt-4 label-sm text-muted">Fig. 02 &mdash; Documentation, searches and registration review</p>
        </div>
        <div class="lg:col-span-6">
          ${sectionHead("02", "Serving Clients in Ghana and Abroad", "Local support for clients who are not resident in Ghana.")}
          <p class="mt-7 text-[1.05rem] leading-[1.85] text-ink/82">${about.abroadLead}</p>
          ${about.abroad
            .map(
              (p) => `<p class="mt-6 text-[1.05rem] leading-[1.85] text-ink/82">${p}</p>`
            )
            .join("")}
          <p class="mt-8 border-l-2 border-laterite pl-6 font-display text-[1.28rem] leading-[1.6] text-registry">${about.objective}</p>
        </div>
      </div>
    </section>

    <section class="border-y border-rule bg-paper-3">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-20">
        ${sectionHead("03", "Professional Team", "Our people.", "Biographies, qualifications and professional photographs of the firm's key professionals will be published here once approved material has been supplied by the firm.")}
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${[1, 2, 3]
            .map(
              (i) => `
            <div class="border border-dashed border-rule bg-paper-2 p-7">
              <div class="h-40 flex items-center justify-center border border-rule-soft bg-paper">
                <span class="label text-muted">Portrait to be supplied</span>
              </div>
              <p class="mt-6 label text-laterite tnum">Team profile ${String(i).padStart(2, "0")}</p>
              <p class="mt-3 text-[0.98rem] leading-[1.75] text-muted">Name, role, qualifications and biography awaiting approval by the firm.</p>
              <div class="mt-4">${ph("professional details")}</div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </section>

    ${ctaBand()}`,
  };
}

/* ------------------------------ SERVICES ------------------------------ */

export function servicesPage() {
  return {
    title: `Our Services | ${firm.name}`,
    desc: "Property management, sale of residential and commercial properties, real estate advisory, property due diligence, land acquisition, legal counsel, land registration advisory and transaction-related checks in Ghana.",
    html: `
    ${pageHead({
      eyebrow: "Our Services",
      title: "Property services, explained clearly.",
      lead: "Our work covers property management, general real estate advisory services, registration with the relevant governmental agencies services and other associated services.",
      meta: "Nine core services &middot; Ghana &amp; the Diaspora",
    })}

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8">
      ${services
        .map(
          (s, i) => `
        <article id="${s.id}" class="reveal border-b border-rule py-12 sm:py-16 scroll-mt-32">
          <div class="grid gap-8 lg:grid-cols-12">
            <div class="lg:col-span-4">
              <div class="flex items-baseline gap-4">
                <span class="label tnum text-laterite">${s.n}</span>
                <span class="h-px w-12 bg-laterite/50"></span>
              </div>
              <h2 class="mt-5 font-display text-registry text-[clamp(1.75rem,3.2vw,2.45rem)] leading-[1.1] tracking-[-0.03em]">${s.title}</h2>
              <p class="mt-3 label text-muted">${s.sub}</p>
            </div>
            <div class="lg:col-span-5">
              ${s.body
                .map(
                  (p) => `<p class="text-[1.05rem] leading-[1.85] text-ink/82 mb-5">${p}</p>`
                )
                .join("")}
            </div>
            <div class="lg:col-span-3 flex lg:justify-end items-start">
              <a href="${s.href || "#/contact"}" class="group/cta inline-flex items-start gap-3 border-t border-rule pt-4 lg:text-right">
                <span class="text-[0.98rem] leading-[1.6] text-registry link-underline">${s.cta}</span>
                <span class="text-laterite transition-transform group-hover/cta:translate-x-1" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </article>`
        )
        .join("")}
    </section>

    <section class="border-y border-rule bg-paper-2 mt-8">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8 py-14">
        <div class="grid gap-8 lg:grid-cols-12 items-center">
          <div class="lg:col-span-8">
            <h2 class="font-display text-registry text-[1.75rem] leading-[1.3] tracking-[-0.02em]">
              Not sure which service applies to your situation?
            </h2>
            <p class="mt-4 text-[1.03rem] leading-[1.8] text-ink/80 max-w-2xl">
              Tell us about the property and the transaction you are considering. We will advise on the appropriate next steps and the checks that should be undertaken before you commit.
            </p>
          </div>
          <div class="lg:col-span-4 flex lg:justify-end">
            <a href="#/contact" class="btn btn-primary">Request a Property Assessment</a>
          </div>
        </div>
      </div>
    </section>

    ${ctaBand()}`,
  };
}

/* ----------------------------- PROPERTIES ----------------------------- */

export function propertiesPage(query) {
  const type = query.get("type") || "";
  const location = query.get("location") || "";
  const band = query.get("band") || "";
  const keyword = (query.get("q") || "").trim().toLowerCase();

  const locations = Array.from(new Set(properties.map((p) => p.location))).sort();

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
                  `<option value="${t}" ${t === type ? "selected" : ""}>${t}</option>`
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
                  `<option value="${l}" ${l === location ? "selected" : ""}>${l}</option>`
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
                  `<option value="${b.value}" ${b.value === band ? "selected" : ""}>${b.label}</option>`
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

/* --------------------------- PROPERTY DETAIL --------------------------- */

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
            </div>`
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
              </li>`
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

/* ------------------------------ CONTACT ------------------------------ */

export function contactPage() {
  return {
    title: `Contact Us | ${firm.name}`,
    desc: "Contact Prime Dwellings and Properties Limited for property sales, management, due diligence and land registration advisory in Ghana. Telephone, WhatsApp, email and enquiry form.",
    html: `
    ${pageHead({
      eyebrow: "Contact Us",
      title: "Let's Discuss Your Property Needs",
      lead: "Whether you are looking to buy property, sell property, acquire land, manage a property or obtain professional advice before proceeding with a transaction, we would be pleased to hear from you.",
      meta: "Telephone &middot; WhatsApp &middot; Email &middot; Office",
    })}

    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-14 sm:py-20">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <h2 class="label text-laterite">Contact Details</h2>
          <dl class="mt-7 border-t border-rule">
            ${[
              ["Telephone", ph("telephone number")],
              ["WhatsApp", ph("whatsapp number")],
              ["Email", ph("email address")],
              ["Office", ph("office address / location")],
              ["Business Hours", ph("business hours")],
            ]
              .map(
                ([k, v]) => `
              <div class="border-b border-rule py-5 flex flex-wrap items-center justify-between gap-3">
                <dt class="label text-registry">${k}</dt>
                <dd>${v}</dd>
              </div>`
              )
              .join("")}
          </dl>

          <div class="mt-8 border border-rule bg-paper-2 p-7">
            <p class="label text-registry">WhatsApp</p>
            <p class="mt-4 text-[1.03rem] leading-[1.8] text-ink/82">Have a property question? Chat with us on WhatsApp.</p>
            <a href="#/contact" class="btn btn-primary mt-6 w-full">Chat on WhatsApp</a>
            <p class="mt-4 text-xs leading-relaxed text-muted">
              The WhatsApp number and deep link ${ph("whatsapp link")} are to be supplied by the firm.
            </p>
          </div>

          <div class="mt-8 border border-rule bg-paper-2 p-7">
            <p class="label text-registry">Follow Us</p>
            <p class="mt-4 text-[1.03rem] leading-[1.8] text-ink/82">
              Stay connected with us for property opportunities, real estate information and updates.
            </p>
            <div class="mt-5 flex flex-wrap gap-2.5">
              ${["Facebook", "Instagram", "LinkedIn", "Other"]
                .map((s) => `<span class="label-sm border border-dashed border-rule px-3 py-2 text-muted">${s} ${""}</span>`)
                .join("")}
            </div>
            <p class="mt-5 text-xs leading-relaxed text-muted">
              Only the firm's official, verified social media accounts will be linked here once supplied.
            </p>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="border border-rule bg-paper-2 p-7 sm:p-10">
            ${enquiryForm({
              id: "contact-form",
              heading: "Send an Enquiry",
              intro: "Tell us what you are looking for and a member of our team will get in touch.",
            })}
          </div>

          <div class="mt-8 border border-dashed border-rule p-7">
            <p class="label text-laterite">Locations We Serve</p>
            <p class="mt-4 text-[1.03rem] leading-[1.8] text-ink/82">
              We assist clients with property opportunities and property-related services in selected locations across Ghana. Our coverage will depend on the nature of the service and the particular property requirement.
            </p>
            <div class="mt-5">${ph("regions / cities / areas served")}</div>
            <p class="mt-5 text-[1.01rem] leading-[1.8] text-ink/82">
              For clients looking for property in a particular location, contact us with your requirements and we will advise on the available options and appropriate next steps.
            </p>
          </div>
        </div>
      </div>
    </section>`,
  };
}

/* ------------------------------- LEGAL ------------------------------- */

export function legalPage(kind) {
  const map = {
    privacy: {
      eyebrow: "Legal & Privacy",
      title: "Privacy Policy",
      intro: "This policy sets out how information submitted through this website is handled. Final wording is to be approved by the firm's professionals.",
      sections: [legal.privacy, legal.general],
    },
    terms: {
      eyebrow: "Legal & Privacy",
      title: "Terms of Use",
      intro: "These terms govern use of this website. Final wording is to be approved by the firm's professionals.",
      sections: [legal.general, legal.listing, legal.dueDiligence],
    },
    disclaimer: {
      eyebrow: "Legal & Privacy",
      title: "Professional Disclaimers",
      intro: "General, listing and due diligence disclaimers applicable to the information published on this website.",
      sections: [legal.general, legal.listing, legal.dueDiligence],
    },
  };

  const page = map[kind] || map.disclaimer;

  return {
    title: `${page.title} | ${firm.name}`,
    desc: `${page.title} for ${firm.name} — real estate and property advisory, Ghana.`,
    html: `
    ${pageHead({
      eyebrow: page.eyebrow,
      title: page.title,
      lead: page.intro,
      meta: "Template wording &middot; subject to approval by the firm's professionals",
    })}
    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-14 sm:py-20">
      <div class="max-w-3xl">
        ${page.sections
          .map(
            (s, i) => `
          <article class="border-t border-rule py-9">
            <div class="flex items-baseline gap-4">
              <span class="label tnum text-laterite">${String(i + 1).padStart(2, "0")}</span>
              <h2 class="font-display text-registry text-[1.75rem] leading-tight tracking-[-0.02em]">${s.title}</h2>
            </div>
            <div class="mt-5 space-y-5 pl-0 sm:pl-11">
              ${s.body
                .map(
                  (p) => `<p class="text-[1.03rem] leading-[1.85] text-ink/82">${p}</p>`
                )
                .join("")}
            </div>
          </article>`
          )
          .join("")}
        <div class="mt-10 border border-dashed border-rule p-7">
          <p class="label text-laterite">Note to the firm</p>
          <p class="mt-4 text-[1rem] leading-[1.8] text-ink/80">
            These pages are provided as technical templates. The firm's professionals are to approve the final legal
            wording before the website is launched.
          </p>
        </div>
      </div>
    </section>`,
  };
}

/* ------------------------------- 404 ------------------------------- */

export function notFoundPage() {
  return {
    title: `Page Not Found | ${firm.name}`,
    desc: "The page you are looking for could not be found.",
    html: `
    <section class="mx-auto max-w-[1240px] px-5 sm:px-8 py-24 sm:py-32">
      <div class="max-w-2xl">
        <p class="label text-laterite tnum">Error 404</p>
        <h1 class="mt-6 font-display text-registry text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-[-0.035em]">
          This page is not in the register.
        </h1>
        <p class="mt-7 text-[1.08rem] leading-[1.82] text-ink/82">
          The page you are looking for may have been moved or is not yet published. Return to the property register
          or contact us and we will be glad to help.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a href="#/properties" class="btn btn-primary">View Properties</a>
          <a href="#/" class="btn btn-ghost">Back to Home</a>
        </div>
      </div>
    </section>`,
  };
}
