from django.urls import path
from products.views import (
    ProductSyncView,
    ProductCreateView,
    ProductListView,
    ProductUpdateView,
    ProductDeleteView,
)

urlpatterns = [
    path("sync/", ProductSyncView.as_view(), name="product-sync"),
    path("create/", ProductCreateView.as_view(), name="product-create"),
    path("list/", ProductListView.as_view(), name="product-list"),
    path("<int:id>/update/", ProductUpdateView.as_view(), name="product-update"),
    path("<int:id>/delete/", ProductDeleteView.as_view(), name="product-delete"),
]
