# Salinan lokal — Next.js

Folder ini adalah proyek Next.js untuk AI Readiness Dispora Jawa Barat.

- Kode: `app/`, `content/`, `public/`, serta konfigurasi di akar proyek.
- Excel: `assessment/Bank-Soal-AI-Readiness-50-Soal.xlsx`.
- PRD asli dan cadangan sebelum migrasi: `dokumen/`.
- Cara menjalankan dan struktur proyek: [README.md](README.md).
- Panduan upload: [NETLIFY.md](NETLIFY.md).

Jalankan `npm ci`, lalu `npm run build`. Hasil website siap unggah berada di `out/`. Jalankan `npm start` untuk memeriksanya di http://localhost:4173.

Excel, bank jawaban, PRD, dan cadangan diabaikan Git serta tidak masuk ke hasil build peserta. Netlify belum dihubungkan dan belum ada deployment Netlify yang dilakukan dalam migrasi ini.

Paket hasil build: `deployment/dispora-ai-readiness-netlify.zip`. ZIP ini hanya memuat aset peserta dan dapat diekstrak untuk diunggah ke Netlify Drop.

Repository kode website: https://github.com/syahrizal-as/ai-dispora, branch `main`. Koneksi ke Netlify dilakukan melalui repository tersebut sesuai `NETLIFY.md`.
