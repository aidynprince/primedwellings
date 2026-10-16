import { contact, enquiryTopics, firm, services } from "./data.js";

/* Placeholder token — information the firm has not yet supplied/approved. */
export function ph(text) {
  return '<span class="ph">To be supplied &middot; ' + text + "</span>";
}

export function phDark(text) {
  return '<span class="ph ph-dark">To be supplied &middot; ' + text + "</span>";
}

export function logoLockup(dark = false, compact = false) {
  return `
  <a href="#/" class="flex items-center gap-3 group">
    <span class="logo-icon ${dark ? "logo-icon-plate" : ""}" role="img" aria-label="${firm.name} logo mark"></span>
    <span class="leading-tight ${compact ? "hidden sm:block" : ""}">
      <span class="block font-display text-[1.02rem] sm:text-[1.12rem] font-semibold tracking-[-0.015em] ${
        dark ? "text-paper" : "text-registry"
      }">Prime Dwellings</span>
      <span class="block label-sm ${dark ? "text-registry-soft/80" : "text-muted"}">and Properties Limited</span>
    </span>
  </a>`;
}

const navItems = [
  { href: "#/", label: "Home" },
  { href: "#/about", label: "About Us" },
  { href: "#/services", label: "Our Services" },
  { href: "#/properties", label: "Properties" },
  { href: "#/contact", label: "Contact Us" },
];

export function header() {
  return `
  <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-registry focus:text-paper focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em]">Skip to content</a>
  <header class="sticky top-0 z-40">
    <div class="bg-registry text-paper">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div class="flex items-center justify-between gap-x-4 gap-y-1.5 py-1.5 sm:py-2">
          <p class="label-sm text-[0.55rem] tracking-[0.08em] sm:text-[0.625rem] sm:tracking-[0.22em] text-registry-soft/80 min-w-0">${firm.descriptor}</p>
          <div class="flex items-center gap-4 sm:gap-6 ml-auto">
            <span class="hidden lg:inline label-sm text-registry-soft/80">Enquiries &middot; Ghana &amp; the Diaspora</span>
            <a href="#/contact" class="hidden lg:inline-block label-sm bg-paper text-registry hover:bg-laterite hover:text-primary px-3 py-1.5 transition-colors shrink-0">Contact Us &rarr;</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile floating call icon (bottom-right) -->
    <a
      href="#/contact"
      class="lg:hidden fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 bg-paper text-primary hover:bg-primary hover:text-paper border border-registry/25 transition-all duration-200 active:scale-95"
      aria-label="Contact us"
      title="Contact us"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    </a>

    <div class="bg-paper/95 backdrop-blur-sm border-b border-rule">
      <div class="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div class="flex items-center justify-between gap-6 py-3 sm:py-4">
          ${logoLockup(false, true)}
          <nav class="hidden lg:flex items-center gap-8" aria-label="Primary">
            ${navItems
              .map(
                (item) => `
              <a href="${item.href}" data-nav="${item.href}" class="relative label text-ink/80 hover:text-registry transition-colors py-2">
                ${item.label}
                <span class="nav-underline absolute left-0 -bottom-0.5 h-[2px] w-full bg-laterite origin-left scale-x-0 transition-transform duration-200"></span>
              </a>`
              )
              .join("")}
            <a href="#/properties" class="btn btn-primary !py-3 !px-5">View Properties</a>
          </nav>
          <button id="menu-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobile-nav" class="lg:hidden flex items-center justify-center w-11 h-11 border border-rule shrink-0">
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path d="M0 1h18M0 6h18M0 11h18" stroke="#0b1f4b" stroke-width="1.6"/></svg>
          </button>
        </div>
      </div>
      <div id="mobile-nav" class="lg:hidden hidden border-t border-rule bg-paper-2">
        <nav class="mx-auto max-w-[1240px] px-5 sm:px-8 py-3" aria-label="Mobile">
          ${navItems
            .map(
              (item) => `
            <a href="${item.href}" data-nav="${item.href}" class="flex items-center justify-between border-b border-rule-soft py-3.5 label text-ink hover:text-registry">
              ${item.label}<span class="text-laterite">&rarr;</span>
            </a>`
            )
            .join("")}
          <a href="#/contact" class="btn btn-primary w-full mt-4 mb-2">Speak to an Adviser</a>
        </nav>
      </div>
    </div>
  </header>`;
}

export function footer() {
  return `
  <footer class="bg-registry-deep text-paper relative overflow-hidden">
    <div class="absolute inset-0 plan-grid-light opacity-70" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-[1240px] px-5 sm:px-8 pt-16 pb-10">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          ${logoLockup(true)}
          <p class="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-registry-soft/85">
            A professional real estate and property advisory firm assisting persons who wish to acquire various forms of interests in immovable property in Ghana.
          </p>
          <p class="mt-6 label-sm text-registry-soft/60">Client enquiries &middot; Ghana &amp; the Diaspora</p>
        </div>

        <div class="lg:col-span-2">
          <h2 class="label text-laterite-soft">Explore</h2>
          <ul class="mt-5 space-y-3">
            ${navItems
              .map(
                (i) =>
                  `<li><a href="${i.href}" class="text-[0.95rem] text-registry-soft/85 hover:text-paper transition-colors link-underline">${i.label}</a></li>`
              )
              .join("")}
            <li><a href="#/privacy" class="text-[0.95rem] text-registry-soft/85 hover:text-paper transition-colors link-underline">Legal</a></li>
          </ul>
        </div>

        <div class="lg:col-span-3">
          <h2 class="label text-laterite-soft">Services</h2>
          <ul class="mt-5 space-y-3">
            ${services
              .slice(0, 6)
              .map(
                (s) =>
                  `<li><a href="#/services#${s.id}" class="text-[0.95rem] text-registry-soft/85 hover:text-paper transition-colors link-underline">${s.title}</a></li>`
              )
              .join("")}
          </ul>
        </div>

        <div class="lg:col-span-3">
          <h2 class="label text-laterite-soft">Contact</h2>
          <dl class="mt-5 space-y-4">
            <div>
              <dt class="label-sm text-registry-soft/60">Telephone</dt>
              <dd class="mt-1.5">${phDark("telephone")}</dd>
            </div>
            <div>
              <dt class="label-sm text-registry-soft/60">WhatsApp</dt>
              <dd class="mt-1.5">${phDark("whatsapp")}</dd>
            </div>
            <div>
              <dt class="label-sm text-registry-soft/60">Email</dt>
              <dd class="mt-1.5">${phDark("email address")}</dd>
            </div>
            <div>
              <dt class="label-sm text-registry-soft/60">Office</dt>
              <dd class="mt-1.5">${phDark("office address")}</dd>
            </div>
          </dl>
          <div class="mt-6">
            <h3 class="label-sm text-registry-soft/60">Follow Us</h3>
            <div class="mt-2.5 flex flex-wrap gap-2">
              ${contact.social.map((s) => phDark(s.label)).join("")}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-14 pt-7 border-t border-paper/15">
        <p class="text-xs leading-relaxed text-registry-soft/65 max-w-4xl">
          The information provided on this website is for general information purposes and does not, by itself, constitute formal legal, financial, investment or professional advice. Property listings are provided for information and enquiry purposes; availability, pricing and specifications may change without prior notice.
        </p>
        <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p class="label-sm text-registry-soft/60">&copy; ${new Date().getFullYear()} ${firm.name}. All rights reserved.</p>
          <div class="flex flex-wrap gap-x-7 gap-y-2">
            <a href="#/privacy" class="label-sm text-registry-soft/75 hover:text-paper transition-colors">Privacy Policy</a>
            <a href="#/terms" class="label-sm text-registry-soft/75 hover:text-paper transition-colors">Terms of Use</a>
            <a href="#/disclaimer" class="label-sm text-registry-soft/75 hover:text-paper transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ---------------------------- Page header ---------------------------- */

export function pageHead({ eyebrow, title, lead, meta }) {
  return `
  <section class="relative border-b border-rule bg-paper-2 overflow-hidden">
    <div class="absolute inset-0 plan-grid opacity-80" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-[1240px] px-5 sm:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div class="grid gap-8 lg:grid-cols-12 items-end">
        <div class="lg:col-span-7">
          <p class="label text-laterite">${eyebrow}</p>
          <h1 class="mt-5 font-display text-registry leading-[0.95] text-[clamp(2.5rem,6.5vw,4.6rem)] font-semibold tracking-[-0.03em]">${title}</h1>
        </div>
        <div class="lg:col-span-5">
          ${
            lead
              ? `<p class="text-[1.06rem] sm:text-[1.15rem] leading-[1.75] text-ink/85 border-l-2 border-laterite pl-6">${lead}</p>`
              : ""
          }
          ${meta ? `<p class="mt-5 label-sm text-muted">${meta}</p>` : ""}
        </div>
      </div>
    </div>
  </section>`;
}

/* ----------------------------- CTA band ----------------------------- */

export function ctaBand() {
  return `
  <section class="relative bg-registry text-paper overflow-hidden">
    <div class="absolute inset-0 plan-grid-light opacity-70" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-16 sm:py-20">
      <div class="grid gap-10 lg:grid-cols-12 items-end">
        <div class="lg:col-span-7">
          <p class="label text-laterite-soft">Speak to Us</p>
          <h2 class="mt-5 font-display text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-paper">
            Let&rsquo;s Discuss Your Property Needs
          </h2>
          <p class="mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-registry-soft/85">
            Tell us what you are looking for and a member of our team will get in touch.
          </p>
        </div>
        <div class="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
          <a href="#/contact" class="btn btn-light">Send an Enquiry</a>
          <a href="#/properties" class="btn btn-outline-light">View Properties</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* --------------------------- Enquiry form --------------------------- */

export function enquiryForm({ id = "enquiry-form", prefill = "", heading = "Send an Enquiry", intro = "" } = {}) {
  return `
  <form id="${id}" class="enquiry-form" novalidate>
    <div class="hp-field" aria-hidden="true">
      <label for="${id}-company">Company</label>
      <input type="text" id="${id}-company" name="company" tabindex="-1" autocomplete="off" />
    </div>

    ${
      heading || intro
        ? `<div class="mb-8">
            ${heading ? `<h2 class="font-display text-[1.75rem] leading-tight text-registry tracking-[-0.02em]">${heading}</h2>` : ""}
            ${intro ? `<p class="mt-3 text-[1rem] leading-[1.75] text-muted max-w-xl">${intro}</p>` : ""}
          </div>`
        : ""
    }

    <div class="grid gap-5 sm:grid-cols-2">
      <div>
        <label for="${id}-name" class="label text-muted">Name <span class="text-laterite">*</span></label>
        <input class="field mt-2" type="text" id="${id}-name" name="name" autocomplete="name" required />
        <p class="error-msg mt-2 hidden label-sm text-laterite">Please enter your name.</p>
      </div>
      <div>
        <label for="${id}-phone" class="label text-muted">Phone Number <span class="text-laterite">*</span></label>
        <input class="field mt-2" type="tel" id="${id}-phone" name="phone" autocomplete="tel" required />
        <p class="error-msg mt-2 hidden label-sm text-laterite">Please enter a phone number we can reach you on.</p>
      </div>
      <div class="sm:col-span-2">
        <label for="${id}-email" class="label text-muted">Email Address</label>
        <input class="field mt-2" type="email" id="${id}-email" name="email" autocomplete="email" />
        <p class="error-msg mt-2 hidden label-sm text-laterite">Please enter a valid email address.</p>
      </div>
      <div class="sm:col-span-2">
        <label for="${id}-subject" class="label text-muted">What can we help you with? <span class="text-laterite">*</span></label>
        <select class="field mt-2" id="${id}-subject" name="subject" required>
          <option value="">Select an option</option>
          ${enquiryTopics
            .map(
              (t) =>
                `<option value="${t}" ${t === prefill ? "selected" : ""}>${t}</option>`
            )
            .join("")}
        </select>
        <p class="error-msg mt-2 hidden label-sm text-laterite">Please select what you need help with.</p>
      </div>
      <div class="sm:col-span-2">
        <label for="${id}-message" class="label text-muted">Message <span class="text-laterite">*</span></label>
        <textarea class="field mt-2" id="${id}-message" name="message" rows="6" required></textarea>
        <p class="error-msg mt-2 hidden label-sm text-laterite">Please tell us a little about your requirement.</p>
      </div>
    </div>

    <div class="mt-8 flex flex-wrap items-center gap-5">
      <button type="submit" class="btn btn-accent">Submit Enquiry</button>
      <p class="text-xs leading-relaxed text-muted max-w-sm">
        We use the details you provide only to respond to your enquiry. See our
        <a href="#/privacy" class="link-underline text-registry">Privacy Policy</a>.
      </p>
    </div>

    <div class="form-success hidden mt-8 border-l-2 border-registry bg-registry/[0.05] p-6">
      <p class="label text-registry">Enquiry recorded</p>
      <p class="mt-3 text-[1.02rem] leading-[1.75] text-ink/85">
        Thank you. Your enquiry has been captured and a member of our team will get in touch with you.
      </p>
      <p class="mt-3 text-sm leading-relaxed text-muted">
        Note for the firm: this Phase 1 form currently records submissions in the browser only. A delivery
        endpoint (email or form service) and spam-protection keys are to be connected before launch.
      </p>
    </div>
  </form>`;
}

/* Honeypot styles live with the component so they are never forgotten. */
export const formStyles = `
  <style>
    .hp-field { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
  </style>
`;
