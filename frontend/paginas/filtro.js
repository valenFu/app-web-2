function mostrarProductosPorCategoria(categoria) {
    const container = document.querySelector('.contenedorItem');

    fetch('../datos/Productos.json') 
        .then(response => response.json())
        .then(data => {
            const products = data.productos;

            // Filtra los productos por categoría
            const filteredProducts = products.filter(product => product.categoria === categoria);

            // Limpia el contenedor antes de mostrar los productos filtrados
            container.innerHTML = '';

            // Genera las tarjetas para cada producto filtrado
            filteredProducts.forEach(product => {
                const item = document.createElement('div');
                item.className = 'item';

                const image = document.createElement('img');
                image.src = `../imagenes/${product.imagen}`;  
                image.alt = product.nombre;

                const title = document.createElement('h3');
                title.textContent = product.nombre;

                const description = document.createElement('p');
                description.textContent = product.descripcion;

                const price = document.createElement('p');
                price.textContent = `$${product.precio.toFixed(2)}`;

                const addButton = document.createElement('button');
                addButton.textContent = 'Añadir al carrito';
                addButton.onclick = () => console.log(`${product.nombre} añadido al carrito`);

                item.appendChild(image);
                item.appendChild(title);
                item.appendChild(description);
                item.appendChild(price);
                item.appendChild(addButton);

                container.appendChild(item);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Detecta la categoría al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.contenedorItem');
    const categoria = contenedor.getAttribute('data-categoria');

    if (categoria) {
        mostrarProductosPorCategoria(categoria);
    } else {
        console.error('No se encontró una categoría en el atributo data-categoria');
    }
});
