from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from connection import get_db
from core.constants import GENERIC_ERROR, POST_NOT_FOUND
from models.user import User
from repository.post import create_post, get_post_by_id
from schemas.post import PostCreate, PostResponse

router = APIRouter()


@router.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        new_post = create_post(db, post, user_id=current_user.id)

        return PostResponse.model_validate(new_post)

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            id=GENERIC_ERROR,
        )


@router.get("/posts/{post_id}", response_model=PostResponse)
async def get_post(post_id: UUID, db: Session = Depends(get_db)):
    post = get_post_by_id(db, post_id)

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=POST_NOT_FOUND,
        )

    return PostResponse.model_validate(post)
