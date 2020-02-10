var url = "bd/crud.php";

var Usuarios = new Vue({    
el: "#Usuarios",   
data:{     
     id:[],          
     nombre:"",
     correo:"",
     codRespuesta:"",
     total:0,       
 },    
methods:{  
    //BOTONES        
    btnAlta:async function(){                    
        const {value: formValues} = await Swal.fire({
        title: 'NUEVO',
        html:
        '<div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="marca" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Modelo</label><div class="col-sm-7"><input id="modelo" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Stock</label><div class="col-sm-7"><input id="stock" type="number" min="0" class="form-control"></div></div>',              
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',          
        confirmButtonColor:'#1cc88a',          
        cancelButtonColor:'#3085d6',  
        preConfirm: () => {            
            return [
              this.correo = document.getElementById('Nombre').value,
              this.correo = document.getElementById('Correo').value,
             this.codRespuesta = document.getElementById('Ocupación').value                    
            ]
          }
        })        
        if(this.marca == "" || this.modelo == "" || this.stock == 0){
                Swal.fire({
                  type: 'info',
                  title: 'Datos incompletos',                                    
                }) 
        }       
        else{          
          this.altaUsuario();          
          const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire({
              type: 'success',
              title: '¡Usuario Agregado!'
            })                
        }
    },           
    btnEditar:async function(id, nombre, correo, codRespuesta){                            
        await Swal.fire({
        title: 'EDITAR',
        html:
        '<div class="form-group"><div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="identificacion" value="'+identificacion+'" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Correo Electronico</label><div class="col-sm-7"><input id="correo" value="'+correo+'" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Stock</label><div class="col-sm-7"><input id="stock" value="'+stock+'" type="number" min="0" class="form-control"></div></div></div>', 
        focusConfirm: false,
        showCancelButton: true,                         
        }).then((result) => {
          if (result.value) {                                             
            correo = document.getElementById('Correo').value,    
            ocupacion = document.getElementById('ocupacion').value,
            codRespuesta = document.getElementById('codRespuesta').value,                    
            
            this.editarUsuario(nombre,correo,ocupacion,codRespuesta);
            Swal.fire(
              '¡Actualizado!',
              'El registro ha sido actualizado.',
              'success'
            )                  
          }
        });
        
    },        
    btnBorrar:function(id){        
        Swal.fire({
          title: '¿Está seguro de borrar el registro: '+nombre+" ?",         
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor:'#d33',
          cancelButtonColor:'#3085d6',
          confirmButtonText: 'Borrar'
        }).then((result) => {
          if (result.value) {            
            this.borrarUsuario(nombre);             
            //y mostramos un msj sobre la eliminación  
            Swal.fire(
              '¡Eliminado!',
              'El registro ha sido borrado.',
              'success'
            )
          }
        })                
    },       
    
    //PROCEDIMIENTOS para el CRUD     
    listarUsuarios:function(){
        axios.post(url, {opcion:4}).then(response =>{
           this.usuarios = response.data;       
        });
    },    
    //Procedimiento CREAR.
    altaMovil:function(){
        axios.post(url, {opcion:1, id:this.id, correo:this.correo,stock:this.stock }).then(response =>{
            this.listarUsuarios();
        });        
         this.marca = "",
         this.modelo = "",
         this.stock = 0
    },               
    //Procedimiento EDITAR.
    editarMovil:function(id,nombre,correo,stock){       
       axios.post(url, {opcion:2, id:id, nombre:nombre, correo: correo, stock:stock }).then(response =>{           
           this.listarUsuarios();           
        });                              
    },    
    //Procedimiento BORRAR.
    borrarUsuario:function(id){
        axios.post(url, {opcion:3, id:id}).then(response =>{           
            this.listarUsuarios();
            });
    }             
},      
created: function(){            
   this.listarUsuarios();            
},   
computed:{
    totalStock(){
        this.total = 0;
        for(usuario of this.usuarios){
            this.total = this.total + parseInt(usuario.stock);
        }
        return this.total;   
    }
}    
});