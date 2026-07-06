function convertirDistancia() {
    // Obtener el valor de los kilómetros ingresado.
    var kilometros = parseFloat(document.getElementById('kilometros').value);

    //Validar si el campo está vacío, es un número válido.
    if (isNaN(kilometros) || kilometros < 0) {
        document.getElementById('millas').value = "- mi";
        return;
    }

    //convertir el valor a millas y aplicar la fórmula.
    var resultado = parseFloat(kilometros) * 0.621371;  

    //mostrar el resultado.
    document.getElementById('millas').value = resultado + " mi";
}

// Agregar un evento al formulario para evitar que se recargue la página al enviar.
document.querySelector(".formulario").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que se recargue la página
    convertirDistancia();
});