from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class PostCreate(BaseModel):
    title: str
    content: str


class PostResponse(PostCreate):
    id: UUID
    created_at: datetime
    author_id: UUID

    class Config:
        from_attributes = True
