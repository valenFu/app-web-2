function mostrarProductosPorCategoria(categoria) {
    const container = document.querySelector('.contenedorItem');

    // Cargar el archivo JSON
    fetch('../datos/Productos.json')
        .then(response => response.json())
        .then(data => {
            const products = data.productos;

            // Filtrar los productos por categoría
            const filteredProducts = products.filter(product => product.categoria === categoria);

            // Limpiar el contenedor antes de mostrar los productos filtrados
            container.innerHTML = '';

            // Iterar sobre los productos filtrados y generar las tarjetas
            filteredProducts.forEach(product => {
                const item = document.createElement('div');
                item.className = 'item'; // Clase para el contenedor de la tarjeta
                item.dataset.nombre = product.nombre;
                item.dataset.precio = product.precio;

                // Crear imagen
                const image = document.createElement('img');
                image.src = `../imagenes/${product.imagen}`; // Ruta de la imagen
                image.alt = product.nombre; // Texto alternativo para la imagen

                // Crear título
                const title = document.createElement('h3');
                title.textContent = product.nombre;

                // Crear descripción
                const description = document.createElement('p');
                description.textContent = product.descripcion;

                // Crear precio
                const price = document.createElement('p');
                price.textContent = `$${product.precio.toFixed(2)}`; // Formatear a dos decimales

                // Crear botón de añadir al carrito
                const addButton = document.createElement('button');
                addButton.textContent = 'Añadir al carrito';
                addButton.onclick = () => {
                    agregarAlCarrito(product);
                    mostrarCarrito(); // Actualizar el carrito
                };

                // Crear botón de eliminar
                const removeButton = document.createElement('button');
                removeButton.className = 'eliminar';
                removeButton.textContent = 'Eliminar del carrito';
                removeButton.onclick = () => {
                    eliminarDelCarrito(product.nombre);
                    mostrarCarrito(); // Actualizar el carrito
                };

                // Agregar todos los elementos a la tarjeta
                item.appendChild(image);
                item.appendChild(title);
                item.appendChild(description);
                item.appendChild(price);
                item.appendChild(addButton);
                item.appendChild(removeButton);

                // Agregar la tarjeta al contenedor
                container.appendChild(item);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const index = carrito.findIndex(p => p.nombre === producto.nombre);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert('Producto añadido al carrito exitosamente!');
    mostrarCarrito(); // Actualizar el carrito
}

function eliminarDelCarrito(nombreProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert('Producto eliminado del carrito exitosamente!');
    mostrarCarrito(); // Actualizar el carrito
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('listaCarrito');
    const carritoTotal = document.getElementById('carritoTotal');
    const botonComprar = document.getElementById('botonComprar');

    listaCarrito.innerHTML = ''; // Limpiar contenedor de productos
    let total = 0;

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'item';

        const image = document.createElement('img');
        image.src = `../imagenes/${producto.imagen}`;
        image.alt = producto.nombre;

        const title = document.createElement('h3');
        title.textContent = producto.nombre;

        const price = document.createElement('p');
        price.textContent = `$${producto.precio.toFixed(2)}`;

        const cantidad = document.createElement('p');
        cantidad.textContent = `Cantidad: ${producto.cantidad}`;

        total += producto.precio * producto.cantidad;

        const removeButton = document.createElement('button');
        removeButton.className = 'eliminar';
        removeButton.textContent = 'Eliminar del carrito';
        removeButton.onclick = () => {
            eliminarDelCarrito(producto.nombre);
            mostrarCarrito();
        };

        item.appendChild(image);
        item.appendChild(title);
        item.appendChild(price);
        item.appendChild(cantidad);
        item.appendChild(removeButton);

        listaCarrito.appendChild(item);
    });

    // Mostrar total y activar botón
    carritoTotal.textContent = `Total: $${total.toFixed(2)}`;
    botonComprar.onclick = () => realizarCompra(carrito, total);
}

// Llamar a mostrarCarrito cuando la página carga
document.addEventListener('DOMContentLoaded', mostrarCarrito);

function realizarCompra(carrito, total) {
    const usuario = {
        nombre: localStorage.getItem('nombre') || 'Invitado',
        email: localStorage.getItem('email') || 'sin-email@ejemplo.com',
        carrito: carrito,
        total: total
    };

    fetch('http://localhost:3000/orden', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        alert('Compra realizada con éxito.');
        localStorage.removeItem('carrito'); // Limpiar carrito
        window.location.href = 'gracias.html'; // Redirigir a página de confirmación
    })
    .catch(error => {
        console.error('Error al realizar la compra:', error);
        alert('Error al realizar la compra. Intenta más tarde.');
    });
}

