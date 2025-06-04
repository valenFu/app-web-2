import express from 'express';
import Usuario from '../../db/schemas/usuario.schemas.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || '9A877196C2AD465A241AC8D849549';

// Ruta para registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    // Verificar si ya existe usuario con ese email
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const usuario = new Usuario({ nombre, email, contraseña });
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
});

// Ruta para login
router.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    // Comparar contraseña con la guardada
    const esValido = await usuario.compararContraseña(contraseña);
    if (!esValido) {
      return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en login', error });
  }
});

export default router;
