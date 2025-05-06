document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores ingresados
    const nombre = document.getElementById('txtNombre').value;
    const apellido = document.getElementById('txtApellido').value;
    const email = document.getElementById('txtEmail').value;
    const contraseña = document.getElementById('txtContraseña').value;

    // Obtener el usuario registrado desde localStorage
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

    // Verificar que el usuario existe y las credenciales coinciden
    if (usuarioRegistrado &&
        usuarioRegistrado.nombre === nombre &&
        usuarioRegistrado.apellido === apellido &&
        usuarioRegistrado.email === email &&
        usuarioRegistrado.contraseña === contraseña) {

        alert('Inicio de sesión exitoso!');
        
        // Guardar datos del usuario logueado en sessionStorage
        sessionStorage.setItem('usuarioLogueado', JSON.stringify({ nombre, apellido, email }));

        // Redirigir al usuario a la página principal o de inicio
        window.location.href = '../paginas/home.html';
    } else {
        alert('Nombre, apellido, email o contraseña incorrectos.');
    }
});