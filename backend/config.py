from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = Field(..., env="DATABASE_URL")
    SECRET_KEY: str = Field(..., env="SECRET_KEY")
    ALGORITHM: str = Field("HS256", env="ALGORITHM")
    ACCESS_TOKEN_EXPIRE_TIME: int = Field(30, env="ACCESS_TOKEN_EXPIRE_TIME")

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    return Settings()
