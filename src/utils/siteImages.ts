import type { ImageMetadata } from "astro";

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  [
    "../assets/images/site/images/**/*.{avif,gif,jpeg,jpg,png,webp}",
    "../assets/images/site/legacy-assets/**/*.{avif,gif,jpeg,jpg,png,webp}",
  ],
  { eager: true },
);

const siteImages = new Map<string, ImageMetadata>();

for (const [path, module] of Object.entries(imageModules)) {
  const relativePath = path.split("/site/")[1];

  if (relativePath) {
    siteImages.set(`/${relativePath}`, module.default);
  }
}

export function getSiteImage(src: string): ImageMetadata {
  const image = siteImages.get(src);

  if (!image) {
    throw new Error(`No optimized image asset is registered for: ${src}`);
  }

  return image;
}
