export const sanitizeTelHref = (value: string) => value.replace(/\s+/g, "");

export const formatPhoneForWhatsApp = (value: string) => value.replace(/\D/g, "");


