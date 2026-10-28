function getUsuario() {
    return JSON.parse(
        localStorage.getItem("usuario")
    ) || null;
}

function cerrarSesion() {

    const usuario = getUsuario();

    // Eliminar carrito del usuario activo
    if (usuario && usuario.correo) {
        localStorage.removeItem(`carrito_${usuario.correo}`);
    }

    if (usuario && usuario.nombre) {
        localStorage.removeItem(`carrito_${usuario.nombre}`);
    }

    // Eliminar carrito genérico antiguo
    localStorage.removeItem("carrito");

    // Eliminar usuario
    localStorage.removeItem("usuario");

    alert("Sesión cerrada. Registra un nuevo usuario.");

    window.location.href = "usuario.html";
}

function actualizarBadgeUsuario(
    badgeId = "usuarioBadge"
) {

    const badge =
        document.getElementById(badgeId);

    if (!badge) return;

    const usuario = getUsuario();

    if (usuario && usuario.nombre) {

        badge.textContent =
            `Usuario: ${usuario.nombre}`;

        badge.classList.remove(
            "badge-light"
        );

        badge.classList.add(
            "badge-warning"
        );

    } else {

        badge.textContent =
            "No hay usuario registrado";

        badge.classList.remove(
            "badge-warning"
        );

        badge.classList.add(
            "badge-light"
        );
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        actualizarBadgeUsuario();
    }
);