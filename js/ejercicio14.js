function calcular(){
    //recuperar el listado de numeros
    let cadena = document.getElementById("numeros").value;

    //validar que no este vacio y que cumpla el formato numeros separados por comas
    if(cadena === ""){
        document.getElementById("mayor").value="-";
        document.getElementById("menor").value="-";
        document.getElementById("promedio").value="-";
        return;
    }

    // Validar formato: solo números separados por comas
    let regex = /^\d+(,\d+)*$/;
    if (!regex.test(cadena)) {
        document.getElementById("mayor").value="-";
        document.getElementById("menor").value="-";
        document.getElementById("promedio").value="-";
        return;
    }

    //Dividir la cadena de numeros y obtener el arreglo
    let arreglo = cadena.split(",");

    //utilizamos map() para convertir el arreglo a numeros
    let numeros =  arreglo.map(Number);

    //Realizar operaciones
    let maximo = Math.max(...numeros);
    let minimo = Math.min(...numeros);
    let suma = numeros.reduce( (acc, valor) => acc + valor, 0);
    let promedio = suma / numeros.length;

    //Mostrar los resultado en pantalla
    document.getElementById("menor").value = minimo;
    document.getElementById("mayor").value = maximo;
    document.getElementById("promedio").value = promedio;

}

// Agregar un evento al formulario para evitar que se recargue la página al enviar.
document.querySelector(".formulario").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que se recargue la página
    calcular();
});