const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta para obtener los productos desde el archivo JSON
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'datos', 'productos.json');
    
    // Verificar si el archivo existe
    if (fs.existsSync(filePath)) {
        // Leer el archivo JSON
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error al leer el archivo' });
            }

            // Convertir el contenido del archivo JSON en un objeto
            const productos = JSON.parse(data);
            
            // Responder con los productos
            res.json(productos);
        });
    } else {
        return res.status(404).json({ mensaje: 'Archivo de productos no encontrado' });
    }
});

module.exports = router;

