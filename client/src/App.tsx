import SEO from "./components/SEO";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import SkipToContent from "./components/SkipToContent";
import BackToTop from "./components/BackToTop";
import { useState, useEffect } from "react";
import DownloadButton from "./components/DownloadButton";
import Gallery from "./components/Gallery";
import WhatsAppButton from "./components/WhatsAppButton";
import FAQ from "./components/FAQ";
import Stats from "./components/Stats";
import ScrollProgress from "./components/ScrollProgress";
import TreatmentModal from "./components/TreatmentModal";
import BookingModal from "./components/BookingModal";
import type { Feature } from "./types/content";
import { site } from "./data/content";
import { buildGoogleMapsLink, sanitizeTelHref } from "./utils/format";
import { fadeUp, staggerContainer } from "./utils/variants";

export default function App() {
  const {
    hero,
    branding,
    navigation,
    featuresIntro,
    features,
    cta: { title: ctaTitle, text: ctaText, contact },
    footer,
    gallery,
    whatsapp,
    faq,
    stats
  } = site;

  const [selectedTreatment, setSelectedTreatment] = useState<Feature | null>(null);
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [preferredTreatment, setPreferredTreatment] = useState<string | undefined>(undefined);

  const openBooking = (treatment?: Feature | null) => {
    setPreferredTreatment(treatment?.title);
    setBookingOpen(true);
  };

  useEffect(() => {
    // Preload critical images
    const preloadImages = () => {
      const criticalImages = [
        site.hero.image,
        ...(site.hero.images || []).slice(0, 3),
        site.branding.primaryLogo
      ];
      criticalImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadImages();

    // Add loaded class to body after a short delay
    const bodyTimer = setTimeout(() => {
      document.body.classList.add("loaded");
    }, 1000);

    return () => clearTimeout(bodyTimer);
  }, []);

  // Structured Data for LocalBusiness (Spa/Health & Beauty)
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "OLU Ayurveda Beach Resort",
    "description": site.meta.description,
    "url": site.meta.url,
    "logo": `${site.meta.url}${site.branding.primaryLogo}`,
    "image": `${site.meta.url}${site.meta.ogImage}`,
    "telephone": contact.phone,
    "email": contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#810/15, Maradana Road, Thalaramba, Kaburugamuwa",
      "addressLocality": "Mirissa",
      "addressRegion": "Southern Province",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "5.9456",
      "longitude": "80.4525"
    },
    "openingHours": "Mo-Su 08:00-21:00",
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ayurveda Treatments",
      "itemListElement": features.map((feature, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature.title,
          "description": feature.description,
          "provider": {
            "@type": "HealthAndBeautyBusiness",
            "name": "OLU Ayurveda Beach Resort"
          }
        },
        "position": index + 1
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": stats?.items.find(s => s.label.includes("Guests"))?.number || 1250
    },
    "sameAs": [
      "https://www.tripadvisor.com/Hotel_Review-g1407334-d23322057-Reviews-Olu_Ayurveda_Beach_Resort-Mirissa_Southern_Province.html",
      "https://www.agoda.com/olu-ayurveda-beach-resort/hotel/mirissa-lk.html"
    ]
  };

  // FAQ Structured Data
  const faqStructuredData = faq && faq.items.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <>
      <SEO
        title={site.hero.title}
        description={site.meta.description}
        keywords={site.meta.keywords}
        image={site.meta.ogImage}
        url={site.meta.url}
        type="website"
        structuredData={[businessStructuredData, ...(faqStructuredData ? [faqStructuredData] : [])]}
        twitterHandle={site.meta.twitterHandle}
        siteName={site.meta.siteName}
        locale={site.meta.locale}
        author={site.meta.author}
      />

      <div>
        <ScrollProgress />
        <SkipToContent />
        <Navbar branding={branding} navigation={navigation} onCtaClick={() => openBooking()} />
        <main id="top">
        <Hero {...hero} onPrimaryAction={() => openBooking()} />

        <Section title="Wellness at a Glance" id="wellness" leaf>
          <motion.p 
            className="max-w-3xl mx-auto text-center text-olu-body leading-relaxed text-base md:text-lg lg:text-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {featuresIntro}
          </motion.p>
        </Section>

        {stats && stats.items.length > 0 && (
          <Section title="Why Choose Us" id="stats" leaf>
            <Stats stats={stats.items} />
          </Section>
        )}

        <Section title="Our Treatments & Packages" subdued id="treatments" leaf>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-10 flex items-center justify-center"
          >
            <DownloadButton treatments={features} contactInfo={contact} />
          </motion.div>
          <FeatureGrid
            items={features}
            onItemClick={(item) => setSelectedTreatment(item)}
          />
        </Section>

        {gallery && gallery.images.length > 0 && (
          <Section title="Gallery" id="gallery" subdued leaf>
            <Gallery images={gallery.images} />
          </Section>
        )}

        {faq && faq.items.length > 0 && (
          <Section title="Frequently Asked Questions" id="faq" leaf>
            <FAQ faqs={faq.items} />
          </Section>
        )}

        <Section title={ctaTitle} id="book" leaf>
          <motion.div 
            className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="space-y-3 text-olu-body"
              variants={fadeUp}
            >
              <p className="text-base leading-relaxed">{ctaText}</p>
              <dl className="space-y-2 text-sm">
                {[
                  {
                    label: "Phone",
                    value: contact.phone,
                    href: `tel:${sanitizeTelHref(contact.phone)}`
                  },
                  {
                    label: "Email",
                    value: contact.email,
                    href: `mailto:${contact.email}`
                  },
                  {
                    label: "Address",
                    value: contact.address,
                    href: buildGoogleMapsLink(contact.address),
                    external: true
                  },
                  contact.hours ? { label: "Hours", value: contact.hours } : null
                ]
                  .filter(Boolean)
                  .map((item, index) => (
                  <motion.div
                    key={item?.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <dt className="font-semibold text-olu-ink">{item?.label}</dt>
                    <dd>
                      {item?.href ? (
                        <a
                          className="text-olu-green hover:text-olu-green-700 transition-colors duration-200 inline-block hover:translate-x-1"
                          href={item.href}
                          target={item?.external ? "_blank" : undefined}
                          rel={item?.external ? "noreferrer" : undefined}
                          aria-label={`${item.label} ${item.value}`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        item?.value
                      )}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
            <motion.div 
              className="bg-white/95 rounded-3xl ring-1 ring-olu-beige/80 p-6 shadow-soft hover:shadow-xl transition-shadow duration-300"
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-sm text-olu-body leading-relaxed">
                Prefer a personal touch? Call us directly, send an email, or reserve instantly and our team will confirm your preferred schedule.
              </p>
              <motion.button
                type="button"
                onClick={() => openBooking()}
                className="mt-3 inline-flex items-center justify-center rounded-full border-2 border-olu-green px-7 py-3 text-sm font-semibold text-olu-green transition-all duration-200 hover:bg-olu-green hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reserve via WhatsApp
              </motion.button>
            </motion.div>
          </motion.div>
        </Section>
      </main>

        <Footer branding={branding} contact={contact} footer={footer} />
        <BackToTop />
        {whatsapp && <WhatsAppButton phone={whatsapp.phone} message={whatsapp.message} />}
        <TreatmentModal
          treatment={selectedTreatment}
          isOpen={!!selectedTreatment}
          onClose={() => setSelectedTreatment(null)}
          onBook={(treatment) => openBooking(treatment)}
        />
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setBookingOpen(false)}
          treatments={features}
          defaultTreatment={preferredTreatment}
          whatsappPhone={whatsapp.phone}
        />
      </div>
    </>
  );
}

