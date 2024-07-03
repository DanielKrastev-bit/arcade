const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example database (JSON file)
const databaseFile = path.join(__dirname, 'database.json');

// Routes

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Example: Check credentials (usually against a database)
    // Here we assume a simple check against a JSON file
    const users = getUsersFromDatabase();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Successful login
        res.json({ success: true, username: user.username });
    } else {
        // Failed login
        res.json({ success: false, message: 'Invalid username or password.' });
    }
});

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Example: Check if username already exists
    const users = getUsersFromDatabase();
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        res.json({ success: false, message: 'Username already exists. Please choose a different username.' });
    } else {
        // Add new user to database (JSON file)
        const newUser = { username, password, balance: 0, transactions: [] };
        users.push(newUser);
        saveUsersToDatabase(users);

        res.json({ success: true, message: 'User registered successfully.' });
    }
});

// Get user data endpoint
app.get('/userdata/:username', (req, res) => {
    const { username } = req.params;

    // Example: Fetch user data
    const users = getUsersFromDatabase();
    const user = users.find(user => user.username === username);

    if (user) {
        res.json({ success: true, user: { balance: user.balance, transactions: user.transactions } });
    } else {
        res.json({ success: false, message: 'User not found.' });
    }
});

// Add transaction endpoint
app.post('/addtransaction/:username', (req, res) => {
    const { username } = req.params;
    const { amount } = req.body;

    // Example: Add transaction to user's data
    const users = getUsersFromDatabase();
    const user = users.find(user => user.username === username);

    if (user) {
        // Convert amount to number and add to transactions
        const transactionAmount = parseFloat(amount);
        user.transactions.push(transactionAmount);
        user.balance += transactionAmount;

        // Save updated data to database
        saveUsersToDatabase(users);

        res.json({ success: true, message: 'Transaction added successfully.' });
    } else {
        res.json({ success: false, message: 'User not found.' });
    }
});

// Helper functions

// Load users from JSON file
function getUsersFromDatabase() {
    try {
        const data = fs.readFileSync(databaseFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database file:', error);
        return [];
    }
}

// Save users to JSON file
function saveUsersToDatabase(users) {
    try {
        fs.writeFileSync(databaseFile, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing to database file:', error);
    }
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
