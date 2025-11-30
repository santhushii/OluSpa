/**
 * WhatsApp Utility Functions
 * 
 * Generates WhatsApp URLs and messages for bookings
 */

export interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  specialNotes?: string | null;
  bookingId?: number;
}

/**
 * Format phone number for WhatsApp (remove all non-digits)
 */
export function formatPhoneForWhatsApp(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Format date for better readability in messages
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString + "T00:00:00");
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return dateString;
  }
}

/**
 * Generate admin WhatsApp message with booking details
 */
export function generateAdminMessage(data: BookingData): string {
  const bookingIdText = data.bookingId
    ? `\n📋 *Booking ID:* ${data.bookingId}`
    : "";
  
  return `🕉️ *NEW BOOKING - OLU Ayurveda Beach Resort*${bookingIdText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *Customer Details:*
   Name: ${data.fullName}
   Email: ${data.email}
   Phone: ${data.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💆 *Treatment:* ${data.treatment}
📅 *Preferred Date:* ${formatDate(data.preferredDate)}
⏰ *Preferred Time:* ${data.preferredTime}

${data.specialNotes ? `📝 *Customer Notes:*\n${data.specialNotes}\n\n` : ""}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ *Received:* ${new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}

Please confirm this booking with the customer. Thank you! 🙏`;
}

/**
 * Generate customer confirmation WhatsApp message
 */
export function generateCustomerConfirmation(data: BookingData): string {
  const bookingIdText = data.bookingId
    ? `\n📋 *Your Booking ID:* ${data.bookingId}\n`
    : "\n";
  
  return `🕉️ *Thank you for your booking, ${data.fullName}!*

${bookingIdText}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We're delighted to confirm your reservation at *OLU Ayurveda Beach Resort*.

📋 *Booking Details:*
   💆 Treatment: ${data.treatment}
   📅 Date: ${formatDate(data.preferredDate)}
   ⏰ Time: ${data.preferredTime}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Our team will review your booking and send a final confirmation shortly. If you have any questions or need to make changes, please don't hesitate to contact us.

Thank you for choosing OLU Ayurveda Beach Resort! 🙏`;
}

/**
 * Generate WhatsApp URL
 */
export function generateWhatsAppUrl(phone: string, message: string): string {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp in new window/tab
 */
export function openWhatsApp(phone: string, message: string): void {
  const url = generateWhatsAppUrl(phone, message);
  const newWindow = window.open(url, "_blank");
  if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
    // Fallback: navigate in current window
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  }
}

