document.addEventListener('DOMContentLoaded', () => {
    const users = [
        { id: 1, email: "john.doe@example.com", password: "password123", username: "john.doe" },
        { id: 2, email: "jane.smith@example.com", password: "password123", username: "jane.smith" }
    ];

    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault(); 

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const errorMessage = document.getElementById('error-message');

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = "Invalid email or password. Please try again.";
            errorMessage.style.display = 'block';

            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
        }
    });
});
