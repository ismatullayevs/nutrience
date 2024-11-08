from django.test import TestCase
from ..models import Ingredient, Recipe, RecipeIngredient


class IngredientModelTest(TestCase):
    def setUp(self):
        self.ingredient = Ingredient.objects.create(name="Sugar", unit="grams")

    def test_ingredient_creation(self):
        self.assertEqual(self.ingredient.name, "Sugar")
        self.assertEqual(self.ingredient.unit, "grams")
        self.assertIsNotNone(self.ingredient.created_at)
        self.assertIsNotNone(self.ingredient.updated_at)

    def test_ingredient_str(self):
        self.assertEqual(str(self.ingredient), "Sugar")


class RecipeModelTest(TestCase):
    def setUp(self):
        self.recipe = Recipe.objects.create(
            name="Pancakes",
            description="Delicious pancakes",
            instructions="Mix ingredients and cook",
            prep_time=10,
            cook_time=20,
            servings=4
        )

    def test_recipe_creation(self):
        self.assertEqual(self.recipe.name, "Pancakes")
        self.assertEqual(self.recipe.description, "Delicious pancakes")
        self.assertEqual(self.recipe.instructions, "Mix ingredients and cook")
        self.assertEqual(self.recipe.prep_time, 10)
        self.assertEqual(self.recipe.cook_time, 20)
        self.assertEqual(self.recipe.servings, 4)
        self.assertIsNotNone(self.recipe.created_at)
        self.assertIsNotNone(self.recipe.updated_at)

    def test_recipe_str(self):
        self.assertEqual(str(self.recipe), "Pancakes")


class RecipeIngredientModelTest(TestCase):
    def setUp(self):
        self.ingredient = Ingredient.objects.create(name="Sugar", unit="grams")
        self.recipe = Recipe.objects.create(
            name="Pancakes",
            description="Delicious pancakes",
            instructions="Mix ingredients and cook",
            prep_time=10,
            cook_time=20,
            servings=4
        )
        self.recipe_ingredient = RecipeIngredient.objects.create(
            recipe=self.recipe,
            ingredient=self.ingredient,
            quantity=100
        )

    def test_recipe_ingredient_creation(self):
        self.assertEqual(self.recipe_ingredient.recipe, self.recipe)
        self.assertEqual(self.recipe_ingredient.ingredient, self.ingredient)
        self.assertEqual(self.recipe_ingredient.quantity, 100)
        self.assertIsNotNone(self.recipe_ingredient.created_at)
        self.assertIsNotNone(self.recipe_ingredient.updated_at)

    def test_recipe_ingredient_str(self):
        self.assertEqual(str(self.recipe_ingredient), "Pancakes - Sugar")
