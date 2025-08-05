from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from schemas.user import UserGetPostResponse


class Comment(BaseModel):
    content: str


class CommentResponse(Comment):
    id: UUID
    created_at: datetime
    author: UserGetPostResponse

    class Config:
        from_attributes = True
