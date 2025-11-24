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
  hours: "Daily 8:00 AM – 9:00 PM"
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
    badgeLabel: undefined,
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
        answer: "Ayurveda is a holistic system from India that balances body, mind, and spirit with herbs, oils, massage, and lifestyle guidance. We review your dosha (body type) during consultation and tailor therapies to restore harmony."
      },
      {
        question: "Do I need to book treatments in advance?",
        answer: "Advance bookings are best, especially on weekends and holidays. Use the website form, call us, or send a WhatsApp message. Walk-ins are welcome when slots are free."
      },
      {
        question: "What should I wear for treatments?",
        answer: "Arrive in light, loose outfits. We provide disposable garments for body therapies and towels for comfort. Bring or wear stretch-friendly clothing for yoga."
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
        answer: "Yes. Each session begins with a simple briefing and pressure checks so you can relax even if it’s your first time. Feel free to pause and ask questions anytime."
      },
      {
        question: "What are your operating hours?",
        answer: "We open daily from 8.00 AM to 8.00 PM. Evening or early-morning slots can be arranged for in-house guests with 24 hours’ notice."
      },
      {
        question: "Do you offer accommodation packages?",
        answer: "Yes. Our wellness stays include rooms, daily treatments, meals, and consultations. Share your preferred length of stay and we will send a personalised itinerary."
      },
      {
        question: "Is there parking available?",
        answer: "Complimentary on-site parking is available near the main entrance. Tell us if you require assistance or reserved space for larger vehicles."
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


