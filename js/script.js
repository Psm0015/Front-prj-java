ajax = new XMLHttpRequest();
var userList;
function listar(){
    ajax.open("GET","https://pedro-mota-qua209050.herokuapp.com/api/usuario/");
    ajax.send();
    ajax.onload = function(){
    userList=this.responseText;
    userList=JSON.parse(userList);

    document.getElementById("ListaUsers").innerHTML = "Lista de pessoas <br>";
    txt = " "
    u = 0;
    for(const i of userList){
        //txt += "Id: "+i.id+"<br>"
        txt += "Nome: "+i.nome+" - "
        txt += "Email: "+i.email+" <span onclick='editar("+u+")'>📃</span> <br>"
        u++
    }
    document.getElementById("ListaUsers").innerHTML = txt
    }
}
listar();
function incluir(){
    var usuario = {};
    usuario.nome = document.getElementById("nome").value;
    usuario.email = document.getElementById("email").value;
    //console.log(usuario)

    usuario.id=document.getElementById("id").value;
    if(usuario.id>0){
        metodo = "PUT";
    }else{
        metodo = "POST";
    }

    ajax.open(metodo,"https://pedro-mota-qua209050.herokuapp.com/api/usuario/");
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(usuario));
    ajax.onload = function(){
        console.log(this.responseText);
        listar();
        limpar();
    }
}
function limpar(){
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}
function editar(u){
    u = userList[u];
    document.getElementById("id").value = u.id;
    document.getElementById("nome").value = u.nome;
    document.getElementById("email").value = u.email;
}
function apagar(){
    id=document.getElementById("id").value;
    ajax.open("DELETE","https://pedro-mota-qua209050.herokuapp.com/api/usuario/"+id);
    ajax.send();
    ajax.onload = function(){
        alert(this.responseText);
        listar();
        limpar();
    }
}