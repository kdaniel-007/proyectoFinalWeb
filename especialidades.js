$(document).ready(function () {
    let especialidades = [];
    let editarIndice = -1;

    // Mostrar el formulario de agregar especialidad
    $('#agregarEspecialidad').on('click', function () {
        $('#formEspecialidad').show();
        $('#formTitulo').text('Agregar Especialidad');
        $('#nombreEspecialidad').val('');
        editarIndice = -1;
    });

    // Cancelar y ocultar el formulario
    $('#cancelarEspecialidad').on('click', function () {
        $('#formEspecialidad').hide();
    });

    // Guardar la especialidad
    $('#guardarEspecialidad').on('click', function (e) {
        e.preventDefault();

        const nombreEspecialidad = $('#nombreEspecialidad').val();

        if (nombreEspecialidad === '') {
            alert('El nombre de la especialidad no puede estar vacío.');
            return;
        }

        if (editarIndice === -1) {
            // Agregar nueva especialidad
            especialidades.push({ nombre: nombreEspecialidad });
        } else {
            // Editar especialidad existente
            especialidades[editarIndice].nombre = nombreEspecialidad;
        }

        actualizarTabla();
        $('#formEspecialidad').hide();
    });

    // Actualizar la tabla con especialidades
    function actualizarTabla() {
        const tbody = $('#listaEspecialidades');
        tbody.empty();

        especialidades.forEach((especialidad, index) => {
            const fila = `
                <tr>
                    <td>${especialidad.nombre}</td>
                    <td>
                        <button class="editarBtn" data-index="${index}">Editar</button>
                        <button class="eliminarBtn" data-index="${index}">Eliminar</button>
                    </td>
                </tr>
            `;
            tbody.append(fila);
        });

        // Editar especialidad
        $('.editarBtn').on('click', function () {
            editarIndice = $(this).data('index');
            const especialidad = especialidades[editarIndice];
            $('#nombreEspecialidad').val(especialidad.nombre);
            $('#formTitulo').text('Editar Especialidad');
            $('#formEspecialidad').show();
        });

        // Eliminar especialidad
        $('.eliminarBtn').on('click', function () {
            const index = $(this).data('index');
            especialidades.splice(index, 1);
            actualizarTabla();
        });
    }
});
