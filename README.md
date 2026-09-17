# Riley Carney — Official Professional Portfolio & Curriculum Vitae

> Source code for [rileycarney.github.io](https://rileycarney.github.io)

Official curriculum vitae and engineering portfolio for **Riley Carney** — IT Systems Engineer & Principal Product Support Engineer based in Seattle, WA.

---

## Overview

A high-performance, accessible, and minimalist single-page static site engineered with semantic HTML5, modern CSS custom properties, and vanilla JavaScript. Built to provide an authoritative, executive-grade presentation of career history, technical implementations, architecture projects, and credentials.

- **Theme**: Minimalist Executive & Systems Engineering aesthetic (zero emojis, high-contrast typography, strict layout alignment).
- **Color Modes**: Automatic system preference detection (`prefers-color-scheme`) with persistent manual Light / Dark toggle.
- **Data Source Grounding**: Fully aligned with the updated `Riley Carney Resume 2026.pdf`.
- **Performance & Accessibility**: 100% vanilla, zero external JavaScript libraries, WCAG AAA compliant contrast, keyboard operable, responsive from 320px to ultrawide displays.
- **Print Optimization**: Native `@media print` rules allowing the page to be printed directly as an official executive curriculum vitae dossier (`window.print()`).

---

## Page Sections

1. **Top Masthead**: Sticky navigation with brand identity, semantic section links, theme toggle, and direct PDF resume download.
2. **Executive Dossier (Hero)**: Professional headshot (`assets/profile.jpg`), official title, location, direct contact links, executive summary, and primary call-to-action buttons.
3. **Key Impact Metrics**: Quantitative career metrics (8+ years experience, 40% incident acceleration, 95% pipeline cost reduction, 500k+ IAM objects managed).
4. **Professional Profile**: Executive narrative and four foundational pillars of systems engineering.
5. **Professional Experience**: Chronological history detailing roles at **Zoetis**, **Direct Technology**, **Providence Health & Services**, and **Soundpath Health**.
6. **Technical Projects**: Flagship enterprise initiatives (**ZRL Infrastructure Project 2026**, **Legacy Data Integration Upgrade 2024**, **Internal Analytics Toolkit 2023**, **IAM Automation System 2019**) alongside open-source repositories and published guides.
7. **Technical Skills Matrix**: Categorical grid covering Languages & Scripting, Data & Infrastructure, Tools & Platforms, and Engineering Practices.
8. **Education & Certifications**: Academic degrees (**University of Washington** BS Mathematics, **Bellevue College** Mathematics DTA) and professional credentials (**CSPO - Certified Scrum Product Owner**, LinkedIn Learning certifications).
9. **Official Resume Document**: Verification card with download links and browser preview for `Riley Carney Resume 2026.pdf`.
10. **Direct Contact**: Fast communication channels (Email with one-click clipboard copy, Telephone, LinkedIn, and GitHub).
11. **Site Footer**: Formal copyright and back-to-top navigation.

---

## Project Structure

```text
RileyCarneySite/
├── .git/
├── assets/
│   ├── profile.jpg                      # Official portrait photograph
│   └── Riley_Carney_Resume_2026.pdf     # Direct linkable copy of the updated resume
├── css/
│   └── style.css                        # Complete design system & print stylesheet
├── js/
│   └── main.js                          # Navigation, theme controller & utilities
├── index.html                           # Semantic HTML structure & Schema.org JSON-LD
├── README.md                            # Documentation
└── Riley Carney Resume 2026.pdf         # Base PDF resume
```

---

## Local Development & Preview

No build step or node package installation required. Simply serve the directory with any local static server:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Or open directly in your default browser
Start-Process index.html
```

---

## Deployment

Configured for continuous deployment via **GitHub Pages**:
- **Branch**: `main`
- **Folder**: `/ (root)`
- **URL**: `https://rileycarney.github.io`

---

## License

&copy; Riley Carney. All rights reserved.
