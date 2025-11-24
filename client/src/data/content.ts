import type { ContactInfo, SiteContent, SocialLink } from "../types/content";

const sharedSocials: ReadonlyArray<SocialLink> = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@oluayurveda", icon: "tiktok" }
] as const;

const primaryContact: ContactInfo = {
  phone: "+94 77 209 6730",
  email: "info@oluayurvedabeach.lk",
  address: "#810/15, Maradana Road, Thalaramba, Kaburugamuwa, Mirissa, Sri Lanka",
  hours: "Daily 8:00 AM – 8:00 PM"
};

export const site = {
  meta: {
    title: "Ayurveda Treatments | OLU Ayurveda Beach Villa",
    description:
      "Rejuvenating therapies in a serene beach-side setting: therapeutic massage, Ayurvedic treatments, acupuncture, spa packages, facial treatments, and yoga.",
    url: "https://example.com/ayurveda",
    ogImage: "/og/og.jpg"
  },
  branding: {
    primaryLogo: "/img/logo-mark.jpg",
    footerLogo: "/img/logo-mark.jpg",
    awardBadge: "/img/bestweb-badge.svg"
  },
  navigation: {
    links: [
      { label: "Home", href: "/" },
      { label: "Rooms", href: "#rooms" },
      { label: "Gallery", href: "#gallery" },
      { label: "Ayurveda Treatments", href: "#treatments" },
      { label: "Contact", href: "#book" }
    ],
    cta: {
      label: "Book Now",
      href: "#book"
    },
    overlay: {
      socials: sharedSocials,
      contact: primaryContact,
      copyright: "Copyright © 2025 - Olu Ayurveda Beach Resort - All Rights Reserved"
    }
  },
  hero: {
    title: "Ayurveda Treatments",
    subtitle:
      "Rejuvenating, traditional therapies by experienced practitioners in a serene beach-side retreat.",
    image: "/img/hero.jpg",
    imageAlt: "Herbal oils and flowers in a serene spa setting",
    badgeLabel: "Serene Coastal Retreat",
    ctaLabel: "Book Now",
    ctaHref: "#book"
  },
  featuresIntro:
    "Discover a curated range of ancient and modern wellness therapies designed to balance mind, body, and spirit.",
  features: [
    {
      key: "therapeutic-massage",
      title: "Therapeutic Massage",
      description:
        "Relieve tension, improve circulation, and restore calm with targeted pressure and flowing techniques.",
      image: "/img/therapeutic-massage.jpg",
      alt: "Therapeutic massage in a tranquil setting"
    },
    {
      key: "ayurvedic-treatments",
      title: "Ayurvedic Treatments",
      description:
        "Personalized therapies guided by Ayurvedic principles to balance doshas and enhance vitality.",
      image: "/img/ayurvedic-treatments.jpg",
      alt: "Ayurvedic oils and herbs"
    },
    {
      key: "acupuncture",
      title: "Acupuncture",
      description:
        "Gentle, precise stimulation points to support energy flow, pain relief, and deep relaxation.",
      image: "/img/acupuncture.jpg",
      alt: "Acupuncture therapy session"
    },
    {
      key: "spa-packages",
      title: "Spa Packages",
      description:
        "Curated bundles that combine massage, herbal steam, and body rituals for full rejuvenation.",
      image: "/img/spa-packages.jpg",
      alt: "Spa package essentials"
    },
    {
      key: "facial-treatments",
      title: "Facial Treatments",
      description: "Nourishing facials using herbal blends for refreshed, glowing skin.",
      image: "/img/facial-treatments.jpg",
      alt: "Ayurvedic facial care"
    },
    {
      key: "yoga",
      title: "Yoga",
      description:
        "Gentle postures and breathwork to cultivate balance, flexibility, and inner peace.",
      image: "/img/yoga.jpg",
      alt: "Yoga by the beach"
    }
  ],
  cta: {
    title: "Book Your Treatment",
    text: "Our team will help you select the right therapy and arrange your session.",
    contact: primaryContact
  },
  footer: {
    partners: [
      { label: "Tripadvisor", href: "https://www.tripadvisor.com/Hotel_Review-g1407334-d23322057-Reviews-Olu_Ayurveda_Beach_Resort-Mirissa_Southern_Province.html" },
      { label: "Agoda", href: "https://www.agoda.com/olu-ayurveda-beach-resort/hotel/mirissa-lk.html?cid=1844104&ds=cRT8q680i9byajnE" },
      { label: "Booking.com", href: "https://www.booking.com/hotel/lk/olu-ayurveda-beach-resort.html?aid=356980&label=gog235jc-10CAsohQFCGW9sdS1heXVydmVkYS1iZWFjaC1yZXNvcnRIM1gDaIUBiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuALc_t3IBsACAdICJGQ4YjY2MDQyLWExMDQtNGRjZi1iMzY1LWNmMjA0ZjkxYzdkY9gCAeACAQ&sid=c56c2d17a032b5e7e98bc9dd08389b2a&dest_id=-2228935&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1763147622&srpvid=26dd872eaca40d3d&type=total&ucfs=1&" }
    ],
    socials: sharedSocials,
    note: "Copyright © 2025 - OLU Ayurveda Beach Resort - All Rights Reserved. Concept, Design & Development by DW Marketing"
  },
  gallery: {
    images: [
      { src: "/img/hero.jpg", alt: "OLU Ayurveda Beach Resort exterior", category: "Resort" },
      { src: "/img/therapeutic-massage.jpg", alt: "Therapeutic massage session", category: "Treatments" },
      { src: "/img/ayurvedic-treatments.jpg", alt: "Ayurvedic oils and herbs", category: "Treatments" },
      { src: "/img/acupuncture.jpg", alt: "Acupuncture therapy session", category: "Treatments" },
      { src: "/img/spa-packages.jpg", alt: "Spa package essentials", category: "Treatments" },
      { src: "/img/facial-treatments.jpg", alt: "Ayurvedic facial care", category: "Treatments" },
      { src: "/img/yoga.jpg", alt: "Yoga by the beach", category: "Activities" },
      { src: "/img/hero.jpg", alt: "Serene beach setting", category: "Resort" }
    ]
  },
  whatsapp: {
    phone: "+94 77 503 0038",
    message: "Hello! I'm interested in learning more about your Ayurveda treatments and would like to book a session."
  },
  testimonials: {
    items: [
      {
        name: "Sarah Johnson",
        location: "United Kingdom",
        rating: 5,
        text: "An absolutely transformative experience! The Ayurvedic treatments here are authentic and the practitioners are incredibly knowledgeable. The serene beach-side setting made it perfect for relaxation and healing.",
        date: "December 2024"
      },
      {
        name: "Michael Chen",
        location: "Singapore",
        rating: 5,
        text: "The therapeutic massage sessions were outstanding. The therapists understood exactly what my body needed. Combined with the peaceful environment, it was exactly what I needed for my wellness journey.",
        date: "November 2024"
      },
      {
        name: "Emma Williams",
        location: "Australia",
        rating: 5,
        text: "I've tried many spas, but OLU Ayurveda Beach Resort stands out. The personalized approach, traditional techniques, and beautiful location create an unforgettable experience. Highly recommended!",
        date: "January 2025"
      },
      {
        name: "David Kumar",
        location: "India",
        rating: 5,
        text: "As someone familiar with Ayurveda, I can say the treatments here are genuine and effective. The practitioners are well-trained and the facilities are excellent. A true wellness sanctuary.",
        date: "December 2024"
      },
      {
        name: "Lisa Anderson",
        location: "Canada",
        rating: 5,
        text: "The yoga sessions by the beach during sunrise were magical. The entire experience - from treatments to accommodation - exceeded my expectations. I left feeling completely rejuvenated.",
        date: "November 2024"
      },
      {
        name: "James Wilson",
        location: "United States",
        rating: 5,
        text: "The acupuncture treatments helped significantly with my chronic pain. The staff is professional, caring, and truly dedicated to your wellbeing. This is a hidden gem in Sri Lanka!",
        date: "January 2025"
      }
    ]
  },
  faq: {
    items: [
      {
        question: "What is Ayurveda and how does it work?",
        answer: "Ayurveda is an ancient holistic healing system from India that focuses on balancing the body, mind, and spirit. It uses natural therapies, herbal remedies, massage, and lifestyle modifications to restore harmony and promote optimal health. Our practitioners assess your unique constitution (dosha) and create personalized treatment plans."
      },
      {
        question: "Do I need to book treatments in advance?",
        answer: "Yes, we recommend booking treatments in advance to ensure availability, especially during peak seasons. You can book through our website, call us directly, or message us via WhatsApp. We also accept walk-ins subject to availability."
      },
      {
        question: "What should I wear for treatments?",
        answer: "Comfortable, loose-fitting clothing is recommended. For massage and body treatments, disposable garments are provided for your comfort and privacy. For yoga sessions, comfortable athletic wear is ideal."
      },
      {
        question: "How long do treatments typically last?",
        answer: `Massage & therapy duration guide:
- Full Body Massage: 60 or 90 minutes
- Deep Tissue Full Body Massage: 60 or 90 minutes
- Synchronized Full Body Massage: 45 minutes
- Head and Shoulder Massage: 30 minutes
- Face Massage: 20 minutes
- Neck and Shoulder Massage: 30 minutes
- Back and Leg Massage: 30 minutes
- Leg and Foot Massage: 30, 45, or 60 minutes
- Foot Massage: 15 or 30 minutes
- Foot Reflexology Massage: 30 or 45 minutes
- Shirodhara: 20 minutes`
      },
      {
        question: "Are the treatments suitable for beginners?",
        answer: "Absolutely! Our practitioners are experienced in working with people new to Ayurveda and alternative therapies. We'll explain everything beforehand and ensure you're comfortable throughout your treatment. We welcome all levels of experience."
      },
      {
        question: "What are your operating hours?",
        answer: "We're open daily from 8:00 AM to 8:00 PM. However, specific treatment availability may vary, so we recommend calling ahead or booking online. We can also arrange treatments outside these hours for resort guests."
      },
      {
        question: "Do you offer accommodation packages?",
        answer: "Yes, we offer wellness packages that combine accommodations with treatment programs. These packages are designed for guests seeking immersive healing experiences. Please contact us for details about accommodation and wellness packages."
      },
      {
        question: "Is there parking available?",
        answer: "Yes, we have parking available for guests. The parking area is located near the entrance and is free of charge. If you have any special requirements, please let us know when you book."
      }
    ]
  },
  stats: {
    items: [
      {
        number: 1250,
        suffix: "+",
        label: "Guests",
        description: "Welcomed visitors worldwide"
      },
      {
        number: 15,
        suffix: "+",
        label: "Years Experience",
        description: "Dedicated to wellness"
      },
      {
        number: 6,
        suffix: "",
        label: "Treatment Types",
        description: "Comprehensive wellness"
      },
      {
        number: 98,
        suffix: "%",
        label: "Satisfaction Rate",
        description: "Guest approval rating"
      }
    ]
  }
} satisfies SiteContent;


