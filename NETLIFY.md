# Deploy ke Netlify

Proyek memakai Next.js dengan `output: "export"`. Hasil build berupa file statis dan semua materi serta simulasi berjalan di browser. Assessment tetap menggunakan Google Forms terpisah.

## Upload langsung

1. Dari folder proyek, jalankan `npm ci` lalu `npm run build`.
2. Buka Netlify Drop pada akun Anda: https://app.netlify.com/drop.
3. Unggah folder `out/`. Paket ZIP tersedia di `deployment/dispora-ai-readiness-netlify.zip`; ekstrak terlebih dahulu, lalu unggah folder hasil ekstraknya yang berisi `index.html`, `_next/`, dan aset lainnya.
4. Setelah terbit, periksa halaman, tombol Buka Materi, simulasi, serta tiga bagian 14A–14C.

Excel dan dokumen penyelenggara berada di luar `out/`, sehingga tidak ikut pada unggahan tersebut.

## Deploy melalui GitHub

Repository: https://github.com/syahrizal-as/ai-dispora

1. Di Netlify, pilih **Add new project → Import an existing project → GitHub**.
2. Pilih repository **syahrizal-as/ai-dispora** dan production branch **main**.
3. Biarkan **Base directory** kosong karena proyek berada di akar repository.
4. Pengaturan tersedia pada `netlify.toml`: build command `npm run build`, publish directory `out`, Node.js 22, dan `NETLIFY_NEXT_PLUGIN_SKIP=true` untuk ekspor statis.
5. Jalankan deploy. Setelah terhubung, push berikutnya ke `main` dapat memicu build dan deploy otomatis sesuai pengaturan proyek Netlify.

Excel, bank kunci, PRD, dan arsip tetap hanya di salinan lokal. Folder tersebut diabaikan Git dan tidak diperlukan oleh Netlify.

Tidak ada environment variable rahasia yang diperlukan oleh materi ini. Konfigurasi identitas Sites bukan autentikasi Netlify. Pengaturan akses pengunjung dan domain mengikuti proyek Netlify yang Anda buat.

## Hal yang perlu diperhatikan

- Upload langsung memakai hasil build `out/`. Build ulang diperlukan setelah sumber diubah.
- Redirect `/test` menuju `/#assessment` disediakan pada `public/_redirects` dan ikut tersalin ke `out/`.
- Tidak ada endpoint pengerjaan assessment atau penyimpanan jawaban pada website ini.
- Hasil build lokal sudah dapat diperiksa; deployment pada akun Netlify belum dilakukan oleh agen.

Referensi resmi:
- https://nextjs.org/docs/app/guides/static-exports
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
