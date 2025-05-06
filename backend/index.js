// backend/index.js
const express = require('express');
const cors = require('cors');
const productosRoutes = require('./productos');  // Requiere productos.js directamente
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Para leer JSON en POST

// Usa las rutas de productos
app.use('/productos', productosRoutes);

// Ruta para recibir orden de compra
app.post('/orden', (req, res) => {
    const orden = req.body;
    const filePath = path.join(__dirname, 'ordenes.json');

    // Leer órdenes anteriores
    let ordenes = [];
    if (fs.existsSync(filePath)) {
        ordenes = JSON.parse(fs.readFileSync(filePath));
    }

    ordenes.push(orden);
    fs.writeFileSync(filePath, JSON.stringify(ordenes, null, 2));

    res.status(201).json({ mensaje: 'Orden recibida con éxito.' });
});

// Hacer pública la carpeta 'datos'
app.use('/datos', express.static(path.join(__dirname, 'datos')));

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

