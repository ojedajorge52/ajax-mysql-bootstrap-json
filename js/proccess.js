var form = document.getElementById('add_form');
var agregar = document.getElementById('add');

function crearUsuario(){
    var form_datos = new FormData(form);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'nuevo.php', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status ==200){
            var resultado = xhr.responseText;   
            var json = JSON.parse(resultado);
        }
    }
    xhr.send(form_datos);
}
function sh(){
    var xhr =  new XMLHttpRequest();
    xhr.open("GET", 'showdata.php', true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var tab = document.getElementById('tbody1');
            tab.innerHTML = xhr.responseText;
        }
    }
    xhr.send();
}


agregar.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
    setTimeout(function(){
        sh();
    },100);
});


document.addEventListener('DOMContentLoad', function(){
    sh();
});