from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from auth.jwt_handler import decode_token
from connection import get_db
from core.constants import INVALID_OR_EXPIRED_TOKEN, PAYLOAD_MISSING_SUB, USER_NOT_FOUND
from models.user import User
from repository.user import check_if_email_is_already_registered


def get_current_user(token: str = Header(), db: Session = Depends(get_db)) -> User:
    payload = decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"id": INVALID_OR_EXPIRED_TOKEN},
        )

    email = payload.get("sub")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"id": PAYLOAD_MISSING_SUB},
        )

    user = check_if_email_is_already_registered(db, email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"id": USER_NOT_FOUND},
        )

    return user
