document.getElementById('productoForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const categoria = document.getElementById('categoria').value;
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  const stock = parseInt(document.getElementById('stock').value, 10);
  const imagen = document.getElementById('imagen').files[0];
  const mensajeElem = document.getElementById('mensaje');

  if (!categoria || !nombre || !descripcion || isNaN(precio) || isNaN(stock) || !imagen) {
    mensajeElem.textContent = 'Por favor completá todos los campos correctamente.';
    mensajeElem.style.color = 'red';
    return;
  }

  const formData = new FormData();
  formData.append('categoria', categoria);
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('precio', precio);
  formData.append('stock', stock);
  formData.append('imagen', imagen);

  try {
    const res = await fetch('http://localhost:3000/productos/create', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    const data = await res.json();

    mensajeElem.textContent = data.mensaje || 'Producto guardado correctamente.';
    mensajeElem.style.color = 'green';
    document.getElementById('productoForm').reset();
  } catch (err) {
    console.error('Error:', err);
    mensajeElem.textContent = 'Error al guardar el producto: ' + err.message;
    mensajeElem.style.color = 'red';
  }
});
