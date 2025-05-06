document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Eliminar los datos del usuario en sessionStorage
        sessionStorage.removeItem('usuarioLogueado');
        
        // Eliminar datos de localStorage
        localStorage.removeItem('nombre');
        localStorage.removeItem('apellido');
        localStorage.removeItem('email');
        localStorage.removeItem('contraseña');

        alert('Sesión cerrada correctamente.');

        // Redirigir a la página de login
        window.location.href = '../sesion/login.html';
    });
});