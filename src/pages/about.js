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
                  `<p class="text-[1.05rem] leading-[1.85] text-ink/82">${p}</p>`,
              )
              .join("")}
          </div>
        </div>
        <aside class="lg:col-span-4 lg:col-start-9">
          <div class="border border-rule bg-paper-2 p-7 lg:sticky lg:top-32">
            <p class="label text-registry">At a glance</p>
            <dl class="mt-6 space-y-5">
              ${[
                [
                  "Services",
                  "Property management, sales, advisory, due diligence, land &amp; registration",
                ],
                [
                  "Clients",
                  "Individuals, families, investors and owners in Ghana and the diaspora",
                ],
                ["Focus", "Property transactions, due diligence and advisory"],
              ]
                .map(
                  ([k, v]) => `
                <div class="border-b border-rule-soft pb-5 last:border-0 last:pb-0">
                  <dt class="label-sm text-muted">${k}</dt>
                  <dd class="mt-2 text-[0.98rem] leading-[1.7] text-ink/85">${v}</dd>
                </div>`,
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
                </li>`,
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
              (p) =>
                `<p class="mt-6 text-[1.05rem] leading-[1.85] text-ink/82">${p}</p>`,
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
            </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>

    ${ctaBand()}`,
  };
}
