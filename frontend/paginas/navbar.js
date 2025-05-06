//estructura de datos
const pages = [
    { title: "Inicio", url: "home.html" },
    { title: "Ropa", url: "Ropa.html" },
    { title: "Calzado", url: "Calzado.html" },
    { title: "Artículos de Hogar", url: "Hogar.html" },
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

