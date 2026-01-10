# CRUD Application - Node.js, React, MySQL

A full-stack CRUD (Create, Read, Update, Delete) application built with :
- **Frontend** : React
- **Backend** : Node.js with Express
- **Database** : MySQL

## Project Structure

```
.
├── server/                    # Backend Express server
│   ├── server.js             # Main server entry point
│   ├── db.js                 # MySQL database connection
│   ├── package.json          # Backend dependencies
│   ├── .env                  # Environment configuration
│   ├── routes/
│   │   └── items.js          # CRUD API endpoints
│   └── database.sql          # Database schema
│
└── client/                    # Frontend React application
    ├── src/
    │   ├── App.js            # Main App component
    │   ├── App.css           # App styling
    │   ├── api.js            # API client setup
    │   ├── index.js          # React entry point
    │   ├── index.css         # Global styles
    │   ├── components/
    │   │   ├── ItemForm.js   # Form for adding/editing items
    │   │   ├── ItemForm.css  # Form styling
    │   │   ├── ItemList.js   # List view for items
    │   │   └── ItemList.css  # List styling
    │   └── pages/            # Page components (extensible)
    ├── public/
    │   └── index.html        # HTML entry point
    └── package.json          # Frontend dependencies
```

## Features

- **Create** - Add new items with name, description, and price
- **Read** - View all items in a table format
- **Update** - Edit existing items
- **Delete** - Remove items with confirmation
- **Responsive UI** - Works on desktop and mobile
- **Error Handling** - User-friendly error messages
- **RESTful API** - Clean API endpoints

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org)
- **MySQL** (v5.7 or higher) - [Download](https://www.mysql.com)
- **npm** or **yarn** - Comes with Node.js

## Installation

### 1. Database Setup

1. Open MySQL Workbench or command line
2. Create a new database and user:
   ```sql
   CREATE DATABASE IF NOT EXISTS crud_app;
   CREATE USER 'crud_user'@'localhost' IDENTIFIED BY 'crud_password';
   GRANT ALL PRIVILEGES ON crud_app.* TO 'crud_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. Run the database schema:
   ```sql
   mysql -u root -p crud_app < server/database.sql
   ```
   Or import `server/database.sql` through MySQL Workbench

### 2. Backend Setup

```bash
cd server
npm install
```

**Configure Environment Variables** (.env):
```
DB_HOST=localhost
DB_USER=crud_user
DB_PASSWORD=crud_password
DB_NAME=crud_app
PORT=5000
```

**Start the server**:
```bash
npm start          # Production mode
# OR
npm run dev        # Development mode with nodemon (auto-reload)
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

The React app will open on `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:5000/api`

#### Get All Items
- **Method**: GET
- **Endpoint**: `/items`
- **Response**: 
  ```json
  [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "created_at": "2024-01-10T10:30:00Z",
      "updated_at": "2024-01-10T10:30:00Z"
    }
  ]
  ```

#### Get Item by ID
- **Method**: GET
- **Endpoint**: `/items/:id`
- **Example**: `/items/1`

#### Create New Item
- **Method**: POST
- **Endpoint**: `/items`
- **Body**:
  ```json
  {
    "name": "Monitor",
    "description": "27-inch 4K display",
    "price": 399.99
  }
  ```

#### Update Item
- **Method**: PUT
- **Endpoint**: `/items/:id`
- **Example**: `/items/1`
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "price": 499.99
  }
  ```

#### Delete Item
- **Method**: DELETE
- **Endpoint**: `/items/:id`
- **Example**: `/items/1`

## Testing the Application

### Using cURL (Command Line)

```bash
# Get all items
curl http://localhost:5000/api/items

# Create new item
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","price":99.99}'

# Update item
curl -X PUT http://localhost:5000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","price":199.99}'

# Delete item
curl -X DELETE http://localhost:5000/api/items/1
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new collection and add requests for each endpoint
3. Use the endpoints listed above

### Using the Web Interface

1. Open `http://localhost:3000` in your browser
2. Use the form to add, edit, and delete items
3. View all items in the table below the form


## Preview

Preview of the project 

![Preview of the project](<App Preview.png>)

## Technologies Used

### Frontend
- React 18.2
- Axios (HTTP client)
- CSS3

### Backend
- Node.js
- Express 4.18
- mysql2 (MySQL driver)
- CORS (Cross-Origin Resource Sharing)
- dotenv (Environment variables)

### Database
- MySQL 5.7+

## Getting Help

If you encounter any issues:
1. Check that all prerequisites are installed
2. Verify your `.env` file configuration
3. Check database credentials and permissions
4. Ensure both server and client are running on correct ports


