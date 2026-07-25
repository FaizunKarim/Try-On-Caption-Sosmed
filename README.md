# 🛍️ Katalogin — AI Try-On & Social Media Content Generator

**Katalogin** adalah platform berbasis AI untuk membuat mockup katalog produk *Try-On* secara otomatis beserta *copywriting* caption Instagram promosi dalam satu kali klik.

Designed for e-commerce, fashion brands, and social media marketers.

---

## ✨ Fitur Utama

- **🤖 AI Try-On Image Generation**: Menghasilkan gambar mockup model fashion manusia yang secara alami mengenakan produk Anda menggunakan **Cloudflare Flux 2 Klein 4B**.
- **👁️ Single-Call Vision Recognition**: Mengenali jenis produk, warna, bahan, dan atribut fashion secara otomatis dari foto yang diunggah menggunakan **Cloudflare Llama 3.2 11B Vision**.
- **✍️ Copywriting Caption Instagram**: Menyusun caption promosi berdaya jual tinggi (Hook, Lifestyle, CTA, & Hashtag) berbasis **Groq Llama 3.3 70B**.
- **⚡ Parallel Async Pipeline**: Proses pembuatan gambar dan penyusunan caption berjalan secara simultan (paralel) untuk kecepatan 2x lebih tinggi.
- **🛡️ Secure API Proxy**: Seluruh API Key (Cloudflare & Groq) terlindungi aman di server-side via Vercel Serverless Function.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Tailwind CSS, FontAwesome 6
- **AI Models**:
  - `Flux 2 Klein 4B` via Cloudflare Workers AI (Image Generation)
  - `Llama 3.2 11B Vision Instruct` via Cloudflare Workers AI (Product Analysis)
  - `Llama 3.3 70B Versatile` via Groq API (Instagram Caption Copywriting)
- **Backend / Proxy**: Vercel Serverless Functions Node.js Proxy (`/api/proxy.js`)

---

## 📁 Struktur Proyek

```text
├── api/
│   └── proxy.js           # Serverless endpoint proxy untuk Vercel
├── server/
│   └── proxy.js           # Core handler komunikasi API (Cloudflare & Groq)
├── images/                # Asset gambar & icon aplikasi
├── styles/
│   └── styles.css         # Styling custom & utility
├── app.js                 # Logika utama aplikasi & alur async AI
├── notifications.js       # Toast & Modal Alert system
├── config.js              # Konfigurasi aplikasi
├── index.html             # Tampilan utama web
├── .env.example           # Contoh variabel lingkungan
├── LICENSE                # Lisensi MIT
└── README.md              # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan Lokal

### 1. Clone Repository
```bash
git clone https://github.com/FaizunKarim/Try-On-Caption-Sosmed.git
cd Try-On-Caption-Sosmed
```

### 2. Konfigurasi Environment Variables
Buat file `.env` di direktori utama (atau salin dari `.env.example`):
```env
CF_ACCOUNT_ID=your_cloudflare_account_id_here
CF_API_TOKEN=your_cloudflare_api_token_here
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Menjalankan dengan Vercel CLI
```bash
npx vercel dev
```
Buka browser di `http://localhost:3000`.

---

## 🌐 Deploy ke Vercel

1. Push repository ke GitHub.
2. Import repository di [Vercel Dashboard](https://vercel.com).
3. Tambahkan Environment Variables di Vercel Dashboard Settings:
   - `CF_ACCOUNT_ID`
   - `CF_API_TOKEN`
   - `GROQ_API_KEY`
4. Klik **Deploy**.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

Developed with ❤️ by **Faizun Karim**
