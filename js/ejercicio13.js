function verificarEdad(){
    //Obtener el valor de la edad ingresado por el usuario
    var edad = document.getElementById("edad").value;

    //Verificar que el campo no este vacio
    if (edad === ""){
        document.getElementById("mensaje").value="-";
        return;
    }

    //convertir la edad a entero 
    edad = parseInt(edad);

    //validar edad
    if(edad >17){
        document.getElementById("mensaje").value="Puedes votar";
    } else{
        document.getElementById("mensaje").value="No puedes votar";
    }

}

// Agregar un evento al formulario para evitar que se recargue la página al enviar.
document.querySelector(".formulario").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que se recargue la página
    verificarEdad();
});