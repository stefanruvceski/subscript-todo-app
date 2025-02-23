# Todo Backend Express Knex

> [!NOTE]  
> This project is inspired by the [Todo-Backend](http://todobackend.com/) specification but has been extended with additional features and modernized for group usage. It is actively maintained and developed as part of an interview/test project.

This is a backend API implementation for a group "to-do" application using Node.js, Express for the server, Knex for database migrations and queries, and Objection.js as an ORM. The default database is PostgreSQL. The project leverages ES6+ features like `async/await` and follows a clean architecture for modularity and scalability.

## Features

- **Users**: Registration, login, and CRUD operations.
- **Groups**: Group creation and member management.
- **Tasks**: Task creation with privacy (owner-only) or group assignment.
- **Task History**: Automatic tracking of task changes.
- **Task Comments**: Support for nested comments (sub-comments) with access restricted to group members or task owners for private tasks.
- **Authentication**: JWT-based authentication for protected routes.
- **Validation**: Joi validation for input data.
- **Optimization**: Indexes on key columns for faster queries.

## Prerequisites

- **Node.js**: v16+ (v18 recommended for the latest Yarn features).
- **PostgreSQL**: v12+ installed locally or hosted (e.g., Supabase).
- **Yarn**: v1.22+ for package management.

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:tonycheang/todo-backend-express-knex.git
cd todo-backend-express-knex/server
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Create a PostgreSQL Database

#### 1. Connect to the PostgreSQL server

```bash
psql -U postgres
```

#### 2. Create the database and grant privileges

```bash
CREATE DATABASE todo_app;
GRANT ALL PRIVILEGES ON DATABASE todo_app TO postgres;
\q
```

Replace postgres with your PostgreSQL username if different.

### 4 Create and fill out .env

```bash
PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=5432
PORT=5001
JWT_SECRET=
```

### 5. Install Knex Globally

```bash
npm install -g knex
```

### 6. Apply Migrations

```bash
npx knex migrate:latest --knexfile config/knexfile.js
```

### 7. Start the Server

Launch the server at http://localhost:5001:

```bash
yarn server
```

## Project Structure

```bash
server/
├── src/
│   ├── config/          # Database configuration (db.js, knexfile.js)
│   │   ├── migrations/  # Knex migrations for tables and triggers
│   │   ├── triggers/    # SQL triggers
│   │   ├── openapi.yaml # OpenAPI specification
│   ├── controllers/     # HTTP controllers
│   ├── middleware/      # Middleware (authentication, validation)
│   ├── models/          # Objection.js models
│   ├── repositories/    # CRUD operations for database access
│   ├── routes/          # Express routes
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── .env                 # Environment variables
└── server.js            # Main entry point
```

## Development and Testing

### Creating a New Migration

```bash
npx knex migrate:make migration_name --knexfile config/knexfile.js
```

### Rolling Back Migrations

```bash
npx knex migrate:rollback --knexfile config/knexfile.js
```

### Running Tests

```bash
yarn test
```

## Documentation

The API is documented in OpenAPI 3.0 format in openapi.yaml. Generate HTML documentation:

```bash
npm install -g redoc-cli
cd server && npx @redocly/cli build-docs config/openapi.yaml -o docs/docsAPI.html
```

Open docs/index.html in a browser for an interactive view.
