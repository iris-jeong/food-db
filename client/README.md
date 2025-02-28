# Nutrition Wizard

A web application that allows users to find the three lowest-calorie recipes based on ingredients and view their search history.

## Tech Stack

- Frontend: React, Next.js
- Backend: Node.js, Express.js
- Database: MongoDB

## Getting Started

### Installation

1. Clone the repository.

```
git clone https://github.com/iris-jeong/food-db.git
cd food-db
```

2. Install dependencies.

```
npm install
```

### Environment Variables

In the client directory, create a `.env.local` file and add:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api
```

In the server directory, create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
FATSECRET_CLIENT_ID=your_fatsecret_client_id
FATSECRET_CLIENT_SECRET=your_fatsecret_client_secret
```

### Running the Application

#### Start Frontend

```
cd client
npm run dev
```

#### Start Backend Server

```
cd server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
