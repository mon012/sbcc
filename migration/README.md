# Migration outputs

Run `npm run migrate` after the source WordPress static export changes.

- `content-inventory.csv` lists every exported HTML route and whether it is handcrafted, migrated, or redirected.
- `redirects.csv` is the reviewable redirect source of truth.
- `public/_redirects` is generated for hosts supporting Netlify-compatible redirect syntax.
- `src/data/legacy-pages.json` contains cleaned content blocks, internal-link references, metadata, and selected images.
- `public/legacy-assets` contains only images referenced by migrated pages, deduplicated by source path.

The source export remains untouched in the parent directory.
