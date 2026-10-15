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

export function legalPage(kind) {
  const map = {
    privacy: {
      eyebrow: "Legal & Privacy",
      title: "Privacy Policy",
      intro:
        "This policy sets out how information submitted through this website is handled. Final wording is to be approved by the firm's professionals.",
      sections: [legal.privacy, legal.general],
    },
    terms: {
      eyebrow: "Legal & Privacy",
      title: "Terms of Use",
      intro:
        "These terms govern use of this website. Final wording is to be approved by the firm's professionals.",
      sections: [legal.general, legal.listing, legal.dueDiligence],
    },
    disclaimer: {
      eyebrow: "Legal & Privacy",
      title: "Professional Disclaimers",
      intro:
        "General, listing and due diligence disclaimers applicable to the information published on this website.",
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
                  (p) =>
                    `<p class="text-[1.03rem] leading-[1.85] text-ink/82">${p}</p>`,
                )
                .join("")}
            </div>
          </article>`,
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
