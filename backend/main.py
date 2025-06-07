from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY

from core.constants import (
    INVALID_INPUT,
    PASSWORD_TOO_LONG,
    PASSWORD_TOO_SHORT,
    PASSWORDS_DO_NOT_MATCH,
    PYDANTIC_FIELD_REQUIRED_MSG,
    PYDANTIC_PASSWORD_TOO_LONG_MSG,
    PYDANTIC_PASSWORD_TOO_SHORT_MSG,
    REQUIRED_FIELDS_MISSING,
)
from routes import post, user

app = FastAPI()
app.include_router(user.router)
app.include_router(post.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def item_to_string(target):
    return [str(item) for item in target]


def format_validation_errors(errors):
    formatted = []
    required_fields = []

    for err in errors:
        field_path = ".".join(item_to_string(err["loc"][1:]))

        if PYDANTIC_FIELD_REQUIRED_MSG in err["msg"]:
            required_fields.append(field_path)
        elif PASSWORDS_DO_NOT_MATCH in err["msg"]:
            formatted.append({"id": PASSWORDS_DO_NOT_MATCH})
        elif PYDANTIC_PASSWORD_TOO_SHORT_MSG in err["msg"]:
            formatted.append(
                {
                    "id": PASSWORD_TOO_SHORT,
                    "min_length": 12,
                }
            )
        elif PYDANTIC_PASSWORD_TOO_LONG_MSG in err["msg"]:
            formatted.append(
                {
                    "id": PASSWORD_TOO_LONG,
                    "max_length": 128,
                }
            )
        else:
            formatted.append({"id": INVALID_INPUT, "field": field_path})

    if required_fields:
        formatted.append({"id": REQUIRED_FIELDS_MISSING, "fields": required_fields})

    return formatted


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    formatted_errors = format_validation_errors(exc.errors())

    return JSONResponse(
        status_code=HTTP_422_UNPROCESSABLE_ENTITY,
        content=formatted_errors,
    )
