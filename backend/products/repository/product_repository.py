from django.shortcuts import get_object_or_404
from products.models import Product, Status
from categories.models import Category

class ProductRepository:

    @staticmethod
    def create_product(name, price, category_id, status_id):
        category = get_object_or_404(Category, id=category_id)
        status = get_object_or_404(Status, id=status_id)

        product = Product.objects.create(
            name=name,
            price=price,
            category=category,
            status=status
        )
        return product

    @staticmethod
    def list_products(status_name=None):
        products = Product.objects.all().select_related("category", "status")
        
        if status_name:
            products = products.filter(status__name=status_name)
        
        products = products.order_by('-id')
        
        return products

    @staticmethod
    def update_product(id, data):
        product = get_object_or_404(Product, id=id)
        category = get_object_or_404(Category, id=data["category_id"])
        status = get_object_or_404(Status, id=data["status_id"])

        product.name = data["name"]
        product.price = data["price"]
        product.category = category
        product.status = status
        product.save()
        return product

    @staticmethod
    def delete_product(id):
        product = get_object_or_404(Product, id=id)
        product.delete()
        return True
