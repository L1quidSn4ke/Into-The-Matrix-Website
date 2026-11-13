# Into the Matrix://

A responsive website concept for **Into the Matrix://**, a computer repair, networking, and cybersecurity services brand. The project uses plain HTML, CSS, and JavaScript as a hands-on web development learning project.

## About the project

The site introduces the brand, summarizes its services and background, showcases hands-on learning projects, and directs visitors to Discord for questions and service requests. Services, Portfolio, and Recent Work each have a dedicated page; the other informational sections remain accessible from the home page. Its visual style uses a dark interface with Matrix-inspired green accents, responsive layouts, and a subtle animated background effect.

The site uses plain HTML, CSS, and a small amount of JavaScript for the mobile navigation menu, home-page section info cards, and detail dialogs for service, portfolio, and recent-work items. Without JavaScript, the complete home page remains available as a normal scrollable site, and the dedicated pages show their content directly. It does not require a framework, external libraries, or a build process.

## Features

- Dedicated pages for services, portfolio, and recent work, plus home-page sections for about, trust, service area, and contact information
- Responsive layout for desktop, tablet, and mobile screens
- Service cards for computer repair, networking, cybersecurity, custom PC builds, and home lab consulting, each with a custom inline icon
- Six portfolio cards with CSS-drawn image placeholders and skill tags
- Three clearly labeled illustrative problem/solution/result examples
- Home-page section info cards for about, trust, service area, and contact
- Focused, keyboard-accessible detail dialogs for service, portfolio, and recent-work cards
- A trust section highlighting background, communication, recommendations, support, and continuing education
- A dedicated Killeen, Texas service-area section describing local and remote support options
- Discord links and guidance for finding support channels
- Keyboard focus styles and a skip-to-content link
- Reduced-motion support for visitors who prefer less animation
- A keyboard-accessible mobile navigation menu
- CSS-only visuals; no third-party assets are required

## Project structure

```text
Into-The-Matrix-Website/
├── index.html        # Home page and general information
├── services.html     # Services page
├── portfolio.html    # Projects and portfolio page
├── recent-work.html  # Recent-work examples
├── README.md         # Project overview and usage notes
├── css/
│   └── styles.css    # Theme, layout, and responsive styles
└── js/
    └── main.js       # Navigation and detail-dialog behavior
```

## Learning goals

This project is intended to practice writing semantic HTML, organizing CSS with reusable classes and custom properties, creating responsive layouts with Grid and Flexbox, adding simple JavaScript interactions, and considering basic accessibility.