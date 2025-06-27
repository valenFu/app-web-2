import express from 'express';
import bcrypt from 'bcrypt';
import Usuario from '../../db/schemas/usuario.schemas.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'clave-secreta-por-defecto';

// REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña } = req.body;

    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);
    const usuario = new Usuario({ nombre, apellido, email, contraseña: hash });
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    const esValido = await usuario.compararContraseña(contraseña);
    if (!esValido) {
      return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' });
    }

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