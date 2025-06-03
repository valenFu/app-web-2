import Venta from '../../db/schemas/ventas.schema';

router.post('/create', verificarToken, async (req, res) => {
  const { productos, total } = req.body;
  try {
    
    const venta = new Venta({ productos, total, usuarioId: req.usuario.id });
    await venta.save();

    res.status(201).json({ mensaje: 'Compra registrada', venta });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar compra', error });
  }
});

router.post('/comprar', verificarToken, async (req, res) => {
  const { productos, total } = req.body;

  if (!productos || !total) {
    return res.status(400).json({ mensaje: 'Faltan datos de la compra' });
  }

  try {
    const nuevaVenta = new Venta({
      productos,
      total,
      usuarioId: req.usuario.id
    });

    await nuevaVenta.save();

    res.status(201).json({ mensaje: 'Compra registrada con éxito', venta: nuevaVenta });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar la venta', error });
  }
});
