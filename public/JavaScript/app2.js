
const form = document.getElementById('formulario')
const nombreNegocio = document.getElementById('nombreNegocio')
const localidad = document.getElementById('localidad')
const direccion = document.getElementById('direccion')
const telefono = document.getElementById('telefono')
const tipoDeServicio = document.getElementById('tipo')

form.addEventListener('submit', (e) => {
    if (validaCampos() == false) {
        e.preventDefault()
    }
}, false)

const validaCampos = () => {

    let totalPass = 0

    const valorNombreNegocio = nombreNegocio.value.trim()
    const valorLocalidad = localidad.value.trim()
    const valorDireccion = direccion.value.trim()
    const valorTelefono = telefono.value.trim()
    const valorServicio = tipoDeServicio.value.trim()

    //Validando nombre de negocio
    if (!valorNombreNegocio) {
        validaFalla(nombreNegocio, 'Campo vacío')
    } else {
        validaOk(nombreNegocio)
        totalPass++
    }

    //Validando localidad
    if (!valorLocalidad) {
        validaFalla(localidad, 'Campo vacío')
    } else {
        validaOk(localidad)
        totalPass++
    }

    //Validando direccion
    if (!valorDireccion) {
        validaFalla(direccion, 'Campo vacío')
    } else {
        validaOk(direccion)
        totalPass++
    }

    //Validando telefono
    const exr = /^(\d{4})[-]?(\d{6})$/

    if (!valorTelefono) {
        validaFalla(telefono, 'Campo vacío')
    } else if (!valorTelefono.match(exr)) {
        validaFalla(telefono, 'Debe contener el siguiente formato 3576-470820')
    } else {
        validaOk(telefono)
        totalPass++
    }

    if(valorServicio === 'Selecciones un tipo de servicio'){
        validaFalla(tipoDeServicio, 'Debe seleccionar un tipo de servicio')
    } else {
        validaOk(tipoDeServicio)
        totalPass++
    }

    return (totalPass == 5)
}

const validaFalla = (input, mensaje) => {
    const formControl = input.parentElement
    const aviso = formControl.querySelector('p')
    aviso.innerText = mensaje

    formControl.className = 'form-control falla'
}

const validaOk = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control ok'
}