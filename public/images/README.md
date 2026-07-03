# Image slots — client photo swap guide

Every image below is a **brand-gradient placeholder** generated for the trial. To
go live, replace each file with a real photo **using the exact same filename** and
it drops straight in — no code changes needed. Keep them roughly landscape
(≈4:3 or 16:9), JPGs, ideally ≥1600px wide.

To regenerate the placeholders: `node scripts/generate-placeholders.mjs`

## Experiences (`content/experiences.json`)

| File | Slot | Suggested photo |
|---|---|---|
| `tea-hills-1.jpg` | Tea Hills — hero + gallery lead | Wide misty tea-estate ridge |
| `tea-hills-2.jpg` | Tea Hills — gallery | Sunrise over the hills (Kolukkumalai / Top Station) |
| `tea-hills-3.jpg` | Tea Hills — gallery | Estate road / tea pickers |
| `backwaters-1.jpg` | Backwaters — hero + gallery lead | Kettuvallam houseboat on the water |
| `backwaters-2.jpg` | Backwaters — gallery | Backwater village / paddy channel |
| `backwaters-3.jpg` | Backwaters — gallery | Sunset from the houseboat deck |
| `offbeat-trails-1.jpg` | Offbeat Trails — hero + gallery lead | Bike/jeep on a quiet hill road |
| `offbeat-trails-2.jpg` | Offbeat Trails — gallery | Hidden waterfall |
| `offbeat-trails-3.jpg` | Offbeat Trails — gallery | Ridge viewpoint |

## Packages (`content/packages.json`)

| File | Slot | Suggested photo |
|---|---|---|
| `backwater-escape-1.jpg` | Backwater Escape — hero | Houseboat wide shot |
| `backwater-escape-2.jpg` | Backwater Escape — gallery | Kumarakom / lakeside |
| `munnar-mist-1.jpg` | Munnar Mist — hero | Munnar tea hills in mist |
| `munnar-mist-2.jpg` | Munnar Mist — gallery | Kolukkumalai sunrise |
| `full-360-kerala-1.jpg` | Full 360° Kerala — hero | A signature Kerala shot |
| `full-360-kerala-2.jpg` | Full 360° Kerala — gallery | Backwaters or trail |

## Notes

- The **hero** background on the home page is an intentional CSS gradient
  (valley + mist stand-in), not a file. If the client supplies a hero photo,
  add it as `public/images/hero-valley.jpg` and wire it into
  `components/hero.tsx` behind the gradient.
- Alt text is generated from each experience/package title; no per-file alt is
  needed, but you can refine alts in the page components if desired.
