/**
 * Booking Helper (Frontend-Only)
 * 
 * Generates WhatsApp URLs directly in the frontend
 */

import { generateAdminMessage, generateCustomerConfirmation, generateWhatsAppUrl, formatPhoneForWhatsApp } from "../utils/whatsapp";

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  specialNotes?: string | null;
}

export interface BookingResult {
  success: boolean;
  message: string;
  bookingId: number;
  whatsappUrls: {
    admin: string;
    customer: string;
  };
  whatsappMessages: {
    admin: string;
    customer: string;
  };
}

/**
 * Process booking and generate WhatsApp URLs
 * 
 * @param bookingData - The booking form data
 * @param adminPhone - Admin WhatsApp number (from site config)
 * @returns BookingResult with WhatsApp URLs
 */
export function processBooking(
  bookingData: BookingFormData,
  adminPhone: string
): BookingResult {
  // Generate booking ID (timestamp-based)
  const bookingId = Date.now();

  // Validate date format
  let dateValue: string;
  try {
    const date = new Date(bookingData.preferredDate);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    dateValue = date.toISOString().split("T")[0];
  } catch (error) {
    return {
      success: false,
      message: "Invalid date format. Please use a valid date.",
      bookingId: 0,
      whatsappUrls: { admin: "", customer: "" },
      whatsappMessages: { admin: "", customer: "" }
    };
  }

  // Prepare booking data with ID
  const bookingDataWithId = {
    ...bookingData,
    preferredDate: dateValue,
    bookingId
  };

  // Generate WhatsApp messages
  const adminMessage = generateAdminMessage(bookingDataWithId);
  const customerMessage = generateCustomerConfirmation(bookingDataWithId);

  // Generate WhatsApp URLs
  const adminPhoneFormatted = formatPhoneForWhatsApp(adminPhone);
  const customerPhoneFormatted = formatPhoneForWhatsApp(bookingData.phone);
  
  const adminWhatsAppUrl = generateWhatsAppUrl(adminPhoneFormatted, adminMessage);
  const customerWhatsAppUrl = generateWhatsAppUrl(customerPhoneFormatted, customerMessage);

  return {
    success: true,
    message: "Booking processed successfully",
    bookingId,
    whatsappUrls: {
      admin: adminWhatsAppUrl,
      customer: customerWhatsAppUrl
    },
    whatsappMessages: {
      admin: adminMessage,
      customer: customerMessage
    }
  };
}
