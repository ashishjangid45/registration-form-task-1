const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form data

// Dummy data array to store registered users
let users = [];

// Route to serve the registration form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Serve the HTML file with the form
});

// Route to handle form submission
app.post('/register', (req, res) => {
    const formData = req.body;

    // Validation logic for mobile number: exactly 10 digits
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number. It must be 10 digits.' });
    }

    // Validation logic for password: no special characters allowed
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(formData.password)) {
        return res.status(400).json({ message: 'Password must not contain special characters.' });
    }

    // Validation logic for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Add the valid user data to the users array
    users.push(formData);

    // Send success response
    res.send({ message: "User registered successfully!" });
});

// Route to fetch all registered users
app.get('/fetch-users', (req, res) => {
    res.json(users);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
