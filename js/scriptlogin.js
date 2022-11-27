ajax = new XMLHttpRequest();
function login(){
    userlogin = document.getElementById("login").value;
    senhalogin = document.getElementById("loginsenha").value;
    ajax.open("GET","http://localhost:8080/api/usuario/login?login="+userlogin+"&password="+senhalogin);
    ajax.send();
    ajax.onload = function(){
        if(this.status == 200){
            document.getElementById("modallogin");
            validacao=document.getElementById("validacao");
            validacao.style = "color: #198754";
            validacao.innerHTML = "Usuário Autenticado com sucesso. Aguarde..."
            setTimeout(function(){window.location.href = "produtos.html";}, 500)
        } else if(this.status == 401){
            validacao.style = "color: red";
            validacao.innerHTML = "Usuário ou senha incorreto(s)!"
        }
    }
}