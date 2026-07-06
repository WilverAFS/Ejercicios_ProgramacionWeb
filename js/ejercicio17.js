// ejercicio17.js
// Closure que encapsula el manejo de tareas y Local Storage
const manejarTareas = (() => {
    const STORAGE_KEY = "mis_tareas_v1";

    // cargar tareas desde localStorage o iniciar vacío
    let tareas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // guarda el arreglo en localStorage
    const guardar = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
    };

    // agrega una tarea (texto), por defecto no completada
    const agregar = (texto) => {
        tareas.push({ texto: texto, completada: false, creado: Date.now() });
        guardar();
    };

    // elimina tarea por índice
    const eliminar = (indice) => {
        if (indice >= 0 && indice < tareas.length) {
            tareas.splice(indice, 1);
            guardar();
        }
    };

    // alterna completado por índice
    const toggleCompletar = (indice) => {
        if (indice >= 0 && indice < tareas.length) {
            tareas[indice].completada = !tareas[indice].completada;
            guardar();
        }
    };

    // elimina todas las tareas
    const eliminarTodas = () => {
        tareas = [];
        guardar();
    };

    // devuelve copia del arreglo (para evitar manipulación externa)
    const obtener = () => JSON.parse(JSON.stringify(tareas));

    // Exponer funciones públicas
    return { agregar, eliminar, toggleCompletar, obtener, eliminarTodas };
})();

// ---------- Interacción con la UI ----------

const contenedor = document.getElementById("contenedor_tareas");
const inputNueva = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiarTodo = document.getElementById("btnLimpiarTodo");

// Renderiza la lista de tareas en el DOM
function renderizarTareas() {
    const tareas = manejarTareas.obtener();
    contenedor.innerHTML = "";

    if (tareas.length === 0) {
        contenedor.innerHTML = `<div class="tarea"><div class="tarea-contenido"><label style="color:#6b7b80;font-weight:600">No hay tareas</label></div></div>`;
        return;
    }

    tareas.forEach((tarea, i) => {
        // contenedor principal de la tarea
        const tareaDiv = document.createElement("div");
        tareaDiv.className = "tarea" + (tarea.completada ? " tarea-completada" : "");

        // contenido: checkbox + texto
        const contenido = document.createElement("div");
        contenido.className = "tarea-contenido";

        // checkbox (usamos input checkbox oculto y un label)
        const checkboxWrapper = document.createElement("label");
        checkboxWrapper.className = "checkbox";
        checkboxWrapper.title = tarea.completada ? "Marcar como pendiente" : "Marcar como completada";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.setAttribute("aria-label", `Marcar tarea ${tarea.texto}`);
        checkbox.addEventListener("change", () => {
            manejarTareas.toggleCompletar(i);
            renderizarTareas();
        });

        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(checkmark);

        const textoLabel = document.createElement("label");
        textoLabel.textContent = tarea.texto;

        contenido.appendChild(checkboxWrapper);
        contenido.appendChild(textoLabel);

        // estado y acciones
        const acciones = document.createElement("div");
        acciones.className = "acciones";

        const estadoTexto = document.createElement("div");
        estadoTexto.className = "tarea-estado";
        const estado = document.createElement("span");
        estado.className = "estado-texto";
        estado.textContent = tarea.completada ? "Completada" : "Pendiente";
        estadoTexto.appendChild(estado);

        const btnBorrar = document.createElement("button");
        btnBorrar.className = "btn-borrar";
        btnBorrar.textContent = "Borrar";
        btnBorrar.addEventListener("click", () => confirmarEliminar(i));

        acciones.appendChild(estadoTexto);
        acciones.appendChild(btnBorrar);

        // ensamblar
        tareaDiv.appendChild(contenido);
        tareaDiv.appendChild(acciones);

        contenedor.appendChild(tareaDiv);
    });
}

// confirma eliminación con SweetAlert y elimina si confirma
function confirmarEliminar(indice) {
    const tareas = manejarTareas.obtener();
    const texto = tareas[indice] ? tareas[indice].texto : "esta tarea";

    Swal.fire({
        title: '¿Eliminar tarea?',
        text: `¿Deseas eliminar: "${texto}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            manejarTareas.eliminar(indice);
            alertaExito("Tarea eliminada");
            renderizarTareas();
        }
    });
}

// agrega tarea desde el input
function agregarTarea() {
    const texto = inputNueva.value.trim();
    if (!texto) {
        Swal.fire({ title: 'Advertencia', text: 'Ingrese una tarea válida', icon: 'warning', confirmButtonText: 'Ok' });
        return;
    }
    manejarTareas.agregar(texto);
    inputNueva.value = "";
    alertaExito("Tarea agregada");
    renderizarTareas();
}

// confirma y elimina todas las tareas
function confirmarEliminarTodas() {
    const tareas = manejarTareas.obtener();
    if (tareas.length === 0) {
        Swal.fire({ title: 'Info', text: 'No hay tareas para eliminar', icon: 'info', confirmButtonText: 'Ok' });
        return;
    }

    Swal.fire({
        title: '¿Eliminar todas las tareas?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar todo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            manejarTareas.eliminarTodas();
            alertaExito("Todas las tareas fueron eliminadas");
            renderizarTareas();
        }
    });
}

// alerta de éxito reutilizable
function alertaExito(texto) {
    Swal.fire({ title: 'Éxito', text: texto, icon: 'success', confirmButtonText: 'Ok' });
}

// eventos
btnAgregar.addEventListener("click", agregarTarea);
btnLimpiarTodo.addEventListener("click", confirmarEliminarTodas);

// renderizar al cargar la página
document.addEventListener("DOMContentLoaded", renderizarTareas);
