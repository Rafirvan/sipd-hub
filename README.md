# Dashboard Dana Sekolah Indonesia

Aplikasi **fullstack** yang berfungsi sebagai **dashboard interaktif** untuk memantau jumlah pendanaan sekolah di seluruh Indonesia, dari PAUD hingga SMA. Aplikasi ini menampilkan data secara visual dan memudahkan analisis distribusi anggaran pendidikan antar provinsi.

---

## Teknologi yang Digunakan

**Backend:**
- Node.js
- Express
- Drizzle ORM
- PostgreSQL

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Axios

---

## Cara Menjalankan

1. **Clone Repository**
   
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd <NAMA_FOLDER_PROJECT>
   npm install


2. **Konfigurasi Environment**

   Buat file `.env` di dalam folder `server/` dan isi dengan URL koneksi database PostgreSQL:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/nama_database
   ```

3. **Menjalankan Aplikasi**

   **Pilihan 1 – Jalankan server dan client secara terpisah:**

   ```bash
   # Jalankan backend
   cd server
   npm run dev

   # Jalankan frontend di terminal lain
   cd ../client
   npm run dev
   ```

   **Pilihan 2 – Jalankan dari root folder (jika sudah diatur script concurrently):**

   ```bash
   npm run dev
   ```

   > Catatan: Backend akan berjalan di `localhost:3001` dan frontend di `localhost:5173` atau `5174`. Pastikan port ini sesuai agar CORS tidak bermasalah.

---

## Fitur Utama

* Menampilkan jumlah pendanaan sekolah dari PAUD hingga SMA.
* Dashboard interaktif dengan chart dan tabel.
* Filter data berdasarkan provinsi.
* Visualisasi anggaran pendidikan untuk analisis cepat dan mudah.

---

## Struktur Folder

```
root/
├─ client/      # Frontend React
├─ server/      # Backend Node + Express
└─ README.md
```

---




