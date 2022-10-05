const form = document.getElementById("formulario")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const localidad = document.getElementById('localidad')
const direccion = document.getElementById("direccion")
const email = document.getElementById("email")
const constraseña = document.getElementById("password")

form.addEventListener("submit", (e) => {
    if(validaCampos() != true) {
        e.preventDefault()
    }
}, false)

const validaCampos = () => {

    const valorNombre = nombre.value.trim()
    const valorApellido = apellido.value.trim()
    const valorLocalidad = localidad.value.trim()
    const valorDireccion = direccion.value.trim()
    const valorEmail = email.value.trim()
    const valorContraseña = constraseña.value.trim()

    //Validando campo nombre
    if (!valorNombre) {
        validaFalla(nombre, "Campo vacío")
        return false
    } else {
        validaOk(nombre)
    }

    //Validando campo apellido
    if (!valorApellido) {
        validaFalla(apellido, "Campo vacío")
        return false
    } else {
        validaOk(apellido)
    }

    //Validando campo localidad
    if (!valorLocalidad) {
        validaFalla(localidad, "Campo vacío")
        return false
    } else {
        validaOk(localidad)
    }

    //Validando campo dirección
    if (!valorDireccion) {
        validaFalla(direccion, "Campo vacío")
        return false
    } else {
        validaOk(direccion)
    }

    //Validando campo email
    if (!valorEmail) {
        validaFalla(email, "Campo vacío")
        return false
    } else if (!validaEmail(valorEmail)) {
        validaFalla(email, "El email no es válido")
        return false
    } else {
        validaOk(email)
    }

    //Validando campo contraseña
    const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/
    if (!valorContraseña) {
        validaFalla(constraseña, "Campo vacío")
        return false
    } else if (valorContraseña.length < 8) {
        validaFalla(constraseña, "Debe tener 8 caracteres como minimo")
        return false
    } else if (!valorContraseña.match(er)) {
        validaFalla(constraseña, "Debe tener al menos una may. , una min. , y un núm")
        return false
    } else {
        validaOk(constraseña)
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

const validaEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}