
const form = document.getElementById("formulario")
const nombreNegocio = document.getElementById("nombreNegocio")
const localidad = document.getElementById("localidad")
const direccion = document.getElementById("direccion")
const telefono = document.getElementById("telefono")
const tipoDeServicio = document.getElementById("tipo")

form.addEventListener("submit", (e) => {
    if (validaCampos() == false) {
        e.preventDefault()
    }
}, false)

const validaCampos = () => {

    const valorNombreNegocio = nombreNegocio.value.trim()
    const valorLocalidad = localidad.value.trim()
    const valorDireccion = direccion.value.trim()
    const valorTelefono = telefono.value.trim()
    const valorServicio = tipoDeServicio.value.trim()

    //Validando nombre de negocio
    if (!valorNombreNegocio) {
        validaFalla(nombreNegocio, "Campo vacío")
        return false
    } else {
        validaOk(nombreNegocio)
    }

    //Validando localidad
    if (!valorLocalidad) {
        validaFalla(localidad, "Campo vacío")
        return false
    } else {
        validaOk(localidad)
    }

    //Validando direccion
    if (!valorDireccion) {
        validaFalla(direccion, "Campo vacío")
        return false
    } else {
        validaOk(direccion)
    }

    //Validando telefono
    const exr = /^(\d{4})[-]?(\d{6})$/

    if (!valorTelefono) {
        validaFalla(telefono, "Campo vacío")
        return false
    } else if (!valorTelefono.match(exr)) {
        validaFalla(telefono, "Debe contener el siguiente formato 3576-470820")
        return false
    } else {
        validaOk(telefono)
    }

    if(valorServicio === "Selecciones un tipo de servicio"){
        validaFalla(tipoDeServicio, "Debe seleccionar un tipo de servicio")
        return false
    } else {
        validaOk(tipoDeServicio)
    }

    return true
}

const validaFalla = (input, mensaje) => {
    const formControl = input.parentElement
    const aviso = formControl.querySelector("p")
    aviso.innerText = mensaje

    formControl.className = "form-control falla"
}

const validaOk = (input) => {
    const formControl = input.parentElement
    const aviso = formControl.querySelector("p")
    aviso.innerText = ""

    formControl.className = "form-control ok"
}