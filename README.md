# HTML-STAUFER

Sistema de historial de mantenimiento de máquinas

## Backend

- Node.js + Express + MongoDB
- Modelos: Maquina y Mantenimiento
- Rutas: 
  - `/api/maquinas`
  - `/api/maquinas/:id/mantenimientos`

## Frontend

- HTML, CSS, JS
- Debe consumir el backend (ajusta la URL si lo despliegas en la nube)

## Cómo usar

1. Clona el repo y entra a `/backend`
2. Llena `.env` con tu cadena de MongoDB Atlas
3. Ejecuta:
   ```bash
   npm install
   npm start
   ```
4. Abre `/frontend/index.html` con un servidor local (Live Server o similar)

---

**¡No subas tu archivo `.env` a GitHub!**
