import express from 'express';
import cors from 'cors';
import {
  getAllTables,
  fetchTableData,
  updateTableRecord,
  deleteTableRecord,
  createTableRecord,
  getPrimaryKeyColumn 
} from './database.js';

const app = express();
app.use(cors());

const isAdmin = (req, res, next) => {
  const email = req.headers.email; 

  if (email === 'as783@snu.edu.in') {
    next(); // Allow access to the route
  } else {
    res.status(403).send('Forbidden: Only admin can perform this action');
  }
};

// Route to get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await fetchTableData('EVENT');
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});
// Route to get all table names
app.get('/api/allTables', async (req, res) => {
  try {
    const allTables = await getAllTables();
    res.json(allTables);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});

// Route to get data from a specific table
app.get('/api/table/:tableName', async (req, res) => {
  const { tableName } = req.params;
  try {
    const tableData = await fetchTableData(tableName);
    res.json(tableData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});

// // Route to update a record in a specific table
// app.put('/api/table/:tableName/:id', async (req, res) => {
//   const { tableName, id } = req.params;
//   const updatedData = req.body;
//   try {
//     const result = await updateTableRecord(tableName, id, updatedData);
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Something broke!');
//   }
// });

app.post('/api/sql', isAdmin, async (req, res) => {
  const { query } = req.body;
  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});

// Route to delete a record from a specific table
app.delete('/api/table/:tableName/:id', async (req, res) => {
  const { tableName, id } = req.params;
  try {
    const result = await deleteTableRecord(tableName, id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});

// Route to create a new record in a specific table
app.post('/api/table/:tableName', async (req, res) => {
  const { tableName } = req.params;
  const newData = req.body;
  console.log('New Data:', newData); // Add this line to log newData
  try {
    const result = await createTableRecord(tableName, newData);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});


const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Update the fetchTableData function
app.get('/api/table/:tableName/:id', async (req, res) => {
  const { tableName, id } = req.params;
  const primaryKeyColumn = getPrimaryKeyColumn(tableName);
  try {
    const tableData = await fetchTableData(tableName, primaryKeyColumn);
    const record = tableData.find(row => row[primaryKeyColumn] == id);
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});

// Update the updateTableRecord function
app.put('/api/table/:tableName/:id', async (req, res) => {
  const { tableName, id } = req.params;
  const primaryKeyColumn = getPrimaryKeyColumn(tableName);
  const updatedData = req.body;
  try {
    const result = await updateTableRecord(tableName, primaryKeyColumn, id, updatedData);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});

// Route to delete a record from a specific table
app.delete('/api/table/:tableName/:id', async (req, res) => {
  const { tableName, id } = req.params;
  const numericId = parseInt(id); // Parse id as a number
  if (isNaN(numericId)) {
    return res.status(400).send('Invalid id format: must be a number');
  }

  try {
    const result = await deleteTableRecord(tableName, numericId); // Pass numericId to the function
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});


// Update the createTableRecord function
app.post('/api/table/:tableName', async (req, res) => {
  const { tableName } = req.params;
  const newData = req.body;
  console.log('New Data:', newData);
  try {
    const result = await createTableRecord(tableName, newData);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});