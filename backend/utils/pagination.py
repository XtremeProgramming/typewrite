from math import ceil


def paginate(query, page: int, limit: int):
    total = query.count()
    pages = max(ceil(total / limit), 1)
    offset = (page - 1) * limit

    items = query.offset(offset).limit(limit).all()

    return {
        "total": total,
        "has_next": page < pages,
        "has_prev": page > 1,
        "items": items,
    }
