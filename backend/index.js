import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productosRoutes from './productos.js';
import { connectToDatabase } from '../db/conexion.js';
import authRoutes from './routes/auth.js';
import { verificarToken } from './middlewares/authMiddleware.js';

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);

// Conectar a MongoDB antes de iniciar el servidor
connectToDatabase()
  .then(() => {
    console.log('Conectado a MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  });
console.log("MONGODB_URI:", process.env.MONGODB_URI);
// Ruta para recibir orden y guardarla en MongoDB
app.post('/orden', verificarToken, async (req, res) => {
  try {
    const nuevaOrden = new Orden(req.body);
    await nuevaOrden.save();
    res.status(201).json({ mensaje: 'Orden guardada en MongoDB con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error guardando la orden.' });
  }
});