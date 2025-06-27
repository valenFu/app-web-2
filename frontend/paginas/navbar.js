const pages = [
    { title: "Inicio", url: "home.html" },
    { title: "Ropa", url: "Ropa.html" },
    { title: "Calzado", url: "Calzado.html" },
    { title: "Artículos de Hogar", url: "Hogar.html" },
];

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navegacion ul');

    // Generar links normales
    pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = page.url;
        a.textContent = page.title;

        li.appendChild(a);
        navbar.appendChild(li);
    });

    // Crear el botón de carrito con redirección directa
    const liCart = document.createElement('li');
    const cartButton = document.createElement('a');
    cartButton.className = 'carrito';
    cartButton.href = 'carrito.html'; // ✅ Enlace directo a carrito

    const cartIcon = document.createElement('span');
    cartIcon.className = 'material-symbols-outlined';
    cartIcon.textContent = 'shopping_cart';

    cartButton.appendChild(cartIcon);
    liCart.appendChild(cartButton);
    navbar.appendChild(liCart);

    // Crear link de Administración en <li><a> con prompt
    const liAdmin = document.createElement('li');
    const adminLink = document.createElement('a');
    adminLink.href = '#';
    adminLink.textContent = 'Administración';

    adminLink.onclick = (e) => {
        e.preventDefault();
        const password = prompt('Ingrese la contraseña de administrador:');
        if (password === '1234') { 
            window.location.href = 'admin.html'; 
        } else if (password !== null) {
            alert('Contraseña incorrecta.');
        }
    };

    liAdmin.appendChild(adminLink);
    navbar.appendChild(liAdmin);
});



