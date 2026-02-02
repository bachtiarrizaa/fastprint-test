from django.urls import path
from products.views import (
    ProductSyncView,
    ProductCreateView,
    ProductListView,
    ProductUpdateView,
    ProductDeleteView
)

urlpatterns = [
    path("products/sync/", ProductSyncView.as_view(), name="product-sync"),
    path("products/", ProductCreateView.as_view(), name="product-create"),
    path("products/list/", ProductListView.as_view(), name="product-list"),
    path("products/<int:id>/", ProductUpdateView.as_view(), name="product-update"),
    path("products/<int:id>/delete/", ProductDeleteView.as_view(), name="product-delete"),
]
