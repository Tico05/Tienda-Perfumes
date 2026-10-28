// Catálogo base (coincide con index.html)
const productos = [
  { id: 1, nombre: "Mahogany Teakwood", precio: 50, imagen: "imagen1.webp" },
  { id: 2, nombre: "Graphite", precio: 60, imagen: "imagen2.webp" },
  { id: 3, nombre: "Ocean", precio: 70, imagen: "imagen3.webp" },
  { id: 4, nombre: "Deep Ocean", precio: 80, imagen: "imagen4.webp" },
  { id: 5, nombre: "Ocean Works", precio: 90, imagen: "imagen5.webp" },
  { id: 6, nombre: "Beard & Scruff Cream", precio: 100, imagen: "imagen6.webp" }
];

// Usuario activo
const usuario = JSON.parse(localStorage.getItem("usuario")) || null;

// Clave dinámica del carrito por usuario
function getCarritoKey() {
  if (usuario && usuario.correo) return `carrito_${usuario.correo}`;
  if (usuario && usuario.nombre) return `carrito_${usuario.nombre}`;
  return "carrito";
}

// Obtener carrito actual
function getCarrito() {
  return JSON.parse(localStorage.getItem(getCarritoKey())) || [];
}

// Guardar carrito
function setCarrito(c) {
  localStorage.setItem(getCarritoKey(), JSON.stringify(c));
}

// Añadir al carrito y guardar en localStorage
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  if (!usuario) {
    alert("No hay usuario registrado. Se usará un carrito genérico.");
  }

  const carrito = getCarrito();
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  setCarrito(carrito);

  const nombreUsuario = usuario && usuario.nombre ? ` para ${usuario.nombre}` : "";
  alert(`${producto.nombre} añadido al carrito${nombreUsuario} 🛒`);
}

// Exponer la función para onclick en HTML
window.agregarAlCarrito = agregarAlCarrito;