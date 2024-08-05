const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { readUsersFromFile, writeUsersToFile } = require('../fileStorage');

// Отримати всіх користувачів
router.get('/', (req, res) => {
    try {
        const users = readUsersFromFile();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Додати нового користувача
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now().toString(),
        username,
        password: hashedPassword,
    };

    try {
        const users = readUsersFromFile();
        users.push(newUser);
        writeUsersToFile(users);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Деактивувати користувача (видалити)
router.delete('/:id', (req, res) => {
    try {
        let users = readUsersFromFile();
        users = users.filter(user => user.id !== req.params.id);
        writeUsersToFile(users);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
