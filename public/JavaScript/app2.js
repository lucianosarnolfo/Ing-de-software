window.addEventListener('load',()=>{

    const form = document.getElementById('formulario')
    const nombreNegocio = document.getElementById('nombreNegocio')
    const localidad = document.getElementById('localidad')
    const direccion = document.getElementById('direccion')
    const telefono = document.getElementById('telefono')
    const email = document.getElementById('email')
    const contraseña = document.getElementById('password')
    const confirmarContraseña = document.getElementById('passConfirma')

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        validaCampos()
    })

    const validaCampos = ()=>{

        const valorNombreNegocio = nombreNegocio.value.trim()
        const valorLocalidad = localidad.value.trim()
        const valorDireccion  = direccion.value.trim()
        const valorTelefono = telefono.value.trim()
        const valorEmail = email.value.trim()
        const valorContraseña = contraseña.value.trim()
        const valorConfirmarContraseña = confirmarContraseña.value.trim()

        //Validando nombre de negocio
        if(!valorNombreNegocio){
            validaFalla(nombreNegocio,'Campo vacío')
        }else{
            validaOk(nombreNegocio)
        }

        //Validando localidad
        if(!valorLocalidad){
            validaFalla(localidad,'Campo vacío')
        }else{
            validaOk(localidad)
        }

        //Validando direccion
        if(!valorDireccion){
            validaFalla(direccion,'Campo vacío')
        }else{
            validaOk(direccion)
        }

        //Validando telefono
        const exr =/^(\d{4})[-]?(\d{6})$/

        if(!valorTelefono){
            validaFalla(telefono,'Campo vacío')
        }else if(!valorTelefono.match(exr)){
            validaFalla(telefono,'Debe contener el siguiente formato 3576-470820')
        }else{
            validaOk(telefono)
        }

        //Validando campo email
        if(!valorEmail){
            validaFalla(email,'Campo vacío')
        }else if(!validaEmail(valorEmail)){
            validaFalla(email,'El email no es válido')
        }else{
            validaOk(email)
        }

        //Validando campo contraseña
        const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/

        if(!valorContraseña){
            validaFalla(contraseña, 'Campo vacío')
        }else if(valorContraseña.length < 8){
            validaFalla(contraseña, 'Debe tener 8 caracteres como minimo')
        }else if(!valorContraseña.match(er)){
            validaFalla(contraseña, 'Debe tener al menos una may. , una min. , y un núm')
        }else{
            validaOk(contraseña)
        }

        //Validando campo confirmar contraseña
        if(!valorConfirmarContraseña){
            validaFalla(confirmarContraseña, 'Confirme su contraseña')
        }else if(valorContraseña !== valorConfirmarContraseña){
            validaFalla(confirmarContraseña, 'La contraseña no coincide')
        }else{
            validaOk(confirmarContraseña)
        }

    }

    const validaFalla = (input,mensaje)=>{
        const formControl = input.parentElement
        const aviso = formControl.querySelector('p')
        aviso.innerText = mensaje

        formControl.className = 'form-control falla'
    }

    const validaOk = (input)=>{
        const formControl=input.parentElement
        formControl.className = 'form-control ok'
    }

    const validaEmail = (email) =>{
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }


})

