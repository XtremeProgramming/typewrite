from typing import Generic, List, TypeVar

from pydantic.generics import GenericModel

T = TypeVar("T")


class PaginatedResponse(GenericModel, Generic[T]):
    total: int
    has_next: bool
    has_prev: bool
    items: List[T]
