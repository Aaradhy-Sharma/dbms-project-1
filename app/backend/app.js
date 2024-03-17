import express from 'express';
import cors from 'cors';
import {
  getAllTables,
  fetchTableData,
  updateTableRecord,
  deleteTableRecord,
  createTableRecord,
} from './database.js';

const app = express();
app.use(cors());

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

// Route to update a record in a specific table
app.put('/api/table/:tableName/:id', async (req, res) => {
  const { tableName, id } = req.params;
  const updatedData = req.body;
  try {
    const result = await updateTableRecord(tableName, id, updatedData);
    res.json(result);
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