from products.repository.product_repository import ProductRepository

class ProductService:

    @staticmethod
    def create_product(data: dict):
        return ProductRepository.create_product(
            name=data["name"],
            price=data["price"],
            category_id=data["category_id"],
            status_id=data["status_id"]
        )

    @staticmethod
    def list_products(status_name=None):
        if not status_name:
            status_name = "bisa dijual"
        return ProductRepository.list_products(status_name=status_name)

    @staticmethod
    def update_product(id, data: dict):
        return ProductRepository.update_product(id, data)

    @staticmethod
    def delete_product(id):
        return ProductRepository.delete_product(id)
