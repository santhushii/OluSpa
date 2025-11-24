import express from "express";
import path from "path";
import helmet from "helmet";
import compression from "compression";
import { z } from "zod";
import db from "./db";

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(compression());
app.use(express.json());

const DIST = path.join(__dirname, "../../client/dist");
const PUBLIC = path.join(__dirname, "../../client/public");

app.use(express.static(PUBLIC));
app.use(express.static(DIST));

const bookingSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(25),
  treatment: z.string().min(2).max(120),
  preferredDate: z.string(),
  preferredTime: z.string(),
  notes: z.string().max(500).optional()
});

app.post("/api/bookings", (req, res) => {
  const parsed = bookingSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten().fieldErrors
    });
  }

  const { fullName, email, phone, treatment, preferredDate, preferredTime, notes } = parsed.data;

  try {
    db.prepare(
      `INSERT INTO bookings (fullName, email, phone, treatment, preferredDate, preferredTime, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(fullName, email, phone, treatment, preferredDate, preferredTime, notes ?? null);

    return res.status(201).json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to save booking", error);
    return res.status(500).json({ success: false, message: "Unable to create booking right now." });
  }
});

app.get("*", (_, res) => res.sendFile(path.join(DIST, "index.html")));

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

