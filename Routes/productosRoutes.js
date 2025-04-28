import { Router } from 'express';
import fs from 'fs';

const router = Router();

// Cargar productos desde el archivo JSON
const productosFilePath = './data/productos.json';

function leerProductos() {
    const data = fs.readFileSync(productosFilePath, 'utf-8');
    return JSON.parse(data);
}

function guardarProductos(productos) {
    fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
}

// 1️⃣ GET: Obtener todos los productos
router.get('/', (req, res) => {
    const productos = leerProductos();
    res.json(productos);
});

// 2️⃣ GET: Obtener un producto por ID
router.get('/:id', (req, res) => {
    const productos = leerProductos();
    const producto = productos.find(p => p.id === parseInt(req.params.id));

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// 3️⃣ POST: Agregar un nuevo producto
router.post('/', (req, res) => {
    const productos = leerProductos();
    const nuevoProducto = req.body;

    // Validar que tenga un ID único
    if (productos.find(p => p.id === nuevoProducto.id)) {
        return res.status(400).json({ error: 'ID de producto ya existe' });
    }

    productos.push(nuevoProducto);
    guardarProductos(productos);

    res.status(201).json({ mensaje: 'Producto creado', producto: nuevoProducto });
});

// 4️⃣ POST: Buscar productos por nombre (parámetro sensible)
router.post('/buscar', (req, res) => {
    const { nombre } = req.body;
    const productos = leerProductos();
    const resultados = productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));

    res.json(resultados);
});

// 5️⃣ PUT: Actualizar un producto por ID
router.put('/:id', (req, res) => {
    const productos = leerProductos();
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index !== -1) {
        productos[index] = { ...productos[index], ...req.body };
        guardarProductos(productos);
        res.json({ mensaje: 'Producto actualizado', producto: productos[index] });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// 6️⃣ DELETE: Eliminar un producto
router.delete('/:id', (req, res) => {
    let productos = leerProductos();
    const id = parseInt(req.params.id);
    const existe = productos.some(p => p.id === id);

    if (existe) {
        productos = productos.filter(p => p.id !== id);
        guardarProductos(productos);
        res.json({ mensaje: 'Producto eliminado' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

export default router;