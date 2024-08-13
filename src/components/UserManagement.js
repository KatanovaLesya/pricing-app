console.log("UserManagement.js підключений і працює.");

document.getElementById('add-user-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        addEmployeeToTable(username, password);
        document.getElementById('add-user-form').reset(); // Очищає форму після додавання
    }
});

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
