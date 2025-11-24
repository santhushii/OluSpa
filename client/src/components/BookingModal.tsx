import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Feature } from "../types/content";
import { formatPhoneForWhatsApp } from "../utils/format";

type BookingPayload = {
  fullName: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
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
  notes: ""
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setStatus("idle");
      setError("");
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
  };

  const resetForm = () => setForm(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("We couldn’t submit your reservation. Please try again.");
      }

      setStatus("success");
      const whatsappNumber = formatPhoneForWhatsApp(whatsappPhone);
      const message = `Hello! I'm ${form.fullName}. I'd like to reserve the ${form.treatment} on ${form.preferredDate} at ${form.preferredTime}.`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
      resetForm();
      setTimeout(onClose, 2000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error. Please try again.");
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
                      className="mt-1 rounded-2xl border border-olu-beige px-4 py-3 text-base text-olu-ink focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30"
                    />
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="mt-1 rounded-2xl border border-olu-beige px-4 py-3 text-base text-olu-ink focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30"
                    />
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
                      className="mt-1 rounded-2xl border border-olu-beige px-4 py-3 text-base text-olu-ink focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30"
                    />
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    Treatment
                    <select
                      name="treatment"
                      required
                      value={form.treatment}
                      onChange={handleChange}
                      className="mt-1 rounded-2xl border border-olu-beige px-4 py-3 text-base text-olu-ink focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30"
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
                      className="mt-1 rounded-2xl border border-olu-beige px-4 py-3 text-base text-olu-ink focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30"
                    />
                  </label>

                  <label className="flex flex-col text-sm text-olu-body">
                    Preferred Time
                    <input
                      name="preferredTime"
                      type="time"
                      required
                      value={form.preferredTime}
                      onChange={handleChange}
                      className="mt-1 rounded-2xl border border-olu-beige px-4 py-3 text-base text-olu-ink focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30"
                    />
                  </label>
                </div>

                <label className="flex flex-col text-sm text-olu-body">
                  Special Notes (optional)
                  <textarea
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleChange}
                    className="mt-1 rounded-2xl border border-olu-beige px-4 py-3 text-base text-olu-ink focus:border-olu-green focus:outline-none focus:ring-2 focus:ring-olu-green/30"
                    placeholder="Let us know about preferences, allergies, or additional requests."
                  />
                </label>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {status === "success" && (
                  <p className="text-sm text-olu-green">
                    Reservation sent! We’ve saved your request and opened WhatsApp so you can confirm instantly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-olu-green py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow transition hover:bg-olu-seafoam focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green disabled:cursor-not-allowed disabled:bg-olu-green/60"
                >
                  {status === "loading" ? "Sending..." : "Reserve via WhatsApp"}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


