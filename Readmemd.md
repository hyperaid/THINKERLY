
# Thinkerly

Welcome to Thinkerly! This project is a Medium-like platform built to share and discover insightful articles and stories. This README file provides an overview of the tech stack, setup instructions, and usage guidelines.

## Tech Stack

-   **Frontend**: React
-   **Backend**: Cloudflare Workers
-   **Validation Library**: Zod (with type inference for frontend types)
-   **Language**: TypeScript
-   **ORM**: Prisma (with connection pooling)
-   **Database**: PostgreSQL
-   **Authentication**: JWT (JSON Web Tokens)

## Project Structure

java

Copy code

`thinkerly/
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── README.md` 

## Prerequisites

Ensure you have the following installed:

-   Node.js (>= 14.x)
-   npm or yarn
-   PostgreSQL
-   Cloudflare account

## Setup Instructions

### 1. Clone the Repository

bash

Copy code

`git clone https://github.com/yourusername/thinkerly.git
cd thinkerly` 

### 2. Install Dependencies

#### Backend

bash

Copy code

`cd backend
npm install` 

#### Frontend

bash

Copy code

`cd ../frontend
npm install` 

### 3. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

env

Copy code

`DATABASE_URL=postgresql://user:password@localhost:5432/thinkerly
JWT_SECRET=your_jwt_secret_key
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token` 

### 4. Set Up Prisma

Generate Prisma client:

bash

Copy code

`npx prisma generate` 

Apply database migrations:

bash

Copy code

`npx prisma migrate dev --name init` 

### 5. Running the Backend

Navigate to the `backend` directory and start the Cloudflare Worker:

bash

Copy code

`npm run dev` 

### 6. Running the Frontend

Navigate to the `frontend` directory and start the React app:

bash

Copy code

`npm start` 

## Usage

1.  Open your browser and navigate to `http://localhost:3000`.
2.  Register a new account or log in if you already have one.
3.  Start creating and reading articles!

## Contributing

We welcome contributions! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature-name`
3.  Make your changes and commit them: `git commit -m 'Add some feature'`
4.  Push to the branch: `git push origin feature-name`
5.  Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any inquiries or support, please contact us at support@thinkerly.com.

Happy writing!

----------

**Note**: Replace placeholder values (like URLs and emails) with actual values specific to your project.
