from rest_framework import serializers
from products.models import Product, Status
from categories.models import Category

class ProductCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=255)
    price = serializers.IntegerField(required=True, min_value=0)
    category_id = serializers.IntegerField(required=True)
    status_id = serializers.IntegerField(required=True)

    class Meta:
        model = Product
        fields = ["name", "price", "category_id", "status_id"]

    def validate_category_id(self, value):
        if not Category.objects.filter(id=value).exists():
            raise serializers.ValidationError("Category not found")
        return value

    def validate_status_id(self, value):
        if not Status.objects.filter(id=value).exists():
            raise serializers.ValidationError("Status not found")
        return value

class ProductUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=255)
    price = serializers.IntegerField(required=True, min_value=0)
    category_id = serializers.IntegerField(required=True)
    status_id = serializers.IntegerField(required=True)

    class Meta:
        model = Product
        fields = ["name", "price", "category_id", "status_id"]

    def validate_category_id(self, value):
        if not Category.objects.filter(id=value).exists():
            raise serializers.ValidationError("Category not found")
        return value

    def validate_status_id(self, value):
        if not Status.objects.filter(id=value).exists():
            raise serializers.ValidationError("Status not found")
        return value

class ProductListSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    status = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ["id", "name", "price", "category", "status", "created_at", "updated_at"]