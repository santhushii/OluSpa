export type SocialIcon = "facebook" | "instagram" | "twitter" | "tiktok";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Feature = {
  key: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  hours?: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
    url: string;
    ogImage: string;
  };
  branding: {
    primaryLogo: string;
    footerLogo: string;
    awardBadge: string;
  };
  navigation: {
    links: ReadonlyArray<NavLink>;
    cta: {
      label: string;
      href: string;
    };
    overlay: {
      socials: ReadonlyArray<SocialLink>;
      contact: ContactInfo;
      copyright: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    image: string;
    images?: ReadonlyArray<string>;
    imageAlt: string;
    badgeLabel?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  featuresIntro: string;
  features: ReadonlyArray<Feature>;
  cta: {
    title: string;
    text: string;
    contact: ContactInfo;
  };
  footer: {
    partners: ReadonlyArray<{ label: string; href: string }>;
    socials: ReadonlyArray<SocialLink>;
    note: string;
  };
  gallery?: {
    images: ReadonlyArray<{
      src: string;
      alt: string;
      category?: string;
    }>;
  };
  whatsapp?: {
    phone: string;
    message?: string;
  };
  testimonials?: {
    items: ReadonlyArray<{
      name: string;
      location?: string;
      rating: number;
      text: string;
      date?: string;
    }>;
  };
  faq?: {
    items: ReadonlyArray<{
      question: string;
      answer: string;
    }>;
  };
  stats?: {
    items: ReadonlyArray<{
      number: number;
      suffix?: string;
      label: string;
      description?: string;
    }>;
  };
};


