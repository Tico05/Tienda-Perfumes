document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formUsuario");

    if (!form) {
        console.error("No se encontró el formulario formUsuario");
        return;
    }

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();

        // Campos obligatorios
        if (!nombre || !correo) {
            alert("⚠️ Por favor, completa todos los campos.");
            return;
        }

        // Nombre solo letras
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (!nombreRegex.test(nombre)) {
            alert("⚠️ El nombre solo puede contener letras.");
            return;
        }

        // Longitud mínima del nombre
        if (nombre.length < 3) {
            alert("⚠️ El nombre debe tener al menos 3 caracteres.");
            return;
        }

        // Correo válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(correo)) {
            alert("⚠️ Ingresa un correo electrónico válido.");
            return;
        }

        const usuario = {
            nombre,
            correo
        };

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        alert(`✅ Usuario ${nombre} registrado correctamente.`);

        window.location.href = "index.html";

    });

});