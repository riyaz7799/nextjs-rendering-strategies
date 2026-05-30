# NexMart — Rendering Strategy Analysis

## Overview
This project implements the same product catalog using three different Next.js rendering
strategies and benchmarks their performance using Lighthouse CLI and Chrome DevTools.

---

## Results Table

| Metric | CSR | SSR | SSG (ISR 60s) |
|--------|-----|-----|----------------|
| Performance Score (Desktop) | | | |
| Performance Score (Mobile) | | | |
| TTFB (ms) | | | |
| FCP (ms) | | | |
| LCP (ms) | | | |
| TBT (ms) | | | |
| CLS | | | |
| curl test (content visible) | ✗ | ✓ | ✓ |

> Scores above are median values from 3 Lighthouse runs each.

---

### Decision Chart

Does the page need SEO?
├── NO  → CSR (dashboard, admin, behind login)
└── YES → Does content change per request?
├── YES → SSR (search results, personalized)
└── NO  → Does content change frequently?
├── YES → SSG + ISR
└── NO  → SSG


| Page Type | Strategy | Reason |
|-----------|----------|--------|
| Marketing landing page | SSG | Static, fast, best SEO |
| E-commerce search results | SSR | Dynamic, real-time stock |
| User dashboard (behind login) | CSR | Private, no SEO needed |
| Documentation site | SSG | Rarely changes, SEO critical |
| Blog | SSG + ISR | Occasional updates, SEO critical |

---

## Trade-off Summary

| Factor | CSR | SSR | SSG |
|--------|-----|-----|-----|
| SEO | ❌ Poor | ✅ Great | ✅ Great |
| Initial Load Speed | ❌ Slow | ⚠️ Medium | ✅ Fast |
| Server Cost | ✅ Low | ❌ High | ✅ Low |
| Content Freshness | ✅ Always | ✅ Always | ⚠️ ISR |
| Scalability | ✅ High | ❌ Bottleneck | ✅ CDN |

---

## Tools Used
- Lighthouse CLI — Core Web Vitals auditing
- Chrome DevTools — Network waterfall and Performance traces
- curl — SEO content verification
- Vercel — deployment platform