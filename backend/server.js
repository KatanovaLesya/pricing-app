const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Підключення маршрутів користувачів

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes); // Використання маршрутів користувачів

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
