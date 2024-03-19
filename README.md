# Pacific Clothing

The deployed website is located at: https://pacific-clothing.onrender.com.

Pacific Clothing is an e-commerce appplication that allows users to browse an online store and simulates buying items users add to their shopping bag. This application consists of two separate deployables, which are a web client and a backend server.

## Technologies Used

- **Frontend**: React, Tailwindcss, HTML 5
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Other**: Git, GitHub

## Skills Displayed

Within this project, the following knowledge and skills have been displayed:
1. Frontend:
   - Use of functional components, lifecycle methods, and props
   - React Hooks (useState, useContext, useEffect, useRef)
   - Fetching data from APIs (Fetch API)
   - Understanding of the DOM, DOM manipulation, and the virtual DOM
   - Component styling, responsive styling, and responsive layouts which include mobile support
   - Deployment and building (Vite and Render.com)
   - JavaScript fundamentals and concepts
     
2. Backend:
   - Basic RESTful API design
   - SQL queries
   - Database setup
   - Error handling
   - Deployment (Render.com)
     
3. General:
   - Testing with React Testing Library and ViTest
   - Git commands including committing, branching, pushing and pulling, and merging
   - Code organization and readability
   - Debugging

## Structure

This project has two main directories:

- 'client': This contains the code for the web client.
- 'server': This contains the code for the backend server application.

## How to Run the App Locally

### Prerequisites
Both Node.js and PostgreSQL must be installed.

### 1. Installation
Clone the repository for this project: 
```https://github.com/logjscript/Ecommerce-app.git```

While in the root directory of this project, run the following commands:
```bash
npm i
npm run install
```
This will install the dependencies in the root, client, and server directories.

### 2. Create and Add to a Local PostgreSQL Database

Create a local PostgreSQL database and access it from the terminal (if you don't know how to do this, read more on the PostgreSQL docs at ```https://www.postgresql.org/docs/current/tutorial-createdb.html```). 

Paste the following code from the data.sql file in the server directory into your PostgreSQL database:

```sql
CREATE TABLE user_list(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    items jsonb,
    total DECIMAL(10, 2)
);
```

If you want to add users manually into the table, use the following command from the data.sql file mentioned above
(include your own information within the quotes containing username and password):

```sql
INSERT INTO user_list(username, password, items, total) VALUES (
    'username', 
    'password', 
    '[]',
    0.00
);
```

### Connecting the Database

Navigate to the server directory (```cd server/```) and create a .env file.
The `.env` file is used to store sensitive environment variables, such as database credentials, which should not be committed to version control for security reasons.

Paste the following code into the .env file and fill in the variables with your database information:

```JavaScript
process.env.USERNAME=
process.env.PASSWORD=
process.env.HOST=
process.env.DBPORT=
process.env.DATABASE_NAME=
```

### Run the Project

Return to the root directory (```cd ..```) and run the following command:

```bash 
npm start
```

The app is now running locally and is connected to your local PostgreSQL database!

## How to Run Tests 

To run tests on the app from the root directory run the following:

```bash
cd client
npm run test
```

If you are already in the client directory, you will only need to run the last command (```npm run test```).



