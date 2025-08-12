# Express + Prisma Application

This project is a simple Express application integrated with Prisma for database management. Below are the instructions for setting up and running the application.

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- Install vscode Prisma extension for code highlighting

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd express-prisma-app
   ```

2. **Install dependencies:**

   Run the following command to install the required packages:

   ```bash
   npm install
   ```

3. **Set up the database:**

   Update the `DATABASE_URL` in the `.env` file with the supabase staging database connection string.

4. **Run migrations:**

   To create the database schema, run:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the application:**

   You can start the application using:

   ```bash
   npm run start
   ```

   Alternatively, for development, you can use:

   ```bash
   npm run dev
   ```

## Usage

Once the application is running, you can access it at `http://localhost:3000`. You can use tools like Postman or curl to interact with the API endpoints defined in the routes.

## Project Structure

- `src/app.ts`: Entry point of the application.
- `src/prisma/schema.prisma`: Defines the database schema for Prisma.
- `src/controllers/index.ts`: Contains the IndexController with route handling methods.
- `src/routes/index.ts`: Sets up the application routes.
- `src/types/index.ts`: Custom types for request and response objects.
- `prisma/migrations`: Contains migration files for database schema changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.