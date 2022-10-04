window.addEventListener('load',()=>{

    const form = document.getElementById('formulario')
    const nombreNegocio = document.getElementById('nombreNegocio')
    const localidad = document.getElementById('localidad')
    const direccion = document.getElementById('direccion')
    const telefono = document.getElementById('telefono')

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        validaCampos()
    })

    const validaCampos = ()=>{

        const valorNombreNegocio = nombreNegocio.value.trim()
        const valorLocalidad = localidad.value.trim()
        const valorDireccion  = direccion.value.trim()
        const valorTelefono = telefono.value.trim()
       
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


})

