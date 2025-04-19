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

### register

request with curl

```bash
    curl -X POST "http://localhost:5248/api/auth/register" \
    -H "Content-Type: application/json" \
    -d '{"email": "test@test.com", "password": "password"}'
```

response

```bash
    {"id":1,"email":"test@test.com"}
```

### login

request with curl

```bash
    curl -X POST "http://localhost:5248/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email": "test@test.com", "password": "password"}'
```

response is jwt

```bash
    eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNzQ1NjgzODUwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUyNDgiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyNDgifQ.iOhw0G-zLa3gY-71n97zgA9SkIs0h3kayvBXOsx-yXk
```

### get todos

request with curl

```bash
    curl "http://localhost:5248/api/todos" \
    -H "Authorization: Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNzQ1NjgzODUwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUyNDgiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyNDgifQ.iOhw0G-zLa3gY-71n97zgA9SkIs0h3kayvBXOsx-yXk"
```

response

```bash
    [{"id":1,"title":"dummy title","description":"dummy description","completed":false,"userId":1}]
```
