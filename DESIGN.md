# Design direction

## Subject and purpose

Naruenat Khamwaree is a Full-Stack Developer at Apex Maven and an IT graduate. The portfolio should help a hiring team understand his role, inspect real projects, and find his résumé and contact details.

## Visual system

- Ink `#141414`: main surface.
- Studio `#1c1c1b`: about section and project dialogs.
- Paper `#eaeae5`: primary text.
- Graphite `#a1a19b`: supporting text.
- Blueprint `#526bff`: identity mark and contact section.
- Instrument Sans: one family with deliberately large, tightly spaced display type and compact supporting copy.

## Composition

```text
Brand                 Work / About / Contact
Intro                                 Availability
Full-stack
developer.                               Asterisk
Short introduction                  Bangkok / Time
Selected work                     Gallery / Index
Tookbaht featured public app screenshot
Loyalty illustration      Court illustration
About / Portrait          Biography / Resume
Experience                Education
Tools                     Grouped technology list
Blue contact panel / Large call to action
Social links / Footer
```

The hero is left aligned and typographic. A real Tookbaht public preview and two carefully scaled interface concepts present practical development work. The repeated asterisk ties the wordmark, hero, and portrait together.

## Motion direction

The motion layer follows one identity system: the asterisk draws and lands in the navbar, six shutters uncover project cards, and a typographic ribbon moves with scroll. Hero characters respond to pointer proximity. Scroll-scrubbed headings, portrait masking, word highlighting, experience rules, toolkit rows, and the contact title reverse when scrolling upward. FLIP connects Gallery/Index layouts. Full-screen project stories reveal their final layout through a full-width curtain from the top edge, with masked title words. Closing retreats to the top edge without stretching or scaling artwork. Project-to-project browsing uses a short directional entrance. The mobile menu shares the curtain and masked-type vocabulary on an ink surface; its timeline reverses continuously on rapid toggles.

The desktop navbar contact button fills radially from the pointer's entry point, then retracts toward its exit point. Its text rolls to a duplicate masked line while the arrow passes diagonally through its own mask. Keyboard focus uses the same sequence from the center. Reduced motion or the disabled motion setting makes the state change immediate. Mobile retains the single large menu label and arrow.

The branded intro reveals characters individually before six dark panels rise into the hero. It lasts about 3.5 seconds, is skippable, and bypasses deep links and history navigation. The navbar stays stationary during the icon handoff, and reload scroll restoration is suspended until the entrance ends. It makes no asset-loading or progress-percentage claims.

Lenis wheel and anchor scrolling shares GSAP's ticker. Touch input stays native. Reduced-motion preferences remove all scenes and smoothing, including live preference changes. The manual image carousel uses a single GSAP scroll tween to settle on an image after input ends; the page itself has no scroll snapping, continuous ambient motion, or pinned content.

## Reference review

- https://bouayaben.com/: strong role-led type and quiet navigation.
- https://josh-goldsmith.com/: work-first presentation and gallery/index alternatives.
- https://obscurastudio.webflow.io/: generous scale, whitespace, and disciplined structure.
- https://majd-portfolio.framer.website/: personal identity and a clear software engineer role.

The design uses the references' scale and restraint without importing their layouts, assets, achievements, or copy. Blue and original software illustrations connect the visual identity to this developer's work. No invented client logos, testimonials, project dates, or outcome metrics are included.

## Before publishing

Current employment and availability are confirmed in profile data. Loyalty and Court Booking can be replaced with approved screenshots through project data. The existing résumé and portrait are included locally.

## Refinements

### Experience and toolkit

Keep the existing Ink, Studio, Paper, Graphite, and Blueprint palette and Instrument Sans. The About section becomes a portrait spread: the large introduction, name, location, and resume link sit beside the original color portrait. The portrait sits over a slightly offset blue backing sheet, with the original square asterisk at its corner. One scroll timeline lifts and straightens the print while three vertical shutters retreat in sequence and the badge settles into place. The photo retains its original color and is never stretched or scaled. The sequence works on desktop and mobile and reverses upward. Without motion, the complete portrait remains visible. A separate two-column story pairs the reading statement with the biography and quiet principles.

Career and education form two adjacent chapters, each with its own title, symbol, and chronological rail. Dates sit above the entry titles. Apex Maven retains the current-role badge; education preserves the actual degrees, dates, and honours. Mobile stacks both chapters in reading order. Scroll fills each rail and draws separators; content remains readable throughout and reverses continuously.

The toolkit uses a connected map on a faint drafting grid, retaining Ink `#141414`, Studio `#1c1c1b`, Paper `#eaeae5`, Graphite `#a1a19b`, Blueprint `#526bff`, and Instrument Sans. Six category clusters branch from a central blue spine. Outlined capsules keep all 21 technology names readable without tabs or tool cards. The map presents category membership rather than dependencies or an employer's stack. Mobile moves the spine to the left and places the clusters in reading order.

Scroll traces the spine and branches while the technology capsules settle into place, reversing upward. Names stay visible during the motion, and hovering a capsule highlights its outline. No proficiency scores, additional technology claims, or automatic slides are introduced. Reduced motion and disabled section motion leave the complete map immediately readable. Intro and footer symbols use SVG paths so mobile fonts cannot replace them with emoji artwork.

```text
Introduction / name / location       Color portrait / blue square mark
Resume                               Name / handle
Reading statement / principles       Biography

Where I work                         Where I started
Date / Current                       Date
Apex Maven / Role                    Degree / University / Honours
Date                                 Date
Codemonday / Cooperative education   Vocational certificate / College

My toolkit / Tools & technologies
                              Identity mark
                                   |
Languages -------------------------o---------------- Frameworks & libraries
[TypeScript] [JavaScript] [Python]  |                 [React] [Next.js] ...
                                   |
UI & styling ----------------------o---------------- Databases
[Tailwind CSS] [shadcn/ui]          |                 [PostgreSQL] ...
                                   |
APIs & services -------------------o---------------- Development tools
[Gemini API] [LINE Messaging API]   |                 [Git] [Docker]
```

### Project gallery and continuous browsing

Keep Ink `#141414`, Studio `#1c1c1b`, Paper `#eaeae5`, Graphite `#a1a19b`, and Blueprint `#526bff`, with Instrument Sans for both display and supporting text. The gallery is the primary interaction: one large image with a glimpse of the next, native swipe, mouse drag, keyboard arrows, and explicit controls. The three images are manually browsed; no autoplay. Original covers and clearly identified mockups stay unchanged. A single sticky close control removes duplicate actions. Previous/next project links name their destinations and wrap around the three projects.

Mouse dragging moves the scroll position directly. On release, one interruptible GSAP tween settles to the nearest image from that position. CSS snap is kept disabled, avoiding browser re-snapping before the tween starts. Wheel and touch input stay native, with settling after scrolling stops. Resize handling ignores unchanged widths, and closing or reopening cancels pending movement.

```text
Selected work / project title                 Close
Large title                            Description
[       Current image       ][ next image ...     ]
Caption / image type           image count / arrows
Image selectors
What it does                            Built with
Live project / source links
Previous project                       Next project
Project name                           Project name
```

Opening reveals the final detail layout through one full-width curtain from the top edge. A card-sized mask is avoided because the card and detail artwork have different positions and dimensions, which produces an isolated cutout of unrelated content during the transition. Titles reveal within the same gesture rather than adding a second image wipe. Switching projects uses a short directional entrance and resets the new gallery to its cover. Closing retreats to the top edge; an interrupted entrance continues from its current mask. The visible next image gives the carousel a purpose for this three-image set; the layout avoids an unnecessary stack of full-width artwork. Reduced motion removes transitions and smooth gallery scrolling.

### Full-screen navigation and project stories

Keep Ink `#141414`, Studio `#1c1c1b`, Paper `#eaeae5`, Graphite `#a1a19b`, and Blueprint `#526bff`. Instrument Sans remains the only typeface. Mobile navigation becomes an ink curtain under the existing brand and close control, with left-aligned large links, a blue active marker, and quiet location/contact details. The blue boxed dropdown is removed; blue stays an interaction accent.

```text
Brand                                      Close
Work                                      count
About
Let's talk                                arrow
Location / availability                   Email

Selected work / Project name              Close
Large project title                Description
Original cover / manual image carousel
Project features                   Technology
Live project / source links
Previous project                  Next project
```

Project details use a native full-screen dialog with a sticky close control and independent scrolling, preserving the parent page and keyboard focus. The entry reveals one full-width curtain; image geometry stays fixed. Each project retains its original cover and adds two distinct code-native interface mockups based on its configured features, browsed in a manual carousel. Captions identify mockups and sample data. No project results or additional functionality are claimed. Previous/next controls browse the configured projects without returning to the main page. Mobile uses the same sequence, with reduced motion showing content immediately.

Static SVG grain at low opacity adds texture without continuous motion. The scrollbar is hidden for the current preview; `hideScrollbar` restores the native slim blue-grey design without changing scroll behavior. Project cursors follow pointer movement, hero lines drift in opposite directions on desktop scroll, while screenshots and the portrait stay untransformed for clarity. Motion and texture are individually configurable. Project cards open from their full surface, including Index rows, while visible buttons remain keyboard accessible.
