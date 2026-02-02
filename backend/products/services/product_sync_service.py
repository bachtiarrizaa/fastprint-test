# products/services/product_sync_service.py
import requests
from datetime import datetime
from django.db import transaction
from products.models import Product, Category, Status
import hashlib
from decouple import config

FASTPRINT_API_URL = config('FASTPRINT_API_URL')
# FASTPRINT_API_URL = "https://recruitment.fastprint.co.id/tes/api_tes_programmer"

def generate_password_plain():
    now = datetime.now()
    return f"bisacoding-{now.day:02d}-{now.month:02d}-{str(now.year)[-2:]}"


def md5_encode(text: str):
    return hashlib.md5(text.encode("utf-8")).hexdigest()


def sync_products(username: str, password: str = None):
    if password is None:
        password = generate_password_plain()

    password_md5 = md5_encode(password)

    response = requests.post(
        FASTPRINT_API_URL,
        data={"username": username, "password": password_md5},
        timeout=30
    )
    response.raise_for_status()
    result = response.json()

    if result.get("error") != 0:
        raise Exception("Failed to fetch products from Fastprint API")

    products = result.get("data", [])

    with transaction.atomic():
        for item in products:
            # Debug print
            print(f"Processing: {item['nama_produk']} | Category: {item['kategori']} | Status: {item['status']}")

            # Pastikan Category & Status tersimpan
            category, created_cat = Category.objects.get_or_create(name=item["kategori"])
            status, created_status = Status.objects.get_or_create(name=item["status"])

            if created_cat:
                print(f"Created new Category: {category.name} (ID: {category.id})")
            if created_status:
                print(f"Created new Status: {status.name} (ID: {status.id})")

            # Simpan Product
            product, created_prod = Product.objects.update_or_create(
                product_id=item["id_produk"],
                defaults={
                    "name": item["nama_produk"],
                    "price": int(item["harga"]),
                    "category": category,
                    "status": status
                }
            )
            if created_prod:
                print(f"Created new Product: {product.name} (ID: {product.id})")

    return len(products)
