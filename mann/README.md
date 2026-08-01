# MANN CARE FOUNDATION – React + Tailwind Website

Aapki purani HTML site ka poora content is React project me convert kiya gaya hai.

## Chalane ka tarika

```bash
npm install
npm run dev       # development server (http://localhost:5173)
npm run build     # production build (dist/ folder)
```

## Structure

```
src/
├── components/      → Common components (Navbar, Footer, DonateSection, etc.)
├── layout/          → Layout.jsx (Navbar + Footer EK jagah, sab pages pe common)
├── pages/           → Har page ki file
│   ├── Home.jsx
│   ├── about/       → OurStory, OurTeam, LegalCertificate
│   ├── projects/    → ProjectDetail.jsx (EK component, sab 6 projects)
│   ├── getInvolved/ → IndividualSupport, CorporatePartnership, DonateOnline, Career
│   ├── contact/     → GetInTouch, PrivacyPolicy
│   ├── Media.jsx    → Gallery with lightbox
│   └── PaymentSuccess.jsx
├── data/projects.js → SAB content data yahan hai (projects, team, gallery)
└── index.css        → Tailwind theme (aapke original pink colors)

public/              → Sab images, logo, PDFs, GPay QR
```

## Naya project add karna ho?

`src/data/projects.js` kholo, `projects` array me naya object add karo —
page apne aap `/projects/naya-slug` pe ban jayega. Navbar/Footer me link
add karne ke liye `Navbar.jsx` aur `Footer.jsx` me ek line add karo.

## Kya fix hua purani site se

- Footer ki tooti links (individual-support.html, Media→#donate) fix
- URL me spaces hataye (/about us/ → /about/our-story)
- Email consistent kiya: manncarefoundation@gmail.com
- Navbar + Footer ab ek hi jagah hai — copy-paste ki zaroorat khatam

## Deploy

`npm run build` ke baad `dist/` folder ko Netlify/Vercel pe upload karo.
React Router use hota hai, isliye host pe SPA fallback (sab routes → index.html)
set karna zaroori hai. Netlify ke liye `public/_redirects` already added hai.
