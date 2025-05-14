from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from connection import get_db
from core.constants import EMAIL_ALREADY_REGISTERED
from repository.user import create_user
from schemas.user import UserCreate, UserSignupResponse

router = APIRouter()


@router.post(
    "/signup", response_model=UserSignupResponse, status_code=status.HTTP_201_CREATED
)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        new_user = create_user(db, user)

        return UserSignupResponse(
            id=new_user.id, full_name=new_user.full_name, email=new_user.email
        )

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing the request. Please try again later.",
        )

    except ValueError:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content={"id": EMAIL_ALREADY_REGISTERED},
        )
