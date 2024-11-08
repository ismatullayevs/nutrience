from django.conf import settings
from django.contrib.auth import get_user_model
from ninja import Router
from ninja.security import HttpBearer
from ninja.errors import HttpError

from users.schema import UserInSchema, UserOutSchema
from .schema import LoginSchema
from utils import create_jwt_token

import jwt


User = get_user_model()
router = Router()


@router.post('/register', response=UserOutSchema)
def register(request, data: UserInSchema):
    if User.objects.filter(email=data.email).exists():
        raise HttpError(400, "User with this email already exists")

    user = User.objects.create_user(**data.dict())
    return user


@router.post('/login')
def login(request, data: LoginSchema):
    user = User.objects.filter(email=data.email).first()
    if user is None:
        raise HttpError(400, "Invalid email or password")

    if not user.check_password(data.password):
        raise HttpError(400, "Invalid email or password")

    access_token = create_jwt_token({"sub": user.email}, type="access")
    refresh_token = create_jwt_token({"sub": user.email}, type="refresh")
    return {"access": access_token, "refresh": refresh_token}
