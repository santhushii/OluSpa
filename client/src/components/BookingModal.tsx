import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Feature } from "../types/content";

type BookingPayload = {
  fullName: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  specialNotes: string;
};

type FieldErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  treatment?: string;
  preferredDate?: string;
  preferredTime?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  treatments: Feature[];
  defaultTreatment?: string;
  whatsappPhone: string;
};

const initialState: BookingPayload = {
  fullName: "",
  email: "",
  phone: "",
  treatment: "",
  preferredDate: "",
  preferredTime: "",
  specialNotes: ""
};

export default function BookingModal({
  isOpen,
  onClose,
  treatments,
  defaultTreatment,
  whatsappPhone
}: Props) {
  const [form, setForm] = useState<BookingPayload>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setStatus("idle");
      setError("");
      setFieldErrors({});
      setBookingId(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (defaultTreatment) {
      setForm((prev) => ({
        ...prev,
        treatment: defaultTreatment
      }));
    }
  }, [defaultTreatment]);

  const treatmentOptions = useMemo(
    () => treatments.map((treatment) => treatment.title).sort(),
    [treatments]
  );

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Format: +94 XX XXX XXXX or similar
    if (digits.length === 0) return "";
    if (digits.startsWith("94")) {
      // Sri Lanka format: +94 XX XXX XXXX
      if (digits.length <= 2) return `+${digits}`;
      if (digits.length <= 4) return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
      if (digits.length <= 7) return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
      return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
    } else if (digits.startsWith("0")) {
      // Local format: 0XX XXX XXXX
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
    } else {
      // International format without country code
      if (digits.length <= 3) return `+${digits}`;
      if (digits.length <= 6) return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    
    // Auto-format phone numbers
    if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setForm((prev) => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FieldErrors];
        return newErrors;
      });
    }
  };

  const validateForm = (): { isValid: boolean; errors: FieldErrors } => {
    const errors: FieldErrors = {};

    // Full Name validation
    if (!form.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(form.fullName.trim())) {
      errors.fullName = "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Email validation
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        errors.email = "Please enter a valid email address";
      }
    }

    // Phone validation
    if (!form.phone.trim()) {
      errors.phone = "Phone number is required";
    } else {
      const phoneDigits = form.phone.replace(/\D/g, "");
      if (phoneDigits.length < 8) {
        errors.phone = "Phone number is too short";
      } else if (phoneDigits.length > 15) {
        errors.phone = "Phone number is too long";
      } else if (!/^\+?[\d\s()-]+$/.test(form.phone)) {
        errors.phone = "Please enter a valid phone number (include country code)";
      }
    }

    // Treatment validation
    if (!form.treatment) {
      errors.treatment = "Please select a treatment";
    }

    // Date validation
    if (!form.preferredDate) {
      errors.preferredDate = "Preferred date is required";
    } else {
      const selectedDate = new Date(form.preferredDate + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.preferredDate = "Date cannot be in the past";
      }
      
      // Optional: Check if date is too far in future (e.g., 1 year)
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      if (selectedDate > oneYearFromNow) {
        errors.preferredDate = "Date cannot be more than 1 year in advance";
      }
    }

    // Time validation
    if (!form.preferredTime) {
      errors.preferredTime = "Preferred time is required";
    }

    setFieldErrors(errors);
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const resetForm = () => {
    setForm(initialState);
    setFieldErrors({});
    setBookingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    // Validate required fields
    const errors: FieldErrors = {};

    if (!form.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (!form.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!form.treatment) {
      errors.treatment = "Please select a treatment";
    }

    if (!form.preferredDate) {
      errors.preferredDate = "Preferred date is required";
    }

    if (!form.preferredTime) {
      errors.preferredTime = "Preferred time is required";
    }

    // If validation errors, show them and return
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setError("Please fill in all required fields.");
      return;
    }

    // Collect form values
    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const treatment = form.treatment;
    const preferredDate = form.preferredDate;
    const preferredTime = form.preferredTime;
    const specialNotes = form.specialNotes.trim() || "";

    // Build WhatsApp message
    const message = `Hello, I would like to reserve a treatment.

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}

Treatment: ${treatment}
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}

Special Notes: ${specialNotes}

Thank you!`;

    // Encode message
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp number (international format)
    const whatsappNumber = "94775030038";

    // Detect device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile: Try WhatsApp app first, fallback to wa.me
      const appUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
      const webUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Create a hidden link to trigger the protocol handler
      const link = document.createElement('a');
      link.href = appUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Track if we should fallback
      let shouldFallback = true;
      
      // Monitor page visibility and focus
      const handleBlur = () => {
        shouldFallback = false;
        cleanup();
      };
      
      const handleVisibilityChange = () => {
        if (document.hidden) {
          shouldFallback = false;
          cleanup();
        }
      };
      
      const cleanup = () => {
        window.removeEventListener('blur', handleBlur);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      };
      
      window.addEventListener('blur', handleBlur);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Try to open WhatsApp app by clicking the link
      link.click();
      
      // Fallback to wa.me after 1 second if app doesn't open
      setTimeout(() => {
        if (shouldFallback) {
          cleanup();
          window.location.href = webUrl;
        } else {
          cleanup();
        }
      }, 1000);
    } else {
      // Desktop: Create hidden link with whatsapp:// protocol
      const desktopAppUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
      const webUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Create a hidden link to trigger the protocol handler
      const link = document.createElement('a');
      link.href = desktopAppUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Track if we should fallback
      let shouldFallback = true;
      
      // Monitor page visibility and focus
      const handleBlur = () => {
        shouldFallback = false;
        cleanup();
      };
      
      const handleVisibilityChange = () => {
        if (document.hidden) {
          shouldFallback = false;
          cleanup();
        }
      };
      
      const cleanup = () => {
        window.removeEventListener('blur', handleBlur);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      };
      
      window.addEventListener('blur', handleBlur);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Try to open desktop app by clicking the link
      link.click();
      
      // Monitor page focus - if still focused after 500ms, fallback to web WhatsApp
      setTimeout(() => {
        if (shouldFallback && document.hasFocus() && !document.hidden) {
          cleanup();
          window.location.href = webUrl;
        } else {
          cleanup();
        }
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-olu-beige/30 px-4 sm:px-6 md:px-8 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-olu-green mb-1 font-semibold">Book Now</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serifDisplay text-olu-ink">Reserve Your Treatment</h2>
                    <p className="text-xs sm:text-sm text-olu-body mt-1 sm:mt-2">Fill in your details and we'll prepare your booking message</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-olu-body transition hover:bg-olu-beige hover:text-olu-ink"
                    aria-label="Close booking form"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 pt-3 sm:pt-4 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="space-y-1 mb-1">
                  <h3 className="text-sm font-semibold text-olu-ink flex items-center gap-2">
                    <svg className="w-4 h-4 text-olu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                  </h3>
                  <p className="text-xs text-olu-body">We'll use this to contact you about your booking</p>
                </div>

                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                  <label className="flex flex-col text-sm text-olu-body">
                    <span className="font-medium text-olu-ink mb-1.5">Full Name <span className="text-red-500">*</span></span>
                    <div className="relative">
                      <input
                        name="fullName"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 text-sm sm:text-base text-olu-ink transition-all focus:outline-none focus:ring-2 ${
                          fieldErrors.fullName
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/30"
                            : "border-olu-beige bg-white focus:border-olu-green focus:ring-olu-green/30 focus:bg-olu-beige/20"
                        }`}
                        placeholder="John Doe"
                      />
                      <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-olu-body/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {fieldErrors.fullName && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    <span className="font-medium text-olu-ink mb-1.5">Email Address <span className="text-red-500">*</span></span>
                    <div className="relative">
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 text-sm sm:text-base text-olu-ink transition-all focus:outline-none focus:ring-2 ${
                          fieldErrors.email
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/30"
                            : "border-olu-beige bg-white focus:border-olu-green focus:ring-olu-green/30 focus:bg-olu-beige/20"
                        }`}
                        placeholder="john@example.com"
                      />
                      <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-olu-body/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.email}
                      </p>
                    )}
                  </label>
                </div>

                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                  <label className="flex flex-col text-sm text-olu-body">
                    <span className="font-medium text-olu-ink mb-1.5">Phone Number <span className="text-red-500">*</span></span>
                    <div className="relative">
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 text-sm sm:text-base text-olu-ink transition-all focus:outline-none focus:ring-2 ${
                          fieldErrors.phone
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/30"
                            : "border-olu-beige bg-white focus:border-olu-green focus:ring-olu-green/30 focus:bg-olu-beige/20"
                        }`}
                        placeholder="+94 77 123 4567"
                      />
                      <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-olu-body/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="mt-1.5 text-xs text-olu-body/70">Include country code (e.g., +94 for Sri Lanka)</p>
                    {fieldErrors.phone && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.phone}
                      </p>
                    )}
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    <span className="font-medium text-olu-ink mb-1.5">Treatment <span className="text-red-500">*</span></span>
                    <div className="relative">
                      <select
                        name="treatment"
                        required
                        value={form.treatment}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 pr-9 sm:pr-10 text-sm sm:text-base text-olu-ink transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                          fieldErrors.treatment
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/30"
                            : "border-olu-beige bg-white focus:border-olu-green focus:ring-olu-green/30 focus:bg-olu-beige/20"
                        } ${!form.treatment ? "text-olu-body/50" : ""}`}
                      >
                        <option value="" disabled>
                          Choose a treatment
                        </option>
                        {treatmentOptions.map((option) => (
                          <option value={option} key={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-olu-body/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <svg className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-olu-body/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {fieldErrors.treatment && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.treatment}
                      </p>
                    )}
                  </label>
                </div>

                {/* Booking Details Section */}
                <div className="space-y-1 mb-1">
                  <h3 className="text-sm font-semibold text-olu-ink flex items-center gap-2">
                    <svg className="w-4 h-4 text-olu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Preferred Date & Time
                  </h3>
                  <p className="text-xs text-olu-body">When would you like to schedule your treatment?</p>
                </div>

                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                  <label className="flex flex-col text-sm text-olu-body">
                    <span className="font-medium text-olu-ink mb-1.5">Preferred Date <span className="text-red-500">*</span></span>
                    <div className="relative">
                      <input
                        name="preferredDate"
                        type="date"
                        required
                        value={form.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 text-sm sm:text-base text-olu-ink transition-all focus:outline-none focus:ring-2 ${
                          fieldErrors.preferredDate
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/30"
                            : "border-olu-beige bg-white focus:border-olu-green focus:ring-olu-green/30 focus:bg-olu-beige/20"
                        }`}
                      />
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-olu-body/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {fieldErrors.preferredDate && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.preferredDate}
                      </p>
                    )}
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    <span className="font-medium text-olu-ink mb-1.5">Preferred Time <span className="text-red-500">*</span></span>
                    <div className="relative">
                      <input
                        name="preferredTime"
                        type="time"
                        required
                        value={form.preferredTime}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-11 text-sm sm:text-base text-olu-ink transition-all focus:outline-none focus:ring-2 ${
                          fieldErrors.preferredTime
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/30"
                            : "border-olu-beige bg-white focus:border-olu-green focus:ring-olu-green/30 focus:bg-olu-beige/20"
                        }`}
                      />
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-olu-body/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    {fieldErrors.preferredTime && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.preferredTime}
                      </p>
                    )}
                  </label>
                </div>

                {/* Additional Notes Section */}
                <div className="space-y-1 mb-1">
                  <h3 className="text-sm font-semibold text-olu-ink flex items-center gap-2">
                    <svg className="w-4 h-4 text-olu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Additional Information
                  </h3>
                  <p className="text-xs text-olu-body">Any special requests or notes for us?</p>
                </div>

                <label className="flex flex-col text-sm text-olu-body">
                  <span className="font-medium text-olu-ink mb-1.5">Special Notes <span className="text-olu-body/60 text-xs font-normal">(optional)</span></span>
                  <div className="relative">
                    <textarea
                      name="specialNotes"
                      rows={4}
                      value={form.specialNotes}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-olu-beige bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-olu-ink transition-all focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30 focus:bg-olu-beige/20 resize-none"
                      placeholder="E.g., allergies, preferred therapist, accessibility needs, or any other special requests..."
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-olu-body/70">This helps us prepare the best experience for you</p>
                </label>

                {error && (
                  <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-200">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm font-semibold text-red-800">{error}</p>
                    </div>
                  </div>
                )}
                
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300 shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-grow space-y-2">
                        <h3 className="text-lg font-bold text-green-800">
                          🎉 Reservation Sent Successfully!
                        </h3>
                        <p className="text-sm text-green-700 leading-relaxed">
                          Your booking details have been prepared! WhatsApp will open automatically with your booking information. Please send the message to complete your reservation.
                        </p>
                        {bookingId && (
                          <div className="mt-3 p-2 bg-white/70 rounded-lg border border-green-200">
                            <p className="text-xs text-green-600">
                              <span className="font-semibold">Booking ID:</span>{" "}
                              <span className="font-mono font-bold text-green-800">{bookingId}</span>
                            </p>
                          </div>
                        )}
                        <div className="mt-4 p-3 bg-white/80 rounded-lg border border-green-200">
                          <p className="text-xs font-semibold text-green-800 mb-1">📱 What happens next:</p>
                          <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside">
                            <li>WhatsApp will open with your booking details</li>
                            <li>Review the message and send it to our admin</li>
                            <li>Our team will confirm your booking shortly</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl bg-gradient-to-r from-olu-green to-olu-seafoam py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Preparing your booking...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>Reserve via WhatsApp</span>
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-xs text-center text-olu-body/70">
                    Your booking details will be prepared and sent via WhatsApp
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


