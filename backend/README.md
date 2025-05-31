# Migrations

Creates a new migration automatically based on changes detected in the models defined using SQLAlchemy:

```bash
  alembic revision --autogenerate -m "Add message here"
```

Applies all pending migrations up to the latest version (head), updating the database schema as defined in the revisions:

```bash
  alembic upgrade head
```

Reverts the last applied migration, returning the database to the previous version. Useful for testing or rolling back recent changes:

```bash
  alembic downgrade -1
```
