import {checkUserType,getAllInfoUser,updateInfoUser,listDepartmentUser,listEmploessSameDepartment} from "../../scripts/request.js";

async function checkUser(){
    
    if(localStorage.getItem("JWT") == null){
        window.location.replace("/");
    }else{
        const token = JSON.parse(localStorage.getItem("JWT"));
        const result = await checkUserType(token);
        if(result.is_admin == true){
            window.location.replace("../admin/admin.html");
        }
    }
}
checkUser();

function logout(){
    const buttonLogout = document.getElementById("logout");

    buttonLogout.addEventListener("click",()=>{
        localStorage.clear();
        window.location.replace("/");
    })
}

async function renderInforUser(){
    const token = JSON.parse(localStorage.getItem("JWT"));
    const result = await getAllInfoUser(token);
    const data = [{...result}];
    const nameUser = document.querySelector(".nameUser");
    const infoUser = document.querySelector(".infoUser");
    
    const ul = document.createElement("ul");
    const buttonEditInfor = document.createElement("i");
    
    buttonEditInfor.className = "fa-solid fa-pencil";
    buttonEditInfor.style = "margin-top:-30px;cursor:pointer";
    
    data.map((Element=>{
        const name = document.createElement("h1");
        const emailUser = document.createElement("li");
        
        name.innerText = Element.username;
        emailUser.innerText = `Email:${Element.email}`;

        ul.append(emailUser);
        
        if(Element.professional_level){
            const levelUser = document.createElement("li");
            levelUser.innerText = Element.professional_level;
            ul.appendChild(levelUser);
        }

        if(Element.kind_of_work){
            const kindUser = document.createElement("li");
            kindUser.innerText = Element.kind_of_work;
            ul.appendChild(kindUser);
        }

        nameUser.appendChild(name);
        infoUser.append(ul,buttonEditInfor);
    }))

    buttonEditInfor.addEventListener("click",()=>{
        showModal();

    })
   
}

function showModal(){
    const containerModal = document.querySelector(".containerModal");
    const closeModal = document.querySelector(".headerModal > button");
    containerModal.classList.toggle("show-containerModal");

    closeModal.addEventListener("click",()=>{
        const valueInputName = document.getElementById("name");
        const valueInputEmail = document.getElementById("email");
        const valueInputPassword = document.getElementById("password");
        const toastfyError = document.querySelector(".toastfyError");
        
        toastfyError.innerHTML = "";
        valueInputName.value = "";
        valueInputEmail.value = "";
        valueInputPassword.value = "";
        toastfyError.classList.remove("user");
        containerModal.classList.remove("show-containerModal");

    })
    editInfoUser();
}

async function editInfoUser(){
    const JWT = JSON.parse(localStorage.getItem("JWT"));
    const buttonEditPerfil = document.getElementById("edit");
    const toastfyError = document.querySelector(".toastfyError");
    const valueInputName = document.getElementById("name");
    const valueInputEmail = document.getElementById("email");
    const valueInputPassword = document.getElementById("password");

    buttonEditPerfil.addEventListener("click", async(event)=>{
        event.preventDefault();
        
        if(!valueInputEmail.value && !valueInputName.value && !valueInputPassword.value){
            toastfyError.innerHTML = "Por favor preencha pelo menos 1 campo";
            toastfyError.classList.add("user");
            setTimeout(()=>{ toastfyError.classList.remove("user"),toastfyError.innerHTML=""},3000);
        }else{
            const datas = {
                username:valueInputName.value,
                password:valueInputPassword.value,
                email:valueInputEmail.value
            }
            const result = await updateInfoUser(datas,JWT);
            if(result.error == undefined){
                const containerModal = document.querySelector(".containerModal");
                containerModal.classList.remove("show-containerModal");

                const toastfySucess = document.querySelector(".toastfySucess");
                toastfySucess.classList.toggle("sucesso");
                setTimeout(()=>{toastfySucess.classList.toggle("sucesso")},1000);
                setTimeout(()=>{window.location.reload()},1000);
            }else if(result.error){
                toastfyError.innerHTML = "Email ja existe";
                toastfyError.classList.add("user");
                setTimeout(()=>{ toastfyError.classList.remove("user"),toastfyError.innerHTML=""},3000);
            }
        }
    })

}

async function renderInforDepartmentUser(){
    const token = JSON.parse(localStorage.getItem("JWT"));
    const department = document.querySelector(".department");
    const checkDepartment = await listDepartmentUser();
    const {department_uuid} = await getAllInfoUser(token);
    

    if(checkDepartment.error == "you don't belong to a department"){
        department.innerHTML = "";
        department.style = "background-color: #f8f8f8;";
        const titleNoDepartment = document.createElement("h1");
        titleNoDepartment.innerText = "Você ainda não foi contratado";
        department.appendChild(titleNoDepartment);
    }else{
        const headerDepartment = document.querySelector(".headerDepartment");
        const mainDepartment = document.querySelector(".mainDepartment"); 
        const titleHeader = document.createElement("h1");
        let {name} = Array.from(checkDepartment.departments).find((Element=>{
            if(Element.uuid == department_uuid){
                return Element.name;
            }
        }))
        const cowerkers = await listEmploessSameDepartment();
        
        Array.from(cowerkers).forEach((Element=>{
            Array.from(Element.users).forEach((Element=>{
                const li = document.createElement("li");
                const username = document.createElement("h3");
                const level = document.createElement("span");

                username.innerText = Element.username;
                level.innerText = Element.professional_level;

                li.append(username,level);
                mainDepartment.appendChild(li);
            }))
        }))
        

        titleHeader.innerText = `${checkDepartment.name} - ${name}`;
        headerDepartment.appendChild(titleHeader);
    }
}

renderInforDepartmentUser();
renderInforUser();
logout();