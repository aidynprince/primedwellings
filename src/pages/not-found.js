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
