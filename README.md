# DBMS Project
### Event Management System for Universities
This repository contains the content for the course: CSD204: Introduction to DBMS. The project is an integral part of the course and will be evaluated according to the guidelines provided by the instructor.

Our project, created to monitor and explore events organized by various entities, is designed to serve as a comprehensive platform for individuals to stay informed and engaged with opportunities for personal and professional development. By leveraging this system, users can access a wide range of events such as workshops, seminars, and gatherings hosted by private/government agencies and colleges.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Functionality](#functionality)
- [Contributors](#contributors)

## Installation

1. Install [`npm`]((https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)) in your local environment.    
2. Install vite using ```npm install vite```
3. Clone the [project repository](https://github.com/Aaradhy-Sharma/dbms-project-1/tree/main) inside your desired directory on your machine. Use:

```bash
git clone https://github.com/Aaradhy-Sharma/dbms-project-1/tree/main
```

## Usage

1. Navigate into the directory where you cloned the repository.
2. Move into the `frontend` directory :
```bash
cd app/frontend
```
3. Run:
```bash
npm run dev
```
4. To log-in use email as: as783@snu.edu.in

Ready to Go.

## Functionality

### Front-End
#### 1. `App.jsx`

The `App.jsx` component is the heart of our application. It manages the application state and handles the main functionality.

On initial load, it fetches a list of all table names from the backend server using the `fetchTableNames` function. This function sends a GET request to the `api/allTables` endpoint and stores the response (an array of table names) in the `tables` state variable.

The application uses React's `useState` hook to maintain three state variables: `tables` (stores the list of all table names), `selectedTable` (stores the name of the currently selected table), and `tableData` (stores the data of the currently selected table).

When a table is selected from the dropdown, the `handleTableSelect` function is triggered. This function updates the `selectedTable` state variable and fetches the data for the selected table using the `fetchTableData` function.

The `fetchTableData` function sends a GET request to the `/api/table/${tableName}` endpoint and stores the response data in the `tableData` state variable.

The `renderTableData` function is used to display the data of the selected table in a tabular format.

Error handling is also implemented. If there's an error while fetching the table names or the table data, it will be logged to the console.

#### 2. `Main.js`


- **User Authentication**: The code includes a login form that prompts the user for an email and password. If the provided credentials match a predefined set (email: `as783@snu.edu.in`, password: `root@123`), the user is granted access to the application's main features. Otherwise, an error message is displayed.

- **Display All Tables**: After successful login, the user can view a list of all available database tables. Each table row includes a "Display" button that allows the user to fetch and display the table's data.

- **View Table Data**: When the user selects a table from the dropdown and clicks the "Display" button, the code retrieves the table data from the server and renders it in a tabular format. The table includes "Edit" and "Delete" buttons for each row, allowing the user to modify or remove individual records.

- **Edit Records**: Clicking the "Edit" button for a record opens a form pre-populated with the record's current data. The user can modify the desired fields and submit the form to update the record on the server.

- **Delete Records**: The "Delete" button prompts the user for confirmation before deleting the corresponding record from the server.

- **Create Records**: The code includes a form for creating new records in the selected table. The user can enter values for each field and submit the form to add a new record to the server.

- **Logout**: The application provides a logout button that clears the user's session and redirects them to the login page.

The code utilizes the `axios` library to make HTTP requests to the server for fetching data, updating records, creating new records, and deleting records. It also employs event listeners and DOM manipulation techniques to handle user interactions and render the application's user interface dynamically.


### Back-End

Contains the sql content of the project. Like tables and records.

#### 1. `app.js`
This JavaScript code uses the Express.js framework to create a server that interacts with a database. It imports several functions from a `database.js` module to perform CRUD (Create, Read, Update, Delete) operations on the database.

The `isAdmin` middleware function checks if the user is an admin based on their email. If the user is an admin, it allows the request to proceed. Otherwise, it sends a 403 Forbidden response.

The server has several routes:

`GET /api/events`: Fetches all events from the 'EVENT' table and sends them as a JSON response.
`GET /api/allTables`: Fetches all table names from the database and sends them as a JSON response.
`GET /api/table/:tableName`: Fetches all records from the specified table and sends them as a JSON response.
`POST /api/sql`: Executes a SQL query provided in the request body. This route is protected by the isAdmin middleware, so only admins can execute SQL queries.
`DELETE /api/table/:tableName/:id`: Deletes the record with the specified ID from the specified table and sends the result as a JSON response.
`POST /api/table/:tableName`: Creates a new record in the specified table with the data provided in the request body and sends the result as a JSON response.
The server also has updated versions of some routes:

`GET /api/table/:tableName/:id`: Fetches the record with the specified ID from the specified table and sends it as a JSON response.
`PUT /api/table/:tableName/:id`: Updates the record with the specified ID in the specified table with the data provided in the request body and sends the result as a JSON response.
`DELETE /api/table/:tableName/:id`: Deletes the record with the specified ID from the specified table and sends the result as a JSON response. This version of the route parses the ID as a number and checks if it's valid.
Finally, the server listens for connections on port 8080.

#### 2. `database.js`

This JavaScript code uses the mysql2 library to interact with a MySQL database. It exports several functions that perform CRUD (Create, Read, Update, Delete) operations on the database.

The `mysql.createPool` function is used to create a pool of connections to the MySQL database. The connection details are read from environment variables.

The `getAllTables` function fetches all table names from the database. It sends a `SHOW TABLES` query to the database and maps the result to an array of table names.

The `getPrimaryKeyColumn` function returns the primary key column name for a given table name. It uses a switch statement to determine the primary key column name based on the table name.

The `fetchTableData` function fetches all records from a given table. It sends a `SELECT * FROM ${tableName}` query to the database.

The `updateTableRecord` function updates a record in a given table. It sends an `UPDATE ${tableName} SET ? WHERE ${primaryKeyColumn} = ?` query to the database, replacing the ? placeholders with the updated data and the ID of the record to update.

The `deleteTableRecord` function deletes a record from a given table. It first checks if the ID of the record to delete is valid. If the ID is valid, it sends a `DELETE FROM ${tableName} WHERE ${primaryKeyColumn} = ? `query to the database, replacing the ? placeholder with the ID of the record to delete.

The `createTableRecord` function creates a new record in a given table. It first checks if the data for the new record is valid. If the data is valid, it sends an `INSERT INTO ${tableName} (${columns}) VALUES (${values})` query to the database, replacing the `${columns}` and `${values}` placeholders with the column names and values of the new record, respectively.