from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as http_status
from categories.serializers import (
    CategoryCreateSerializer,
    CategoryListSerializer,
    CategoryUpdateSerializer
)
from .service.category_service import CategoryService

class CategoryCreateView(APIView):
    def post(self, request):
        serializer = CategoryCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        category = CategoryService.create_category(serializer.validated_data)
        return Response({"suxxess": True, "message": "Category created successfully", "data": CategoryListSerializer(category).data}, status=http_status.HTTP_201_CREATED)

class CategoryListView(APIView):
    def get(self, request):
        categories = CategoryService.list_categories()
        serializer = CategoryListSerializer(categories, many=True)
        return Response({"success": True, "message": "Category fetched successfully", "data": serializer.data}, status=http_status.HTTP_200_OK)

class CategoryUpdateView(APIView):
    def put(self, request, id):
        serializer = CategoryUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        category = CategoryService.update_category(id, serializer.validated_data)
        return Response({"suxxess": True, "message": "Category updated successfully", "data": CategoryListSerializer(category).data}, status=http_status.HTTP_200_OK)

class CategoryDeleteView(APIView):
    def delete(self, request, id):
        CategoryService.delete_category(id)
        return Response({"success": True, "message": f"Product {id} deleted successfully"}, status=http_status.HTTP_200_OK)