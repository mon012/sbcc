import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sbcceng.co.th",
  output: "static",
  trailingSlash: "always",
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: "monthly",
      serialize(item) {
        if (item.url.endsWith("sbcceng.co.th/")) return { ...item, priority: 1.0, changefreq: "weekly" };
        if (item.url.includes("/products/") || item.url.includes("/services/")) return { ...item, priority: 0.9 };
        if (item.url.includes("/blog/")) return { ...item, priority: 0.7 };
        if (item.url.includes("/privacy-policy/")) return { ...item, priority: 0.2, changefreq: "yearly" };
        return { ...item, priority: 0.6 };
      },
    }),
  ],
});
