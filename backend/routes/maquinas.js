import express from "express";
import Maquina from "../models/maquina.js";
import Mantenimiento from "../models/mantenimiento.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const maquinas = await Maquina.find();
  res.json(maquinas);
});

router.post("/", async (req, res) => {
  try {
    const { id, nombre, qr } = req.body;
    const nueva = new Maquina({ id, nombre, qr });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ error: "Error al crear la máquina", details: err });
  }
});

router.get("/:id/mantenimientos", async (req, res) => {
  const { id } = req.params;
  const mantenimientos = await Mantenimiento.find({ idMaquina: id }).sort({ fecha: 1 });
  res.json(mantenimientos);
});

router.post("/:id/mantenimientos", async (req, res) => {
  try {
    const mantenimiento = new Mantenimiento({ ...req.body, idMaquina: req.params.id });
    await mantenimiento.save();
    res.status(201).json(mantenimiento);
  } catch (err) {
    res.status(400).json({ error: "Error al guardar el mantenimiento", details: err });
  }
});

export default router;
