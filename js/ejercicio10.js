function calcular(){
    //obtener el valor de los grados celcius ingresado 
    var celcius = document.getElementById("celcius").value;

    ;

    if (celcius === "") {
        document.getElementById("fahrenheit").value =  "- ℉";
        return;
    }

    //convertir el valor a entero y aplica la formula
    var resultado = (parseFloat(celcius))*9/5 + 32;

    //mostrar el resultado
    document.getElementById("fahrenheit").value = resultado + " ℉";

}

document.querySelector(".formulario").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que se recargue la página
    calcular();
});
