# Calibi AI — Website (Theme Redesign)

Static 4-page site for Calibi AI, restyled in an editorial / "AI-native
studio" theme (visual direction modeled after 360labs.ai/portfolio) —
numbered section labels, uppercase monospace tag pills, status badges,
a near-black neutral base with a single violet accent, and restrained
scroll-reveal animations.

**This is a visual/theme redesign only.** All copy — headings, stats,
testimonials, quotes, client names, and form fields — is preserved
verbatim from `docs/memory.txt`, the content inventory used as the
single source of truth. No text was rewritten, shortened, reordered,
or silently corrected.

## Pages
- `index.html` — Home
- `services.html` — Detailed Services
- `story.html` — Our Story
- `academy.html` — Calibi AI Academy (contact form at `#academy-contact`)

## Structure
- `assets/css/style.css` — full design system (tokens, type scale, nav,
  cards, carousels, process steps, FAQ accordion, forms, footer)
- `assets/js/main.js` — mobile nav toggle, carousel prev/next controls,
  scroll-triggered reveal animations (via `IntersectionObserver`),
  single-open FAQ accordion behavior
- `docs/memory.txt` — the content inventory / source-of-truth doc

## Flagged issues (not silently fixed — see inline `.editorial-flag`
notes and the FAQ note below, and `docs/memory.txt` §7)
- Footer logo markup intentionally kept as **"CCalibi AI"** (duplicated
  "C") on every page, per the source scan — needs a manual code fix,
  not a content rewrite.
- Client name spelled two ways: trust-bar logo says **"Clevrr AI"**
  (2×r) while the testimonial attribution says **"Clevvr Ai"** (2×v).
- Testimonial #4's quote body references **"AtoomAi"** while it's
  attributed to **"Clevvr Ai"** — likely a copy-paste mismatch in the
  original content; flagged in the UI rather than corrected.
- The Home page's 3-step process (Consultation / Development /
  Deployment) and the Services page's 3-step process (Discover /
  Design / Deploy) are two different framings of a similar idea in the
  source content — both are preserved separately, flagged inline on
  `services.html`.
- FAQ answers were never present in the source scan (only questions
  render statically). Each accordion panel ships fully interactive but
  shows an explicit "answer content not captured — add copy here"
  placeholder instead of invented copy.
- All 4 "Services We Offer" footer links point to `services.html` with
  no per-service anchors, matching the original site structure.
