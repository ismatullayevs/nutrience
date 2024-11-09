from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from ninja import Router
from ninja.security import APIKeyCookie
from ninja.errors import HttpError
from users.schema import UserInSchema, UserOutSchema
from .schema import LoginSchema
from utils import create_jwt_token

import jwt


User = get_user_model()
router = Router()


class CookieKey(APIKeyCookie):
    param_name = 'refresh_token'

    def authenticate(self, request, key):
        return key


@router.post('/register', response=UserOutSchema)
def register(request, data: UserInSchema):
    if User.objects.filter(email=data.email).exists():
        raise HttpError(400, "User with this email already exists")

    user = User.objects.create_user(**data.dict())
    return user


@router.post('/login')
def login(request, response: HttpResponse, data: LoginSchema):
    user = User.objects.filter(email=data.email).first()
    if user is None:
        raise HttpError(400, "Invalid email or password")

    if not user.check_password(data.password):
        raise HttpError(400, "Invalid email or password")

    access_token = create_jwt_token({"sub": user.email}, type="access")
    refresh_token = create_jwt_token({"sub": user.email}, type="refresh")

    response.set_cookie(key="refresh_token", value=refresh_token,
                        httponly=True, max_age=settings.REFRESH_TOKEN_EXPIRE_MINUTES * 60,
                        samesite='strict')

    return {"access_token": access_token, "token_type": "bearer"}


@router.post('/refresh', auth=CookieKey(csrf=False))
def refresh(request, response: HttpResponse):
    """Refresh access token using refresh token stored in cookie"""
    print(request.auth)
    try:
        payload = jwt.decode(
            request.auth, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get('sub')
        if email is None or payload.get('type') != 'refresh':
            raise HttpError(401, "Invalid token")
    except jwt.PyJWTError:
        raise HttpError(401, "Invalid token")

    access_token = create_jwt_token({'sub': email}, type='access')
    refresh_token = create_jwt_token({'sub': email}, type='refresh')

    response.set_cookie(key='refresh_token', value=refresh_token,
                        httponly=True, max_age=settings.REFRESH_TOKEN_EXPIRE_MINUTES * 60,
                        samesite='strict')

    return {"access_token": access_token, "token_type": "bearer"}