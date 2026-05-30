# NexMart — Next.js Rendering Strategies

A production-grade product catalog built **three times** using Next.js to compare and benchmark Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Static Site Generation (SSG).

---

## 🚀 Live Demos

| Strategy | URL |
|----------|-----|
| CSR | https://csr-pi.vercel.app |
| SSR | Coming soon |
| SSG | Coming soon |

---

## 📁 Project Structure


nextjs-rendering-strategies/
├── csr/          → Client-Side Rendering app
├── ssr/          → Server-Side Rendering app
├── ssg/          → Static Site Generation app
├── results/      → Lighthouse JSON audit files
├── parse-results.js  → Script to parse Lighthouse results
├── ANALYSIS.md   → Performance analysis and decision chart
└── README.md

---

## 🧠 Rendering Strategies Explained

### CSR — Client-Side Rendering
- Server sends empty HTML + JavaScript bundle
- Browser fetches data and renders UI
- Best for: dashboards, apps behind login
- Cons: slow initial load, bad SEO

### SSR — Server-Side Rendering
- Server fetches data and renders full HTML on every request
- Browser receives complete HTML instantly
- Best for: e-commerce, search results, SEO-critical pages
- Cons: higher server cost, TTFB

### SSG — Static Site Generation
- Pages pre-built at deploy time
- Served from CDN edge — fastest possible
- ISR (Incremental Static Regeneration) every 60s
- Best for: blogs, docs, marketing pages
- Cons: content can be stale

---

## ⚙️ Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **Language:** JavaScript
- **Styling:** CSS Variables + Custom CSS
- **Data:** DummyJSON API (https://dummyjson.com/products)
- **Deployment:** Vercel
- **Benchmarking:** Lighthouse CLI + Chrome DevTools

---

## 🏃 Running Locally

### Prerequisites
- Node.js 18+
- npm

### CSR App
```bash
cd csr
npm install
npm run dev
# Open http://localhost:3000
```

### SSR App
```bash
cd ssr
npm install
npm run dev -- -p 3001
# Open http://localhost:3001
```

### SSG App
```bash
cd ssg
npm install
npm run dev -- -p 3002
# Open http://localhost:3002
```

---

## 📊 Benchmarking

### Install Lighthouse CLI
```bash
npm install -g lighthouse
```

### Run Audits
```bash
# CSR Desktop
lighthouse https://csr-pi.vercel.app/products \
  --output json \
  --output-path ./results/csr-desktop.json \
  --preset=desktop \
  --chrome-flags="--headless"

# CSR Mobile
lighthouse https://csr-pi.vercel.app/products \
  --output json \
  --output-path ./results/csr-mobile.json \
  --chrome-flags="--headless"

# SSR Desktop
lighthouse https://your-ssr-app.vercel.app/products \
  --output json \
  --output-path ./results/ssr-desktop.json \
  --preset=desktop \
  --chrome-flags="--headless"

# SSR Mobile
lighthouse https://your-ssr-app.vercel.app/products \
  --output json \
  --output-path ./results/ssr-mobile.json \
  --chrome-flags="--headless"

# SSG Desktop
lighthouse https://your-ssg-app.vercel.app/products \
  --output json \
  --output-path ./results/ssg-desktop.json \
  --preset=desktop \
  --chrome-flags="--headless"

# SSG Mobile
lighthouse https://your-ssg-app.vercel.app/products \
  --output json \
  --output-path ./results/ssg-mobile.json \
  --chrome-flags="--headless"
```

### Parse Results
```bash
node parse-results.js
```

---

## ✅ Features

- 🛍️ Product listing page with 20 products
- 🔍 Real-time search/filter
- 🛒 Add to cart with counter
- 📄 Product detail page with image gallery
- ⭐ Star ratings and discount badges
- 💀 Skeleton loading UI (CSR)
- 📱 Responsive design
- 🌙 Dark theme

---

## 🧪 Test IDs for Automated Testing

| Element | data-testid |
|---------|-------------|
| Product card | `product-item` |
| Product title (detail) | `product-title` |
| Search input | `search-input` |
| Cart count | `cart-count` |
| Add to cart button | `add-to-cart-btn` |

---

## 📈 Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | 2.5s–4s | > 4s |
| TBT | ≤ 300ms | 300ms–600ms | > 600ms |
| CLS | ≤ 0.1 | 0.1–0.25 | > 0.25 |

---

## 👤 Author

**Mohammad Riyaz**
- GitHub: [@riyaz7799](https://github.com/riyaz7799)

---

## 📄 License

MIT License
