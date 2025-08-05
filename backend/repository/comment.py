from uuid import UUID

from sqlalchemy.orm import Session

from models.comment import Comment


def create_comment(
    db: Session, post_id: UUID, user_id: UUID, comment_data: Comment
) -> Comment:
    comment = Comment(
        content=comment_data.content,
        post_id=post_id,
        user_id=user_id,
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def get_comments_by_post_id(db: Session, post_id: str):
    return (
        db.query(Comment)
        .filter(Comment.post_id == post_id)
        .order_by(Comment.created_at)
        .all()
    )
