# Riley Carney — Systems Consulting & Engineering Profile

> Source code for [carn.si](https://carn.si) / [rileycarney.github.io](https://rileycarney.github.io)

Authoritative web presence for **Riley Carney** — Systems & Technical Consulting practice and Principal Systems Engineer based in Seattle, WA.

---

## Overview

A high-performance, accessible, and minimalist static site engineered with semantic HTML5, modern CSS custom properties, and vanilla JavaScript. Built to provide an executive-grade presentation of independent consulting services alongside a private, standalone curriculum vitae and portfolio dossier.

- **Two Distinct Sections**:
  - **Consulting Section (Default / Base URL — `index.html`)**: The primary default section served whenever the base URL (`/`) is visited. Focuses on independent systems architecture, data infrastructure, enterprise PowerShell automation, and pragmatic agentic AI workflows.
  - **Profile Section (Suburl — `/profile.html`)**: Standalone engineering portfolio, executive dossier, career timeline, technical implementations, and credentials. **Completely unlinked and not accessible from any other section of the website**.
- **No Top Banner Bar**: Navigation has been reworked with zero top banner bar across the website. Desktop users navigate seamlessly via an edge-to-edge left vertical sidebar with active section tracking, while mobile users utilize a floating menu button.
- **Theme**: Minimalist Executive & Systems Engineering aesthetic (zero emojis, high-contrast typography, strict layout alignment).
- **Color Mode**: Dark profile (Executive Slate Obsidian).
- **Performance & Accessibility**: 100% vanilla, zero external JavaScript libraries, WCAG AAA compliant contrast, keyboard operable, responsive from 320px to ultrawide displays.
- **Print Optimization**: Native `@media print` rules allowing pages to be printed cleanly as official executive dossiers (`window.print()`).

---

## Website Sections

### 1. Consulting Section (Default — `/` & `index.html`)
1. **Left Navigation Bar**: Edge-to-edge section navigation for Overview, Core Values, Practice Areas, Engagement Models, Methodology, Case Studies, FAQ, and Inquire.
2. **Consulting Overview (Hero)**: Executive advisory positioning, value proposition lead, and direct inquiry scheduling CTA.
3. **Core Values**: 4 foundational tenets (Direct Ownership, Mathematical Rigor, Production Reliability, Full IP).
4. **Practice Areas**: 5 specialized service areas (System Architecture, Enterprise Automation, IAM & Governance, Applied AI & Agentic Workflows, Fractional Principal Engineering).
5. **Engagement Models**: 3 flexible collaboration models (Scoped Project Sprint, Fractional Advisory Retainer, Systems Diagnostic & Audit).
6. **Methodology & Process**: 4-stage delivery lifecycle (Discovery, Blueprint, Agile Engineering, Handover).
7. **Technical Scenarios (Case Studies)**: Measurable real-world outcomes across IAM automation, database tuning, and AI support triage.
8. **Frequently Asked Questions**: Expandable FAQ addressing timelines, billing, IP retention, remote setup, and NDAs.
9. **Initiate Consultation (Inquire)**: Interactive Consultation Scope Builder generating pre-formatted proposal emails and one-click clipboard copying.

### 2. Profile Section (Standalone Suburl — `/profile.html`)
> Accessible only via direct navigation to `/profile.html`. Contains zero outgoing links to consulting and has zero inbound links from the consulting website.
1. **Left Navigation Bar**: Section shortcuts for Home, Summary, Experience, Projects, Skills, Education, and Contact.
2. **Executive Dossier (Hero)**: Portrait photograph (`assets/profile.jpg`), official title, location, direct contact channels, and executive summary.
3. **Key Impact Metrics**: Quantitative career metrics (8+ years experience, 40% incident acceleration, 500k+ IAM objects managed).
4. **Professional Profile**: Executive narrative and four foundational pillars of systems engineering.
5. **Professional Experience**: Chronological history detailing roles at **Zoetis**, **Direct Technology**, **Providence Health & Services**, and **Soundpath Health**.
6. **Technical Projects**: Flagship enterprise initiatives (**ZRL Infrastructure Project 2026**, **Internal Analytics Toolkit 2023**, **IAM Automation System 2019**).
7. **Technical Skills Matrix**: Categorical grid covering Languages & Scripting, Data & Infrastructure, Tools & Platforms, and Engineering Practices.
8. **Education & Certifications**: Academic degrees (**University of Washington** BS Mathematics, **Bellevue College** Mathematics DTA) and professional credentials (**CSPO**, certifications).
9. **Direct Contact**: Fast communication channels (LinkedIn, GitHub, ORCID).

---

## Project Structure

```text
RileyCarneySite/
├── .git/
├── assets/
│   ├── profile.jpg                      # Official portrait photograph
│   └── AGY-CLI-Blog---Wide.png          # Antigravity banner image
├── consulting/
│   └── index.html                       # Redirects to base URL (/)
├── css/
│   └── style.css                        # Complete design system & print stylesheet
├── js/
│   └── main.js                          # Navigation controller, scroll tracking & form utilities
├── index.html                           # Default Consulting & Technical Advisory section
├── profile.html                         # Standalone Executive Engineering Profile & CV (/profile.html)
├── consulting.html                      # Redirects to base URL (/)
├── CNAME                                # Custom domain configuration (carn.si)
└── README.md                            # Documentation
```

---

## Local Development & Preview

No build step or external dependencies required. Simply serve the directory with any local static HTTP server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .
```

---

## Deployment

Configured for continuous deployment via **GitHub Pages**:
- **Branch**: `main`
- **Folder**: `/ (root)`
- **Domain**: `https://carn.si` / `https://rileycarney.github.io`
- **Base URL**: Loads `index.html` (Consulting Section)
- **Profile Suburl**: Loads `profile.html` (Profile Section)

---

## License

Copyright &copy; 2026 Riley Carney. All rights reserved.
