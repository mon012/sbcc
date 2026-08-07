# SBCC Astro Redesign

ชุดไฟล์เว็บไซต์ SBCC เวอร์ชัน redesign สำหรับจัดเก็บบน GitHub และ deploy ด้วย Cloudflare Pages

## เริ่มใช้งานในเครื่อง

```bash
npm ci
npm run dev
```

เว็บไซต์จะเปิดที่ `http://localhost:4321`

## ตรวจสอบก่อน deploy

```bash
npm run check
npm run build
```

ไฟล์เว็บไซต์ที่ build แล้วจะอยู่ในโฟลเดอร์ `dist`

## Cloudflare Pages

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20` หรือใหม่กว่า

เชื่อม Cloudflare Pages เข้ากับ GitHub repository ที่มีไฟล์ชุดนี้อยู่ใน root ของ repository
