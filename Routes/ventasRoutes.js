import { Router } from 'express';
import fs from 'fs';

const router = Router();

// Rutas a los archivos
const ventasFilePath = './data/ventas.json';
const productosFilePath = './data/productos.json';
const usuariosFilePath = './data/usuarios.json';

// Funciones auxiliares
function leerVentas() {
    const data = fs.readFileSync(ventasFilePath, 'utf-8');
    return JSON.parse(data);
}

function guardarVentas(ventas) {
    fs.writeFileSync(ventasFilePath, JSON.stringify(ventas, null, 2));
}

// 1️⃣ GET: Obtener todas las ventas
router.get('/', (req, res) => {
    const ventas = leerVentas();
    res.json(ventas);
});

// 2️⃣ GET: Obtener una venta por ID
router.get('/:id', (req, res) => {
    const ventas = leerVentas();
    const venta = ventas.find(v => v.id === parseInt(req.params.id));

    if (venta) {
        res.json(venta);
    } else {
        res.status(404).json({ error: 'Venta no encontrada' });
    }
});

// 3️⃣ POST: Crear una nueva venta
router.post('/', (req, res) => {
    const ventas = leerVentas();
    const nuevaVenta = req.body;

    // Validar que el usuario exista
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
    const usuario = usuarios.find(u => u.id === nuevaVenta.id_usuario);
    if (!usuario) {
        return res.status(400).json({ error: 'Usuario no válido' });
    }

    // Validar que los productos existan
    const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
    for (const p of nuevaVenta.productos) {
        const productoExiste = productos.find(prod => prod.id === p.id_producto);
        if (!productoExiste) {
            return res.status(400).json({ error: `Producto con id ${p.id_producto} no existe` });
        }
    }

    nuevaVenta.id = ventas.length ? ventas[ventas.length - 1].id + 1 : 1; // autoincrementar ID
    ventas.push(nuevaVenta);
    guardarVentas(ventas);

    res.status(201).json({ mensaje: 'Venta creada', venta: nuevaVenta });
});

// 4️⃣ POST: Buscar ventas de un usuario por ID
router.post('/buscar', (req, res) => {
    const { id_usuario } = req.body;
    const ventas = leerVentas();
    const ventasUsuario = ventas.filter(v => v.id_usuario === id_usuario);

    res.json(ventasUsuario);
});

// 5️⃣ PUT: Actualizar datos de una venta (por ejemplo: marcar como pagado)
router.put('/:id', (req, res) => {
    const ventas = leerVentas();
    const id = parseInt(req.params.id);
    const index = ventas.findIndex(v => v.id === id);

    if (index !== -1) {
        ventas[index] = { ...ventas[index], ...req.body };
        guardarVentas(ventas);
        res.json({ mensaje: 'Venta actualizada', venta: ventas[index] });
    } else {
        res.status(404).json({ error: 'Venta no encontrada' });
    }
});

// 6️⃣ DELETE: Eliminar una venta
router.delete('/:id', (req, res) => {
    const ventas = leerVentas();
    const id = parseInt(req.params.id);
    const nuevasVentas = ventas.filter(v => v.id !== id);

    if (nuevasVentas.length === ventas.length) {
        return res.status(404).json({ error: 'Venta no encontrada' });
    }

    guardarVentas(nuevasVentas);
    res.json({ mensaje: 'Venta eliminada' });
});

export default router;
