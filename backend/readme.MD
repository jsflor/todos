# TODOS API

Todos app API made with C#

## initialize local pg database

connect and initialize db

```bash
    psql postgres
    \i /Users/sebastianflor/workspace/todos/backend/init_db.sql
```

*remeber to change the path of the init_db.sql scrit file according to yours*

## install dotnet-ef

```bash
    dotnet tool install --global dotnet-ef
```

## create build

```bash
    dotnet build
```

## run server

```bash
    dotnet run
```

## create initial migration

```bash
    dotnet ef migrations add InitialCreate
```

## apply migrations in database

```bash
    dotnet ef database update
```

## check applied migrations

```bash
    dotnet ef migrations list
```

## revert migrations

```bash
    # Revert the last migration
    dotnet ef database update PreviousMigrationName

    # Or to remove the last migration entirely
    dotnet ef migrations remove
```
