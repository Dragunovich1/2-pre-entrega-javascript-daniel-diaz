//definimos saldo inicial
let saldo = 1000;
//se define array historial de transacciones vacío
let historialTransacciones = [];
//se define objeto cliente
let cliente = null;

//Se muestra menú inicial (permite simular identificación de cliente)
function mostrarMenuInicial() {
    return prompt("Bienvenido al Simulador de Cajero Automático\n\n1. Ingresar como Cliente\n2. Salir");
}

function esNumeroDeCuentaValido(cuenta) {
    // Verificar que la cuenta tenga exactamente 9 digitos
    return /^\d{9}$/.test(cuenta);
}

function esNombreValido(nombre) {
    // Verificar que el nombre contenga solo letras (no usar acentos)
    return /^[a-zA-Z]+$/.test(nombre);
}

function ingresarCliente() {
    let nombre;

    // Pedir el nombre hasta que sea válido
    do {
        nombre = prompt("Ingrese su nombre:");
        if (!esNombreValido(nombre)) {
            alert("Ingrese un nombre válido (solo letras).");
        }
    } while (!esNombreValido(nombre));

    let apellido;

    // Pedir el apellido hasta que sea válido
    do {
        apellido = prompt("Ingrese su apellido:");
        if (!esNombreValido(apellido)) {
            alert("Ingrese un apellido válido (solo letras).");
        }
    } while (!esNombreValido(apellido));

    let cuenta;

	// Pedir numero de cuenta hasta que sea válido
    do {
        cuenta = prompt("Ingrese el número de cuenta (deben ser 9 dígitos):");
    } while (!esNumeroDeCuentaValido(cuenta));

    cliente = {
        nombre: nombre,
        apellido: apellido,
        cuenta: cuenta
    };
	
	//Mensaje de bienvenida mostrando nombre de cliente, apellido de cliente y nro de cuenta de cliente
    alert(`¡Bienvenido, ${cliente.nombre} ${cliente.apellido} (${cliente.cuenta})!\nAhora puedes utilizar el simulador.`);
}

//Se muestra menú con datos del cliente
function mostrarMenu() {
    return prompt(`Bienvenido, ${cliente.nombre} ${cliente.apellido} (${cliente.cuenta})\n\n1. Consultar Saldo\n2. Retirar Efectivo\n3. Depositar\n4. Ver Historial\n5. Buscar Transacciones por Tipo\n6. Finalizar`);
}

//Sub menu de filtro por tipo de transacción
function mostrarSubMenuTipos() {
    return prompt("Tipos de transacciones:\n1. Retiro\n2. Depósito");
}

//Funciones para fecha y hora actuales para mostrar en el historial y en la busqueda, se agrega cero antes de cada digito de ser necesario
function obtenerFechaHoraActual() {
    const fechaHora = new Date();
    const dia = agregarCeroAntes(fechaHora.getDate());
    const mes = agregarCeroAntes(fechaHora.getMonth() + 1);
    const anio = fechaHora.getFullYear();
    const horas = agregarCeroAntes(fechaHora.getHours());
    const minutos = agregarCeroAntes(fechaHora.getMinutes());
    const segundos = agregarCeroAntes(fechaHora.getSeconds());
    return `${dia}/${mes}/${anio} | ${horas}:${minutos}:${segundos}`;
}

function agregarCeroAntes(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

//Funcion de consulta de saldo
function consultarSaldo() {
    alert(`Su saldo actual es: ${saldo}`);
}

//Funcion de retiro de efvo
function retirarEfectivo() {
    let monto = parseFloat(prompt("Ingrese el monto a retirar:"));

    if (isNaN(monto) || monto <= 0) {
        alert("Ingrese un monto válido.");
    } else if (monto > saldo) {
        alert("Fondos insuficientes.");
    } else {
        saldo -= monto;
        historialTransacciones.push({ tipo: "Retiro", monto: -monto });
        alert(`Retiro exitoso. Nuevo saldo: ${saldo}`);
    }
}

//Funcion de depositar
function depositar() {
    let monto = parseFloat(prompt("Ingrese el monto a depositar:"));

    if (isNaN(monto) || monto <= 0) {
        alert("Ingrese un monto válido.");
    } else {
        saldo += monto;
        historialTransacciones.push({ tipo: "Depósito", monto: monto });
        alert(`Depósito exitoso. Nuevo saldo: ${saldo}`);
    }
}

//Funcion de ver historial (ultimos movimientos) si está vacio alerta que no hay transacciones
function verHistorial() {
    if (historialTransacciones.length === 0) {
        alert("No hay transacciones registradas.");
    } else {
        mostrarHistorialCliente();
    }
}

//Funcion de filtro de transacciones por tipo
function buscarTransaccionesPorTipo() {
    let tipoBusqueda = mostrarSubMenuTipos();
    switch (tipoBusqueda) {
        case "1":
            mostrarTransaccionesPorTipo("Retiro");
            break;
        case "2":
            mostrarTransaccionesPorTipo("Depósito");
            break;
        default:
            alert("Opción no válida.");
    }
}

//Funcion de display de transacciones filtradas por tipo
function mostrarTransaccionesPorTipo(tipo) {
    let transaccionesFiltradas = historialTransacciones.filter(transaccion => transaccion.tipo === tipo);

    if (transaccionesFiltradas.length === 0) {
        alert(`No hay transacciones de tipo ${tipo}.`);
    } else {
        let resultado = `Historial de Transacciones de ${cliente.nombre} ${cliente.apellido} (${cliente.cuenta}) de tipo ${tipo}:\n\n`;

        for (let i = 0; i < transaccionesFiltradas.length; i++) {
            const fechaHora = obtenerFechaHoraActual();
            const tipoTransaccion = transaccionesFiltradas[i].tipo;
            const monto = transaccionesFiltradas[i].monto;

            resultado += `${fechaHora} | ${tipoTransaccion} | ${monto}\n`;
        }

        alert(resultado);
    }
}

//Funcion de display de historial (ultimos movimientos)
function mostrarHistorialCliente() {
    let resultado = `Historial de Transacciones de ${cliente.nombre} ${cliente.apellido} (${cliente.cuenta}):\n\n`;

    for (let i = 0; i < historialTransacciones.length; i++) {
        const fechaHora = obtenerFechaHoraActual();
        const tipoTransaccion = historialTransacciones[i].tipo;
        const monto = historialTransacciones[i].monto;

        resultado += `${fechaHora} | ${tipoTransaccion} | ${monto}\n`;
    }

    alert(resultado);
}

//Logica del menu
let opcion;
do {
    opcion = mostrarMenuInicial();

    switch (opcion) {
        case "1":
            ingresarCliente();
            // Ahora, después de ingresar como cliente, ejecutamos el bucle del menú principal
            while (opcion !== "6") {
                opcion = mostrarMenu();
                switch (opcion) {
                    case "1":
                        consultarSaldo();
                        break;
                    case "2":
                        retirarEfectivo();
                        break;
                    case "3":
                        depositar();
                        break;
                    case "4":
                        verHistorial();
                        break;
                    case "5":
                        buscarTransaccionesPorTipo();
                        break;
                    case "6":
                        alert(`Hasta luego ${cliente.nombre} ${cliente.apellido}, se finalizara tu sesion.`);
                        break;
                    default:
                        alert("Seleccione una opción válida.");
                }
            }
            break;
        case "2":
            alert("Gracias por utilizar el simulador.");
            break;
        default:
            alert("Seleccione una opción válida.");
    }
} while (opcion !== "2");

