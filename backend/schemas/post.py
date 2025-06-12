from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class Post(BaseModel):
    title: str
    content: str


class PostResponse(Post):
    id: UUID
    created_at: datetime
    author_id: UUID

    class Config:
        from_attributes = True


class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
