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

### Setup

1. Ensure you have the .NET SDK installed.
2. Navigate to the `ToDo.Server` directory.
3. Run the following command to start the server:
   dotnet run

## Development

To set up the project for development:

1. Clone the repository
2. Set up the backend by following the Backend Setup section
3. Set up the frontend by following the Frontend Setup section
4. Start both the backend and frontend servers

## Building and Running

To build and run the entire solution:

1. Open the solution in Visual Studio
2. Set the startup projects to both ToDo.Server and todo.client
3. Press F5 or click the "Start" button

This will launch both the backend API and the frontend application.

## Docker Support

The project includes a Dockerfile for containerization. To build and run the Docker container:

1. Build the Docker image:
   docker build -t todo-app .

2. Run the container:
   docker run -p 8080:8080 todo-app

## Contributing

Please read the `CHANGELOG.md` file in the `todo.client` directory for information on how this project was set up and generated.

## Notes

- Make sure to run the backend server before starting the frontend application.
- The project uses a .gitignore file to exclude common build artifacts and dependencies from version control.
