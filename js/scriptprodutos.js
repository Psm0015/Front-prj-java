ajax = new XMLHttpRequest();
var prList;
listar()
function listar(){
    ajax.open("GET","https://pedro-mota-qua209050.herokuapp.com/api/produto/");
    ajax.send();
    ajax.onload = function(){
        prList=this.responseText;
        prList=JSON.parse(prList);
        //console.log(prList)
        txt = " "
        p = 0;
        for(const i of prList){
            //txt += "Id: "+i.id+"<br>"
            txt += "<tr><td>"+i.nome+"</td>"
            txt += "<td>"+i.descricao+" </td>"
            txt += "<td>"+i.valor+" </td>"
            txt += "<td><input type='button' value='Editar' onclick='editar("+p+")' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#modaleditar'>   "
            txt += "<input type='button' value='Apagar' onclick='apagar("+p+")' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#modalapagar'></td></tr>"

            p++
        }
        document.getElementById("ListaProdutos").innerHTML = txt;
    }
}
function incluir(){
    var produto = {}
    produto.nome = document.getElementById("addnome").value;
    produto.descricao = document.getElementById("adddesc").value;
    produto.valor = document.getElementById("addvalor").value;
    ajax.open("POST","https://pedro-mota-qua209050.herokuapp.com/api/produto/");
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(produto));
    ajax.onload = function(){
        listar()
    }
}
function editar(p){
    p= prList[p];
    document.getElementById("ided").value = p.id;
    document.getElementById("nomeed").value = p.nome;
    document.getElementById("desced").value = p.descricao;
    document.getElementById("valored").value = p.valor;
}
function editarconfirm(){
    pred = {}
    pred.id = document.getElementById("ided").value;
    pred.nome = document.getElementById("nomeed").value;
    pred.descricao = document.getElementById("desced").value;
    pred.valor = document.getElementById("valored").value;
    ajax.open("PUT","https://pedro-mota-qua209050.herokuapp.com/api/produto/");
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(pred));
    ajax.onload = function(){
        listar();
    }
}
function apagar(p){
    p= prList[p];
    document.getElementById("idapgr").value = p.id;
    document.getElementById("nomeapgr").innerHTML = "Nome: "+p.nome;
    document.getElementById("descapgr").innerHTML = "Descrição: "+p.descricao;
    document.getElementById("valorapgr").innerHTML = "Valor: "+p.valor;
}
function apagarconfirm(){
    idApgr=document.getElementById("idapgr").value
    ajax.open("DELETE","https://pedro-mota-qua209050.herokuapp.com/api/produto/"+idApgr);
    ajax.send();
    ajax.onload = function(){
        alert(this.responseText);
        listar();
    }
}