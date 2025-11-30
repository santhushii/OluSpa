import type { ContactInfo, SiteContent } from "../types/content";
import { sanitizeTelHref } from "../utils/format";
import { SocialIcon } from "./icons/SocialIcon";

type Props = {
  branding: SiteContent["branding"];
  contact: ContactInfo;
  footer: SiteContent["footer"];
};

export default function Footer({ branding, contact, footer }: Props) {
  return (
    <footer className="relative overflow-hidden border-t border-olu-beige/60 bg-olu-cream">
      <div className="absolute inset-x-0 -top-12">
        <img src="/img/footer-brush.jpg" alt="" className="w-full" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-container px-4 sm:px-5 md:px-6 lg:px-4 pt-12 sm:pt-14 md:pt-18 lg:pt-20 pb-8 sm:pb-9 md:pb-10 lg:pb-12 text-olu-body">
        <div className="grid gap-8 sm:gap-9 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Left Column - Address & Logo */}
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <img 
              src={branding.footerLogo} 
              alt="OLU Ayurveda Beach" 
              className="h-20 w-auto sm:h-24 md:h-28 mb-2"
            />
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-olu-body/80">
                <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-olu-green/30 bg-olu-green/5 text-base sm:text-lg text-olu-green flex-shrink-0 mt-0.5">
                  ⌖
                </span>
                <span className="leading-relaxed max-w-xs">{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Middle Column - Contact Info */}
          <div className="flex flex-col items-center gap-4 sm:gap-5 text-center md:items-center">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-olu-ink mb-2">Contact Info</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <a 
                href={`tel:${sanitizeTelHref(contact.phone)}`} 
                className="block text-olu-body hover:text-olu-green transition-colors duration-200 hover:translate-x-1 inline-block"
                aria-label={`Call ${contact.phone}`}
              >
                <span className="font-semibold text-olu-ink">Phone:</span> {contact.phone}
              </a>
              <a 
                href={`mailto:${contact.email}`} 
                className="block text-olu-body hover:text-olu-green transition-colors duration-200 hover:translate-x-1 inline-block"
                aria-label={`Email ${contact.email}`}
              >
                <span className="font-semibold text-olu-ink">Email:</span> {contact.email}
              </a>
              {contact.hours && (
                <p className="text-olu-body/80">
                  <span className="font-semibold text-olu-ink">Hours:</span> {contact.hours}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Social Media */}
          <div className="flex flex-col items-center gap-4 sm:gap-5 text-center md:items-end md:text-right">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-olu-ink mb-2">Follow Us On</h3>
            <div className="flex gap-3">
              {footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-olu-body/20 bg-white/50 text-olu-body transition-all duration-200 hover:border-olu-green hover:text-olu-green hover:bg-white hover:scale-110 hover:shadow-lg active:scale-95"
                >
                  <SocialIcon name={social.icon} title={social.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Partners & Copyright */}
        <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-olu-beige/60 flex flex-col items-center gap-4 sm:gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {footer.partners.map((partner) => (
              <a
                key={partner.label}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/80 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-olu-body/80 shadow-sm hover:bg-white hover:text-olu-green hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label={`Visit ${partner.label}`}
              >
                {partner.label}
              </a>
            ))}
          </div>
          <p className="max-w-3xl text-[10px] sm:text-xs normal-case tracking-normal text-olu-body/60 leading-relaxed px-2">
            {footer.note}
          </p>
        </div>
      </div>
    </footer>
  );
}

