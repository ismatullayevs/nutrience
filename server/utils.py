from django.conf import settings
import jwt
from datetime import datetime, timedelta, timezone
from typing import Literal


def create_jwt_token(data: dict, type: Literal["access", "refresh", "activation"]):
    minutes = {
        "access": settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        "refresh": settings.REFRESH_TOKEN_EXPIRE_MINUTES,
        "activation": settings.ACTIVATION_TOKEN_EXPIRE_MINUTES
    }
    expire = datetime.now(timezone.utc) + timedelta(minutes=minutes[type])
    return jwt.encode({'exp': expire, 'type': type, **data}, 
                      settings.SECRET_KEY, algorithm=settings.ALGORITHM)
