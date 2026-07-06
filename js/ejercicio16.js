function alertaTipoNumero() {
    Swal.fire({
        title: 'Advertencia!',
        text: 'Escribe un número válido por favor',
        icon: 'warning',
        confirmButtonText: 'Ok'
    });
}

function alertaDivisionCero() {
    Swal.fire({
        title: 'Error!',
        text: 'Error: Division por cero',
        icon: 'error',
        confirmButtonText: 'Entendido'
    });
}

const sumar = (a,b) => a + b;
const restar = (a,b) => a - b;
const multiplicar = (a,b) => a * b;
const dividir = (a,b) => b !== 0 ? a / b : null;

function calcularOperacion(operacion){
    // recuperar valores
    let n1 = parseFloat(document.getElementById("numero1").value);
    let n2 = parseFloat(document.getElementById("numero2").value);

    // validar que sean números
    if(isNaN(n1) || isNaN(n2)){
        alertaTipoNumero();
        return;
    }

    let resultado;

    if(operacion === 1){
        resultado = sumar(n1,n2);
    }

    if(operacion === 2){
        resultado = restar(n1,n2);
    }

    if(operacion === 3){
        resultado = multiplicar(n1,n2);
    }

    if(operacion === 4){
        if(n2 === 0){
            alertaDivisionCero();
            return;
        }
        resultado = dividir(n1,n2);
    }

    // mostrar resultado
    document.getElementById("resultado").value = resultado;
}

function limpiar(){
    // limpiar campos
    document.getElementById("numero1").value = "";
    document.getElementById("numero2").value = "";
    document.getElementById("resultado").value = "-";
}
