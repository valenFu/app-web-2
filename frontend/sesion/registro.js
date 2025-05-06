document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores ingresados
    const nombre = document.getElementById('txtNombre').value;
    const apellido = document.getElementById('txtApellido').value;
    const email = document.getElementById('txtEmail').value;
    const contraseña = document.getElementById('txtContraseña').value;
    const fechaNacimiento = document.getElementById('txtFechaNacimiento').value;

    // Crear un objeto usuario
    const usuario = { nombre, apellido, email, contraseña, fechaNacimiento };

    // Guardar el objeto completo en localStorage
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));

    alert('Usuario registrado exitosamente!');

    // Redirigir a la página de login
    window.location.href = 'frontend/sesion/login.html';
});