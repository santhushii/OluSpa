# OLU Ayurveda Beach Resort - Frontend Only

A beautiful, modern single-page application for booking Ayurveda treatments.

## 🎯 Project Type

**Frontend-Only** - No backend server or database required!

## 🚀 Quick Start

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Opens at: http://localhost:5173

### Build for Production

```bash
pnpm build
```

Output: `client/dist/` folder

### Preview Production Build

```bash
pnpm preview
```

---

## 📁 Project Structure

```
Olu_Resort/
├── client/              # Frontend application
│   ├── src/
│   │   ├── api/        # Frontend booking processing
│   │   ├── components/ # React components
│   │   ├── utils/      # Utilities (WhatsApp, formatting)
│   │   └── data/       # Site content
│   └── package.json
│
└── package.json         # Root workspace
```

**No server folder!** This is a pure frontend application.

---

## ✨ Features

- ✅ Beautiful, responsive design
- ✅ Booking form with validation
- ✅ WhatsApp integration (direct URL generation)
- ✅ Treatment information
- ✅ Gallery
- ✅ FAQ section
- ✅ Contact information

---

## 📱 How Booking Works

1. User fills out booking form
2. Frontend validates input
3. Generates WhatsApp message with booking details
4. Opens WhatsApp automatically with pre-filled message
5. User sends message to admin
6. Done! ✅

**No backend, no database, no API calls!**

---

## 🔧 Configuration

### Admin WhatsApp Number

Edit `client/src/data/content.ts`:

```typescript
whatsapp: {
  phone: "+94 77 209 6730"  // Change this to your number
}
```

---

## 📦 Deployment

### Static Hosting (Recommended)

Deploy the `client/dist/` folder to:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Upload `dist/` folder
- **Any static host**: Upload `dist/` folder

**No server needed!** ✅

---

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

---

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

---

**Simple, fast, frontend-only booking system!** 🎉
