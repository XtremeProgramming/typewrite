from uuid import UUID

from fastapi import Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from models.post import Post
from schemas.post import PostCreate


def create_post(
    db: Session, post: PostCreate, user_id: str = Depends(get_current_user)
) -> Post:
    db_post = Post(title=post.title, content=post.content, author_id=user_id)

    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def get_post_by_id(db: Session, post_id: UUID) -> Post:
    return db.query(Post).filter(Post.id == post_id).first()
