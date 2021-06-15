const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_oez1yb9';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      //btn.value = 'Email Enviando';
      //alert('Mail de Contacto Enviado!');
       //alerta
       Swal.fire({
        type: 'info',
        title: 'Mail de Contacto Enviado!...',
        text: '',
        showConfirmButton: false,
        timer: 2000
      })
      document.getElementById("destinatario").value = "";
      document.getElementById("cc_to").value = "";
      document.getElementById("mensaje").value = "";
     
    }, (err) => {
      //btn.value = 'Error al enviar el Email de Contacto';
      //alert(JSON.stringify(err));
      Swal.fire({
        type: 'info',
        title: 'Error al enviar el Email de Contacto!...',
        text: '',
        showConfirmButton: false,
        timer: 5000
      })
    });
});