# Fastprint Project

Project ini terdiri dari:

* **Backend**: Django + Django REST Framework (API)
* **Frontend**: React (Client)

---

## Struktur Project

```
fastprint/
├─ backend/
│   ├─ manage.py
│   ├─ backend/        # settings.py, urls.py
│   ├─ products/       # Django app
│   └─ venv/           # virtual environment Python
├─ frontend/
│   ├─ package.json
│   └─ node_modules/   # dependencies React
└─ README.md
```

---

## Backend (Django)

### 1. Aktifkan Virtual Environment

```bash
cd backend
source venv/bin/activate      # Linux / macOS
venv\Scripts\activate         # Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Konfigurasi Environment

Buat file `.env` di folder `backend/`:

```env
FASTPRINT_API_URL=https://recruitment.fastprint.co.id/tes/api_tes_programmer
```

### 4. Jalankan Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Jalankan Server

```bash
python manage.py runserver
```

* Server akan berjalan di: `http://127.0.0.1:8000/`

### 6. API Endpoint

| Method | URL                                 | Keterangan                                           |
| ------ | ----------------------------------- | ---------------------------------------------------- |
| POST   | `/api/products/sync/`               | Sinkronisasi produk dari Fastprint API               |
| POST   | `/api/products/`                    | Tambah product baru                                  |
| GET    | `/api/products/`                    | List semua product                                   |
| GET    | `/api/products/?status=bisa dijual` | List product dengan status tertentu                  |
| PUT    | `/api/products/<id>/`               | Update product (name, price, category_id, status_id) |
| DELETE | `/api/products/<id>/`               | Hapus product                                        |

---

## Frontend (React)

### 1. Masuk ke folder frontend

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan React Dev Server

```bash
npm start
```

* React dev server akan berjalan di: `http://localhost:3000/`
* Pastikan **backend Django juga sedang berjalan** untuk akses API

---

## Tips

* Untuk test API, bisa gunakan **Postman**:

  * Endpoint `/api/products/sync/` → body JSON:

    ```json
    {
      "username": "tesprogrammer020226C16",
      "password": "bisacoding-02-02-26"
    }
    ```
  * Endpoint CRUD `/api/products/` → body sesuai schema product

* Virtual environment **hanya di backend**, frontend pakai Node.js / npm.

* Untuk field `price` gunakan angka, `name` tidak boleh kosong, `category_id` dan `status_id` wajib diisi.

<!-- ---

## License

MIT -->
