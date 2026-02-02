from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as http_status
from products.serializers import (
    ProductCreateSerializer,
    ProductUpdateSerializer,
    ProductListSerializer
)
from products.services.product_service import ProductService
from products.services.product_sync_service import sync_products

class ProductSyncView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username:
            return Response({"error": "Username is required"}, status=http_status.HTTP_400_BAD_REQUEST)
        try:
            count = sync_products(username=username, password=password)
            return Response({"success": True, "message": f"{count} products synced"})
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductCreateView(APIView):
    def post(self, request):
        serializer = ProductCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = ProductService.create_product(serializer.validated_data)
        return Response({"success": True, "data": ProductListSerializer(product).data}, status=http_status.HTTP_201_CREATED)

class ProductListView(APIView):
    def get(self, request):
        products = ProductService.list_products()
        serializer = ProductListSerializer(products, many=True)
        return Response({"success": True, "data": serializer.data})

class ProductUpdateView(APIView):
    def put(self, request, id):
        serializer = ProductUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = ProductService.update_product(id, serializer.validated_data)
        return Response({"success": True, "data": ProductListSerializer(product).data})

class ProductDeleteView(APIView):
    def delete(self, request, id):
        ProductService.delete_product(id)
        return Response({"success": True, "message": f"Product {id} deleted successfully"})
