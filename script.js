$(document).ready(function () {
    let consultorios = [];
    let editarIndiceConsultorio = -1;

    // Mostrar el formulario de agregar consultorio
    $('#formConsultorio').on('submit', function (e) {
        e.preventDefault();

        const id = $('#id').val();
        const nombre = $('#nombre').val();
        const ubicacion = $('#ubicacion').val();

        if (nombre === '' || ubicacion === '') {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (editarIndiceConsultorio === -1) {
            // Agregar nuevo consultorio
            consultorios.push({ id, nombre, ubicacion });
        } else {
            // Editar consultorio existente
            consultorios[editarIndiceConsultorio] = { id, nombre, ubicacion };
        }

        actualizarTablaConsultorios();
        $('#formConsultorio')[0].reset();
        editarIndiceConsultorio = -1;
    });

    // Cancelar edición de consultorio
    $('#cancelar-edicion').on('click', function () {
        $('#formConsultorio')[0].reset();
        editarIndiceConsultorio = -1;
    });

    // Actualizar la tabla de consultorios
    function actualizarTablaConsultorios() {
        const tbody = $('#tablaConsultorios tbody');
        tbody.empty();

        consultorios.forEach((consultorio, index) => {
            const fila = `
                <tr>
                    <td>${consultorio.id}</td>
                    <td>${consultorio.nombre}</td>
                    <td>${consultorio.ubicacion}</td>
                    <td>
                        <button class="editarConsultorioBtn" data-index="${index}">Editar</button>
                        <button class="eliminarConsultorioBtn" data-index="${index}">Eliminar</button>
                    </td>
                </tr>
            `;
            tbody.append(fila);
        });

        // Configuración de botones de editar
        $('.editarConsultorioBtn').on('click', function () {
            editarIndiceConsultorio = $(this).data('index');
            const consultorio = consultorios[editarIndiceConsultorio];
            $('#id').val(consultorio.id);
            $('#nombre').val(consultorio.nombre);
            $('#ubicacion').val(consultorio.ubicacion);
        });

        // Configuración de botones de eliminar
        $('.eliminarConsultorioBtn').on('click', function () {
            const index = $(this).data('index');
            consultorios.splice(index, 1);
            actualizarTablaConsultorios();
        });
    }
}); 
