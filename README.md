# Praktik AI untuk Dosen dan Profesional — ICC

Workshop dengan pengantar singkat dan dua jalur praktik untuk dosen Fakultas Dakwah dan Komunikasi serta peserta dari Bank Indonesia. Logo ICC menggunakan berkas yang diberikan pengguna. Contoh Bank Indonesia bersifat sintetis, bukan data atau pernyataan resmi.

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

- `content/landing.html`: halaman workshop dan agenda usulan 100 menit.
- `public/app.js`: dua jalur peserta, delapan contoh latihan, prompt yang dapat diedit/disalin, unduhan paket TXT, navigasi dan dialog fasilitator.
- `public/styles.css`: tampilan responsif dan identitas warna ICC.
- `public/assets/logo-icc.png`: logo ICC asli.
- `public/assets/panduan-program.txt`: ringkasan kegiatan terbaru.
- `app/layout.tsx`: metadata halaman.

Agenda: orientasi 5 menit, pengantar AI 10 menit, empat latihan 60 menit, proyek 20 menit, dan berbagi hasil 5 menit. Materi tidak lagi menggunakan assessment 100 soal sebagai alur peserta. Arsip assessment lama bukan bahan workshop baru dan tidak masuk hasil build. Situs tidak menjalankan model AI, mengirim prompt ke layanan AI, atau menyimpan isian ke server. Prompt yang diedit hanya bertahan selama halaman terbuka. Bank Indonesia dicantumkan sebagai asal peserta, bukan penyelenggara.

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
