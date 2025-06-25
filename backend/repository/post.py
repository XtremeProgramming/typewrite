from uuid import UUID

from fastapi import Depends
from sqlalchemy.orm import Session, joinedload

from auth.dependencies import get_current_user
from core.constants import POST_NOT_FOUND
from models.post import Post
from schemas.post import PostUpdate
from utils import pagination


def create_post(
    db: Session, post: Post, user_id: str = Depends(get_current_user)
) -> Post:
    db_post = Post(title=post.title, content=post.content, author_id=user_id)

    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def get_post_by_id(db: Session, post_id: UUID) -> Post:
    return (
        db.query(Post)
        .options(joinedload(Post.author))
        .filter(Post.id == post_id)
        .first()
    )


def get_paginated_posts(db: Session, offset: int = 0, limit: int = 10) -> Post:
    query = db.query(Post)
    return pagination.paginate(query, offset, limit)


def update_post(db: Session, post_id: UUID, update_data: PostUpdate) -> Post:
    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        raise ValueError(POST_NOT_FOUND)

    if update_data.title is not None:
        post.title = update_data.title

    if update_data.content is not None:
        post.content = update_data.content

    db.commit()
    db.refresh(post)
    return post
