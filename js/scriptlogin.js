ajax = new XMLHttpRequest();
function login(){
    usuario=document.getElementById("login").value;
    senha=document.getElementById("senha").value;
    const login = JSON.stringify({
        "login": usuario,
        "password": senha
    });

    ajax.open("POST", "http://localhost:8080/login");
    ajax.setRequestHeader("Content-Type", "application/json");

    ajax.send(login);
    ajax.onload = function(){
        validacao=document.getElementById("validacao");
        if(this.status == 200){
            console.log(this.responseText);
            validacao.innerHTML = ""
            sessionStorage.setItem('token', this.responseText);
            window.location.href = "usuarios.html";
        }else if(this.status == 403){
            sessionStorage.setItem('token', '');
            validacao.style = "color: red";
            validacao.innerHTML = "Usuário ou senha incorreto(s)!"
        }
    }
}