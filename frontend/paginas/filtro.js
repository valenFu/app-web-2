async function mostrarProductosPorCategoria(categoria) {
  const container = document.querySelector('.contenedorItem');
  container.innerHTML = '';

  try {
    // Cambiá esta URL para llamar a tu backend
    const res = await fetch(`http://localhost:3000/productos/categoria/${categoria}`);
    if (!res.ok) throw new Error('No se pudo obtener los productos');
    const products = await res.json();

    products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'item';

      const image = document.createElement('img');
      image.src = `http://localhost:3000/uploads/${product.imagen}`;
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
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('.contenedorItem');
  const categoria = contenedor.getAttribute('data-categoria');
  if (categoria) {
    mostrarProductosPorCategoria(categoria.toLowerCase());
  } else {
    console.error('No se encontró una categoría en el atributo data-categoria');
  }
});
