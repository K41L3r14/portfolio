import type { MetadataRoute } from "next";

import { COMPANY_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY_NAME} | Create with Katia`,
    short_name: "Create with Katia",
    description:
      "Professional websites and custom software for businesses and organizations in Omaha and worldwide.",
    start_url: "/en",
    display: "standalone",
    background_color: "#e7f4f2",
    theme_color: "#10363b",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
