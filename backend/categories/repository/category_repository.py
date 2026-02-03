from django.shortcuts import get_object_or_404
from categories.models import Category

class CategoryRepository:

    @staticmethod
    def create_category(name):
        category = Category.objects.create(
            name=name
        )
        return category
    
    @staticmethod
    def list_categories():
        categories = Category.objects.all()
        categories = categories.order_by('-id')
        return categories
    
    @staticmethod
    def update_category(id, data):
        category = get_object_or_404(Category, id=id)

        category.name = data["name"]
        category.save()
        return category
    
    @staticmethod
    def delete_category(id):
        category = get_object_or_404(Category, id=id)
        category.delete()
        return True
