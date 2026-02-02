# products/urls.py

from django.urls import path
from products.views import ProductSyncView

urlpatterns = [
    path("products/sync/", ProductSyncView.as_view(), name="product-sync"),
]
