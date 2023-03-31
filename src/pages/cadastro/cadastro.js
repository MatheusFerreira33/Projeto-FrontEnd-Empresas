import { requestCreateUser,checkUserType } from "../../scripts/request.js";

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

function redirect() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((Element => {
        Element.addEventListener("click", () => {
            if (Element.className == "buttonWhite home desktop" || Element.className == "buttonWhite home") {
                window.location.replace("../../../index.html");

            } else if (Element.className == "buttonBrand login desktop" || Element.className == "buttonBrand login") {
                window.location.replace("../login/login.html");
            }
        })
    }))
}

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
showLoginRegister();

async function registrerUsers() {
    const buttonCadastrar = document.getElementById("cadastrar");

    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const select = document.querySelector("select");
    let valueSelect = "";

    select.addEventListener("change", () => {
        valueSelect = select.value;
    })

    buttonCadastrar.addEventListener("click", async (event) => {
        event.preventDefault();
        const data = {
            username: inputName.value,
            password: inputPassword.value,
            email: inputEmail.value,
            professional_level: valueSelect
        }

        const result = await requestCreateUser(data);

        if (result.error == undefined) {
            
            const divSucess = document.querySelector(".toastfySucess")
            divSucess.classList.add("cadastroSucesso");
            setTimeout(()=>{divSucess.classList.toggle("cadastroSucesso")},1000);
            setTimeout(()=>{window.location.replace("../login/login.html")},1000);

        } else if (result.error[0] == "insert a valid email!") {
            inputEmail.style = "border-color: #CE4646";

        } else if (result.error[0] == "username not empty!") {
            inputName.style = "border-color: #CE4646";
            

        } else if (result.error == "required field password!") {
            inputPassword.style = "border-color: #CE4646";
            

        } else if (result.error[0] == "email alread exists!") {
            const divError = document.querySelector(".toastfyError");
            divError.classList.add("cadastroError");
            setTimeout(()=>{divError.classList.toggle("cadastroError")},2000);
            
        }
    })
    const buttonRetornar = document.getElementById("retornar");

    buttonRetornar.addEventListener("click",(event)=>{
        event.preventDefault();
        window.location.replace("../login/login.html");
    })

}


redirect();
registrerUsers();