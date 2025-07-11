const API_URL = 'http://localhost:4000/api/maquinas';

// ----------------------
// LISTAR MÁQUINAS
// ----------------------
function cargarMaquinasListado() {
  fetch(API_URL)
    .then(res => res.json())
    .then(maquinas => {
      const lista = document.getElementById('lista-maquinas');
      lista.innerHTML = '';
      if (maquinas.length === 0) {
        lista.innerHTML = '<p>No hay máquinas registradas.</p>';
        return;
      }
      maquinas.forEach(maquina => {
        // Obtener el último mantenimiento
        fetch(`${API_URL}/${maquina.id}/mantenimientos`)
          .then(res => res.json())
          .then(mantenimientos => {
            const ultimoMtto = mantenimientos.length > 0 ? mantenimientos[mantenimientos.length - 1] : null;
            lista.innerHTML += `
<a href="maquina-historial-detalle.html?id=${maquina.id}" class="formato-mantenimiento clickable-maquina" style="text-decoration:none;color:inherit;">
  <h3>${maquina.nombre}</h3>
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <div>
      <strong>ID:</strong> ${maquina.id}<br>
      <strong>Última ubicación:</strong> ${ultimoMtto ? (ultimoMtto.ubicacion || '') : ''}<br>
      <strong>Último trabajo:</strong> ${ultimoMtto ? (ultimoMtto.trabajo || '') : ''}<br>
      <strong>Última fecha:</strong> ${ultimoMtto ? (ultimoMtto.fecha || '') : ''}<br>
    </div>
    <div>
      ${maquina.qr ? `<img src="qr/${maquina.qr}" alt="QR" class="qr-img">` : ''}
    </div>
  </div>
  <div style="margin-top:0.8em;">
    <span class="acciones-historial button">Ver historial detallado</span>
  </div>
</a>
            `;
          });
      });
    })
    .catch(() => {
      const lista = document.getElementById('lista-maquinas');
      lista.innerHTML = '<p>Error al cargar los datos de máquinas.</p>';
    });
}

// ----------------------
// AGREGAR MÁQUINA
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lista-maquinas')) {
    cargarMaquinasListado();
  }

  const formMaquina = document.getElementById('form-maquina');
  if (formMaquina) {
    formMaquina.addEventListener('submit', function(e) {
      e.preventDefault();
      const datos = {
        id: formMaquina.id.value,
        nombre: formMaquina.nombre.value,
        qr: formMaquina.qr.value
      };
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      })
      .then(res => res.json())
      .then(maquina => {
        alert('¡Máquina agregada!');
        cargarMaquinasListado();
        formMaquina.reset();
      })
      .catch(() => {
        alert('Error al agregar la máquina.');
      });
    });
  }

  // Si estás en la página de historial de una máquina
  const params = new URLSearchParams(window.location.search);
  const maquinaId = params.get('id');
  if (maquinaId && document.getElementById('historial-mantenimientos')) {
    cargarHistorialMantenimientos(maquinaId);

    // Agregar mantenimiento
    const formMtto = document.getElementById('form-mantenimiento');
    if (formMtto) {
      formMtto.addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoMtto = {
          fecha: formMtto.fecha.value,
          trabajo: formMtto.trabajo.value,
          ubicacion: formMtto.ubicacion.value,
          comentarios: formMtto.comentarios.value,
          realizo: formMtto.realizo.value,
          recibio: formMtto.recibio.value
        };
        fetch(`${API_URL}/${maquinaId}/mantenimientos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoMtto)
        })
        .then(res => res.json())
        .then(() => {
          alert('¡Mantenimiento guardado!');
          cargarHistorialMantenimientos(maquinaId);
          formMtto.reset();
        })
        .catch(() => {
          alert('Error al guardar el mantenimiento.');
        });
      });
    }
  }
});

// ----------------------
// CARGAR HISTORIAL DE MANTENIMIENTOS
// ----------------------
function cargarHistorialMantenimientos(maquinaId) {
  fetch(`${API_URL}/${maquinaId}/mantenimientos`)
    .then(res => res.json())
    .then(mantenimientos => {
      const historial = document.getElementById('historial-mantenimientos');
      historial.innerHTML = '';
      if (mantenimientos.length === 0) {
        historial.innerHTML = '<p>No hay mantenimientos registrados.</p>';
        return;
      }
      mantenimientos.forEach(mtto => {
        historial.innerHTML += `
<div class="formato-mantenimiento">
  <h4>Fecha: ${mtto.fecha || ''}</h4>
  <p><b>Trabajo:</b> ${mtto.trabajo || ''}</p>
  <p><b>Ubicación:</b> ${mtto.ubicacion || ''}</p>
  <p><b>Comentarios:</b> ${mtto.comentarios || ''}</p>
  <p><b>Realizó:</b> ${mtto.realizo || ''} &nbsp;&nbsp; <b>Recibió:</b> ${mtto.recibio || ''}</p>
</div>
        `;
      });
    })
    .catch(() => {
      const historial = document.getElementById('historial-mantenimientos');
      historial.innerHTML = '<p>Error al cargar el historial.</p>';
    });
}
