from rest_framework import serializers
from .models import Category

class CategoryCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=150)

    class Meta:
        model = Category
        fields = ["name"]

class CategoryUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=150)

    class Meta:
        model = Category
        fields = ["name"]
        
class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "created_at", "updated_at"]
