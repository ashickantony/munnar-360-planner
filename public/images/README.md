# Travel and destination photography

This folder contains the travel photos supplied in the Munnar 360° Planner
photography PDF, rendered into the existing image slots. Keep destination and
package photography here. Brand marks and typefaces belong in `public/brand/`.

Each image is referenced by the corresponding JSON entry in `content/`. Replace
a photo using the same filename to keep the swap drop-in; landscape images around
4:3 or 16:9 and at least 1600px wide are recommended.

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

- `munnar-video-poster.jpg` is the home-page poster and reduced-motion
  fallback, taken from the supplied hero video.
- `hero-1.jpg` and `hero-2.jpg` are alternate concept images.
- `../videos/munnar-hero.mp4` is a muted, optimized version of the supplied
  hero video, with a light green color grade. The hero keeps `munnar-hero.jpg` as
  its poster and static fallback for reduced-motion preferences.
- Alt text is generated from each experience/package title; no per-file alt is
  needed, but you can refine alts in the page components if desired.
