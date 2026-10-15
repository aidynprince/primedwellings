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
                  (p) =>
                    `<p class="text-[1.05rem] leading-[1.85] text-ink/82 mb-5">${p}</p>`,
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
        </article>`,
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
