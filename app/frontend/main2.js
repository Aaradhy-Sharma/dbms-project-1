const tableSelect = document.getElementById('table-select');
const tableList = document.getElementById('table-list');
const editFormContainer = document.getElementById('edit-form-container');
const createFormContainer = document.getElementById('create-form-container');
const displayDatabaseBtn = document.getElementById('display-database-btn');
const loginFormContainer = document.getElementById('login-form-container');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('invalid-credentials');
const databaseContent = document.getElementById('database-content');
const logoutButton = document.getElementById('logout-btn');
const headerContainer = document.getElementById('header-container'); // New: Header container for user info

// Initially hide the table-related elements
tableSelect.style.display = 'none';
tableList.style.display = 'none';
editFormContainer.style.display = 'none';
createFormContainer.style.display = 'none';
databaseContent.style.display = 'none'; // Initially hide the database content
logoutButton.style.display = 'none'; // Initially hide the logout button

// Show the login form container
loginFormContainer.style.display = 'flex'; // Use 'flex' instead of 'block'

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === 'as783@snu.edu.in' && password === 'root@123') {
    // Grant full access (edit, delete, create)
    loginFormContainer.style.display = 'none';
    tableSelect.style.display = 'block';
    tableList.style.display = 'block';
    editFormContainer.style.display = 'block';
    createFormContainer.style.display = 'block';
    databaseContent.style.display = 'block';
    logoutButton.style.display = 'block';
    renderUserInfo(email, true); // New: Render user info for admin
    // ...
  } else if (email === 'dm409@snu.edu.in' && password === 'mishra') {
    // Grant read-only access
    loginFormContainer.style.display = 'none';
    tableSelect.style.display = 'block';
    tableList.style.display = 'block';
    editFormContainer.style.display = 'none'; // Hide edit form
    createFormContainer.style.display = 'none'; // Hide create form
    databaseContent.style.display = 'block';
    logoutButton.style.display = 'block';
    renderUserInfo(email, false); // New: Render user info for user
    // ...
  } else {
    // Show login error message and highlight input fields
    loginError.style.display = 'block';
    emailInput.style.borderColor = 'red';
    passwordInput.style.borderColor = 'red';
    console.log('Invalid credentials');
  }
});

// Logout functionality
logoutButton.addEventListener('click', function() {
  // Hide the table-related elements and logout button
  tableSelect.style.display = 'none';
  tableList.style.display = 'none';
  editFormContainer.style.display = 'none';
  createFormContainer.style.display = 'none';
  databaseContent.style.display = 'none';
  logoutButton.style.display = 'none';
  headerContainer.innerHTML = ''; // Clear the user info from the header

  // Show the login form container
  loginFormContainer.style.display = 'flex';

  // Reset the login form
  emailInput.value = '';
  passwordInput.value = '';
  loginError.style.display = 'none';
  emailInput.style.borderColor = '';
  passwordInput.style.borderColor = '';
});

// Fetch table names and populate the select dropdown
fetchTableNames();

async function fetchTableNames() {
  try {
    const response = await axios.get('/api/allTables');
    const tableNames = response.data;
    console.log('Fetched table names:', tableNames); // Debugging
    tableNames.forEach(tableName => {
      const option = document.createElement('option');
      option.value = tableName[0];
      option.text = tableName[0];
      tableSelect.add(option);
    });
  } catch (error) {
    console.error('Error fetching table names:', error);
  }
}

// Render table data
function renderTableData(tableData) {
  tableList.innerHTML = '';
  if (tableData.length === 0) {
    tableList.innerHTML = '<p>No data available</p>';
    return;
  }

  const table = document.createElement('table');
  table.classList.add('table-auto', 'w-full', 'border-collapse');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create table headers
  const headers = Object.keys(tableData[0]);
  const headerRow = document.createElement('tr');
  headerRow.classList.add('bg-gray-200');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    th.classList.add('border', 'px-4', 'py-2');
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create table rows
  tableData.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.classList.add(index % 2 === 0 ? 'bg-white' : 'bg-gray-100');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = row[header];
      td.classList.add('border', 'px-4', 'py-2');
      tr.appendChild(td);
    });

    // Add edit and delete buttons only for admin users
    const isAdmin = document.getElementById('user-info').dataset.isAdmin === 'true';
    if (isAdmin) {
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.classList.add('edit-btn', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
      editBtn.dataset.id = row.id; // Assuming there's an 'id' column
      editBtn.dataset.table = tableSelect.value;
      editBtn.addEventListener('click', handleEditClick);
      tr.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn', 'bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
      deleteBtn.dataset.id = row.id;
      deleteBtn.dataset.table = tableSelect.value;
      deleteBtn.addEventListener('click', handleDeleteClick);
      tr.appendChild(deleteBtn);
    }

    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableList.appendChild(table);
}

// Handle edit button click
async function handleEditClick(e) {
  const id = e.target.dataset.id;
  const tableName = e.target.dataset.table;

  try {
    const response = await axios.get(`/api/table/${tableName}/${id}`);
    const recordData = response.data[0];

    // Create the edit form dynamically
    const editForm = createEditForm(tableName, id, recordData);
    editFormContainer.innerHTML = '';
    editFormContainer.appendChild(editForm);
  } catch (error) {
    console.error('Error fetching record data:', error);
  }
}

function createEditForm(tableName, id, recordData) {
  const editForm = document.createElement('form');
  editForm.classList.add('edit-form');
  editForm.dataset.table = tableName;
  editForm.dataset.id = id;

  const fields = Object.keys(recordData);
  fields.forEach(field => {
    if (field !== 'id') {
      const label = document.createElement('label');
      label.textContent = field;
      editForm.appendChild(label);

      const input = document.createElement('input');
      input.type = 'text';
      input.name = field;
      input.value = recordData[field];
      input.classList.add('border', 'border-gray-300', 'rounded-md', 'px-3', 'py-2', 'w-full');
      editForm.appendChild(input);
    }
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Save Changes';
  submitBtn.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
  editForm.appendChild(submitBtn);

  editForm.addEventListener('submit', handleEditFormSubmit);

  return editForm;
}

async function handleEditFormSubmit(e) {
  e.preventDefault();
  const tableName = e.target.dataset.table;
  const id = e.target.dataset.id;
  const formData = new FormData(e.target);
  const updatedData = {};
  formData.forEach((value, key) => {
    updatedData[key] = value;
  });

  try {
    const response = await axios.put(`/api/table/${tableName}/${id}`, updatedData, {
      headers: { email: 'as783@snu.edu.in' } // Include the email in the request headers
    });
    console.log('Record updated:', response.data);
    fetchAndDisplayTableData(tableName);
  } catch (error) {
    console.error('Error updating record:', error);
  }
}

// Add a reference to the "List Events" button
const listEventsBtn = document.getElementById('list-events-btn');

// Add an event listener to the "List Events" button
listEventsBtn.addEventListener('click', async () => {
  try {
    const response = await axios.get('/api/events');
    const events = response.data;
    renderEventList(events);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});

// Function to render the event list
function renderEventList(events) {
  const eventListContainer = document.getElementById('event-list-container');
  eventListContainer.innerHTML = ''; // Clear the container

  if (events.length === 0) {
    eventListContainer.innerHTML = '<p>No events available.</p>';
    return;
  }

  const table = document.createElement('table');
  table.classList.add('table-auto', 'w-full', 'border-collapse');

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.classList.add('bg-gray-200');

  Object.keys(events[0]).forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    th.classList.add('border', 'px-4', 'py-2');
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table rows
  const tbody = document.createElement('tbody');
  events.forEach((event) => {
    const tr = document.createElement('tr');
    tr.classList.add(events.indexOf(event) % 2 === 0 ? 'bg-white' : 'bg-gray-100');

    Object.values(event).forEach((value) => {
      const td = document.createElement('td');
      td.textContent = value;
      td.classList.add('border', 'px-4', 'py-2');
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  eventListContainer.appendChild(table);
}

async function handleDeleteClick(e) {
  const id = e.target.dataset.id;
  const tableName = e.target.dataset.table;

  if (confirm('Are you sure you want to delete this record?')) {
    try {
      const response = await axios.delete(`/api/table/${tableName}/${id}`, {
        headers: { email: 'as783@snu.edu.in' } // Include the email in the request headers
      });
      console.log('Record deleted:', response.data);
      fetchAndDisplayTableData(tableName);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  }
}

async function handleCreateFormSubmit(e) {
  e.preventDefault();
  const tableName = e.target.dataset.table;
  const formData = new FormData(e.target);
  const newData = {};
  formData.forEach((value, key) => {
    newData[key] = value;
  });

  try {
    const response = await axios.post(`/api/table/${tableName}`, newData, {
      headers: { email: 'as783@snu.edu.in' } // Include the email in the request headers
    });
    console.log('Record created:', response.data);
    fetchAndDisplayTableData(tableName);
    e.target.reset(); // Reset the form
  } catch (error) {
    console.error('Error creating record:', error);
  }
}

// Fetch and display table data
async function fetchAndDisplayTableData(tableName) {
  try {
    const response = await axios.get(`/api/table/${tableName}`);
    const tableData = response.data;
    renderTableData(tableData);
    renderCreateForm(tableName);
  } catch (error) {
    console.error('Error fetching table data:', error);
  }
}

// Render the create form
function renderCreateForm(tableName) {
  createFormContainer.innerHTML = '';

  const createForm = document.createElement('form');
  createForm.classList.add('create-form');
  createForm.dataset.table = tableName;

  const formTitle = document.createElement('h3');
  formTitle.textContent = `Create New Record for ${tableName}`;
  createForm.appendChild(formTitle);

  axios.get(`/api/table/${tableName}`)
    .then(response => {
      const tableData = response.data;
      const columnNames = Object.keys(tableData[0]);
      columnNames.forEach(columnName => {
        if (columnName !== 'id') {
          const label = document.createElement('label');
          label.textContent = columnName;
          createForm.appendChild(label);

          const input = document.createElement('input');
          input.type = 'text';
          input.name = columnName;
          input.classList.add('border', 'border-gray-300', 'rounded-md', 'px-3', 'py-2', 'w-full');
          createForm.appendChild(input);
        }
      });

      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.textContent = 'Create Record';
      submitBtn.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
      createForm.appendChild(submitBtn);

      createForm.addEventListener('submit', handleCreateFormSubmit);

      createFormContainer.appendChild(createForm);
    })
    .catch(error => {
      console.error('Error fetching table data:', error);
    });
}

const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.querySelector('body');

darkModeToggle.addEventListener('change', function() {
  body.classList.toggle('dark-mode');
});

function applyDarkMode() {
  body.classList.add('dark-mode');
  // Add additional styles for dark mode here
}

function removeDarkMode() {
  body.classList.remove('dark-mode');
  // Remove additional styles for dark mode here
}

function updateClock() {
  const clockContainer = document.getElementById('clock-container');
  const currentDate = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedTime = currentDate.toLocaleDateString('en-US', options);
  clockContainer.textContent = formattedTime;
}

setInterval(updateClock, 1000);

// Call the updateClock function initially
updateClock();

const awesomifyToggle = document.getElementById('awesomify-toggle');

let intervalId;

awesomifyToggle.addEventListener('change', function() {
  const tableRows = document.querySelectorAll('table tbody tr');
  if (awesomifyToggle.checked) {
    intervalId = setInterval(() => {
      tableRows.forEach(row => {
        applyDynamicGradient(row);
      });
    }, 1000); // Change gradient every 1 second
  } else {
    clearInterval(intervalId);
    tableRows.forEach(row => {
      removeAwesomeEffect(row);
    });
  }
});

function applyDynamicGradient(element) {
  const startColor = generateRandomColor();
  const endColor = generateRandomColor();
  element.style.background = `linear-gradient(to right, ${startColor}, ${endColor})`;
  element.style.opacity = '0.8'; // Reduce transparency
  // Add additional effects as desired
}

function removeAwesomeEffect(element) {
  element.style.background = '';
  element.style.opacity = '1'; // Reset transparency
  // Remove additional effects as desired
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const openSqlTerminalButton = document.getElementById('open-sql-terminal');

openSqlTerminalButton.addEventListener('click', () => {
  sqlTerminalContainer.classList.remove('hidden');
});

closeSqlTerminalButton.addEventListener('click', () => {
  sqlTerminalContainer.classList.add('hidden');
});

async function executeSQL(query) {
  try {
    const response = await axios.post('/api/sql', { query }, {
      headers: { email: 'as783@snu.edu.in' } // Include the email in the request headers
    });
    const results = response.data;
    sqlTerminalElement.innerHTML = '';
    results.forEach(result => {
      const resultElement = document.createElement('pre');
      resultElement.textContent = JSON.stringify(result, null, 2);
      sqlTerminalElement.appendChild(resultElement);
    });
  } catch (error) {
    const errorElement = document.createElement('pre');
    errorElement.textContent = `Error: ${error.message}`;
    sqlTerminalElement.innerHTML = '';
    sqlTerminalElement.appendChild(errorElement);
  }
}
const sqlTerminalContainer = document.getElementById('sql-terminal-container');
const sqlTerminalElement = document.getElementById('sql-terminal');
const closeSqlTerminalButton = document.getElementById('close-sql-terminal');

// Add styling for the SQL terminal
sqlTerminalElement.classList.add('h-64', 'overflow-auto', 'bg-gray-900', 'text-white', 'p-2', 'rounded-md', 'shadow-md');

// Handle create form submission
async function handleCreateFormSubmit(e) {
  e.preventDefault();
  const tableName = e.target.dataset.table;
  const formData = new FormData(e.target);
  const newData = {};
  formData.forEach((value, key) => {
    newData[key] = value;
  });

  try {
    const response = await axios.post(`/api/table/${tableName}`, newData);
    console.log('Record created:', response.data);
    fetchAndDisplayTableData(tableName);
    e.target.reset(); // Reset the form
  } catch (error) {
    console.error('Error creating record:', error);
  }
}

// Event listener for table select change
tableSelect.addEventListener('change', (e) => {
  const selectedTable = e.target.value;
  fetchAndDisplayTableData(selectedTable);
});

// Function to fetch and display all tables
async function fetchAndDisplayAllTables() {
  try {
    const response = await axios.get('/api/allTables');
    const tableNames = response.data;
    console.log('Fetched table names:', tableNames); // Debugging
    renderTableNames(tableNames);
  } catch (error) {
    console.error('Error fetching table names:', error);
  }
}

// Render table names
function renderTableNames(tableNames) {
  // Clear the existing table list
  tableList.innerHTML = '';

  // Create the output table
  const table = document.createElement('table');
  table.classList.add('table-auto', 'w-full', 'border-collapse');

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Table Name';
  headerCell.classList.add('border', 'px-4', 'py-2', 'bg-gray-200');
  headerRow.appendChild(headerCell);
  const headerCellActions = document.createElement('th');
  headerCellActions.textContent = 'Actions';
  headerCellActions.classList.add('border', 'px-4', 'py-2', 'bg-gray-200');
  headerRow.appendChild(headerCellActions);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');
  tableNames.forEach(tableName => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = tableName;
    cell.classList.add('border', 'px-4', 'py-2');
    row.appendChild(cell);

    // Create display button
    const displayButtonCell = document.createElement('td');
    const displayButton = document.createElement('button');
    displayButton.textContent = 'Display';
    displayButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'ml-2');
    displayButton.addEventListener('click', () => fetchAndDisplayTableData(tableName));
    displayButtonCell.appendChild(displayButton);
    row.appendChild(displayButtonCell);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // Append the table to the table list container
  tableList.appendChild(table);

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mt-4');
  closeButton.addEventListener('click', closeDatabaseView);
  tableList.appendChild(closeButton);
}

// Function to close the database view
function closeDatabaseView() {
  tableList.innerHTML = ''; // Clear the table list container
}

// Event listener for the display database button
displayDatabaseBtn.addEventListener('click', fetchAndDisplayAllTables);

// Function to render user information in the UI
function renderUserInfo(email, isAdmin) {
  const userInfoContainer = document.createElement('div');
  userInfoContainer.classList.add('flex', 'items-center');

  // Profile Picture Initials
  const profilePicture = document.createElement('div');
  profilePicture.textContent = email.charAt(0).toUpperCase();
  profilePicture.classList.add('bg-blue-500', 'text-white', 'rounded-full', 'w-8', 'h-8', 'flex', 'items-center', 'justify-center', 'mr-2');

  // Email and Access Level
  const userInfo = document.createElement('div');
  userInfo.id = 'user-info'; // Add this line
  userInfo.dataset.isAdmin = isAdmin; // Add this line
  userInfo.textContent = `${email} (${isAdmin ? 'Admin' : 'User'})`;

  const animatedBorderContainer = document.createElement('div');
  animatedBorderContainer.classList.add('animated-border');
  animatedBorderContainer.appendChild(profilePicture);
  animatedBorderContainer.appendChild(userInfo);

  userInfoContainer.appendChild(animatedBorderContainer);

  const headerContainer = document.getElementById('header-container');
  headerContainer.appendChild(userInfoContainer);
}

