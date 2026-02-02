# products/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as http_status
from products.services.product_sync_service import sync_products


class ProductSyncView(APIView):
    """
    Endpoint untuk sync products dari Fastprint API
    """

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")  # optional, plain text

        if not username:
            return Response(
                {"error": "Username is required"},
                status=http_status.HTTP_400_BAD_REQUEST
            )

        try:
            count = sync_products(username=username, password=password)
            return Response(
                {"success": True, "message": f"{count} products synced"},
                status=http_status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=http_status.HTTP_500_INTERNAL_SERVER_ERROR
            )
