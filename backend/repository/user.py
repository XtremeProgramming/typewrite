from passlib.context import CryptContext
from sqlalchemy.orm import Session

from core.constants import PYDANTIC_EMAIL_ALREADY_REGISTERED_MSG
from models.user import User
from schemas.user import UserCreate

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
