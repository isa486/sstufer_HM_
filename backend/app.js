import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import maquinasRouter from "./routes/maquinas.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/maquinas", maquinasRouter);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error al conectar con MongoDB:", err);
  });
