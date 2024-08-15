console.log("UserManagement.js підключений і працює.");

document.getElementById('add-user-form').addEventListener('submit', async function (event) {
    console.log('Форма відправляється'); // Додаємо логування
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        console.log('Відправка даних:', username, password); // Додатково можна додати для відлагодження
        const success = await addUserToGoogleSheet(username, password);

        if (success) {
            addEmployeeToTable(username, password);
            document.getElementById('add-user-form').reset(); // Очищає форму після додавання
        }

    }
});

async function addUserToGoogleSheet(username, password) {
    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            console.log('Успішно додано в Google Таблицю');
            return true;
        } else {
            console.error('Помилка додавання в Google Таблицю:', await response.text());
            return false;
        }
    } catch (error) {
        console.error('Помилка відправки форми:', error);
        return false;
    }
}


function addEmployeeToTable(username, password) {
    const tableBody = document.querySelector('#user-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${username}</td>
        <td>${password}</td>
        <td>
            <button class="edit-button">Редагувати</button>
            <button class="delete-button">Видалити</button>
        </td>
    `;

    tableBody.appendChild(row);

    //Отримання даних від сервера під час завантаження сторінки і додавання їх у таблицю

    document.addEventListener('DOMContentLoaded', async () => {
        console.log('Завантаження даних користувачів...'); // Логування початку
        const users = await fetchUsers();
        console.log('Отримані користувачі з сервера:', users); // Логування отриманих даних
        users.forEach(user => {
            addEmployeeToTable(user[0], user[1]);
        });
    });

async function fetchUsers() {
    try {
        const response = await fetch('/users');
        const data = await response.json();
        console.log('Отримані дані з сервера:', data); // Додаємо логування
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}


    // Додавання функціоналу для кнопок
    row.querySelector('.delete-button').addEventListener('click', function () {
        row.remove();
    });

    row.querySelector('.edit-button').addEventListener('click', function () {
        editEmployee(row, username, password);
    });
}

function editEmployee(row, oldUsername, oldPassword) {
    const newUsername = prompt("Введіть нове ім'я користувача:", oldUsername);
    const newPassword = prompt("Введіть новий пароль:", oldPassword);

    if (newUsername !== null && newPassword !== null) {
        row.children[0].textContent = newUsername;
        row.children[1].textContent = newPassword;
    }
}
