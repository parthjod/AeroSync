# cansatPromptFinal.md
# AeroSync CanSat Website — React + TypeScript Implementation Specification

## 1. Objective

Convert the existing `cansatPrompt.md` concept into a polished, responsive **React + TypeScript** website for **AeroSync: Hybrid CanSat Telemetry & Launch Vehicle System**.

Use the supplied `App.tsx` as a reference for the visual ambition, section-based single-page experience, typed product data, reusable components, product cards, state-driven interactions, accessible modals, and video-background behavior. Do **not** copy it as one enormous component. Build a maintainable multi-file application with reusable React components, typed data, and a separate stylesheet.

The website should feel like an aerospace hardware showcase and prototype/investor presentation, not a generic ecommerce template. Explain the actual CanSat hardware, telemetry path, quadcopter carrier/launch platform, mission workflow, use cases, and two product variants. Use the supplied project photos and presentation as the source of truth.

### Project identity from the supplied presentation
- **Project:** AeroSync: Hybrid CanSat Telemetry & Launch Vehicle System
- **Team ID:** 0007
- **Team:** VAYU9
- **Event/organizer context:** Ignisia × IncubeX 2026
- **Track:** Prototype Expo Track
- **Theme:** Aerospace & Space Technology / Hardware
- **Core proposition:** Compact, affordable, multi-domain atmospheric sensing with real-time 433 MHz LoRa telemetry and a ground-station workflow.

Do not invent flight-test results, regulatory approvals, customer testimonials, order volume, or guaranteed performance. Distinguish project targets and presentation claims from verified measurements.

---

## 2. Required technology and project structure

### Stack
- React
- TypeScript
- Vite
- CSS (plain CSS or CSS modules; do not require Tailwind)
- `lucide-react` for interface icons
- React hooks for state and effects
- HTML `<video>` for the ambient background
- Optional chart library only if the project already uses one. Any mission charts shown without actual uploaded telemetry must be labelled **illustrative/simulated**, matching the presentation.

Do not build a single standalone HTML file. This is a React/TypeScript application with multiple source files.

### Recommended file structure

```text
src/
  main.tsx
  App.tsx
  types/
    product.ts
    order.ts
  data/
    products.ts
    mission.ts
  components/
    Navbar.tsx
    Hero.tsx
    StatStrip.tsx
    SectionHeading.tsx
    ProductCard.tsx
    ProductTabs.tsx
    HowItWorks.tsx
    TelemetryPipeline.tsx
    ProductGallery.tsx
    TechnicalSpecs.tsx
    MissionTimeline.tsx
    ImpactGrid.tsx
    Roadmap.tsx
    PurchaseSection.tsx
    PurchaseModal.tsx
    OrderSuccessModal.tsx
    Footer.tsx
    BackgroundVideo.tsx
  hooks/
    useReducedMotion.ts
  lib/
    orderService.ts
    validation.ts
  styles/
    global.css
    components.css
  assets/
    drone.jpg
    cansat.png
    drone_annotated.png
    cansat_annotated.png
    project-video.mp4
    project-poster.jpg
```

The exact asset filenames can be adjusted to match the actual project, but keep imports centralized and consistent. Do not put all data, styles, modals, and sections inside `App.tsx`.

### Responsibilities
- `App.tsx`: compose page sections and own high-level product/order state.
- `types/product.ts`: define product, specification, and feature types.
- `types/order.ts`: define order form, order submission, and confirmed order types.
- `data/products.ts`: hold both product variants and their display data.
- `components/ProductCard.tsx`: reusable card for either product.
- `components/PurchaseModal.tsx`: accessible form modal if the design uses a modal flow.
- `components/OrderSuccessModal.tsx`: show a confirmation only after a real successful order submission.
- `components/BackgroundVideo.tsx`: render the background video and handle reduced motion.
- `lib/validation.ts`: validate name and Indian mobile number.
- `lib/orderService.ts`: submit an order to a real backend/Supabase integration, with loading and error handling.
- CSS files: own design tokens, responsive behavior, motion, focus states, and reusable visual primitives.

Use semantic HTML, meaningful component names, stable React keys, and explicit TypeScript types. Avoid `any` unless there is a clear reason. Do not use inline styles for every element as the main styling strategy; use CSS classes and CSS custom properties.

---

## 3. Visual direction

### Overall style
Create a premium aerospace/engineering presentation:
- Deep navy/near-black base.
- Strong contrast and readable typography.
- Blue and violet gradients for technical/space cues.
- Restrained warm amber accents to echo the VAYU9/space branding and highlight important actions.
- Green for live/status indicators.
- Glass-like cards with subtle borders and blur, but ensure content remains readable.
- Fine grid, orbital arcs, telemetry lines, or restrained star/particle details may be used as decorative background elements.
- Product imagery should remain the focal point. Do not obscure hardware photos with excessive overlays.
- Use clear, dense technical information where useful, but preserve whitespace and visual hierarchy.
- Avoid pale, low-contrast labels and washed-out card fills. Use darker, saturated panel fills and clearly visible borders.

The reference `App.tsx` uses `#020b18`, `#0f172a`, blue `#3b82f6`, violet `#8b5cf6`, green `#10b981`, amber `#f59e0b`, and slate text. Use a consistent subset of these values instead of introducing a different colour for every element.

### Suggested design tokens

```css
:root {
  --bg: #020b18;
  --bg-elevated: #0b1424;
  --panel: rgba(15, 23, 42, 0.88);
  --panel-strong: #0f172a;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --text-subtle: #64748b;
  --border: rgba(148, 163, 184, 0.18);
  --blue: #3b82f6;
  --blue-bright: #60a5fa;
  --violet: #8b5cf6;
  --green: #10b981;
  --amber: #f59e0b;
  --red: #ef4444;
  --radius-sm: 0.75rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --content-width: 1200px;
  --section-space: clamp(4rem, 8vw, 7rem);
}
```

### Typography
- Use Inter or Sora, with a system-font fallback.
- Hero heading: heavy weight, responsive `clamp()`, tight line-height.
- Section headings: bold, concise, and consistent.
- Body copy: readable line-height around 1.6–1.75.
- Use small uppercase eyebrow labels for section context.
- Do not use the same large font size for every heading.
- Avoid text that becomes too small on mobile.
- Keep technical specifications legible and aligned.

### Layout
- Maximum content width approximately 1200px.
- Use responsive CSS Grid for cards and specification layouts.
- Use flex layouts for navigation, CTAs, badges, and pipeline nodes.
- Every section must fit narrow screens without horizontal overflow.
- Keep the fixed navigation above page content with a visible background/blur.
- Use scroll offsets so anchored sections are not hidden behind the navbar.

---

## 4. Asset inventory and how to use each asset

The supplied files include four project images, the project video, `cansatPrompt.md`, and the eight-slide presentation `VAYU9 - 0007(3).pptx`.

### Local images

| Source file | What it shows | Recommended use |
|---|---|---|
| `cansat1.png` | Tall white CanSat telemetry enclosure; exposed electronics at the top and lower opening; external antenna; status LED | Main CanSat hardware photo; technical gallery |
| `cansat2.png` | Annotated CanSat enclosure with callouts for antenna, status LED, electronics, wiring, side cover, openings, and approximate dimensions | Expanded annotated diagram / technical details view |
| `drone1.png` | Actual quadcopter/carrier prototype with four propellers, white X-shaped arms, yellow protective floats, central electronics, and elevated GPS antenna/module | Main carrier/launch-vehicle photo |
| `drone2.png` | Exploded-style annotated quadcopter diagram with propellers, motors, GPS module, flight controller, electronics stack, wiring harness, battery, frame arms, and yellow floats | Expanded diagram / component gallery |

### Asset rules
- Prefer importing local images from `src/assets` rather than embedding huge base64 strings in source files.
- Preserve aspect ratio with `object-fit: contain` for technical diagrams and `object-fit: cover` only for intentionally cropped photographic cards.
- Do not crop off antenna tips, propellers, floats, wiring, or annotated callouts.
- Add descriptive alt text for every informative image.
- Use a click/tap interaction to expand annotated images in a lightbox or image panel; make the control keyboard-accessible.
- Do not show an annotated image as though it were a live hardware photograph. Clearly label it as an annotated reference/diagram.
- The physical photos show a prototype; preserve that authentic appearance. Do not replace them with stock drones or generic satellite imagery.
- If an asset is missing at build time, show a useful fallback rather than a broken image icon.

### Background video
The existing prompt and reference code use this video URL:

```text
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104303_0c6d60b2-9353-408e-9449-585108a22fb5.mp4
```

The supplied local MP4 has 1920×1080 resolution, 24 fps, and 241 frames. Use it as a subtle ambient background, not as the primary explanation of the hardware. Prefer a local imported asset for reliable deployment; retain the remote URL only if the deployment intentionally serves it remotely.

The original prompt references this poster image:

```text
https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/130837c4-0244-4f37-9c61-8d801d93fd29.jpg
```

If a local poster is available, use it. Otherwise, the video background must still have a stable dark fallback.

### Background video implementation requirements
- Use a fixed full-viewport `<video>` with `muted`, `loop`, `playsInline`, and `autoPlay`.
- `object-fit: cover`; video must remain behind all sections while the page scrolls.
- Add a separate fixed dark overlay/veil to keep text contrast strong.
- Video and veil must use `pointer-events: none`.
- Keep all page content in a higher stacking context.
- Handle `prefers-reduced-motion: reduce`: pause the video and disable nonessential animation/transitions.
- If autoplay is blocked or video loading fails, the site must remain visually complete with a static dark background/poster.
- Do not make the background video so bright that it competes with technical content.
- Avoid layout shift while the video loads.

---

## 5. Main navigation

Build a responsive sticky/fixed navigation bar:
- AeroSync brand mark and name on the left.
- Small subtitle such as “Hybrid CanSat System”.
- Desktop section links: Overview, Products, Workflow, Hardware, Impact.
- Primary CTA: “Explore CanSats” or “Order / Enquire”.
- Small context badges may show `INCUBEX`, `VAYU9`, and `Aerospace Track` on wide screens.
- On mobile, collapse links into an accessible menu or horizontally compact navigation.
- Use smooth scrolling only when reduced motion is not requested.
- Set `aria-label` for navigation and menu controls.
- Every navigation item must link to a real section ID.

Do not make a purchase claim or imply an order is confirmed from a navigation click.

---

## 6. Hero section

### Purpose
Immediately explain what AeroSync is and why it matters, while showing the real project identity.

### Content
Suggested eyebrow:
`PROTOTYPE EXPO · INCUBEX 2026`

Main title:
`AeroSync`
`Hybrid CanSat System`

Subtitle:
`A compact airborne sensing and telemetry platform for real-time atmospheric, illumination, motion, and GPS data.`

Supporting copy should describe the system as a hybrid CanSat telemetry and launch-vehicle/carrier platform. Mention the 433 MHz LoRa telemetry link and ground-station data display.

Display:
- Team ID `0007`
- Team name `VAYU9`
- `Ignisia × IncubeX 2026`
- Track: Prototype Expo
- Theme: Aerospace & Space Technology / Hardware

Hero actions:
1. `Explore CanSats` → scrolls to product cards.
2. `See How It Works` → scrolls to workflow.

Use a prominent image or side-by-side visual treatment featuring the real carrier drone and CanSat enclosure. The hero may use a subtle ambient video background, but product imagery and text must remain easy to see.

### Optional metrics
The original `App.tsx` lists:
- 9 sensors/parameters in sync
- >95% packet delivery
- ~2 s telemetry interval
- 433 MHz LoRa radio

These are claims from the supplied project reference. Display them only with careful wording and, where appropriate, mark them as project-reported/target figures until validated by actual mission logs. Do not present them as independently verified test results.

---

## 7. Product variants

Create a typed product data model and render both cards through the same `ProductCard` component.

### Variant A: AeroSync GPS
- **Price shown in supplied prompt:** ₹15,000
- **Subtitle:** Hybrid CanSat + Launch Vehicle
- **Badge:** FLAGSHIP
- **Key highlight:** Full GPS + live map tracking
- **Flight computer:** Teensy 4.1, 600 MHz ARM Cortex-M7
- **GPS:** u-blox NEO-6M
- **Environmental sensing:** BME280 and SHT31
- **Illumination:** VEML6030
- **Motion:** LSM9DS1 9-DOF IMU
- **Airborne radio:** AS32-TTL-100, 433 MHz LoRa
- **Ground receiver:** E32-433T30D, 433 MHz LoRa
- **Firmware:** C++ / Arduino; TinyGPS++ for NMEA parsing
- **Ground software:** Mission Planner integration as described in the project material

GPS data described in the source: position, altitude, speed, satellite count, and HDOP.

### Variant B: AeroSync Standard
- **Price shown in supplied prompt:** ₹14,000
- **Subtitle:** Hybrid CanSat Telemetry System
- **Badge:** CORE
- **Key highlight:** Multi-domain sensing without GPS
- Same core flight computer, environmental/illumination/motion sensors, and LoRa telemetry architecture as the GPS version, but without the u-blox NEO-6M GPS module.
- Intended for controlled or educational missions where GPS tracking is not required.

### Product card behavior
Each card should include:
- Product name and subtitle
- Badge
- Product photo
- Short, accurate description
- Price
- Key highlight
- Tabs or segmented controls for `Features`, `Specifications`, and `Outputs`
- A clear `Select` / `Enquire` / `Order` action

Keep card height and tab layout consistent across variants. Tabs must update the displayed content and expose the selected state accessibly. Make the image itself clickable only if it has a clear expansion affordance; do not make the whole card unexpectedly open a modal.

### Product data typing

Use types similar to:

```ts
export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: 'aerosync-gps' | 'aerosync-standard';
  name: string;
  subtitle: string;
  price: number;
  badge: string;
  features: string[];
  specs: ProductSpec[];
  outputs: string[];
  image: string;
  annotatedImage: string;
  accentColor: string;
  description: string;
  highlight: string;
}
```

If exact product details conflict across supplied materials, do not silently reconcile them. Keep the supplied prompt’s two prices and explicitly label estimates/claims where relevant.

---

## 8. How it works: four-step workflow

Present a clear four-step sequence with numbered cards and icons.

### 01 — Power on and initialize
- Hardware starts and sensors initialize.
- The system performs its startup/health checks.
- GPS version attempts to acquire a 3D fix.
- Mission timing starts according to the implemented flight workflow.

### 02 — Sense and process
- Teensy 4.1 collects sensor readings.
- Data is timestamped, checked, and assembled into telemetry packets.
- The sensing set includes BME280, SHT31, VEML6030, LSM9DS1, and NEO-6M GPS on the GPS variant.

### 03 — Transmit over 433 MHz LoRa
- AS32-TTL-100 sends telemetry packets from the airborne payload.
- The ground-side E32-433T30D receives the radio data.
- Explain this as the intended system architecture; do not imply a guaranteed range without a measured value.

### 04 — Ground display and logging
- Ground station decodes received packets.
- Telemetry can be displayed and logged.
- Mission Planner is identified in the source as the mapping/telemetry software.
- CSV logs support later analysis.

Use a connecting line or arrows on desktop and a stacked vertical sequence on mobile.

### Telemetry pipeline
Show the path as a diagram, not just a paragraph:

`Sensors → Teensy 4.1 → AS32-TTL-100 (433 MHz LoRa TX) → E32-433T30D (Ground RX) → Ground Dashboard / Mission Planner → CSV Logs`

Use visible arrows and short labels. The pipeline must wrap cleanly on small screens.

---

## 9. Hardware gallery

Create a dedicated image gallery that distinguishes the CanSat enclosure from its carrier/launch vehicle.

### Gallery items
1. **CanSat telemetry enclosure — actual prototype photo** (`cansat1.png`)
   - White protective housing
   - External antenna
   - Status LED
   - Top electronics stack
   - Internal wiring visible through openings
   - Lower PCB access opening

2. **CanSat enclosure — annotated reference** (`cansat2.png`)
   - External RF antenna
   - Status LED
   - Top electronics stack
   - Upper service opening
   - Internal wiring harness
   - Protective enclosure
   - Front retaining strap
   - Side cover panel
   - Lower PCB access
   - Approximate dimensions shown in the annotation: 18–20 cm height and 5–6 cm width/depth

3. **Carrier quadcopter — actual prototype photo** (`drone1.png`)
   - Four propellers and motors
   - White X-frame arms
   - Yellow protective floats
   - Central flight electronics and wiring
   - Elevated GPS antenna/module

4. **Carrier quadcopter — annotated exploded reference** (`drone2.png`)
   - Propellers (4)
   - Brushless motors (4)
   - GPS antenna/module
   - Flight controller
   - Sensor/electronics stack
   - Wiring harness
   - Power/battery module
   - White X-frame arms
   - Yellow protective floats

Do not imply the CanSat enclosure and quadcopter are the same object. Explain their relationship as payload and carrier/launch platform according to the supplied project presentation.

### Gallery interactions
- Responsive grid.
- Click/tap to open a larger image or modal.
- Add `Previous`, `Next`, and `Close` controls if a lightbox is implemented.
- Support Escape to close and focus management.
- Add image captions and informative alt text.
- Do not place tiny labels directly over critical components in the actual photo.

---

## 10. Technical architecture and specifications

Create a technical section with a system diagram and two groups of specification rows.

### Flight hardware
| Component | Function from project material |
|---|---|
| Teensy 4.1 | Flight computer; 600 MHz ARM Cortex-M7 |
| BME280 | Pressure, temperature, humidity |
| SHT31 | Independent temperature/humidity cross-check |
| VEML6030 | Ambient illumination |
| LSM9DS1 | 9-DOF accelerometer, gyroscope, magnetometer |
| u-blox NEO-6M GPS | Position, altitude, speed, satellite count, HDOP |

### Communication and software
| Component | Function from project material |
|---|---|
| AS32-TTL-100 | Airborne 433 MHz LoRa transmitter |
| E32-433T30D | Ground-side 433 MHz LoRa receiver |
| C++ / Arduino | Embedded firmware environment |
| TinyGPS++ | NMEA stream parsing for GPS data |
| Mission Planner | Telemetry display, mapping/tracking, and mission configuration as described in the presentation |

### Enclosure dimensions
The annotated CanSat image states approximately:
- Height: 18–20 cm
- Width: 5–6 cm
- Depth: 5–6 cm

Label these as approximate prototype dimensions from the supplied annotated image, not manufacturing tolerances.

### Sensor data
Show sensor roles in a compact grid:
- Pressure
- Temperature
- Humidity
- Ambient illumination
- Acceleration
- Angular velocity
- Magnetic field
- GPS position/navigation on GPS variant

Be precise about which sensor measures which variable. Do not state that all sensor channels are independently calibrated unless the project source confirms it.

---

## 11. Mission sequence and charts

Use a horizontal timeline on desktop and a vertical timeline on mobile.

1. **Power on:** sensors initialize; GPS attempts a fix; system health check.
2. **Launch:** CanSat is ejected from the carrier vehicle; mission timer begins.
3. **Descent:** parachute deployment is described in the presentation; telemetry continues during descent and GPS tracks location.
4. **Landing:** final GPS fix and battery status are sent if supported by the implemented firmware; mission elapsed time is logged.

The source deck mentions:
- Altitude profile — CanSat mission (simulated telemetry)
- Temperature profile — descent phase
- 9 parameters logged in sync
- Approximately 2-second packet interval
- Greater than 95% packet delivery

If the real dataset is not supplied, use sample data only as an **illustrative chart**, label it `Simulated telemetry — illustrative only`, and do not imply it was collected during a real flight. Avoid fake “live” readings that appear to be connected to a running CanSat.

Potential chart panels:
- Altitude vs. mission time
- Temperature vs. mission time
- Optional packet reception/status visualization if actual data becomes available

Provide units and chart labels. Make chart content accessible with a nearby text summary or data table.

---

## 12. Why AeroSync / problem and solution

Use a concise problem-solution section based on slide 2 of the supplied presentation.

### Existing limitations
- **Delayed data recovery:** some platforms only make useful data available after recovery, limiting real-time insight.
- **Prohibitive cost:** orbital infrastructure and satellite-grade hardware can be inaccessible for student and research teams.
- **Fragmented sensing:** environment, motion, and navigation may require separate systems.
- **Limited mobility in lab instruments:** stationary instruments cannot independently capture altitude-varying field profiles.

### AeroSync focus
- Compact hardware
- Affordable, modular architecture
- Real-time telemetry
- Multi-domain sensing in one airborne platform
- GPS tracking on the GPS variant
- Ground-side display and logging

Avoid absolute unsupported claims such as “no solution exists anywhere” or “the only system capable of this.” Frame the differentiator as the project’s integrated, education-oriented implementation.

---

## 13. Real-world impact and use cases

Create four cards with short, grounded descriptions.

### Environmental monitoring
Atmospheric data can support microclimate analysis and environmental research.

### Precision agriculture
Altitude-based temperature and environmental measurements can help researchers study crop microclimates and heat stress.

### Disaster response
Aerial telemetry and GPS tracking may support reconnaissance and atmospheric observation during extreme events, subject to appropriate flight safety and deployment constraints.

### Accessible aerospace education
A compact modular platform gives students hands-on experience with sensors, embedded systems, radio telemetry, navigation, and ground-station tools.

Follow the presentation’s data flow:

`CanSat → Atmospheric Data → Real-Time Telemetry → Environmental & Disaster Intelligence`

Describe these as potential applications, not proven deployments.

---

## 14. Risks, mitigations, and future roadmap

Use a two-column layout for risks and mitigations, then a separate roadmap.

### Risks and mitigations from the supplied deck
- **GPS signal loss:** flag invalid GPS readings and continue non-GPS sensor/IMU telemetry when the firmware supports it.
- **Radio link interruption:** use packet counters to identify missing packets and resume transmission/receiving when the link recovers.
- **Power and sensor reliability:** monitor battery voltage if implemented; use sensor cross-checks where available.
- **Sensor faults:** show an explicit unavailable/error state instead of displaying fabricated values.

Do not present a mitigation as implemented unless it is confirmed in the code/hardware. Phrase unimplemented items as planned design measures.

### Future roadmap
- Web-based ground dashboard
- Autonomous event detection
- Sensor fusion and state estimation
- Drone payload integration

Show roadmap items as future work, not current capabilities.

### Economic feasibility
The supplied presentation says the build cost is under ₹8,000, while the product cards in the existing prompt show prices of ₹15,000 and ₹14,000. Preserve this distinction:
- `Reported prototype/build-cost target: under ₹8,000` (source-deck claim; validate before publication).
- `Displayed product prices: ₹15,000 GPS / ₹14,000 Standard` (existing website prompt).
Do not conflate build cost with sale price or invent profit margins.

---

## 15. Purchase / enquiry workflow

Implement a real, understandable product-selection flow. The supplied prompt describes a purchase process; the `App.tsx` reference also includes product cards and order modals.

### User journey
1. User selects either AeroSync GPS or AeroSync Standard.
2. The selected product is clearly highlighted.
3. The page scrolls to the purchase/enquiry section or opens a form modal.
4. The user enters full name and a 10-digit Indian mobile number.
5. Validate input and show clear inline errors.
6. The user confirms.
7. Submit the order to a real backend/Supabase endpoint.
8. Show success only after the server confirms the record was saved.
9. Display the returned unique order ID, selected product, and amount.
10. If submission fails, retain the entered details, show a clear error, and allow retry.

### Order ID
Use a unique server-generated order ID where possible. If generating client-side IDs, ensure the backend enforces uniqueness. Format can be similar to:

`AEROSYNC-<timestamp-base36>-<random-suffix>`

Do not claim an order has been placed if the request failed.

### Type definitions
```ts
export interface OrderFormValues {
  name: string;
  phone: string;
}

export interface CreateOrderPayload {
  name: string;
  phone: string;
  productId: string;
}

export interface ConfirmedOrder {
  orderId: string;
  name: string;
  productName: string;
  price: number;
  createdAt: string;
}
```

### Validation
- Name is required and should contain at least two non-whitespace characters.
- Phone is required and must match a valid 10-digit Indian mobile format (`^[6-9]\\d{9}$`) if the application is specifically collecting Indian mobile numbers.
- Trim whitespace before submission.
- Disable repeat submission while a request is in progress.
- Provide visible focus states and associated labels.
- Keep error messages next to the field they refer to.

### Supabase integration and security
The original prompt describes a Supabase REST `orders` table. Use a real backend or a carefully configured Supabase client for persistence.

Suggested table:

```sql
create table public.orders (
  id bigint generated by default as identity primary key,
  order_id text unique not null,
  name text not null,
  phone text not null,
  product text not null,
  price numeric(10, 2) not null,
  created_at timestamptz not null default now()
);
```

Implementation requirements:
- Keep Supabase URL and public anon key in environment variables such as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Never put a Supabase service-role key or other secret in client-side code.
- Configure Row Level Security and policies deliberately. Do not leave the database open to unrestricted reads or writes.
- Validate all fields again server-side or in a trusted serverless function.
- Prefer a server endpoint/serverless function for order creation, rate limiting, and order ID generation.
- Use `fetch` error handling and check `response.ok`.
- Store numeric prices as numeric values, not text.
- Do not send order data to Anthropic or another unrelated API as a substitute for database persistence.
- Do not use a fake endpoint, swallowed exceptions, or a simulated success modal.
- Do not log phone numbers in the browser console.
- Add a short privacy notice explaining why the name and phone number are collected and how the user can contact the team, once a real contact method is supplied.

If the actual Supabase project details are not supplied, create a clearly isolated `orderService.ts` with environment-variable placeholders and show a useful “ordering is not configured” message. Do not pretend persistence works until it is configured and tested.

### Purchase UX
The form can be a modal or an inline section, but it must be keyboard-accessible:
- Focus moves into the modal when it opens.
- Escape closes the modal if it is safe to do so.
- Focus returns to the trigger when the modal closes.
- Prevent background scrolling while a modal is open.
- Use `aria-labelledby`, proper labels, and clear status/error messages.
- Success state includes a copyable order ID if feasible.
- Do not request card or payment details unless a real payment provider is integrated.

---

## 16. Reference `App.tsx`: what to reuse and what to improve

The supplied reference code establishes useful patterns:
- `Product` and `OrderData` TypeScript interfaces.
- A typed `PRODUCTS` array for the GPS and Standard variants.
- Reusable `ProductCard`, `PurchaseModal`, and `SuccessModal` components.
- React state for selected product, tab selection, image expansion, and order status.
- A full-page video background with poster and reduced-motion handling.
- Responsive section headings, CTA buttons, workflow cards, product cards, and technical pipeline.
- Consistent use of Lucide icons and product accent colours.

Apply those patterns, but improve the implementation in these ways:

1. **Split components into separate files.** Keep `App.tsx` as a composition layer rather than a huge file.
2. **Move product content into `data/products.ts`.** Avoid duplicating product details across cards, CTA banners, and modals.
3. **Move all styles to CSS files.** Reuse tokens and classes instead of repeating long inline style objects.
4. **Use a real order service.** The reference’s Anthropic API request is explicitly simulated and is not a valid Supabase order-storage implementation. Do not use it.
5. **Handle HTTP failures.** Do not swallow exceptions and then show an order-success screen.
6. **Use accessible controls.** Tabs, modals, image expansion, mobile navigation, and form validation must work by keyboard and touch.
7. **Respect reduced motion.** Pause the background video and disable nonessential animation when requested.
8. **Use accurate wording.** Do not claim a live dashboard or live telemetry is connected to this website unless an actual data source is integrated.
9. **Keep charts honest.** Label simulated chart data clearly.
10. **Avoid layout overflow.** In particular, use `minmax(0, 1fr)`, `min-width: 0`, responsive grid breakpoints, and wrapping flex layouts.
11. **Add loading, error, and empty states.** Every async action needs a visible outcome.
12. **Keep local images local.** Import the supplied project assets instead of embedding giant base64 strings or substituting generic images.

Do not copy the reference code’s order request to `https://api.anthropic.com/v1/messages`. Do not put secrets in browser code.

---

## 17. Interactions and motion

### Required interactions
- Navbar links scroll to the correct section.
- Hero CTAs scroll to Products and Workflow.
- Product tabs switch between features, specifications, and outputs.
- Selecting a product updates selected styling and the purchase/enquiry state.
- Annotated images can be expanded and closed accessibly.
- Purchase form validates inputs and shows inline errors.
- Submit button has idle/loading/error/success states.
- Order ID can be copied if supported.
- Mobile navigation opens and closes.
- Links and buttons have visible hover, active, focus, and disabled states.

### Motion guidance
- Use subtle entrance transitions, hover lift, and button feedback.
- Do not over-animate every card.
- Prefer CSS transitions over heavy animation libraries.
- Honor `prefers-reduced-motion`.
- No motion should be required to understand the workflow or access information.

---

## 18. Responsive and accessibility requirements

### Responsive breakpoints
Choose sensible breakpoints for:
- Wide desktop
- Laptop/tablet landscape
- Tablet portrait
- Mobile

Do not rely on a fixed 1536×1024 artboard scale for the whole site. Use fluid widths, `clamp()`, flexible grids, and content-driven section heights.

### Requirements
- No horizontal page scroll at any viewport.
- Mobile product cards become one column.
- Gallery cards stack cleanly on mobile.
- Telemetry pipeline wraps or becomes vertical on small screens.
- Tables become readable stacked rows or horizontally scroll within their own container only when necessary.
- Touch targets should be at least 44×44px.
- All meaningful images have useful alt text.
- Decorative images and background video are hidden from assistive technology.
- All controls have accessible names.
- Use semantic landmarks: `header`, `nav`, `main`, `section`, and `footer`.
- Maintain strong text contrast on dark panels.
- Do not communicate status through colour alone.
- Respect reduced motion.
- Ensure modals have focus management and correct ARIA attributes.
- Charts must include labels and an accessible text summary.
- Use proper button elements for actions and anchors for navigation.

---

## 19. Performance and reliability

- Lazy-load below-the-fold product/gallery images where appropriate.
- Do not lazy-load the primary hero image if it causes visible delay.
- Use image dimensions or `aspect-ratio` to reduce layout shift.
- Compress large images for production while preserving component detail.
- Use the video poster as a fallback before the video paints.
- Keep video muted and handle rejected `play()` promises.
- Avoid adding large animation libraries solely for minor effects.
- Avoid duplicate state for the same product data.
- Clean up event listeners and observers in effects.
- Keep the console free of avoidable warnings and errors.
- Add an error state for missing images and failed order submissions.

---

## 20. Footer

Include:
- AeroSync brand
- `Hybrid CanSat Telemetry & Launch Vehicle System`
- Team `VAYU9`
- Team ID `0007`
- `Ignisia × IncubeX 2026`
- `Prototype Expo Track`
- `Aerospace & Space Technology / Hardware`

The presentation includes a project video folder:
`https://drive.google.com/drive/folders/12sinTi2cqTp08u40LJMLwo98TNp7EeID`

If including it as a link, label it clearly as project videos/demonstration. Do not imply the folder is publicly accessible unless verified. Do not invent email addresses, phone numbers, social accounts, or contact links.

---

## 21. Source-grounded content notes from the PPT

Use the eight-slide `VAYU9 - 0007(3).pptx` as the source for project identity and technical content.

- **Slide 1:** Project identity, team ID 0007, Prototype Expo Track, Aerospace & Space Technology / Hardware, video-folder link, and project/team branding.
- **Slide 2:** Problems with delayed data recovery, high costs, fragmented sensing, and stationary lab instruments; opportunity for compact, affordable, real-time sensing.
- **Slide 3:** Solution overview: Teensy 4.1 collects, timestamps, and validates sensor/navigation data before 433 MHz LoRa transmission; GPS navigation, multi-domain sensing, and BME280/SHT31 cross-validation.
- **Slide 4:** Hardware/software stack and architecture: sensors → Teensy 4.1 → LoRa transmitter → ground station; Mission Planner and TinyGPS++ are named.
- **Slide 5:** Mission workflow from power-on through launch, descent, and landing; charts are labelled simulated telemetry; the slide mentions a ~2-second packet interval and >95% delivery.
- **Slide 6:** Environmental monitoring, precision agriculture, disaster response, and aerospace education use cases; data flow from aerial sensors through telemetry to intelligence.
- **Slide 7:** GPS-loss, radio-interruption, and power/sensor reliability risks with proposed mitigations; future web dashboard, event detection, sensor fusion, and drone integration; build-cost claim under ₹8,000.
- **Slide 8:** Research references and project video-folder link.

Use the supplied annotated images to describe the physical CanSat and quadcopter. The CanSat annotated image gives approximate enclosure dimensions. Do not assume an image annotation proves that every module is installed unless it is visible or corroborated by the presentation.

### References listed in the presentation
Preserve these references if a research/reference section is included:
1. “Design of Trash Can Sized Satellite for Air Quality Monitoring at an Altitude of 300m Above Ground Level.” IEEE Xplore: https://ieeexplore.ieee.org/document/10245113/
2. Swayampakula et al., “Design and development of a CanSat for air pollution monitoring with RSSI based position retrieval system,” *Advances in Space Research*, Vol. 75, Issue 9, 2025. https://www.sciencedirect.com/science/article/pii/S0273117724001856?via%3Dihub
3. N. Sako et al., “CanSat suborbital launch experiment—university educational space program using can sized pico-satellite,” *Acta Astronautica*, Vol. 48, Issues 5–12, pp. 767–776, 2001. https://linkinghub.elsevier.com/retrieve/pii/S009457650100039X
4. “A pico-satellite assembled and tested during the 6th CanSat Leader Training Program,” *Journal of Applied Research and Technology*, Vol. 15, Issue 1, pp. 83–91, 2017. https://doi.org/10.1016/j.jart.2016.10.003

---

## 22. Acceptance checklist

### Product and content
- [ ] The site is a React + TypeScript project with multiple maintainable files.
- [ ] AeroSync, VAYU9, Team ID 0007, and event/track information are present.
- [ ] Both products are displayed: GPS ₹15,000 and Standard ₹14,000.
- [ ] GPS variant includes NEO-6M GPS; Standard clearly excludes it.
- [ ] Hardware details match the supplied prompt/PPT.
- [ ] Carrier quadcopter and CanSat enclosure are presented as separate but related parts.
- [ ] Actual and annotated images are clearly distinguished.
- [ ] Simulated charts are clearly labelled as simulated.
- [ ] Future features are not presented as already implemented.
- [ ] Cost/build claims are not conflated with product prices.

### Visual and interaction
- [ ] Dark aerospace visual system with strong contrast.
- [ ] Full-page fixed video background with dark overlay and fallback.
- [ ] Sticky navigation links to valid section IDs.
- [ ] Hero CTAs work.
- [ ] Product tabs work and are keyboard-accessible.
- [ ] Gallery expansion/lightbox works on desktop and mobile.
- [ ] Purchase/enquiry form validates name and phone.
- [ ] Loading, error, and success states are implemented.
- [ ] Success is shown only after a confirmed backend response.
- [ ] No simulated API call is presented as database persistence.

### Engineering quality
- [ ] `App.tsx` composes components rather than containing the entire site.
- [ ] Product/order types are defined.
- [ ] Product data is stored separately from presentation markup.
- [ ] Styles are organized in CSS files.
- [ ] Supabase credentials are environment-configured; no service-role secret is exposed.
- [ ] Database access is protected by appropriate RLS/server-side validation.
- [ ] No horizontal overflow at mobile widths.
- [ ] Images have alt text and stable dimensions.
- [ ] Reduced-motion preference pauses video and suppresses nonessential motion.
- [ ] No console errors or broken imports.
- [ ] The app builds and runs using the documented commands.

---

## 23. Expected developer handoff

Deliver a complete runnable React + TypeScript implementation, not a single pasted code block. Include:
1. The full source tree.
2. All reusable component files.
3. Typed product/order data.
4. CSS tokens and responsive styling.
5. Correct imports for the supplied images/video.
6. `.env.example` with placeholder variable names only.
7. Supabase/backend setup instructions and the exact table/policy assumptions.
8. Build/run commands.
9. A short list of any integrations that remain unconfigured, especially live telemetry and order persistence.

If live telemetry is not connected, present the site as a project showcase and label any demonstration charts as illustrative. If order persistence is not configured, show an honest configuration/error state rather than fake success.
