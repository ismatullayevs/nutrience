from django.conf import settings
from ninja import Router
from ninja.errors import HttpError
from ninja.security import HttpBearer
from .schema import UserOutSchema
import jwt
from django.contrib.auth import get_user_model


User = get_user_model()
router = Router()


class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            email = payload.get('sub')
            if email is None or payload.get('type') != 'access':
                raise HttpError(401, "Invalid token")
        except jwt.PyJWTError:
            raise HttpError(401, "Invalid token")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise HttpError(401, "Invalid token")
        
        return user


@router.get('/me', auth=AuthBearer(), response=UserOutSchema)
def get_user(request):
    return request.auth
