from categories.repository.category_repository import CategoryRepository

class CategoryService:

    @staticmethod
    def create_category(data: dict):
        return CategoryRepository.create_category(
            name=data["name"]
        )
    @staticmethod
    def list_categories():
        return CategoryRepository.list_categories()
    
    @staticmethod
    def update_category(id, data: dict):
        return CategoryRepository.update_category(id, data)
    
    @staticmethod
    def delete_category(id):
        return CategoryRepository.delete_category(id)