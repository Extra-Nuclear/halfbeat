// Predefined admin credentials (username and password pairs)
const adminCredentials = [
    { username: 'VersionControler', password: 'adminpass109' },
    { username: 'admin2', password: 'securepass456' },
    { username: 'admin3', password: 'adminpass789' }
];

// Validate login
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Check if entered username and password match any admin credentials
    const isAdmin = adminCredentials.some(
        admin => admin.username === username && admin.password === password
    );

    if (isAdmin) {
        // Redirect to admin dashboard
        window.location.href = "Admin/version-dashboard.html"; // Set the correct path here
        return true;
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password';
        return false;
    }
}
