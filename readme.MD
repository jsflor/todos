# TODOS APP

Client is made with AngularJS, server uses .Net and database is PostgreSQL

## Set up database

Follow backend/init_db.sql script commands as we need to create a "todo_db" database in our local postgres with a "todo_user" user with privileges. Be sure to have postgres running locally.

Then we can run migrations from backend folder

```bash
    cd backend
    dotnet ef database update
```

## Run server

Once the database is ready and we applied the migrations we can run the server

```bash
    cd backend
    dotnet build
    dotnet run
```

The server will be listening on http://localhost:5248

## Run client

Once the server is running we can run the client

```bash
    cd frontend
    npm i
    ng serve
```

Our Angular application will be available on http://localhost:4200

## Current functionality

- User registration
- User login
- Todo list in the home page. Users can only see their todos, can create new ones and can mark them as done
- Todo detail
