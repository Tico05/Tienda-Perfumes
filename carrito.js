
const usuario = JSON.parse(localStorage.getItem("usuario")) || null;

function getCarritoKey() {
    if (usuario && usuario.correo) {
        return `carrito_${usuario.correo}`;
    } else if (usuario && usuario.nombre) {
        return `carrito_${usuario.nombre}`;
    } else {
        return "carrito";
    }
}

function getCarrito() {
    try {
        const datos = JSON.parse(localStorage.getItem(getCarritoKey()));
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return [];
    }
}

function setCarrito(c) {
    localStorage.setItem(getCarritoKey(), JSON.stringify(c));
}

let carrito = getCarrito();

const tbody = document.getElementById("tablaCarrito");
const totalSpan = document.getElementById("totalCarrito");
const descuentoInfo = document.getElementById("descuentoInfo");

if (!tbody || !totalSpan) {
    console.error(
        "No se encontraron los elementos tablaCarrito o totalCarrito en el HTML."
    );
} else {

    function renderCarrito() {

        tbody.innerHTML = "";

        if (!carrito || carrito.length === 0) {

            const filaVacia = document.createElement("tr");

            filaVacia.innerHTML = `
                <td colspan="5" class="text-center text-muted">
                    Tu carrito está vacío 🛒
                </td>
            `;

            tbody.appendChild(filaVacia);

            totalSpan.textContent = "Bs 0.00";

            if (descuentoInfo) {
                descuentoInfo.textContent = "";
            }

            return;
        }

        let total = 0;

        carrito.forEach((producto, index) => {

            const fila = document.createElement("tr");

            const celdaNombre = document.createElement("td");

            celdaNombre.textContent = producto.nombre || "Producto";

            const celdaPrecio = document.createElement("td");

            const precio = Number(producto.precio);

            const precioValido = Number.isFinite(precio) ? precio : 0;

            celdaPrecio.textContent = `Bs ${precioValido.toFixed(2)}`;

            const celdaCantidad = document.createElement("td");

            const cantidadNumero = Number(producto.cantidad);

            const cantidad = (
                Number.isFinite(cantidadNumero) && cantidadNumero > 0
            ) ? cantidadNumero : 1;

            celdaCantidad.textContent = cantidad;

            const celdaSubtotal = document.createElement("td");

            const subtotal = precioValido * cantidad;

            celdaSubtotal.textContent = `Bs ${subtotal.toFixed(2)}`;

            const celdaAccion = document.createElement("td");

            const btnEliminar = document.createElement("button");

            btnEliminar.textContent = "Eliminar";

            btnEliminar.classList.add(
                "btn",
                "btn-danger",
                "btn-sm"
            );

            btnEliminar.onclick = function () {
                eliminarProducto(index);
            };

            celdaAccion.appendChild(btnEliminar);

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaPrecio);
            fila.appendChild(celdaCantidad);
            fila.appendChild(celdaSubtotal);
            fila.appendChild(celdaAccion);

            tbody.appendChild(fila);

            total += subtotal;

        });

        let descuento = 0;

        if (total >= 100) {

            descuento = total * 0.10;

            if (descuentoInfo) {
                descuentoInfo.textContent =
                    `🔥 Descuento aplicado: Bs ${descuento.toFixed(2)} (10% OFF desde Bs 100)`;
            }

        } else {

            if (descuentoInfo) {
                descuentoInfo.textContent = "";
            }

        }

        const totalFinal = total - descuento;

        totalSpan.textContent = `Bs ${totalFinal.toFixed(2)}`;

    }

    function eliminarProducto(indice) {

        if (indice < 0 || indice >= carrito.length) {
            return;
        }

        carrito.splice(indice, 1);

        setCarrito(carrito);

        renderCarrito();

    }

    function vaciarCarrito() {

        carrito = [];

        setCarrito(carrito);

        renderCarrito();

    }


    renderCarrito();


    window.eliminarProducto = eliminarProducto;

    window.vaciarCarrito = vaciarCarrito;

}