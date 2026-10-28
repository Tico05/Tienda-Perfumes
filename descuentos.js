// Función para obtener el carrito actual
function getCarritoKey() {

    const usuario =
        JSON.parse(localStorage.getItem("usuario")) || null;

    if (usuario && usuario.correo) {
        return `carrito_${usuario.correo}`;
    }

    if (usuario && usuario.nombre) {
        return `carrito_${usuario.nombre}`;
    }

    return "carrito";
}

function getCarrito() {

    return JSON.parse(
        localStorage.getItem(getCarritoKey())
    ) || [];

}

// Verificar si aplica oferta
function verificarOferta() {

    const carrito = getCarrito();

    const total = carrito.reduce(
        (acc, p) => acc + (p.precio * p.cantidad),
        0
    );

    if (total >= 100) {

        alert(
            "🔥 Oferta especial: 10% de descuento por compras mayores a Bs.100"
        );

    }

}

// Calcular total con descuento
function calcularTotalConDescuento() {

    const carrito = getCarrito();

    let total = carrito.reduce(
        (acc, p) => acc + (p.precio * p.cantidad),
        0
    );

    let descuento = 0;

    if (total >= 100) {
        descuento = total * 0.10;
    }

    const totalFinal = total - descuento;

    return {
        total,
        descuento,
        totalFinal
    };

}

// Exponer funciones globales
window.verificarOferta = verificarOferta;
window.calcularTotalConDescuento = calcularTotalConDescuento;