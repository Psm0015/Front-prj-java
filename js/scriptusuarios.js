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
        txt += "<tr><td>"+i.nome+"</td>"
        txt += "<td>"+i.email+" </td>"
        txt += "<td><input type='button' value='Editar' onclick='editar("+u+")' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modaleditar'>   "
        txt += "<input type='button' value='Apagar' onclick='apagar("+u+")' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#modalapagar'></td></tr>"
        
        
        u++
    }
    document.getElementById("ListaUsers").innerHTML = txt
    }
}
listar();
function incluir(){
    var usuario = {};
    usuario.nome = document.getElementById("addnome").value;
    usuario.email = document.getElementById("addemail").value;
    ajax.open("POST","https://pedro-mota-qua209050.herokuapp.com/api/usuario/");
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(usuario));
    ajax.onload = function(){
        console.log(this.responseText);
        listar();
    }
}
function editar(u){
    u = userList[u];
    document.getElementById("ided").value = u.id;
    document.getElementById("nomeed").value = u.nome;
    document.getElementById("emailed").value = u.email;
}
function editarconfirm(){
    useradd = {}
    useradd.id = document.getElementById("ided").value;
    useradd.nome = document.getElementById("nomeed").value;
    useradd.email = document.getElementById("emailed").value;
    ajax.open("PUT","https://pedro-mota-qua209050.herokuapp.com/api/usuario/");
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(useradd));
    ajax.onload = function(){
        listar();
    }
}
function apagar(u){
    u = userList[u]
    document.getElementById("nomeapgr").innerHTML = "Nome: "+u.nome;
    document.getElementById("emailapgr").innerHTML = "Email: "+u.email;
    idpg=document.getElementById("idapgr").value = u.id;
}
function apagarconfirm(){
    ajax.open("DELETE","https://pedro-mota-qua209050.herokuapp.com/api/usuario/"+idpg);
    ajax.send();
    ajax.onload = function(){
        alert(this.responseText);
        listar();
    }
}
