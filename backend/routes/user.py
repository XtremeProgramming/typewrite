from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from auth.jwt_handler import create_access_token
from connection import get_db
from core.constants import (
    EMAIL_ALREADY_REGISTERED,
    GENERIC_ERROR,
    INVALID_CREDENTIALS,
)
from repository.user import create_user, get_user_by_credentials, update_user
from schemas.user import (
    LoginRequest,
    Token,
    UserCreate,
    UserSignupResponse,
    UserUpdate,
    UserUpdateResponse,
)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


@router.post(
    "/signup", response_model=UserSignupResponse, status_code=status.HTTP_201_CREATED
)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        new_user = create_user(db, user)

        return UserSignupResponse.model_validate(new_user)

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=GENERIC_ERROR,
        )

    except ValueError:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content={"id": EMAIL_ALREADY_REGISTERED},
        )


@router.post("/login", response_model=Token)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = get_user_by_credentials(db, login_data.email, login_data.password)

    if not user:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"id": INVALID_CREDENTIALS},
        )

    access_token = create_access_token(data={"sub": str(user.email)})

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users", response_model=UserSignupResponse)
async def get_user(current_user: UserSignupResponse = Depends(get_current_user)):
    return current_user


@router.patch("/users", response_model=UserUpdateResponse)
async def update(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        updated_user = update_user(db, current_user.id, update_data)
        return updated_user

    except ValueError as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"id": str(e)},
        )
