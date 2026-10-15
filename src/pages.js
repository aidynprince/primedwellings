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
import { registerRow } from "./pages/properties.js";

export const sectionHead = (num, kicker, title, lead = "") => `
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
                ${[
                  "Property Sales",
                  "Property Management",
                  "Real Estate Advisory",
                  "Due Diligence",
                  "Land & Registration",
                  "Legal Counsel",
                ]
                  .map(
                    (t) =>
                      `<li class="label-sm text-ink/70 before:content-['—'] before:text-laterite before:mr-2">${t}</li>`,
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
          </a>`,
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
            </div>`,
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
                  </li>`,
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

/* ------------------------------ SERVICES ------------------------------ */

/* ----------------------------- PROPERTIES ----------------------------- */
