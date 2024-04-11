import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchTableNames();
  }, []);

  // Function to fetch table names from the backend
  const fetchTableNames = async () => {
    try {
      const response = await axios.get('api/allTables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching table names:', error);
    }
  };

  // Function to fetch table data based on selected table
  const fetchTableData = async (tableName) => {
    try {
      const response = await axios.get(`/api/table/${tableName}`);
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  // Event handler for selecting a table from dropdown
  const handleTableSelect = (event) => {
    const selectedTableName = event.target.value;
    setSelectedTable(selectedTableName);
    fetchTableData(selectedTableName);
  };

  // Function to render table data
  const renderTableData = () => {
    return (
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {tableData.length > 0 && Object.keys(tableData[0]).map((key) => (
              <th key={key} className="border px-4 py-2">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              {Object.values(row).map((value, index) => (
                <td key={index} className="border px-4 py-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Database Viewer</h1>
      <div className="mb-4">
        <label htmlFor="table-select" className="block font-bold mb-2">Select Table:</label>
        <select
          id="table-select"
          value={selectedTable}
          onChange={handleTableSelect}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">Select Table</option>
          {tables.map((table, index) => (
            <option key={index} value={table[0]}>
              {table[0]}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-md shadow-md p-4">
        {selectedTable && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedTable}</h2>
            {tableData.length > 0 ? renderTableData() : <p>No data available</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;