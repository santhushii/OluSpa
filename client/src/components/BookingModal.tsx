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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
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
    const whatsappNumber = "94772096730";

    // Detect if desktop
    const isDesktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isDesktop) {
      // For desktop: Try desktop app protocol first
      const desktopAppUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
      const webUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Try to open desktop app
      window.location.href = desktopAppUrl;
      
      // If desktop app is not installed, fallback to web WhatsApp after delay
      setTimeout(() => {
        window.location.href = webUrl;
      }, 1000);
    } else {
      // For mobile: Use wa.me (opens app if installed, prompts download if not)
      const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.location.href = url;
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
            className="fixed inset-0 z-[65] flex items-center justify-center p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-olu-green mb-1">Book Now</p>
                  <h2 className="text-3xl font-serifDisplay text-olu-ink">Reserve Your Treatment</h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-olu-body transition hover:bg-olu-beige"
                  aria-label="Close booking form"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col text-sm text-olu-body">
                    Full Name
                    <input
                      name="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                      className={`mt-1 rounded-2xl border px-4 py-3 text-base text-olu-ink focus:outline-none focus:ring-2 ${
                        fieldErrors.fullName
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                          : "border-olu-beige focus:border-olu-green focus:ring-olu-green/30"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {fieldErrors.fullName && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
                    )}
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={`mt-1 rounded-2xl border px-4 py-3 text-base text-olu-ink focus:outline-none focus:ring-2 ${
                        fieldErrors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                          : "border-olu-beige focus:border-olu-green focus:ring-olu-green/30"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                    )}
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col text-sm text-olu-body">
                    Phone (with country code)
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className={`mt-1 rounded-2xl border px-4 py-3 text-base text-olu-ink focus:outline-none focus:ring-2 ${
                        fieldErrors.phone
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                          : "border-olu-beige focus:border-olu-green focus:ring-olu-green/30"
                      }`}
                      placeholder="+94 77 123 4567"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
                    )}
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    Treatment
                    <select
                      name="treatment"
                      required
                      value={form.treatment}
                      onChange={handleChange}
                      className={`mt-1 rounded-2xl border px-4 py-3 text-base text-olu-ink focus:outline-none focus:ring-2 ${
                        fieldErrors.treatment
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                          : "border-olu-beige focus:border-olu-green focus:ring-olu-green/30"
                      }`}
                    >
                      <option value="" disabled>
                        Select a treatment
                      </option>
                      {treatmentOptions.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.treatment && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.treatment}</p>
                    )}
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col text-sm text-olu-body">
                    Preferred Date
                    <input
                      name="preferredDate"
                      type="date"
                      required
                      value={form.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`mt-1 rounded-2xl border px-4 py-3 text-base text-olu-ink focus:outline-none focus:ring-2 ${
                        fieldErrors.preferredDate
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                          : "border-olu-beige focus:border-olu-green focus:ring-olu-green/30"
                      }`}
                    />
                    {fieldErrors.preferredDate && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.preferredDate}</p>
                    )}
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    Preferred Time
                    <input
                      name="preferredTime"
                      type="time"
                      required
                      value={form.preferredTime}
                      onChange={handleChange}
                      className={`mt-1 rounded-2xl border px-4 py-3 text-base text-olu-ink focus:outline-none focus:ring-2 ${
                        fieldErrors.preferredTime
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                          : "border-olu-beige focus:border-olu-green focus:ring-olu-green/30"
                      }`}
                    />
                    {fieldErrors.preferredTime && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.preferredTime}</p>
                    )}
                  </label>
                </div>

                <label className="flex flex-col text-sm text-olu-body">
                  Special Notes (optional)
                  <textarea
                    name="specialNotes"
                    rows={3}
                    value={form.specialNotes}
                    onChange={handleChange}
                    className="mt-1 rounded-2xl border border-olu-beige px-4 py-3 text-base text-olu-ink focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30"
                    placeholder="Let us know about preferences, allergies, or additional requests."
                  />
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

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-olu-green py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow transition hover:bg-olu-seafoam focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green disabled:cursor-not-allowed disabled:bg-olu-green/60 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      RESERVE VIA WHATSAPP
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


