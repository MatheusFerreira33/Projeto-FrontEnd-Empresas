
import { loginUser, checkUserType } from "../../scripts/request.js";


async function checkUser(){
    if(localStorage.getItem("JWT") == null){
    
    }else{
        const token = JSON.parse(localStorage.getItem("JWT"));
        const result = await checkUserType(token);
        if(result.is_admin == true){
            window.location.replace("../admin/admin.html");
        }else{
            window.location.replace("../user/user.html");
        }
    }
}
checkUser();


function showLoginRegister() {
    const li = document.getElementById("dropwn");
    const lines = document.querySelector(".fa-solid");
    const buttons = document.querySelector("header > .buttons");

    const x = document.createElement("i");
    x.className = "fa-solid fa-x";
    x.style = "cursor:pointer";

    lines.addEventListener("click", () => {
        buttons.classList.toggle("show-buttons");
        li.removeChild(lines);
        li.appendChild(x);

    })
    x.addEventListener("click", () => {
        buttons.classList.toggle("show-buttons");
        li.removeChild(x);
        li.appendChild(lines);
    })
}


function redirect() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((Element => {
        Element.addEventListener("click", () => {
            if (Element.className == "buttonWhite home desktop" || Element.className == "buttonWhite home") {
                window.location.replace("../../../index.html");

            } else if (Element.className == "buttonBrand login desktop" || Element.className == "buttonBrand login") {
                window.location.replace("../cadastro/cadastro.html");
            }
        })
    }))
}

async function login() {
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const buttonLogar = document.getElementById("logar");

    buttonLogar.addEventListener("click", async (event) => {
        event.preventDefault();
        
        const data = {
            email: inputEmail.value,
            password: inputPassword.value,
        }
        
        const result = await loginUser(data);
        
        if (result.error == undefined) {
            const toastfySucess = document.querySelector(".toastfySucess");
            toastfySucess.classList.toggle("show-Sucesso");
            const {is_admin} = await checkUserType(result);
            localStorage.setItem("JWT",JSON.stringify(result));
            
            if (is_admin == true) {
                setTimeout(() => { window.location.replace("../admin/admin.html") }, 1000);
            } else {
                setTimeout(()=>{window.location.replace("../user/user.html")},1000);
            }
            
        } else if (result.error) {
            const toastfyError = document.querySelector(".toastfyError");
            toastfyError.classList.toggle("show-Error");
            setTimeout(() => { toastfyError.classList.toggle("show-Error") }, 2000);
        }
    })
    const buttonBackRegistrer = document.getElementById("cadastrar");

    buttonBackRegistrer.addEventListener("click",(event)=>{
        event.preventDefault();
        window.location.replace("../cadastro/cadastro.html");
    })
}

login();
redirect();
showLoginRegister();