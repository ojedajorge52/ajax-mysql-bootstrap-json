class Productos{
    constructor(id, producto, precio){
        this.id = id;
        this.producto = producto;
        this.precio = precio;
    }
}
/*** get data from json of backend*/
function loadData(){
    var xhr =  new XMLHttpRequest();
    xhr.open("GET", 'modules/read.php', true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var tab = document.getElementById('dataloader');
            var jsonn = JSON.parse(xhr.responseText);
            readJSON(jsonn);
        }
    }
    xhr.send();
}
/*** show Message after ajax process */
var form = document.getElementById('add_form');

function messaje(messaje, type){
    var tipo = 'alert-'+type;
    $('#divMessage').addClass(tipo);
    $('#divMessage>label').text(messaje);
    $('#dataloader>tr').remove();
    setTimeout(function(){
        $('.alert').alert('close');
    }, 3000);
}
class CRUD{
    remove(objeto){
            const id = 'id='+$(objeto).attr('data-id');
            console.log(id);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'modules/delete.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status ==200){
                    var resultado = xhr.responseText;
                    console.log(resultado);
                    messaje('Eliminado correctamente', 'info');
                    loadData();
                }
            }
            xhr.send(id);
    }
    update(objeto){
        let idx = $(objeto).parent().find('input[name="id"]').val();
        let nombrex = $(objeto).parent().find('input[name="producto"]').val();
        let preciox = $(objeto).parent().find('input[name="precio"]').val();
        let data = "id="+idx+"&nombre="+nombrex+"&precio="+preciox;
        console.log(data);
        var xhr = new XMLHttpRequest(); 
        xhr.open('POST', 'modules/update.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status ==200){
                var resultado = xhr.responseText;
                console.log(resultado);
                const jaj = '#launch'+idx;
                $(jaj).modal('hide');
                messaje('Actualizado correctamente', 'info');
                loadData();
            }
        }
        xhr.send(data);
    }
}

class Methods{
    showModalEdit(productos){
        const mod = document.getElementById('modales');
        const modal = document.createElement('div');
        modal.innerHTML = `
        <div class="modal fade" tabindex="-1" role="dialog" id="launch${productos.id}">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">Detalles de producto</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" name="id" value="${productos.id}" hidden>
                        </div>
                        <div class="form-group">
                            <label>Nombre</label>
                            <input type="text" class="form-control" placeholder="Producto" name="producto" value="${productos.producto}" required>
                        </div>
                        <div class="form-group">
                            <label>Precio</label>
                            <input type="text" class="form-control" placeholder="Precio" name="precio" value="${productos.precio}" required>
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" name="update" data-id="${productos.id}" class="btn btn-primary">Actualizar</button>
                    </form>
                </div>
                <div class="modal-footer">
                    
                </div>
                </div>
            </div>
        </div>
        `;
        const jaj = '#launch'+productos.id;
        mod.appendChild(modal);
        $(jaj).modal('show');
    }
    showModalDelete(productos){
        const mod = document.getElementById('modales');
        const modal = document.createElement('div');
        modal.innerHTML = `
        <div class="modal fade" tabindex="-1" role="dialog" id="delete${productos.id}">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title"> <i class="material-icons">warning</i> Advertencia</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>¿Estás seguro de eliminar <strong>${productos.producto}</strong>?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" data-id="${productos.id}" name="delete" data-dismiss="modal" class="btn btn-danger">Eliminar</button>
            </div>
            </div>
        </div>
    </div>
        
        `;
        const jaj = '#delete'+productos.id;
        mod.appendChild(modal);
        $(jaj).modal('show');
    }
}
/*** run functions for launch modals edit*/
document.getElementById('dataloader').addEventListener('click', function(e){
    if($(e.target).attr('name')==='launch'){
        var id = $(e.target).parents('td').prev().prev().prev().text();
        $(e.target).attr('data-target','#launch'+id);
        var producto = $(e.target).parents('td').prev().prev().text();
        var precio = $(e.target).parents('td').prev().text();
        const productos = new Productos(id, producto, precio);
        const methods = new Methods();
        methods.showModalEdit(productos);
    }
});
/*** run functions for launch modals delete */
document.getElementById('dataloader').addEventListener('click', function(e){
    if($(e.target).attr('name')==='delete'){
        var id = $(e.target).parents('td').prev().prev().prev().text();
        $(e.target).attr('data-target','#delete'+id);
        var producto = $(e.target).parents('td').prev().prev().text();
        var precio = $(e.target).parents('td').prev().text();
        const productos = new Productos(id, producto, precio);
        const methods = new Methods();
        methods.showModalDelete(productos);
    }
});

/*** send item id for delete in backend*/
$('#modales').click(function(e){
    e.preventDefault();
    const crud = new CRUD();
    const item = e.target;
    if(item.name === 'delete'){
        crud.remove(e.target);
    }
    if(item.name === 'update'){
        crud.update(e.target);
    }       
});

/*** process ajax for insert new product */
$('#add_form').submit(function(e){
    e.preventDefault();
    var form_datos = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'modules/create.php', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status ==200){
            var resultado = xhr.responseText;
            console.log(resultado);
            form.reset();
            messaje('Agregado correctamente', 'success');
            loadData();
        }
    }
    xhr.send(form_datos);
});
/*** proccess json and show data in table */
function readJSON(json){
    var js = json;
    let template ='';
    json.forEach(producto => {
        template += `
            <tr>
                <td hidden>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                    <i name="launch" class="material-icons">launch</i>&nbsp;&nbsp;&nbsp;
                    <i name="delete" class="material-icons">delete</i>
                </td>
            </tr>
        `;
    });
    $('#dataloader').html(template);
}

/*** load functions at load page*/
$(document).ready(function(){
    loadData();
});