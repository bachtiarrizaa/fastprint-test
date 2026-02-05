# Fastprint Project

Aplikasi ini dibuat untuk kebutuhan **Tes Programmer Fastprint**, terdiri dari **Backend API (Django)** dan **Frontend Admin Dashboard (React)**.

---

## Tech Stack

* **Backend**: Django, Django REST Framework
* **Frontend**: React + Vite, Tailwind CSS
* **Database**: PostgreSQL
* **External API**: Fastprint Product API

---

## Struktur Project

```bash
fastprint/
├── backend/
│   ├── manage.py
│   ├── backend/
│   ├── products/
│   ├── categories/
│   ├── requirements.txt
│   ├── .env
│   └── venv/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── README.md
```

---

# 🚀 Backend (Django)

## 1. Masuk ke folder backend

```bash
cd backend
```

## 2. Aktifkan Virtual Environment

**Linux / macOS**

```bash
source venv/bin/activate
```

**Windows**

```bash
venv\Scripts\activate
```

> Jika belum ada `venv`, buat terlebih dahulu:

```bash
python -m venv venv
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Konfigurasi env Backend

Buat file `.env` di folder `backend/` dengan menyalin file contoh:

```bash
cp .env.example .env
```
>
> ```env
> FASTPRINT_API_URL=https://recruitment.fastprint.co.id/tes/api_tes_programmer
> DB_NAME=fastprintdb
> DB_USER=postgres
> DB_PASSWORD=
> DB_HOST=localhost
> DB_PORT=5432 
```
---

## 5. Jalankan Migration Database

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 6. Jalankan Server Backend

```bash
python manage.py runserver
```

Backend akan berjalan di:

```
http://127.0.0.1:8000/api
```

---

## 📡 API Endpoint Product

| Method | Endpoint                     | Deskripsi                                   |
| ------ | ---------------------------- | ------------------------------------------- |
| POST   | `/api/products/sync/`        | Sinkronisasi data produk dari Fastprint API |
| GET    | `/api/products/list/`        | List semua produk                           |
| POST   | `/api/products/create/`      | Tambah produk                               |
| PUT    | `/api/products/<id>/update/` | Update produk                               |
| DELETE | `/api/products/<id>/delete/` | Hapus produk                                |

## 📡 API Endpoint Category

| Method | Endpoint                       | Deskripsi           |
| ------ | ------------------------------ | ------------------- |
| GET    | `/api/categories/`             | List semua kategori |
| POST   | `/api/categories/`             | Tambah kategori     |
| PUT    | `/api/categories/<id>/update/` | Update kategori     |
| DELETE | `/api/categories/<id>/delete/` | Hapus kategori      |

### Contoh Body Sync API

```json
{
  "username": "tesprogrammer030226C22",
  "password": "bisacoding-03-02-26"
}
```

---

# 🎨 Frontend (React)

## 1. Masuk ke folder frontend

```bash
cd frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

## 3. Konfigurasi .env Frontend

Buat file `.env` di folder `frontend/` dengan menyalin file contoh:

```bash
cp .env.example .env
```
>
> ```env
> VITE_API_BASE=http://localhost:8000/api
```

---

## 4. Jalankan Frontend Dev Server

```bash
npm run dev
```

Frontend akan berjalan di:

```
http://localhost:5173/
```

> ⚠️ Pastikan **backend Django sudah berjalan** agar frontend bisa mengakses API.

---

# 🤖 Alur Aplikasi

1. Saat pertama kali aplikasi dijalankan:

   * Data produk masih kosong
   * Dashboard akan menampilkan **form sinkronisasi produk**

2. User mengisi:

   * Username
   * Password (format: `bisacoding-dd-mm-yy`)

3. Klik **Sync Produk**:

   * Backend mengambil data dari Fastprint API
   * Data **produk, kategori, dan status** otomatis tersimpan ke database

4. Setelah berhasil:

   * Dashboard menampilkan **Total Produk**
   * Dashboard menampilkan **Total Kategori**
   * Produk dapat dilakukan **CRUD (Create, Read, Update, Delete)**

---

## 🢮 Dokumentasi Testing API menggunakan Postman

```
https://documenter.getpostman.com/view/41956571/2sBXc7LPwm
```

## License

bachtiarrizaa
