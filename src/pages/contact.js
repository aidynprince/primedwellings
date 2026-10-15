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
              </div>`,
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
                .map(
                  (s) =>
                    `<span class="label-sm border border-dashed border-rule px-3 py-2 text-muted">${s} ${""}</span>`,
                )
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
              intro:
                "Tell us what you are looking for and a member of our team will get in touch.",
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
