# Assignment 3: Game Industry Backend (MongoDB Migration)

## 📌 Project Overview
This project is an evolution of Assignment 1. It transitions the backend from a local JSON-based storage to a fully functional **MongoDB** database. The API manages a collection of **Game Developers**, which is the core topic of my Final Project.

This assignment demonstrates:
- Data persistence using MongoDB Atlas.
- Complex object schemas with validation.
- Full CRUD operations (Create, Read, Update, Delete).
- Integration of a simple frontend interface.

## 🛠 Technologies Used
- **Node.js & Express.js**: Server-side framework.
- **MongoDB Atlas**: Cloud-hosted NoSQL database.
- **Mongoose**: ODM for MongoDB to handle schemas and validation.
- **Dotenv**: For managing environment variables (API keys/URI).

## 🗃 Schema Design
The `Developer` object is designed with the following fields:
- `name` (String, Required): The name of the gaming company.
- `country` (String, Required): The country where the HQ is located.
- `foundedYear` (Number, Required): The year the company was established.
- `games` (Array of Strings): A list of notable games developed by the company.
- `timestamps`: Automatically handles `createdAt` and `updatedAt` for every entry.

## 🚀 Getting Started

### 1. Prerequisites
- Installed [Node.js](https://nodejs.org/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and cluster.

### 2. Installation
Clone the project and install dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a .env file in the root directory and add your MongoDB connection string:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/game_industry?retryWrites=true&w=majority
```

### 4. Running the Server
```bash
node mongodb.js
```

The server will be available at ```http://localhost:3000```.

📡 API Endpoints
Method	Endpoint	Description
GET	/developers	Retrieve all developers from DB.
GET	/developers/:id	Retrieve a single developer by ID.
POST	/developers	Create a new developer entry.
PUT	/developers/:id	Update an existing developer by ID.
DELETE	/developers/:id	Remove a developer from the DB.

🧪 Testing with Postman
All routes have been manually tested using Postman:
`POST`: Validates required fields and returns ```201 Created```.
`GET`: Returns documents as JSON with a ```200 OK``` status.
`Error Handling`: Invalid IDs return ```400 Bad Request```, and missing documents return ```404 Not Found```.
