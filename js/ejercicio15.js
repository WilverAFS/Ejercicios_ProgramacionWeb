
    // //definir el objeto estudiante y el listado de estos
// let estudiante = {
//     nombre: "Juan",
//     calificacion: 25
// }

    // //arreglo de estudiantes
// let estudiantes = [
//     { nombre: "Juan", calificacion: 85},
//     { nombre: "Ana", calificacion: 92},
//     { nombre: "Luis", calificacion: 78},
// ];

let lista_estudiantes = [];

//Como desplegar informacion de un objeto
// console.log(estudiante.nombre);
// console.log(estudiante['calificacion']);    

function agregarEstudiante(){
      
        //recuperar el nombre
    let n = document.getElementById("nombre").value;
    //recuperar la calificacion y convertirlos a entero
    let c = parseInt( document.getElementById("calificacion").value );

        //validar el contenido
    if(n === "" || isNaN(c)) {
        document.getElementById("mejor").value="-";
        document.getElementById("peor").value="-";
        document.getElementById("promedio").value="-";
        return;
    }

        // validar formato del nombre: solo letras (mayusculas, minusculas, vocales acentuadas) 
    let regrexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; 
    if (!regrexNombre.test(n)){
        document.getElementById("mejor").value="-";
        document.getElementById("peor").value="-";
        document.getElementById("promedio").value="-";
        alert("Ingrese un nombre que contenga solo letras del abecedario, se admiten acentos.");
        return;
    }

        //validar formato de calificacion: solo numeros de entre 0 y 100
    let regrexCalificacion = /^(?:100|[0-9]{1,2})$/; 
    if (!regrexCalificacion.test(c) || c>100 || c < 0 ){
        document.getElementById("mejor").value="-";
        document.getElementById("peor").value="-";
        document.getElementById("promedio").value="-";
        alert("Ingrese una calificacion entre 0 y 100.");
        return;
    }

    //crear objeto alumno
    let alumno = {
        nombre: n,
        calificacion: c
    }

        //agregar al arreglo
    lista_estudiantes.push(alumno);
    console.log("Nuevo alumno "+ alumno.nombre + "," + alumno.calificacion);
    
        //Limpiar campos
    document.getElementById("nombre").value ="";
    document.getElementById("calificacion").value ="";
}


function calcular(){
    //realziar las operaciones sobre el listado de estudiantes
    if(lista_estudiantes.length === 0){
        alert("No hay estudiantes registrados.");
        console.log("No hay estudiantes");
        return;
    }

        //Recorrido de un arreglo de objetos 
    console.log("Estudiantes registrados: " + lista_estudiantes.length);
    lista_estudiantes.forEach(estudiante =>{
        console.log(estudiante.nombre);
    });

        //calculo del promedio
    // let promedio = estudiantes.reduce((total, estudiante) => total + estudiante.calificacion, 0) / estudiantes.length;
    // console.log("El promedio es:"+promedio);

        //promedio
    let promedio = lista_estudiantes.reduce((total, e) => total + e.calificacion, 0 ) / lista_estudiantes.length;

        //encontrar la calificacion mas alta y mas baja
    // let calificacionMaxima = Math.max(...estudiantes.map(e => e.calificacion));
    // let calificacionMinima = Math.min(...estudiantes.map(e => e.calificacion));
    // console.log("Calificacion mas alta:"+ calificacionMaxima);
    // console.log("Calificacion minima:"+ calificacionMinima);

        //Calificacion Maxima y minima
    let calificacionMaxima = Math.max(...lista_estudiantes.map(e => e.calificacion));
    let calificacionMinima = Math.min(...lista_estudiantes.map(e => e.calificacion));

    //Recorrido de un arreglo de estudiantes para buscar al de mayor y menor calificacion
    // let mejorEstudiante = "Nombre";
    // estudiantes.forEach(estudiante =>{
    //     if (estudiante.calificacion == calificacionMaxima) {
    //         mejorEstudiante = estudiante.nombre
    //     }
    // });
    // let peorEstudiante = "Nombre";
    // estudiantes.forEach(estudiante =>{
    //     if (estudiante.calificacion == calificacionMinima) {
    //         peorEstudiante = estudiante.nombre
    //     }
    // });
    // console.log ("Mejor estudiante: " + mejorEstudiante);
    // console.log ("Peor estudiante: " + peorEstudiante);

        //mejor y peor estudiante
    let mejorEstudiante = lista_estudiantes.find(e => e.calificacion === calificacionMaxima).nombre;
    let peorEstudiante = lista_estudiantes.find(e => e.calificacion === calificacionMinima).nombre;

        //mostrar resultados en los inputs
    document.getElementById("mejor").value = mejorEstudiante;
    document.getElementById("peor").value = peorEstudiante;
    document.getElementById("promedio").value = promedio.toFixed(2);
}


function resetFormulario() {
    // limpiar campos de entrada
    document.getElementById("nombre").value = "";
    document.getElementById("calificacion").value = "";

    // limpiar resultados
    document.getElementById("mejor").value = "-";
    document.getElementById("peor").value = "-";
    document.getElementById("promedio").value = "-";

    // reiniciar listado de estudiantes
    lista_estudiantes = [];

    console.log("Formulario y lista de estudiantes reiniciados.");
}


// evitar recarga del formulario
document.querySelector(".formulario").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que se recargue la página
    agregarEstudiante();
});