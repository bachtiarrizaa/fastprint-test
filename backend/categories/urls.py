from django.urls import path
from categories.views import (
    CategoryCreateView, 
    CategoryListView,
    CategoryUpdateView,
    CategoryDeleteView
)

urlpatterns = [
    path("create/", CategoryCreateView.as_view(), name="category-create"),
    path("list/", CategoryListView.as_view(), name="categories-list"),
    path("<int:id>/update/", CategoryUpdateView.as_view(), name="category-update"),
    path("<int:id>/delete/", CategoryDeleteView.as_view(), name="category-delete")
]
