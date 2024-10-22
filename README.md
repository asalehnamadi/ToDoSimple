# Todo Application

This is a Todo application with a React frontend and a .NET backend.

## Project Structure

The project consists of two main parts:

1. Frontend (todo.client): A React application built with TypeScript and Vite.
2. Backend (ToDo.Server): A .NET API project.

## Frontend (todo.client)

### Technologies Used

- React
- TypeScript
- Vite
- Chakra UI

### Setup

1. Navigate to the `todo.client` directory.
2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

## Backend (ToDo.Server)

The backend is a .NET API project.

### Technologies Used

- .NET 8
- Entity Framework Core
- SQL Server

### Setup

1. Ensure you have the .NET SDK installed.
2. Navigate to the `ToDo.Server` directory.
3. Update the database connection string in `appsettings.json`:

"ConnectionStrings": {
"DefaultConnection": "Your_SQL_Server_Connection_String_Here"
}

Run database migrations:
dotnet ef database update
Run the following command to start the server:
dotnet run
Database Migrations
To create a new migration after changing the model:

Ensure you're in the ToDo.Server directory.
Run the following command:
dotnet ef migrations add YourMigrationName
Apply the migration to the database:
dotnet ef database update
Development
To set up the project for development:

Clone the repository
Set up the backend by following the Backend Setup section
Set up the frontend by following the Frontend Setup section
Start both the backend and frontend servers
Building and Running
To build and run the entire solution:

Open the solution in Visual Studio
Set the startup projects to both ToDo.Server and todo.client
Press F5 or click the "Start" button
This will launch both the backend API and the frontend application.

Docker Support
The project includes a Dockerfile for containerization. To build and run the Docker container:

Build the Docker image:
docker build -t todo-app .
Run the container:
docker run -p 8080:8080 todo-app
Contributing
Please read the CHANGELOG.md file in the todo.client directory for information on how this project was set up and generated.

Notes
Make sure to run the backend server before starting the frontend application.
The project uses a .gitignore file to exclude common build artifacts and dependencies from version control.
