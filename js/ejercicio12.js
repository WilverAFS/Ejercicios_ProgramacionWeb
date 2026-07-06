function convertirMoneda(){
    //Definir la tasa de cambio
    const tasaCambio = 0.055; // 1 USD = 18.18 MXN

    //obtener el valor de los pesos mexicanos ingresado.
    var mxn = parseFloat(document.getElementById('mxn').value);

    //validar que el campo no esté vacío y sea un número válido.
    if (isNaN(mxn) || mxn < 0) {
        document.getElementById('usd').value = "- USD";
        return;
    }

    //convertir el valor a dólares y aplicar la fórmula.
    var resultado = parseFloat(mxn) * tasaCambio;

    //mostrar el resultado en el campo de dólares.
    // implementar el método toFixed() para limitar el número de decimales a 2.
    document.getElementById('usd').value = resultado.toFixed(2) + " USD";
}

// Evitar la recarga del formulario cuando se envien los datos.
document.querySelector(".formulario").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que se recargue la página
    convertirMoneda();
});

