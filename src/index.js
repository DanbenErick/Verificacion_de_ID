

const input_dni = document.querySelector("#dni_input")
const button = document.querySelector("button")

const nombre = document.querySelector("#nombre")
const apellidos = document.querySelector("#apellidos")
const dni = document.querySelector("#dni")

const data_persona = {};

const vaciar_labels = _ => {
  nombre.textContent = ''
  apellidos.textContent = ''
  dni.textContent = ''
}

const vaciar_inputs = _ => {
  input_dni.value = ''
}

button.addEventListener('click', () => {
  
  if(input_dni.value != '') {
    vaciar_labels()
    if(input_dni.value.length == 8) {
      fetch(`https://api.reniec.cloud/dni/${input_dni.value}`,{
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => {
          if(data.error) {
            document.querySelector("#invalido").style.display = "block";
            document.querySelector("#valido").style.display = "none";
          } else {
            nombre.textContent = data.nombres
            apellidos.textContent = data.apellido_paterno + " " + data.apellido_materno
            dni.textContent = data.dni
            document.querySelector("#invalido").style.display = "none";
            document.querySelector("#valido").style.display = "block";
            vaciar_inputs()
          }
        })
    }else {
      console.log('hay mas o menos de 8 caracteres')
    } 
  }else {
    console.log('el input esta vacio')
  }
})
