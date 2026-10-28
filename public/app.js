'use strict';
const icon = (name, extra = '') => `<svg class="icon ${extra}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const dialog = document.querySelector('#content-dialog');
const dialogBody = document.querySelector('#dialog-body');
const dialogContext = document.querySelector('.dialog-context');
let activeView = '';
let slideIndex = 0;
let lastFocus = null;
const lessonCards = (items) => `<div class="reader-list">${items.map(([title, text]) => `<div class="reader-item"><b>${title}</b><p>${text}</p></div>`).join('')}</div>`;
const reference = (url, label) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ${icon('up')}</a>`;
const sourceNote = (...links) => `<div class="lesson-sources"><span>Bacaan lanjutan:</span>${links.join('')}</div>`;
const sources = {
  basics: reference('https://www.ibm.com/think/topics/artificial-intelligence', 'AI dasar'),
  gen: reference('https://www.ibm.com/think/topics/generative-ai', 'Generative AI'),
  multi: reference('https://www.ibm.com/think/topics/multimodal-ai', 'Multimodal'),
  rag: reference('https://www.ibm.com/think/topics/retrieval-augmented-generation', 'RAG'),
  reasoning: reference('https://www.ibm.com/think/topics/reasoning-model', 'Reasoning'),
  agents: reference('https://www.ibm.com/think/topics/ai-agents', 'AI agent'),
  workflow: reference('https://www.anthropic.com/research/building-effective-agents', 'Workflow dan agent'),
  team: reference('https://www.ibm.com/think/topics/multiagent-system', 'Multi-agent')
};
const learningCards = (items, columns = 3) => `<div class="learning-grid learning-cols-${columns}">${items.map(([term, meaning, example]) => `<article class="learning-card"><h3>${term}</h3><p>${meaning}</p><div class="learning-example"><span>CONTOH</span><p>${example}</p></div></article>`).join('')}</div>`;
const flow = (steps) => `<div class="flow-steps">${steps.map((text,i)=>`${i?'<i aria-hidden="true">→</i>':''}<span>${text}</span>`).join('')}</div>`;
const keyPoint = text => `<p class="reader-note"><strong>Yang perlu diingat:</strong> ${text}</p>`;
const competencyMap = [
  {code:'J.63OPR00.014.2',title:'Melakukan Pemasukan Data',topic:'data',where:'11 / Fondasi Data',scope:'Pahami kolom, kelengkapan, dan format saat memasukkan data.',practice:'Tentukan kolom wajib dan format tanggal pada tabel transaksi.',evidence:'Contoh baris input beserta aturan pengisiannya.'},
  {code:'J.63OPR00.015.2',title:'Memastikan Validitas Data',topic:'case',where:'11–12 / Fondasi Data & Studi Kasus',scope:'Kenali nilai kosong, duplikat, format berbeda, dan total yang keliru.',practice:'Temukan masalah pada 10 transaksi fiktif dan periksa sumbernya.',evidence:'Daftar baris bermasalah, alasan, dan langkah verifikasi.'},
  {code:'J.62AIN00.014.1',title:'Mengintegrasikan Komponen Solusi Artificial Intelligence (AI)',topic:'solution',where:'14 / Alur Solusi AI',scope:'Pahami hubungan data, sumber SOP, model AI, aplikasi, dan pemeriksaan manusia.',practice:'Jelaskan perjalanan laporan login hingga menjadi draf tiket.',evidence:'Sketsa alur data, proses AI, dan pemeriksaan hasil.'},
  {code:'J.62AIN00.015.1',title:'Memasang Solusi Artificial Intelligence (AI)',where:'Acuan lanjutan',scope:'Unit acuan program. Rincian pemasangan tidak dibahas dan tidak diujikan pada sesi pengantar ini.'},
  {code:'J.62AIN00.016.1',title:'Merencanakan Perawatan Solusi Artificial Intelligence (AI)',where:'Acuan lanjutan',scope:'Unit acuan program. Penyusunan rencana perawatan tidak dibahas dan tidak diujikan pada sesi pengantar ini.'},
  {code:'J.62AIN00.017.1',title:'Merawat Solusi Artificial Intelligence (AI)',where:'Acuan lanjutan',scope:'Unit acuan program. Pelaksanaan perawatan tidak dibahas dan tidak diujikan pada sesi pengantar ini.'}
];
const slides = [
  {
    id:'facilitator', label:'PERKENALAN FASILITATOR', title:'Halo, saya Syahrizal As.',
    lead:'Software Developer, Trainer, dan Praktisi AI-Assisted Development.',
    body:'<div class="intro-profile"><span class="intro-monogram" aria-hidden="true">SA</span><div><strong>Syahrizal As.</strong><span>Fasilitator sesi pengantar AI</span></div></div>' + lessonCards([
      ['Latar belakang','S1 Sistem Informasi. Menekuni pengembangan software sejak 2020 untuk kebutuhan bisnis dan operasional.'],
      ['Pengalaman teknis','PHP, Laravel, JavaScript, database, REST API, deployment, dan integrasi layanan AI.'],
      ['Cara belajar kita','Pahami konsep dengan bahasa sederhana, lihat contoh pekerjaan, lalu periksa hasilnya bersama.']
    ]) + keyPoint('Anda tidak harus bisa coding untuk mengikuti sesi ini.')
  },
  {
    id:'welcome', label:'TUJUAN SESI', title:'Kenali AI melalui tugas yang dekat dengan Anda.',
    lead:'Kita mulai dari contoh sederhana, lalu menghubungkannya dengan pekerjaan di industri dan IT.',
    body:lessonCards([
      ['Pahami','Bedakan AI yang mengenali pola, membuat konten, dan menjalankan rangkaian tugas.'],
      ['Coba amati','Lihat contoh pencarian berita, tiket IT, data penjualan, dan instruksi kepada AI.'],
      ['Periksa','Bandingkan hasil AI dengan sumber, hitungan, serta izin yang diberikan.']
    ]) + keyPoint('Materi dan penutup berlangsung 60 menit. Assessment 50 soal dilakukan terpisah melalui Google Forms selama 40 menit, setelah materi selesai.')
  },
  {
    id:'ai-basics', label:'PETA DASAR AI', title:'Kenali keluarga AI, dari umum ke khusus.',
    lead:'Bayangkan AI sebagai keluarga besar. Di dalamnya ada Machine Learning; di dalam Machine Learning ada Deep Learning.',
    body:learningCards([
      ['AI: kecerdasan buatan','Teknologi yang membantu komputer mengerjakan tugas seperti mengenali gambar, memahami bahasa, atau memberi saran.','Aplikasi musik menyarankan lagu; toko memperkirakan kebutuhan stok dari penjualan sebelumnya.'],
      ['Machine Learning: belajar dari contoh','Cara membuat AI mempelajari pola dari contoh data, lalu memakai pola itu pada data baru.','Sistem mempelajari contoh email spam dan email biasa, lalu menyaring email baru yang diduga spam.'],
      ['Deep Learning: belajar lewat banyak lapisan','Jenis Machine Learning yang mempelajari pola melalui banyak lapisan pengolahan, disebut jaringan saraf berlapis.','Ibarat mengenali foto dari garis, lalu bentuk, hingga objek. Contohnya, membedakan kucing dan anjing pada foto.']
    ]) + '<div class="concept-map"><span>AI</span><span>mencakup Machine Learning</span><span>yang mencakup Deep Learning</span></div>' + keyPoint('Tidak semua AI memakai Machine Learning. Pilih sesuai tugasnya: pekerjaan dengan aturan tetap sering cukup memakai otomasi sederhana. Hasil AI tetap perlu diperiksa.') + sourceNote(sources.basics)
  },
  {
    id:'gen-multimodal', label:'GENERATIVE AI & MULTIMODAL', title:'Membuat konten dan mengolah beragam bahan.',
    lead:'Generative AI masa kini umumnya memakai Deep Learning. Multimodal menjelaskan jenis bahan yang bisa diproses. Satu aplikasi dapat memiliki kedua kemampuan ini.',
    body:learningCards([
      ['Generative AI: membuat konten','AI yang membuat konten sesuai instruksi, seperti draf teks, gambar, suara, video, atau kode.','Dari catatan rapat, AI menyusun draf email tindak lanjut untuk diperiksa sebelum dikirim.'],
      ['Multimodal: mengolah beragam bahan','Kemampuan AI mengolah beberapa jenis bahan, misalnya tulisan, gambar, dan suara, dalam satu sistem.','Anda mengirim foto struk bersama pertanyaan tertulis: “Apa saja yang saya beli?”']
    ],2) + '<div class="plain-definition"><strong>LLM itu apa?</strong><p>Large language model adalah model bahasa skala besar. Contoh pekerjaannya: merangkum artikel, menyusun email, atau membantu menjelaskan kode.</p></div>' + keyPoint('Generative AI = membuat konten; multimodal = mengolah beberapa jenis bahan. Membaca foto struk lalu membuat ringkasannya bisa memakai keduanya. Foto buram bisa menimbulkan kesalahan. Kemampuan input dan output berbeda antarproduk.') + sourceNote(sources.gen,sources.multi)
  },
  {
    id:'rag-reasoning', label:'KONTEKS & PENALARAN', title:'RAG mencari rujukan. Reasoning membantu mencari penyelesaian.',
    lead:'Ibarat mengerjakan tugas dengan buku panduan: cari bahan yang tepat, lalu pertimbangkan langkah penyelesaiannya. RAG dan reasoning bisa dipakai bersama.',
    body:learningCards([
      ['RAG: buka rujukan sebelum menjawab','Cara membantu Generative AI menjawab dengan mencari rujukan yang relevan lebih dulu. Seperti membuka buku panduan sebelum menjawab.','Untuk pertanyaan pengembalian barang, sistem mencari aturan retur toko yang diizinkan, lalu AI menjawab berdasarkan isinya.'],
      ['Reasoning: menyelesaikan masalah bertahap','Kemampuan AI membantu menyelesaikan masalah bertahap, misalnya membandingkan pilihan sambil mempertimbangkan beberapa syarat.','Memilih jasa kirim dengan membandingkan ongkos, kapasitas, dan waktu tiba agar barang sampai sebelum Jumat.']
    ],2) + '<div class="lesson-checks"><div><strong>Periksa sumber RAG</strong><span>Panduannya relevan, masih berlaku, dan boleh dibaca pengguna?</span></div><div><strong>Periksa hasil reasoning</strong><span>Syaratnya sudah dipenuhi dan hitungannya benar?</span></div></div>' + keyPoint('RAG menambahkan bahan rujukan saat menjawab, bukan melatih ulang model. Reasoning membantu memakai informasi untuk menyelesaikan masalah. Jika rujukan tidak ada, nyatakan keterbatasannya. Hasil dan hitungan tetap perlu diperiksa.') + sourceNote(sources.rag,sources.reasoning)
  },
  {
    id:'agent', label:'MENGENAL AI AGENT', title:'AI agent membantu mengerjakan beberapa langkah.',
    lead:'Anda memberi tujuan. Agent dapat memilih langkah, memakai alat yang diizinkan, lalu memeriksa hasilnya untuk melanjutkan atau berhenti.',
    body:'<div class="task-example"><span>CONTOH TUGAS UNTUK TIM IT</span><p>“Cari 3 berita AI terbaru dari sumber resmi. Buat ringkasan, sertakan tanggal dan tautannya. Simpan sebagai draf untuk saya periksa.”</p></div>' + flow(['Pahami tugas','Cari sumber','Baca & bandingkan','Buat draf','Minta pemeriksaan']) + lessonCards([
      ['Tujuan','Hasil yang diminta jelas: tiga berita yang relevan untuk tim IT.'],
      ['Alat','Misalnya pencarian web atau pembaca dokumen. Alat dan akses harus disediakan.'],
      ['Batas tindakan','Draf diperiksa manusia. Pengiriman pesan atau tindakan penting mengikuti izin yang diberikan.']
    ]) + keyPoint('Jika sumber tidak ditemukan atau data kurang, agent perlu menyatakan keterbatasan atau meminta informasi. Contoh ini menjelaskan alur, bukan pencarian berita langsung.') + sourceNote(sources.agents)
  },
  {
    id:'agent-comparison', label:'CHATBOT, WORKFLOW, DAN AGENT', title:'Tiga cara menyiapkan ringkasan berita.',
    lead:'Contoh tugas: ringkasan berita untuk tim IT. Perhatikan siapa yang menyiapkan bahan dan menentukan langkahnya. Chatbot juga bisa menjadi tampilan percakapan untuk sebuah agent.',
    body:'<div class="comparison-table-wrap"><table class="lesson-comparison"><thead><tr><th>Pendekatan</th><th>Contoh cara kerja</th><th>Siapa menentukan langkah?</th></tr></thead><tbody><tr><th>Chatbot tanpa alat</th><td>Anda menyalin artikel, lalu meminta ringkasan.</td><td>Anda menyiapkan bahan dan menjalankan tindakan berikutnya.</td></tr><tr><th>Workflow otomatis</th><td>Setiap pagi, ambil artikel dari daftar sumber tetap, ringkas, lalu simpan.</td><td>Urutannya telah diprogram.</td></tr><tr><th>AI agent</th><td>Anda memberi tujuan. Agent mencari sumber, membandingkan hasil, dan menyiapkan draf.</td><td>Agent memilih langkah sesuai kondisi, dalam batas izin.</td></tr></tbody></table></div>' + keyPoint('Gunakan cara paling sederhana yang memenuhi kebutuhan. Agent tidak otomatis lebih akurat atau lebih hemat daripada workflow tetap.') + sourceNote(sources.workflow)
  },
  {
    id:'industry-examples', label:'CONTOH DI DUNIA INDUSTRI', title:'Mulai dari pekerjaan sehari-hari di industri dan IT.',
    lead:'Berikut contoh rancangan penggunaan AI. Setiap hasil tetap memiliki orang yang memeriksa dan mengambil keputusan.',
    body:'<div class="industry-examples">' + [
      ['IT helpdesk','Ada laporan gagal login.','Agent membaca keluhan, mencari panduan, lalu membuat draf tiket.','Petugas memverifikasi akun dan menyetujui tindak lanjut.'],
      ['Tim developer','Aplikasi menampilkan error.','AI membantu membaca pesan error dan menyiapkan usulan perbaikan.','Developer menguji perubahan sebelum diterapkan.'],
      ['Gudang & toko','Stok barang mulai menipis.','Agent membaca stok dan penjualan, lalu membuat draf usulan restok.','Pemilik memeriksa kebutuhan, anggaran, dan pembelian.'],
      ['Manufaktur','Sensor mesin menunjukkan pola tidak wajar.','Agent mencari riwayat perawatan dan SOP untuk draf tiket pemeriksaan.','Teknisi memeriksa mesin dan mengikuti prosedur keselamatan.']
    ].map(([title,problem,help,check])=>`<article class="industry-example"><h3>${title}</h3><p class="industry-problem">${problem}</p><div><span>Bantuan AI</span><p>${help}</p></div><div><span>Pemeriksaan manusia</span><p>${check}</p></div></article>`).join('') + '</div>' + keyPoint('Mulai dari tugas kecil yang hasilnya mudah diperiksa. Ukur ketepatan hasil, waktu, biaya, dan kebutuhan koreksi.')
  },
  {
    id:'daily-examples', label:'CONTOH SEHARI-HARI', title:'Gunakan AI untuk menyiapkan pekerjaan Anda.',
    lead:'Mulai dari bahan yang Anda miliki. Bedakan draf yang membantu dengan tindakan yang memerlukan persetujuan.',
    body:learningCards([
      ['Belajar','Minta penjelasan sederhana atau latihan dari catatan yang diizinkan.','Susun draf jadwal belajar satu minggu, lalu setujui sebelum kalender diubah.'],
      ['Perjalanan','Bandingkan pilihan berdasarkan tanggal, tujuan, dan anggaran.','Buat itinerary. Periksa ulang harga dan ketentuan sebelum memesan atau membayar.'],
      ['Pengeluaran','Bantu membaca dan mengelompokkan salinan struk.','Buat rekap belanja. Periksa angka kabur, duplikat, dan total; jangan beri wewenang transfer.']
    ]) + keyPoint('Kemampuan aplikasi berbeda. Izin membaca data tidak otomatis berarti izin mengirim pesan, mengubah jadwal, atau membayar.')
  },
  {
    id:'ai-current', label:'AI YANG TERHUBUNG KE ALAT', title:'Satu agent bisa memakai alat. Beberapa agent bisa berbagi tugas.',
    lead:'Hubungan ini membantu Anda memahami perkembangan AI tanpa harus menghafal nama produk.',
    body:lessonCards([
      ['Model','Membantu memahami masukan, menyusun jawaban, atau memilih langkah.'],
      ['Alat','Misalnya pencarian web, pembaca spreadsheet, atau sistem tiket yang telah diizinkan.'],
      ['Multi-agent','Beberapa agent berbagi peran, misalnya pencari bahan, penyusun draf, dan pemeriksa.']
    ]) + keyPoint('Semakin banyak agent belum tentu semakin baik. Tetapkan tugas, izin, batas proses, dan cara memeriksa hasilnya. Fitur produk dapat berubah atau berbeda menurut akun dan wilayah.') + sourceNote(sources.team)
  },
  {
    id:'data', label:'FONDASI DATA', title:'Data yang baik membantu menghasilkan analisis yang baik.',
    lead:'Data terstruktur disusun dalam baris dan kolom. Penampilannya bisa rapi, tetapi isinya tetap perlu diperiksa.',
    body:learningCards([
      ['Lengkap','Kolom penting tidak boleh dibiarkan kosong tanpa penjelasan.','Jumlah barang belum terisi → periksa catatan transaksi.'],
      ['Konsisten','Gunakan format tanggal dan satuan yang sama. Periksa duplikat.','Dua baris memiliki ID dan isi identik → periksa apakah terhitung dua kali.'],
      ['Akurat','Bandingkan nilai dengan bukti dan perhitungan sumber.','3 barang × Rp5.000 = Rp15.000 sebelum biaya lain.']
    ]) + keyPoint('Catat temuan, verifikasi sumber, baru lakukan koreksi yang diperlukan.')
  },
  {
    id:'case', label:'STUDI KASUS', title:'Tabelnya rapi. Adakah bagian yang perlu diperiksa?',
    lead:'Dataset latihan berisi 10 transaksi fiktif. Periksa empat hal: ID, tanggal, jumlah, dan total.',
    body:lessonCards([
      ['Amati','Baca arti kolom dan cari nilai yang kosong atau tidak konsisten.'],
      ['Catat','Tunjukkan baris yang perlu diperiksa beserta alasannya.'],
      ['Verifikasi','Bandingkan dengan catatan asli sebelum menghapus atau mengganti nilai.']
    ]) + '<button class="button button-primary" data-open="case">Buka tabel latihan '+icon('arrow')+'</button>'
  },
  {
    id:'prompt', label:'PROMPT & VERIFIKASI', title:'Tulis tugas yang jelas dan hasil yang bisa diperiksa.',
    lead:'Prompt adalah instruksi kepada AI. Sebutkan bahan, tugas, bentuk hasil, dan batas tindakannya.',
    body:'<blockquote class="prompt-example">“Periksa tabel transaksi ini. Tandai nilai kosong, ID duplikat, tanggal berbeda format, dan total yang tidak sesuai. Tampilkan nomor baris serta alasannya. Jangan mengubah data sumber.”</blockquote>' + lessonCards([
      ['Bahan','Tabel transaksi yang akan diperiksa.'],
      ['Tugas & hasil','Cari empat jenis masalah, lalu buat tabel temuan per baris.'],
      ['Batas','Jangan mengubah sumber. Nyatakan bagian yang masih meragukan.']
    ]) + keyPoint('Cocokkan temuan dengan sumber dan hitung ulang angka penting. Instruksi yang rinci tetap tidak menjamin AI selalu benar.')
  },
  {
    id:'solution', label:'ALUR SOLUSI AI', title:'Hubungkan AI dengan alur kerja.',
    lead:'Contoh sederhana: laporan kendala login dibaca bersama panduan kantor, lalu AI membantu menyiapkan draf tiket untuk diperiksa petugas.',
    body:flow(['Data masuk','Validasi','AI','Aplikasi & output','Verifikasi','Monitoring']) + learningCards([
      ['Data dan sumber','Siapkan masukan yang lengkap serta sumber yang relevan dan boleh digunakan.','Laporan login berisi nama aplikasi dan pesan error, disertai SOP yang sesuai.'],
      ['Integrasi','Hubungkan data, AI, dan aplikasi agar hasilnya dapat digunakan dalam pekerjaan.','Laporan dan SOP menjadi bahan AI untuk menyiapkan draf tiket pada aplikasi helpdesk.'],
      ['Pemeriksaan hasil','Petugas memeriksa isi draf dan mengikuti hasilnya selama digunakan.','Cocokkan draf dengan keluhan dan SOP. Jika hasil kurang sesuai, periksa masukan dan sumbernya.']
    ]) + keyPoint('Integrasi menghubungkan komponen menjadi satu alur. Sebelum dipakai rutin, uji dengan kebutuhan yang sesuai. Pemantauan membantu melihat apakah hasil tetap berguna; keputusan penting tetap diperiksa manusia.')
  },
  {
    id:'competency', label:'ACUAN KOMPETENSI', title:'Dari unit acuan ke materi dan latihan.',
    lead:'Enam unit berikut merupakan acuan program. Pengantar ini berfokus pada input data, validasi, dan gambaran integrasi; tiga unit lainnya menjadi acuan lanjutan.',
    body:'<div class="competency-context"><strong>Posisi materi pengantar</strong><p>Materi 03–10 membangun pemahaman AI, materi 11–12 membahas data, materi 13 melatih prompt dan verifikasi, serta materi 14 mengenalkan alur integrasi. Rincian pemasangan dan perawatan tidak menjadi materi atau soal sesi ini.</p></div><div class="competency-map">'+competencyMap.map(u=>`<article><code>${u.code}</code><h3>${u.title}</h3><span class="competency-location">${u.where}</span><p>${u.scope}</p>${u.topic?`<dl><div><dt>Latihan pengantar</dt><dd>${u.practice}</dd></div><div><dt>Contoh hasil kerja</dt><dd>${u.evidence}</dd></div></dl><button class="text-button" data-topic="${u.topic}">Buka materi terkait ${icon('arrow')}</button>`:''}</article>`).join('')+'</div>'+keyPoint('Cakupan ini merupakan pengantar, belum pembelajaran dan penilaian seluruh kriteria unjuk kerja. Assessment 50 soal memetakan pemahaman awal; penguasaan unit memerlukan praktik serta asesmen yang sesuai.')+'<div class="competency-reference"><strong>Versi acuan</strong><p>Kode unit AI di atas mengikuti acuan awal program, yaitu Kepmenaker 123/2021. JDIH Kemnaker mencatatnya telah diganti oleh Kepmenaker 103/2026. Untuk sertifikasi, gunakan unit dan persyaratan dalam skema LSP yang berlaku.</p>'+sourceNote(reference('https://jdih.kemnaker.go.id/peraturan/detail/2104/keputusan-menaker-nomor-123-tahun-2021','Acuan 123/2021'),reference('https://jdih.kemnaker.go.id/peraturan/detail/3020/keputusan-menteri-ketenagakerjaan-nomor-103-tahun-2026','Acuan 103/2026'))+'</div>'
  },
  {
    id:'next', label:'PENUTUP & ASSESSMENT', title:'Periksa pemahaman setelah materi selesai.',
    lead:'Ingat tiga kebiasaan: mulai dari data yang baik, beri instruksi yang jelas, lalu periksa hasilnya.',
    body:lessonCards([
      ['50 soal','Pilihan ganda dengan satu jawaban paling tepat, sesuai materi pengantar.'],
      ['40 menit','Durasi pengerjaan mengikuti arahan penyelenggara.'],
      ['Google Forms','Assessment dilakukan terpisah. Tautan dibagikan fasilitator di akhir sesi.']
    ]) + keyPoint('Jangan memasukkan data pribadi atau rahasia ke layanan AI tanpa otorisasi. Keputusan seleksi mengikuti kebijakan penyelenggara.') + '<div class="reader-actions"><button class="button button-primary" data-open="instructions">Panduan assessment '+icon('arrow')+'</button><a class="button button-outline" href="assets/panduan-program.txt" download>Unduh ringkasan '+icon('download')+'</a></div>'
  }
];
function showTopic(id) {
  const index=slides.findIndex(slide=>slide.id===id);
  if(index>=0)showPresentation(index);
}

function setDialog(view) {
  activeView = view;
  if (!dialog.open) {
    lastFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  dialog.scrollTop = 0;
}
function renderSlide() {
  const slide = slides[slideIndex];
  dialogContext.textContent = ' / MATERI PENGANTAR';
  dialogBody.innerHTML = `<div class="reader"><div class="slide-area" aria-live="polite" aria-atomic="true"><span class="eyebrow">${String(slideIndex + 1).padStart(2, '0')} / ${slide.label}</span><h2 id="dialog-title">${slide.title}</h2><p class="reader-lead">${slide.lead}</p>${slide.body}</div><div class="slide-navigation"><div><button class="icon-button previous-slide" aria-label="Slide sebelumnya" ${slideIndex === 0 ? 'disabled' : ''}>${icon('arrow')}</button><span class="slide-counter">${slideIndex + 1} / ${slides.length}</span><button class="icon-button next-slide" aria-label="Slide berikutnya" ${slideIndex === slides.length - 1 ? 'disabled' : ''}>${icon('arrow')}</button></div><div class="slide-dots" aria-label="Pilih slide">${slides.map((s, i) => `<button class="slide-dot ${slideIndex === i ? 'current' : ''}" data-goto="${i}" aria-label="Slide ${i + 1}: ${s.label}" ${slideIndex === i ? 'aria-current="step"' : ''}></button>`).join('')}</div><div><span class="keyboard-hint">Gunakan ← → atau spasi</span><button class="icon-button expand-dialog" aria-label="${dialog.classList.contains('fullscreen-dialog') ? 'Keluar dari tampilan penuh' : 'Perbesar tampilan'}" aria-pressed="${dialog.classList.contains('fullscreen-dialog')}">${icon('expand')}</button></div></div></div>`;
  dialog.scrollTop = 0;
}
function changeSlide(index) {
  if (index < 0 || index >= slides.length) return;
  const focusClass = document.activeElement?.classList.contains('next-slide') ? '.next-slide' : document.activeElement?.classList.contains('previous-slide') ? '.previous-slide' : null;
  slideIndex = index;
  renderSlide();
  if (focusClass) {
    const target = dialogBody.querySelector(focusClass);
    if (!target.disabled) target.focus({ preventScroll: true });
    else dialog.querySelector('.close-dialog').focus({ preventScroll: true });
  }
}
function showPresentation(index = 0) {
  slideIndex = Math.min(slides.length - 1, Math.max(0, index));
  setDialog('presentation');
  renderSlide();
}

const transactions = [
  ['TR001', '01/10/2026', 'Buku', '2', '25.000', '50.000'],
  ['TR002', '2026-10-02', 'Pulpen', '5', '3.000', '15.000'],
  ['TR003', '03/10/2026', 'Buku', '2', '25.000', '50.000'],
  ['TR003', '03/10/2026', 'Buku', '2', '25.000', '50.000'],
  ['TR005', '05/10/2026', 'Pensil', '4', '2.000', '10.000'],
  ['TR006', '06/10/2026', 'Buku', '—', '25.000', '25.000'],
  ['TR007', '07/10/2026', 'Penggaris', '3', '5.000', '15.000'],
  ['TR008', '08/10/2026', 'Tas', '1', '75.000', '75.000'],
  ['TR009', '09/10/2026', 'Map', '6', '2.500', '15.000'],
  ['TR010', '10/10/2026', 'Buku', '3', '25.000', '75.000']
];
const issues = { '1-1': 'Format tanggal berbeda', '2-0': 'ID identik dengan baris berikutnya', '3-0': 'ID identik dengan baris sebelumnya', '4-5': 'Total tidak sesuai jumlah dikali harga', '5-3': 'Jumlah belum diisi' };
function showCase() {
  setDialog('case');
  dialogContext.textContent = ' / STUDI KASUS';
  dialogBody.innerHTML = `<div class="reader"><span class="eyebrow">BELAJAR DARI CONTOH</span><h2 id="dialog-title">Data terlihat rapi. Apakah sudah valid?</h2><p class="reader-lead">Periksa data penjualan berikut. Ada empat jenis masalah yang perlu ditelusuri sebelum data dianalisis. Seluruh data ini fiktif.</p><div class="case-toolbar"><span>10 baris transaksi · Harga dalam rupiah<br>Geser tabel pada layar kecil.</span><button class="button button-outline toggle-errors" aria-pressed="false">${icon('check')} Tampilkan temuan</button></div><div class="table-wrap"><table><caption class="sr-only">Dataset transaksi penjualan sintetis untuk latihan validasi data</caption><thead><tr>${['ID', 'Tanggal', 'Produk', 'Jumlah', 'Harga', 'Total'].map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${transactions.map((row, r) => `<tr>${row.map((cell, c) => `<td${issues[r + '-' + c] ? ' class="error-cell"' : ''}>${cell}${issues[r + '-' + c] ? `<span class="error-marker" role="img" aria-label="Perlu diperiksa: ${issues[r + '-' + c]}"> !</span>` : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="case-explanations" aria-live="polite"><div><b>01 / ID duplikat — TR003</b>Dua baris memiliki ID dan isi yang identik. Periksa sumber untuk memastikan apakah transaksi terhitung dua kali sebelum menghapus salah satunya.</div><div><b>02 / Format tanggal — TR002</b>2026-10-02 memakai format berbeda dari baris lain. Normalisasikan format setelah memastikan makna tanggal pada sumber.</div><div><b>03 / Total tidak sesuai — TR005</b>4 × Rp2.000 = Rp8.000, bukan Rp10.000. Periksa apakah ada biaya lain atau kesalahan input sebelum mengoreksi nilai.</div><div><b>04 / Jumlah kosong — TR006</b>Jumlah belum diisi. Jangan langsung menyimpulkan jumlahnya dari total; verifikasi melalui catatan transaksi asli.</div></div><div class="reader-actions"><button class="button button-primary" data-topic="prompt">Lihat contoh prompt ${icon('arrow')}</button><button class="button button-outline" data-topic="case">Kembali ke materi</button></div><p class="reader-note">Tanda ! menunjukkan sel yang perlu diperiksa. Temuan adalah bahan verifikasi; data sumber tidak diubah oleh demonstrasi ini.</p></div>`;
}
function showInstructions() {
  setDialog('instructions');
  dialogContext.textContent=' / ASSESSMENT DI AKHIR SESI';
  dialogBody.innerHTML=`<div class="reader"><span class="eyebrow">MELALUI GOOGLE FORMS</span><h2 id="dialog-title">Selesaikan materi, lalu ikuti assessment.</h2><p class="reader-lead">Assessment dilakukan pada Google Forms yang terpisah. Fasilitator akan membagikan tautannya setelah materi dan penutup selesai.</p>${lessonCards([['50 soal','Satu jawaban paling tepat per soal. Cakupan mengikuti materi pengantar.'],['40 menit','Ikuti waktu mulai dan selesai yang diumumkan penyelenggara.'],['Petunjuk peserta','Baca instruksi pada Google Forms sebelum mengisi dan mengumpulkan jawaban.']])}<p class="reader-note">Tautan Google Forms belum dicantumkan. Tunggu pembagian tautan dari fasilitator di akhir sesi.</p><div class="reader-actions"><button class="button button-primary" data-topic="next">Lihat rangkuman ${icon('arrow')}</button><button class="button button-outline" data-open="presentation">Kembali ke materi</button></div></div>`;
}
function showPrivacy() {
  setDialog('privacy');
  dialogContext.textContent=' / PRIVASI';
  dialogBody.innerHTML='<div class="reader privacy-copy"><span class="eyebrow">INFORMASI DATA</span><h2 id="dialog-title">Belajar dengan data contoh.</h2><h3>Materi dan simulasi</h3><p>Dataset transaksi bersifat fiktif. Simulasi menjelaskan contoh alur kerja dan tidak membaca aplikasi atau data pribadi pengguna.</p><h3>Assessment terpisah</h3><p>Website ini tidak lagi menerima jawaban assessment. Tes dilakukan melalui Google Forms yang dibagikan penyelenggara di akhir sesi. Ikuti pemberitahuan pengumpulan data pada formulir tersebut.</p><h3>Layanan pendukung</h3><p>Hosting dan kontrol akses ditangani Sites. Google Fonts digunakan dengan fallback font perangkat. Website materi ini tidak mengirim data peserta ke layanan AI.</p></div>';
}

function openView(type) {
  if (type === 'presentation') showPresentation();
  else if (type === 'case') showCase();
  else if (type === 'instructions') showInstructions();
  else if (type === 'privacy') showPrivacy();
}

document.addEventListener('click', event => {
  const openButton = event.target.closest('[data-open]');
  const slideButton = event.target.closest('[data-slide]');
  const topicButton = event.target.closest('[data-topic]');
  const gotoButton = event.target.closest('[data-goto]');
  if (openButton) openView(openButton.dataset.open);
  else if (topicButton) showTopic(topicButton.dataset.topic);
  else if (slideButton) showPresentation(Number(slideButton.dataset.slide));
  else if (gotoButton) changeSlide(Number(gotoButton.dataset.goto));
  else if (event.target.closest('.close-dialog')) dialog.close();
  else if (event.target.closest('.next-slide')) changeSlide(slideIndex + 1);
  else if (event.target.closest('.previous-slide')) changeSlide(slideIndex - 1);
  else if (event.target.closest('.expand-dialog')) {
    dialog.classList.toggle('fullscreen-dialog');
    const button = event.target.closest('.expand-dialog');
    button.setAttribute('aria-pressed', String(dialog.classList.contains('fullscreen-dialog')));
    button.setAttribute('aria-label', dialog.classList.contains('fullscreen-dialog') ? 'Keluar dari tampilan penuh' : 'Perbesar tampilan');
  } else if (event.target.closest('.toggle-errors')) {
    const button = event.target.closest('.toggle-errors');
    const visible = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(visible));
    button.innerHTML = icon('check') + (visible ? ' Sembunyikan temuan' : ' Tampilkan temuan');
    dialogBody.querySelector('.table-wrap').classList.toggle('errors-visible', visible);
    dialogBody.querySelector('.case-explanations').classList.toggle('visible', visible);
  }
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => {
  if (dialog.open) return;
  document.body.classList.remove('modal-open');
  dialog.classList.remove('fullscreen-dialog');
  activeView = '';
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
});
document.addEventListener('keydown', event => {
  if (!dialog.open || activeView !== 'presentation' || event.altKey || event.ctrlKey || event.metaKey) return;
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); changeSlide(slideIndex + 1); }
  else if (event.key === 'ArrowLeft') { event.preventDefault(); changeSlide(slideIndex - 1); }
  else if (event.key === ' ' && !event.target.closest('button, a, summary')) { event.preventDefault(); changeSlide(slideIndex + (event.shiftKey ? -1 : 1)); }
});
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeMenu(); });
const media = window.matchMedia('(min-width: 641px)');
media.addEventListener('change', event => { if (event.matches) closeMenu(); });
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach(a => {
        const current = a.hash === '#' + entry.target.id;
        a.classList.toggle('active', current);
        if (current) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#tentang, #fasilitator, #materi, #ai-modern, #agenda, #faq').forEach(section => observer.observe(section));
}

// Educational simulation only: no model calls, connected apps, or external actions.
const agentScenarios = {
  news:{goal:'Tugas: siapkan ringkasan 3 berita AI untuk tim IT.',steps:[
    ['Tentukan kebutuhan','Masukan dari Anda','“Cari 3 berita AI terbaru dari sumber resmi. Sertakan tanggal dan tautan. Buat draf untuk saya periksa.”'],
    ['Cari dan baca sumber','Alat: pencarian web','Agent mencari artikel, memeriksa tanggal terbit dan peristiwa, lalu memilih yang relevan. Jika sumber tidak bisa dibaca, agent menyampaikan keterbatasannya.'],
    ['Buat draf ringkasan','Hasil yang disiapkan','Agent menulis inti tiap berita dan menyertakan sumbernya.','Format hasil: judul berita, tanggal, ringkasan dua kalimat, dan tautan sumber.'],
    ['Periksa sebelum dibagikan','Keputusan Anda','Buka tautan dan cocokkan ringkasan dengan sumber. Draf belum dikirim ke tim sampai Anda menyetujui tindakan tersebut.']
  ]},
  helpdesk:{goal:'Tugas: bantu petugas IT menyiapkan tiket kendala login.',steps:[
    ['Terima laporan','Masukan: keluhan pengguna','Pengguna mengatakan tidak dapat login. Agent meminta pesan error dan aplikasi yang bermasalah, tanpa meminta kata sandi.'],
    ['Cari panduan yang sesuai','Alat: pencarian SOP IT','Agent mencocokkan keluhan dengan panduan yang diizinkan. Jika informasi kurang, agent bertanya sebelum menyarankan langkah.'],
    ['Susun draf tiket','Hasil untuk petugas','Agent merangkum gejala, panduan yang relevan, dan hal yang perlu diperiksa.','Draf tiket: kategori akses akun; gejala gagal login; lampiran pesan error; perlu verifikasi status akun.'],
    ['Petugas memeriksa','Keputusan tim IT','Petugas memverifikasi akun dan memilih tindak lanjut sesuai SOP. Agent tidak mereset akses atau meminta kata sandi dalam contoh ini.']
  ]},
  developer:{goal:'Tugas: bantu developer menelusuri error aplikasi.',steps:[
    ['Jelaskan error','Masukan: pesan error dan konteks','Developer memberikan pesan error, langkah pemicu, dan potongan kode yang tidak berisi rahasia.'],
    ['Telusuri kemungkinan penyebab','Alat: pembaca kode dan dokumentasi','Agent membaca bagian kode yang diizinkan. Jika penyebab belum jelas, agent meminta bukti tambahan atau mengusulkan pengujian.'],
    ['Siapkan usulan perbaikan','Hasil berupa draf perubahan','Agent menjelaskan dugaan penyebab dan menyusun perubahan kecil untuk diperiksa.','Contoh usulan: validasi input sebelum diproses, lalu uji dengan input normal dan input kosong.'],
    ['Uji sebelum diterapkan','Keputusan developer','Developer meninjau perubahan dan menjalankan pengujian. Perubahan belum diterapkan ke aplikasi produksi sebelum disetujui.']
  ]},
  retail:{goal:'Tugas: siapkan usulan restok barang di gudang.',steps:[
    ['Baca stok dan penjualan','Masukan: tabel yang diizinkan','Agent membaca jumlah stok serta penjualan. Data kosong atau duplikat ditandai untuk diperiksa.'],
    ['Bandingkan kebutuhan','Alat: spreadsheet dan kalkulator','Agent membandingkan stok dengan kebutuhan serta waktu pengiriman. Data pemasok yang belum ada diminta terlebih dahulu.'],
    ['Buat usulan restok','Hasil untuk pemilik','Agent menyusun daftar barang, jumlah usulan, alasan, dan perkiraan biaya.','Draf: nama barang, stok saat ini, usulan tambahan, alasan, dan biaya berdasarkan data.'],
    ['Pemilik menyetujui','Keputusan pemilik usaha','Pemilik memeriksa jumlah serta anggaran. Pembelian dilakukan hanya melalui proses dan izin yang berlaku.']
  ]},
  factory:{goal:'Tugas: siapkan pemeriksaan setelah sensor mesin memberi tanda tidak wajar.',steps:[
    ['Terima tanda awal','Masukan: catatan sensor','Sistem pemantauan menunjukkan pola tidak biasa. Tanda ini perlu diperiksa dan belum membuktikan kerusakan.'],
    ['Cari riwayat dan panduan','Alat: catatan perawatan dan SOP','Agent mengambil riwayat mesin dan prosedur yang diizinkan untuk membantu petugas memahami konteks.'],
    ['Susun draf pemeriksaan','Hasil untuk teknisi','Agent merangkum tanda, waktu kejadian, sumber data, dan hal yang perlu diperiksa sesuai SOP.','Draf tiket: mesin terkait, tanda yang muncul, waktu, serta rujukan prosedur pemeriksaan.'],
    ['Teknisi memvalidasi','Keputusan petugas berwenang','Teknisi memeriksa keadaan mesin dan mengikuti prosedur keselamatan. Simulasi tidak mengendalikan mesin.']
  ]},
  report:{goal:'Tugas: bantu staf merangkum laporan mingguan.',steps:[
    ['Pilih laporan','Masukan: dokumen yang diizinkan','Staf menentukan laporan mana yang boleh dibaca serta hal yang ingin dirangkum.'],
    ['Ambil bagian penting','Alat: pembaca dokumen','Agent mencari capaian, kendala, dan angka penting. Informasi yang saling berbeda ditandai untuk ditanyakan.'],
    ['Siapkan draf rekap','Hasil untuk staf','Agent membuat ringkasan singkat dengan sumber dan pertanyaan yang masih terbuka.','Draf rekap: capaian, kendala, tindak lanjut, sumber angka, dan bagian yang perlu dikonfirmasi.'],
    ['Staf memeriksa','Keputusan pemilik laporan','Staf mencocokkan angka dan fakta dengan dokumen asli, lalu menentukan apakah laporan dapat dibagikan.']
  ]}
};
let agentStep = 0;
const scenarioSelect = document.querySelector('#agent-scenario');
function renderAgentStep() {
  const scenario = agentScenarios[scenarioSelect.value];
  const [title, tool, text, example] = scenario.steps[agentStep];
  document.querySelector('#demo-goal').textContent = scenario.goal;
  document.querySelector('#agent-step').innerHTML = `<span class="demo-step-label">LANGKAH ${String(agentStep + 1).padStart(2, '0')}</span><h4>${title}</h4><span class="demo-tool">${tool}</span><p>${text}</p>${example ? `<div class="demo-example"><span>CONTOH HASIL</span><p>${example}</p></div>` : ''}`;
  document.querySelector('#agent-step-count').textContent = `${agentStep + 1} / ${scenario.steps.length}`;
  document.querySelectorAll('.demo-progress span').forEach((item, index) => item.classList.toggle('is-current', index <= agentStep));
  document.querySelector('.demo-back').disabled = agentStep === 0;
  document.querySelector('.demo-next').innerHTML = (agentStep === scenario.steps.length - 1 ? 'Ulangi contoh' : 'Langkah berikutnya') + icon('arrow');
}
scenarioSelect.addEventListener('change', () => { agentStep = 0; renderAgentStep(); });
document.querySelector('.demo-back').addEventListener('click', () => { if (agentStep > 0) { agentStep--; renderAgentStep(); } });
document.querySelector('.demo-next').addEventListener('click', () => { agentStep = (agentStep + 1) % agentScenarios[scenarioSelect.value].steps.length; renderAgentStep(); });
renderAgentStep();
