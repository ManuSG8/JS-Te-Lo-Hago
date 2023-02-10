const $d = document,
	$fecha = $d.querySelector("#fecha"),
	$formulario = $d.querySelector("#formulario"),
	$localidad = $d.querySelector("#localidad"),
	$numPerros = $d.querySelector("#canes"),
	$numHijos = $d.querySelector("#hijos"),
	$numCoches = $d.querySelector("#coches"),
	$itv = $d.querySelector("#itv"),
	$taller = $d.querySelector("#taller"),
	$lavado = $d.querySelector("#lavado"),
	$efectivo = $d.querySelector("#efectivo"),
	$tarjeta = $d.querySelector("#tarjeta"),
	$resultado = $d.querySelector("#cantidad"),
	$procesar = $d.querySelector("#enviar")

let today = new Date()
let dd = String(today.getDate()).padStart(2, "0")
let mm = String(today.getMonth() + 1).padStart(2, "0")
let yyyy = today.getFullYear()

today = yyyy + "-" + mm + "-" + dd

$d.addEventListener("DOMContentLoaded", (event) => {
	$fecha.setAttribute("value", today)

	// Hay que deshabilitarlos cuando se carga la página, porque te deja marcarlos igualmente (pero no desmarcarlos)
	if ($numCoches.value == 0) {
		$itv.disabled = true
		$taller.disabled = true
		$lavado.disabled = true
	}
})

const pasearPerros = 2
const cuidarHijos = 5
const pasarITV = 2
const levarTaller = 2
const lavar = 3
const extraNegreira = 2
const extraSilleda = 2
const extraLalin = 3
const finDeSemana = 5
const descuentoEfectivo = 0.8
$formulario.addEventListener("change", (event) => {
	if ($numCoches.value == 0) {
		$itv.disabled = true
		$taller.disabled = true
		$lavado.disabled = true

		// Con esto, desmarca las casillas, si se vuelve a poner el input de coches a 0
		$itv.checked = false
		$taller.checked = false
		$lavado.checked = false
	} else {
		$itv.disabled = false
		$taller.disabled = false
		$lavado.disabled = false
	}

	total = pasearPerros * $numPerros.value + cuidarHijos * $numHijos.value

	if ($itv.checked) {
		total += pasarITV * $numCoches.value
	}
	if ($taller.checked) {
		total += levarTaller * $numCoches.value
	}
	if ($lavado.checked) {
		total += lavar * $numCoches.value
	}

	switch ($localidad.value) {
		case "1":
			total += extraNegreira
			break
		case "2":
			total += extraSilleda
			break
		case "3":
			total += extraLalin
			break
	}

	let fecha = new Date($fecha.value)
	let diaSemana = fecha.getUTCDay()
	if (diaSemana == 6 || diaSemana == 0) {
		total += finDeSemana
	}

	if ($efectivo.checked) {
		total = total * descuentoEfectivo
	}

	$resultado.textContent = total.toFixed(2)
})

// Pequeña comporobacion de datos correctos
const $nif = $d.querySelector("#nif"),
	$nombre = $d.querySelector("#nombre"),
	$telefono = $d.querySelector("#tfno"),
	$calle = $d.querySelector("#calle")

$procesar.addEventListener("click", (event) => {
	event.preventDefault()
	if (
		$numCoches.value > 0 &&
		!$itv.checked &&
		!$taller.checked &&
		!$lavado.checked
	) {
		alert("Tienes que seleccionar las tareas para tus coches")
	} else if (!/[0-9]{8}[A-Za-z]{1}$/.test($nif.value) || 
		!/[A-Za-z]{3,}$/.test($nombre.value) ||
		!/[0-9]{9}$/.test($telefono.value) ||
		!/[A-Za-z]{3,}$/.test($calle.value)) {
			alert('Campos incompletos')
	} else {
		alert("Se envían los datos")
	}
})

