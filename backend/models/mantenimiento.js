import mongoose from "mongoose";

const MantenimientoSchema = new mongoose.Schema({
  idMaquina: { type: String, required: true },
  fecha: String,
  trabajo: String,
  ubicacion: String,
  comentarios: String,
  realizo: String,
  recibio: String
});

export default mongoose.model("Mantenimiento", MantenimientoSchema);
