document.querySelector('.login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('txtEmail').value;
    const contraseña = document.getElementById('txtContraseña').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, contraseña })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso!');

            // Guardar token y email en localStorage o sessionStorage, no la contraseña
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);

            // Redirigir a la página principal
            window.location.href = '../paginas/home.html';
        } else {
            alert(data.mensaje || 'Email o contraseña incorrectos.');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        alert('Hubo un error al iniciar sesión.');
    }
});