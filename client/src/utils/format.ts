export const sanitizeTelHref = (value: string) => value.replace(/\s+/g, "");

export const formatPhoneForWhatsApp = (value: string) => value.replace(/\D/g, "");

export const buildGoogleMapsLink = (value: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;


