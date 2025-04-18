CREATE DATABASE todo_db;
CREATE USER todo_user WITH PASSWORD '@todo25';
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;

-- fix permissions denied for schema public
GRANT USAGE ON SCHEMA public TO todo_user;
GRANT CREATE ON SCHEMA public TO todo_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO todo_user;
-- if still getting permission error run this
ALTER USER todo_user WITH SUPERUSER;