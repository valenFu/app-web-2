document.getElementById('registroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtiene los valores del formulario
    const nombre = document.getElementById('txtNombre').value;
    const apellido = document.getElementById('txtApellido').value;
    const email = document.getElementById('txtEmail').value;
    const contraseña = document.getElementById('txtContraseña').value;
    const fechaNacimiento = document.getElementById('txtFechaNacimiento').value;

    // Arma objeto para enviar al backend
    const usuario = { nombre, apellido, email, contraseña, fechaNacimiento };

    try {
        const respuesta = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert('Usuario registrado exitosamente!');
            window.location.href = 'frontend/sesion/login.html'; // Redirige al login
        } else {
            alert(resultado.mensaje || 'Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('Hubo un error en el registro');
    }
});
