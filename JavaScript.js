var personas = [];
$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  if(JSON.parse(localStorage.getItem('dataTarea5'))){  personas = JSON.parse(localStorage.getItem('dataTarea5')); }
  update();

  $('.modal').modal({
    dismissible : false
  });

  $('#tomarFoto').click(function(){
    var estado = $('#tomarFoto').attr('estadoId');
    if (estado=="1"){      
      Webcam.unfreeze();
      $('#tomarFoto').attr('estadoId','2');
    }else if(estado=="2"){
      Webcam.freeze();
      $('#tomarFoto').attr('estadoId','1');

    }
    

  });

  $('#cancelar').click(function(){
    Webcam.reset();
  });

  $('#agregar').click(function(){
    Webcam.snap( function(data_uri) {
        saveData(data_uri);
      } );
  });

  $('#add-person').click(function(){
      Webcam.set({
        width: 300,
        height: 230,
        image_format: 'jpeg',
        jpeg_quality: 90
      });
      Webcam.attach( '#camara' );
      $('#tomarFoto').attr('estadoId','2');

  });

});

function Personas(cedula,nombre,apellido,phone,string64){
  this.cedula=cedula;
  this.nombre=nombre;
  this.apellido=apellido;
  this.phone=phone;
  this.string64=string64;

}

function saveData(string64){

  var txtCedula = $('#txtCedula').val();
  var txtNombre = $('#txtNombre').val();
  var txtApellido = $('#txtApellido').val();
  var txtPhone = $('#txtPhone').val();

  var Persona = new Personas(txtCedula,txtNombre,txtApellido,txtPhone,string64);
  personas.push(Persona);
  Webcam.reset();
  update();

  console.log(personas);
}

function update(){
  $("#tbody tr").remove();
  var count = 0;

    var tbody = $('#table tbody'),
        props = ["cedula", "nombre", "apellido", "phone"];
    $.each(personas, function(i, personas) {
      var tr = $('<tr>');
      $.each(props, function(i, prop) {
        $('<td>').html(personas[prop]).appendTo(tr);
      });
      $('<td>').html('<img src="image.png" class="imagePreview" onClick="showImage('+count+')"/>').appendTo(tr);
      tbody.append(tr);
  count++;
    });
  localStorage.setItem('dataTarea5',JSON.stringify(personas));
}

function showImage(posicion){
  $('#modalImagen').modal('open');
  $('#imgPerson').attr('src',personas[posicion].string64);
}

