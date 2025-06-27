from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from connection import get_db
from core.constants import COMMENTS_NOT_FOUND
from models.user import User
from repository.comment import create_comment, get_comments_by_post_id
from schemas.comment import Comment, CommentResponse

router = APIRouter()


@router.get("/{post_id}/comments", response_model=List[CommentResponse])
async def get_comments(post_id: UUID, db: Session = Depends(get_db)):
    comments = get_comments_by_post_id(db, post_id)

    if not comments:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"id": COMMENTS_NOT_FOUND},
        )

    return comments


@router.post(
    "/{post_id}/comments",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create(
    post_id: UUID,
    comment_data: Comment,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_comment(db, post_id, current_user.id, comment_data)
