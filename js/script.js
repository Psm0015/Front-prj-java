ajax = new XMLHttpRequest();
ajax.open("GET","https://pedro-mota-qua209050.herokuapp.com/api/usuario/");
ajax.send();
ajax.onload = function(){
    userList=this.responseText;
    userList=JSON.parse(userList);

    document.getElementById("ListaUsers").innerHTML = "Lista de pessoas <br>";
    txt = " "
    for(const i of userList){
        txt += "Nome: "+i.nome+"<br>"
        txt += "Email: "+i.email+"<br>"
    }
    document.getElementById("ListaUsers").innerHTML = txt
}