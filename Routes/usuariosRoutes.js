import { Router } from 'express';
import fs from 'fs';

const router = Router();

// Cargar usuarios desde el archivo JSON
const usuariosFilePath = './data/usuarios.json';

function leerUsuarios() {
    const data = fs.readFileSync(usuariosFilePath, 'utf-8');
    return JSON.parse(data);
}

function guardarUsuarios(usuarios) {
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
}

// 1️⃣ GET: Obtener todos los usuarios
router.get('/', (req, res) => {
    const usuarios = leerUsuarios();
    res.json(usuarios);
});

// 2️⃣ GET: Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

// 3️⃣ POST: Crear un nuevo usuario
router.post('/', (req, res) => {
    const usuarios = leerUsuarios();
    const nuevoUsuario = req.body;

    if (usuarios.find(u => u.id === nuevoUsuario.id)) {
        return res.status(400).json({ error: 'ID de usuario ya existe' });
    }

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
});

// 4️⃣ POST: Buscar usuario por email (dato sensible)
router.post('/buscar', (req, res) => {
    const { email } = req.body;
    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.email === email);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

// 5️⃣ PUT: Actualizar un usuario
router.put('/:id', (req, res) => {
    const usuarios = leerUsuarios();
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...req.body };
        guardarUsuarios(usuarios);
        res.json({ mensaje: 'Usuario actualizado', usuario: usuarios[index] });
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

// 6️⃣ DELETE: Eliminar un usuario SOLO si no tiene ventas
router.delete('/:id', (req, res) => {
    const usuarios = leerUsuarios();
    const id = parseInt(req.params.id);

    // Chequear si tiene ventas asociadas (lo vamos a mejorar en ventasRoutes)
    const ventas = JSON.parse(fs.readFileSync('./data/ventas.json', 'utf-8'));
    const tieneVentas = ventas.some(v => v.id_usuario === id);

    if (tieneVentas) {
        return res.status(400).json({ error: 'No se puede eliminar usuario con ventas registradas' });
    }

    const nuevosUsuarios = usuarios.filter(u => u.id !== id);

    if (nuevosUsuarios.length === usuarios.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    guardarUsuarios(nuevosUsuarios);
    res.json({ mensaje: 'Usuario eliminado' });
});

export default router;