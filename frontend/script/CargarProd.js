document.getElementById('productoForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const categoria = document.getElementById('categoria').value;
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  const imagen = document.getElementById('imagen').value.trim();
  const mensajeElem = document.getElementById('mensaje');

  // Validación simple
  if (!categoria) {
    mensajeElem.innerText = 'Por favor, selecciona una categoría.';
    mensajeElem.style.color = 'red';
    return;
  }

  if (!nombre || !descripcion || isNaN(precio) || precio < 0 || !imagen) {
    mensajeElem.innerText = 'Por favor, completa todos los campos correctamente.';
    mensajeElem.style.color = 'red';
    return;
  }

  const producto = { categoria, nombre, descripcion, precio, imagen };

  try {
    const res = await fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });

    const data = await res.json();

    if (res.ok) {
      mensajeElem.innerText = data.mensaje || 'Producto guardado correctamente.';
      mensajeElem.style.color = 'green';
      document.getElementById('productoForm').reset();
    } else {
      mensajeElem.innerText = data.mensaje || 'Error al guardar el producto.';
      mensajeElem.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    mensajeElem.innerText = 'Error de conexión al guardar el producto.';
    mensajeElem.style.color = 'red';
  }
});
