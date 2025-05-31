from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = Field(..., env="DATABASE_URL")

    DATABASE_NAME: str = Field(..., env="DATABASE_NAME")
    DATABASE_USER: str = Field(..., env="DATABASE_USER")
    DATABASE_PASSWORD: str = Field(..., env="DATABASE_PASSWORD")
    DATABASE_HOST: str = Field(..., env="DATABASE_HOST")
    DATABASE_PORT: int = Field(5432, env="DATABASE_PORT")

    ALEMBIC_DB_PORT: int = Field(5432, env="ALEMBIC_DB_PORT")
    ALEMBIC_DB_HOST: str = Field(..., env="ALEMBIC_DB_HOST")

    SECRET_KEY: str = Field(..., env="SECRET_KEY")
    ALGORITHM: str = Field("HS256", env="ALGORITHM")
    ACCESS_TOKEN_EXPIRE_TIME: int = Field(30, env="ACCESS_TOKEN_EXPIRE_TIME")

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    return Settings()
