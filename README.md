# Carousel Craft

Create a production-grade, highly responsive web application called "Carouselfy" — an AI-powered Instagram Carousel Automation & Canva-style Design Studio. 



### 1. Tech Stack & Dependencies

- Framework: React 18+ (Vite, TypeScript)

- UI Library: Tailwind CSS, shadcn/ui components (Dialog, Tabs, Slider, Select, Popover, Tooltip, DropdownMenu, Accordion)

- Icons: Lucide React

- Canvas & Exporting: html-to-image (high-res rasterization), jspdf (multi-page PDF export), jszip + file-saver (batch ZIP export)

- Syntax Highlighter: prismjs or lightweight code block renderer for developer templates

- Color Utilities: colord or chroma-js (for automated WCAG contrast checking)



### 2. Core State & Data Schema

Define standard TypeScript interfaces:

- `BrandKit`: id, name, handle, profileUrl, logos: string[], primaryColor, secondaryColor, fontHeading, fontBody, activeLogoIndex.

- `SlideElement`: id, type ('heading' | 'subheading' | 'body' | 'image' | 'logo' | 'icon' | 'code' | 'badge' | 'shape'), content, x, y, width, height, fontSize, fontWeight, color, backgroundColor, textAlign, zIndex, isLocked, isBrandElement.

- `Slide`: id, slideNumber, type ('hook' | 'content' | 'code_breakdown' | 'comparison' | 'cta'), elements: SlideElement[], background: { type: 'solid' | 'gradient' | 'mesh', value: string }, notes: string.

- `CarouselProject`: id, title, topic, aspectRatio ('4:5' | '1:1' | '9:16'), templateId: string, slides: Slide[], brandKitId: string.

- `TemplatePreset`: id, name, category ('Tech & Coding' | 'Business & Growth' | 'Minimalist' | 'Bold Viral' | 'Pastel Editorial'), layoutEngineId, defaultPalettes, typographyPairing.



### 3. Application Architecture & UI Layout

Create a 3-panel professional dashboard with dark-mode aesthetic (slate-950 canvas background, crisp zinc/slate toolbars):



#### Panel A: Left Sidebar (Navigation & Controls)

- Brand Kit Manager:

  - Multi-logo file upload (drag & drop, preview, active badge selector).

  - Inputs: Brand Name, Instagram Handle (@handle), Website/Profile URL.

  - Color palette pickers (Primary, Secondary, Accent, Canvas BG).

  - Saved Brand Presets (persist to localStorage).

- Template Explorer:

  - 100+ Template Engine: Implement a programmatic template generator combining 10 layout archetypes x 10 visual aesthetics x 5 color themes. Include filter tags: Minimalist, Dev Terminal, Bold Editorial, Corporate Modern, Neon Cyberpunk.

  - One-click template applicator that re-renders existing carousel content into the new style without losing text.

- AI Generator Bar:

  - Topic/Keyword input (e.g., "Python Memory Management", "Salesforce Flow Triggers").

  - Content Depth / Target Slide Count selector (3 to 10 slides).

  - Tone selector (Educational, Provocative/Viral, Step-by-Step Tutorial, Cheat Sheet).

  - "Generate Carousel" button with simulated AI stream/generation engine and BYOK (OpenAI/Anthropic API Key) modal with realistic fallback mock data for testing.



#### Panel B: Center Studio Canvas

- Instagram Safe-Zone Viewport:

  - Aspect ratio toggle: 4:5 Portrait (1080×1350 default), 1:1 Square (1080×1080), 9:16 Stories (1080×1920).

  - Toggleable "Instagram UI Safe Guides" overlay (shows where profile header, like buttons, and swipe indicator sit so text is never placed there).

  - Zoom controls (Fit to Screen, 50%, 75%, 100%, 150%).

- Multi-Slide Filmstrip & Canvas Stage:

  - Main stage displays the currently active slide at crisp vector quality.

  - Interactive Canva-like element manipulation: Click to select, drag bounding box, corner handles for scale/resize, inline double-click text editing.

  - Floating element context toolbar on selection: Font size slider, bold/italic, color picker, alignment, duplicate, bring forward/send backward, delete.

  - Bottom slide carousel navigation bar: Thumbnail preview of all slides, drag-to-reorder slides, "Add Slide", "Duplicate Slide", and "Delete Slide" buttons.



#### Panel C: Right Sidebar (Inspector & Quality Pre-Flight)

- Inspector Tab:

  - Element properties (exact X/Y coordinates, width/height, rotation, opacity, letter spacing, line height).

  - Global carousel settings: switch active brand kit, toggle watermark handle, switch font pairings.

- AI Pre-Flight Quality Linter (Runs before export):

  - Rule 1: Text truncation check (verifies text does not overflow its bounding box).

  - Rule 2: Safe-Zone violations (flags any element within 40px of edge boundaries).

  - Rule 3: Visual contrast ratio checker (flags text with WCAG contrast < 4.5:1 against slide background).

  - Rule 4: Structural integrity (confirms Slide 1 has a verified Hook title, Last Slide contains a CTA button/handle).

  - Shows green checklist tags with a "Auto-Fix Layout" button that automatically adjusts font sizes and re-centers misaligned items.



### 4. Smart Auto-Layout & Content Engine Logic

- Carousel Schema Rules:

  - Slide 1 (Hook Page): Large headline (>52px equivalent), category pill badge, high-contrast hook question, author badge with brand logo + handle.

  - Middle Slides (Body Content): Auto-splits content into digestible cards, numbered steps (01, 02...), code snippet windows with dark headers and colored window dots, or side-by-side comparison tables.

  - Final Slide (CTA Page): Centered action card ("Save this for later", "Follow @handle for more"), clear profile avatar/logo, dynamic bookmark and share icon graphics.

  - Universal Header/Footer: Top persistent brand bar (Logo + Handle) and bottom persistent progress indicator ("Slide 3 of 7" or dot-bar indicator).

- Auto-Fit Algorithm:

  - If AI content exceeds standard container bounds, automatically scale font size down proportionally or spawn an additional slide rather than cutting text off.



### 5. High-Resolution Multi-Format Export Engine

- Canvas Render Pipeline:

  - Render off-screen clone at true pixel resolution (1080×1350px at scale 2x for Retina quality).

  - Export Options:

    1. "Download All as ZIP": Exports each slide as `slide-01.png`, `slide-02.png`, etc., compressed inside a single .zip file.

    2. "Download Multi-Page PDF": Combines all slides sequentially into a single downloadable PDF document.

    3. "Download Current Slide": Exports the active view as high-res PNG or JPG.

- Include a progress bar during export with loading states.



Provide fully working components, realistic preset templates, and sample mock data for "Python Data Types" and 

"Salesforce Architecture" so the app is immediately testable out of the box.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://carousel-craft-54.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dc2f007f-efb4-44a1-aefb-bb831b9dbe9d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
