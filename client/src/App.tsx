import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import SkipToContent from "./components/SkipToContent";
import BackToTop from "./components/BackToTop";
import { useState } from "react";
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
import { sanitizeTelHref } from "./utils/format";
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

  return (
    <>
      <Helmet>
        <title>{site.meta.title}</title>
        <meta name="description" content={site.meta.description} />
        <meta property="og:title" content={site.meta.title} />
        <meta property="og:description" content={site.meta.description} />
        <meta property="og:image" content={site.meta.ogImage} />
        <meta property="og:url" content={site.meta.url} />
        <meta property="og:type" content="website" />
        <meta name="apple-mobile-web-app-title" content="OLU Ayurveda" />
        <link rel="canonical" href={site.meta.url} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <ScrollProgress />
      <SkipToContent />
      <Navbar branding={branding} navigation={navigation} />
      <main id="top">
        <Hero {...hero} onPrimaryAction={() => openBooking()} />

        <Section title="Wellness at a Glance" id="wellness" leaf>
          <motion.p 
            className="max-w-3xl text-olu-body leading-relaxed text-base md:text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="mb-8 flex items-center justify-center"
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
                  { label: "Phone", value: contact.phone, href: `tel:${sanitizeTelHref(contact.phone)}`, type: "phone" },
                  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, type: "email" },
                  { label: "Address", value: contact.address },
                  contact.hours ? { label: "Hours", value: contact.hours } : null
                ].filter(Boolean).map((item, index) => (
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
              <motion.a
                href={`mailto:${contact.email}`}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-olu-green px-7 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-olu-seafoam hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green"
                aria-label="Enquire about Ayurveda treatments by email"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enquire Now
              </motion.a>
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
    </>
  );
}

