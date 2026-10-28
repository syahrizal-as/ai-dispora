# AI Readiness — Dispora Jawa Barat

Repository ini menggunakan Next.js App Router, React, dan TypeScript. `next build` menghasilkan website statis pada folder `out/`, siap untuk Netlify. Tidak diperlukan database, Cloudflare Worker, atau kunci API untuk menjalankan materi ini.

## Menjalankan

Gunakan Node.js 22 atau lebih baru (minimal 22.13.0).

```sh
npm ci
npm run dev
```

Untuk memeriksa hasil produksi:

```sh
npm run build
npm start
```

Server pratinjau hasil build tersedia pada http://localhost:4173. `npm start` menyajikan isi `out/` karena proyek memakai static export. `npm run typecheck` memeriksa TypeScript.

## Kode dan materi

- `app/page.tsx`: halaman Next.js. Membaca markup lokal tepercaya saat build dan memuat interaksi melalui `next/script` setelah hidrasi.
- `app/layout.tsx`: metadata, bahasa, font, dan stylesheet.
- `content/landing.html`: sumber markup halaman. Bagian body dirender oleh halaman Next.js; metadata dan aset head dikelola layout.
- `public/app.js`: 16 materi, studi kasus, dan enam simulasi. Materi 14A–14C membahas pemasangan, rencana perawatan, dan pelaksanaan perawatan.
- `public/styles.css`: tampilan desktop dan ponsel.
- `public/assets/panduan-program.txt`: ringkasan peserta.

Berkas penyelenggara disimpan hanya pada salinan lokal dan dikecualikan dari Git melalui `.gitignore`: `assessment/` (Excel), `server/` (bank kunci), `dokumen/` (PRD dan arsip), serta `.openai/` (identitas hosting lama). Berkas tersebut tidak diperlukan untuk membangun website.

## Materi dan assessment

Materi dan penutup 60 menit, lalu assessment terpisah di Google Forms 40 menit; total 100 menit. Fasilitator membagikan tautan setelah materi. Formulir belum dibuat atau ditautkan. Skrip opsional pada Excel belum dijalankan dan tidak memasang timer otomatis.

Slide 15 memetakan enam unit acuan ke materi dan latihan pengantar. Kode AI mengikuti acuan awal program; keterangan versi menjelaskan penggantian Kepmenaker 123/2021 oleh 103/2026. Cakupan pengantar belum membuktikan penguasaan seluruh unit atau menggantikan asesmen sertifikasi.

PRD asli memuat rancangan awal. Kode dan ringkasan mengikuti perubahan terbaru: 100 soal/40 menit, assessment terpisah pada akhir sesi, materi AI modern dan perawatan, tanpa tanggal pembaruan atau tautan pelatihan utama.

## Netlify

Pengaturan ada pada `netlify.toml`: build `npm run build`, publish `out`, Node.js 22. Ikuti [NETLIFY.md](NETLIFY.md) untuk deployment melalui Git atau unggah hasil build. Hanya isi `out/` yang menjadi website peserta. Excel, bank kunci, PRD, dan arsip tetap pada salinan lokal, di luar GitHub dan hasil build.

Versi lokal ini disiapkan untuk Netlify. Website Sites yang sudah terbit memiliki sumber terpisah; migrasi lokal ini tidak menerbitkan atau mengubah akses website tersebut. Identitas hosting Sites dipertahankan hanya pada salinan lokal dan tidak digunakan build Next.js.

## Repository GitHub

Sumber website: https://github.com/syahrizal-as/ai-dispora, branch `main`. Untuk mengambil kode:

```sh
git clone https://github.com/syahrizal-as/ai-dispora.git
cd ai-dispora
npm ci
npm run build
```

Proyek berada langsung di akar repository; base directory Netlify dapat dibiarkan kosong.
