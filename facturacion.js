document.addEventListener("DOMContentLoaded", function () {
  // Usuario activo
  const usuario = JSON.parse(localStorage.getItem("usuario")) || null;

if (!usuario) {
    alert("Debes iniciar sesión primero.");
    window.location.href = "usuario.html";
}

  // Funciones para carrito por usuario
  function getCarritoKey() {
    if (usuario && usuario.correo) return `carrito_${usuario.correo}`;
    if (usuario && usuario.nombre) return `carrito_${usuario.nombre}`;
    return "carrito";
  }
  function getCarrito() {
    return JSON.parse(localStorage.getItem(getCarritoKey())) || [];
  }
  function setCarrito(c) {
    localStorage.setItem(getCarritoKey(), JSON.stringify(c));
  }

  // Renderizar carrito en la tabla de facturación
  const carrito = getCarrito();
  const tbody = document.querySelector("#tablaFacturacion tbody");
  const totalSpan = document.getElementById("totalFacturacion");

  let total = 0;

  if (!carrito.length) {
    const filaVacia = document.createElement("tr");
    filaVacia.innerHTML = `<td colspan="4" class="text-center text-muted">Tu carrito está vacío 🛒</td>`;
    tbody.appendChild(filaVacia);
  } else {
    carrito.forEach(producto => {
      const cantidad = producto.cantidad ? Number(producto.cantidad) : 1;
      const subtotal = Number(producto.precio) * cantidad;

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>Bs ${producto.precio}</td>
        <td>${cantidad}</td>
        <td>Bs ${subtotal}</td>
      `;
      tbody.appendChild(fila);
      total += subtotal;
    });
  }

  totalSpan.textContent = `Bs ${total.toFixed(2)}`;

  // Prellenar datos del usuario en el formulario
  if (usuario) {
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    if (nombre && usuario.nombre) nombre.value = usuario.nombre;
    if (correo && usuario.correo) correo.value = usuario.correo;
  }

  // Manejo del formulario de facturación
  const form = document.getElementById("formFacturacion");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("✅ Compra finalizada con éxito. ¡Gracias por tu pedido!");
    localStorage.removeItem(getCarritoKey()); // limpiar carrito del usuario
    window.location.href = "index.html"; // redirigir a inicio
  });
});