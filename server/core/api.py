from ninja import NinjaAPI
from users.api import router as users_router
from auth.api import router as auth_router

api = NinjaAPI()

api.add_router("/users/", users_router)
api.add_router("/auth/", auth_router)

