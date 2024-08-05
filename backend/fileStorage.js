const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'data', 'users.json');

const readUsersFromFile = () => {
    const fileData = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(fileData);
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

module.exports = {
    readUsersFromFile,
    writeUsersToFile,
};
