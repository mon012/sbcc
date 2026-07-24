import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sbcceng.co.th",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
});
