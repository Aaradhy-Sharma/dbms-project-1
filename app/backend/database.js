import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

// Function to fetch data from a specific table
export async function fetchTableData(tableName) {
  try {
    const [rows, fields] = await pool.query(`SELECT * FROM ${tableName}`);
    return rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Function to get all table names
export async function getAllTables() {
  try {
    const [result] = await pool.query('SHOW TABLES');
    const tableNames = result.map(row => row[`Tables_in_${process.env.MYSQL_DATABASE}`]);
    return tableNames;
  } catch (error) {
    console.error('Error getting table names:', error);
    throw error;
  }
}


// Function to update a record in a specific table
export async function updateTableRecord(tableName, id, updatedData) {
  try {
    const [result] = await pool.query(`UPDATE ${tableName} SET ? WHERE id = ?`, [updatedData, id]);
    return result;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

// Function to delete a record from a specific table
export async function deleteTableRecord(tableName, id) {
  try {
    const [result] = await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

// Function to create a new record in a specific table
export async function createTableRecord(tableName, newData) {
  try {
    if (!newData || typeof newData !== 'object') {
      throw new Error('Invalid data provided for insertion.');
    }
    
    if (!Object.keys(newData).length) {
      throw new Error('No data provided for insertion.');
    }
    
    const [result] = await pool.query(`INSERT INTO ${tableName} SET ?`, [newData]);
    return result;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
}

