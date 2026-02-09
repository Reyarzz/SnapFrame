# SnapFrame — Beautiful Screenshots in Seconds

Transform boring screenshots into stunning, share-worthy images. Add gorgeous gradient backgrounds, device frames, and shadows — no design skills needed.

![SnapFrame](https://img.shields.io/badge/SnapFrame-v1.0-8B5CF6?style=for-the-badge)

## Features

- **Drag & Drop / Paste** — Upload images or paste directly from clipboard (Ctrl+V)
- **24 Background Presets** — Hand-crafted gradients, solid colors, and transparent
- **Device Frames** — Browser window, macOS window, iPhone mockup
- **Adjustable Controls** — Padding, border radius, shadow intensity, shadow color
- **Instant Export** — PNG, JPEG, or WebP at 2x resolution
- **Watermark System** — Free users get watermarked exports; $9.99 removes it forever
- **Zero Signup** — Works entirely in-browser, no account needed

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

Output goes to `dist/` — deploy to Vercel, Netlify, or any static host.

## Monetization Strategy

The app uses a freemium model:

| Feature | Free | Pro ($9.99) |
|---------|------|-------------|
| All backgrounds | ✅ | ✅ |
| All device frames | ✅ | ✅ |
| Export PNG/JPEG/WebP | ✅ | ✅ |
| Watermark-free exports | ❌ | ✅ |
| Priority support | ❌ | ✅ |

### Recommended Payment Integrations
1. **LemonSqueezy** — Easiest for indie devs, handles tax/VAT
2. **Gumroad** — Simple digital product sales
3. **Stripe Checkout** — Most flexible, lowest fees

### Deployment Recommendations
1. **Vercel** — `vercel --prod` (free tier available)
2. **Netlify** — Drag & drop the `dist/` folder
3. **Cloudflare Pages** — Fast, free, global CDN

## Viral Growth Tactics

1. **Share Button** — Add "Made with SnapFrame" link in exported images
2. **Twitter/X Bot** — Auto-reply to people sharing plain screenshots
3. **Product Hunt Launch** — Schedule for a Tuesday morning
4. **Reddit** — Post in r/webdev, r/design, r/SideProject
5. **SEO Landing Page** — Target "screenshot beautifier", "mockup generator"
6. **Chrome Extension** — Wrap the core functionality for one-click usage

## Tech Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4**
- **html2canvas-pro** — DOM-to-canvas export
- **Lucide React** — Icon library

## License

MIT
