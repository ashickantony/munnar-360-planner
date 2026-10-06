import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteName = "Munnar 360 Planner";

  return {
    name: siteName,
    short_name: "Munnar360",
    description: "Custom Kerala trip planning and curated stays, experiences, and packages in Munnar.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d2d2c",
    theme_color: "#d4a83a",
    icons: [
      {
        src: "/brand/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
