import mongoose from "mongoose";

const MaquinaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  qr: String
});

export default mongoose.model("Maquina", MaquinaSchema);
