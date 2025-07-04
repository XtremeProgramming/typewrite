from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from connection import get_db
from core.constants import FORBIDDEN, GENERIC_ERROR, POST_NOT_FOUND
from models.user import User
from repository.post import (
    create_post,
    delete_post,
    get_paginated_posts,
    get_post_by_id,
    update_post,
)
from schemas.pagination import PaginatedResponse
from schemas.post import Post, PostResponse

router = APIRouter()


@router.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create(
    post: Post,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        new_post = create_post(db, post, current_user.id)

        return PostResponse.model_validate(new_post)

    except SQLAlchemyError:
        db.rollback()

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"id": GENERIC_ERROR},
        )


@router.get("/posts/{post_id}", response_model=PostResponse)
async def get_post(post_id: UUID, db: Session = Depends(get_db)):
    post = get_post_by_id(db, post_id)

    if not post:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"id": POST_NOT_FOUND},
        )

    return PostResponse.model_validate(post)


@router.get("/posts", response_model=PaginatedResponse[PostResponse])
async def list_paginated_posts(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    db: Session = Depends(get_db),
):
    return get_paginated_posts(db, page, limit)


@router.put("/posts/{post_id}", response_model=PostResponse)
async def update(
    post_id: UUID,
    update_data: Post,
    db: Session = Depends(get_db),
    User=Depends(get_current_user),
):
    try:
        post = update_post(db, post_id, update_data)

        return PostResponse.model_validate(post)

    except ValueError:
        db.rollback()
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"id": POST_NOT_FOUND},
        )

    except SQLAlchemyError:
        db.rollback()
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"id": GENERIC_ERROR},
        )


@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    post_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        delete_post(db, post_id, current_user.id)

    except ValueError:
        db.rollback()
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"id": POST_NOT_FOUND},
        )
    except PermissionError:
        db.rollback()
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={"id": FORBIDDEN},
        )
