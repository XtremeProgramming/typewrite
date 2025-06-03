from uuid import UUID

from passlib.context import CryptContext
from sqlalchemy.orm import Session

from core.constants import (
    INCORRECT_OLD_PASSWORD,
    NEW_PASSWORD_SAME_AS_OLD,
    OLD_PASSWORD_REQUIRED,
    PASSWORD_REQUIRED,
    PYDANTIC_EMAIL_ALREADY_REGISTERED_MSG,
    USER_NOT_FOUND,
)
from models.user import User
from schemas.user import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_user(db: Session, user: UserCreate) -> User:
    db_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=get_password_hash(user.password),
    )

    if check_if_email_is_already_registered(db, user.email):
        raise ValueError(PYDANTIC_EMAIL_ALREADY_REGISTERED_MSG)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def check_if_email_is_already_registered(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_credentials(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if user and pwd_context.verify(password, user.hashed_password):
        return user
    return None


def update_user(db: Session, user_id: UUID, update_data: UserUpdate) -> User:
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise ValueError(USER_NOT_FOUND)

    if update_data.full_name is not None:
        user.full_name = update_data.full_name

    if update_data.bio is not None:
        user.bio = update_data.bio

    if update_data.password is None:
        if update_data.old_password is not None:
            raise ValueError(PASSWORD_REQUIRED)

    if update_data.password is not None:
        if update_data.old_password is None:
            raise ValueError(OLD_PASSWORD_REQUIRED)

        if not pwd_context.verify(update_data.old_password, user.hashed_password):
            raise ValueError(INCORRECT_OLD_PASSWORD)

        if update_data.password == update_data.old_password:
            raise ValueError(NEW_PASSWORD_SAME_AS_OLD)

        user.hashed_password = get_password_hash(update_data.password)

    db.commit()
    db.refresh(user)
    return user
