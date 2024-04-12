import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

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

export async function getPrimaryKeyColumn(tableName) {
  switch (tableName) {
    case 'ADMIN':
      return 'Admin_id';
    case 'CHIEF_GUEST':
      return 'EC_ID, Admin_id, C_id';
    case 'COLLEGE':
      return 'COrg_id, ECol_id, College_id';
    case 'Company':
      return 'ComOrg_id, UniqueID, Company_id';
    case 'COMPETETION':
      return 'EC_ID, Admin_id, C_ID';
    case 'CONFERENCE':
      return 'EC_ID, Admin_id, Conference_id';
    case 'EVENT':
      return 'E_ID, Admin_id';
    case 'FACULTY':
      return 'UF_ID, Staff_id';
    case 'FEST':
      return 'EF_ID, Admin_id, FEST_ID';
    case 'Government':
      return 'GOrg_id, EG_id, Policy_no';
    case 'JUDGES':
      return 'EC_ID, UniqueID, Admin_id';
    case 'MENTORED_BY':
      return 'Roll_no, Mentor_id';
    case 'ORGANISATION':
      return 'Org_id, EO_id';
    case 'PARTICIPATE_IN':
      return 'U_ID, E_ID';
    case 'PERFORMER':
      return 'EF_id, Admin_id, Fest_id';
    case 'PRIZE':
      return 'EC_ID, Admin_id, C_id';
    case 'STUDENT':
      return 'US_ID, Roll_no';
    case 'USER':
      return 'U_ID';
    default:
      return 'id';
  }
}




// Update the fetchTableData function
export async function fetchTableData(tableName, primaryKeyColumn) {
  try {
    const [rows, fields] = await pool.query(`SELECT * FROM ${tableName}`);
    return rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Update the updateTableRecord function
export async function updateTableRecord(tableName, primaryKeyColumn, id, updatedData) {
  try {
    const [result] = await pool.query(`UPDATE ${tableName} SET ? WHERE ${primaryKeyColumn} = ?`, [updatedData, id]);
    return result;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

export async function deleteTableRecord(tableName, primaryKeyColumn, id) {
  try {
    if (id === undefined || id === null || typeof id !== 'number') {
      throw new Error(`Invalid id value: ${id}`);
    }
    const [result] = await pool.query(`DELETE FROM ${tableName} WHERE ${primaryKeyColumn} = ?`, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

export async function createTableRecord(tableName, newData) {
  try {
    if (!newData || typeof newData !== 'object' || Object.keys(newData).length === 0) {
      throw new Error('Invalid data provided for insertion.');
    }

    const columns = Object.keys(newData).join(', ');
    const values = Object.values(newData).map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    const [result] = await pool.query(query, Object.values(newData));
    return result;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
}