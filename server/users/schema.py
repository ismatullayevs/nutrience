from ninja import Schema


class UserBaseSchema(Schema):
    email: str
    first_name: str
    last_name: str


class UserInSchema(UserBaseSchema):
    password: str


class UserOutSchema(UserBaseSchema):
    id: int
