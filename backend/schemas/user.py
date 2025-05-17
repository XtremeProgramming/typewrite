from dataclasses import Field
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, model_validator

from core.constants import PASSWORDS_DO_NOT_MATCH


class UserBase(BaseModel):
    full_name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=12, max_length=128)
    password_confirmation: str

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.password_confirmation:
            raise ValueError(PASSWORDS_DO_NOT_MATCH)
        return self


class UserSignupResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
