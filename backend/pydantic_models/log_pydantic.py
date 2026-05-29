from pydantic import BaseModel, EmailStr, Field

class LoginUser(BaseModel):
    email: EmailStr = Field(
        ...,
        max_length=255
    )

    password: str = Field(
        ...,
        min_length=6,
        max_length=128
    )