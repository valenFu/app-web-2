//estructura de datos
const pages = [
    { title: "Inicio", url: "../paginas/home.html" },
    { title: "Ropa", url: "../paginas/Ropa.html" },
    { title: "Calzado", url: "../paginas/Calzado.html" },
    { title: "Artículos de Hogar", url: "../paginas/Hogar.html" },
]
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navegacion ul');

    // Itera sobre el array para generar los enlaces en la navbar
    pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = page.url; // Establece el href con la URL
        a.textContent = page.title; // Establece el texto con el título

        // Crear el ícono
        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined'; // Clase para los íconos
        icon.textContent = page.icon; // Establece el nombre del ícono

        li.appendChild(icon); // Agrega el ícono dentro del li
        li.appendChild(a); // Agrega el enlace dentro del li
        navbar.appendChild(li); // Agrega el li dentro del ul de la navbar
    });

    // Crear botón del carrito
    const cartButton = document.createElement('button');
    cartButton.className = 'carrito';
    cartButton.onclick = () => redirectToCart(); // Agrega función onclick

    const cartIcon = document.createElement('span');
    cartIcon.className = 'material-symbols-outlined';
    cartIcon.textContent = 'shopping_cart'; // Nombre del ícono del carrito

    cartButton.appendChild(cartIcon); // Agregar ícono del carrito al botón
    navbar.appendChild(cartButton); // Agregar el botón del carrito al navbar
});

// Función para redirigir al carrito
function redirectToCart() {
    window.location.href = 'carrito.html'; // Cambia a la URL de tu carrito
}
document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores ingresados
    const nombre = document.getElementById('txtNombre').value;
    const apellido = document.getElementById('txtApellido').value;
    const email = document.getElementById('txtEmail').value;
    const contraseña = document.getElementById('txtContraseña').value;

    // Obtener los datos almacenados en localStorage
    const storedNombre = localStorage.getItem('nombre');
    const storedApellido = localStorage.getItem('apellido');
    const storedEmail = localStorage.getItem('email');
    const storedContraseña = localStorage.getItem('contraseña');

    // Verificar las credenciales
    if (nombre === storedNombre && apellido === storedApellido && email === storedEmail && contraseña === storedContraseña) {
        alert('Inicio de sesión exitoso!');
        // aca se puede redirigir al usuario a otra página
        window.location.href = 'index.html'; // Cambia a la página del panel de usuario
    } else {
        alert('Nombre, apellido, email o contraseña incorrectos.');
    }
});

// Código para cerrar sesión
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Eliminar los datos del localStorage
        localStorage.removeItem('nombre');
        localStorage.removeItem('apellido');
        localStorage.removeItem('email');
        localStorage.removeItem('contraseña');
        localStorage.removeItem('fechaNacimiento');

        // Mostrar mensaje de confirmación
        alert('Sesión cerrada correctamente.');

        // Redirigir a la página de login
        window.location.href = '../paginas/login.html';
    });
});
