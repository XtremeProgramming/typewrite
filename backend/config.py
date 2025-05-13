from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = Field(..., env="DATABASE_URL")

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    return Settings()
