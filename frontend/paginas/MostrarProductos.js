document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.querySelector('.contenedorItem');
    const categoria = contenedor.dataset.categoria;

    try {
        const response = await fetch(`http://localhost:3000/productos/categoria/${categoria}`);
        if (!response.ok) throw new Error('No se pudo obtener los productos');

        const productos = await response.json();
        contenedor.innerHTML = ''; // limpiar contenido anterior

        productos.forEach(producto => {
            const item = document.createElement('div');
            item.className = 'item';
            item.dataset.nombre = producto.nombre;
            item.dataset.precio = producto.precio;

            const imagen = document.createElement('img');
            imagen.src = `http://localhost:3000/uploads/${producto.imagen}`;
            imagen.alt = producto.nombre;

            const titulo = document.createElement('h3');
            titulo.textContent = producto.nombre;

            const descripcion = document.createElement('p');
            descripcion.textContent = producto.descripcion;

            const precio = document.createElement('p');
            precio.textContent = `$${producto.precio.toFixed(2)}`;

            const boton = document.createElement('button');
            boton.textContent = 'Añadir al carrito';
            boton.onclick = () => {
                agregarAlCarrito(producto);
                mostrarCarrito();
            };

            item.appendChild(imagen);
            item.appendChild(titulo);
            item.appendChild(descripcion);
            item.appendChild(precio);
            item.appendChild(boton);

            contenedor.appendChild(item);
        });

    } catch (error) {
        console.error('Error al cargar los productos desde MongoDB:', error);
    }
});
