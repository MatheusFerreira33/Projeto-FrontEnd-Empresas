import {
    checkUserType, requestDepartments, requestAllCompanies, requestCreateDepartments, editDescriptionDepartments
    , deleteDepartments, usersNoDepartments, toHideEmployees, requestAllUsers, requestOffEmploss,editInfoEmploess,
    DeleteUser
} from "../../scripts/request.js";

async function checkAdmin() {
    if (localStorage.getItem("JWT") == null) {
        window.location.replace("/");
    } else {
        const token = JSON.parse(localStorage.getItem("JWT"));
        const result = await checkUserType(token);
        if (result.is_admin == false) {
            window.location.replace("../user/user.html");
        }
    }
}
checkAdmin();

function logoutAdmin() {
    const buttonLogout = document.querySelector("header > button");
    buttonLogout.addEventListener("click", () => {
        localStorage.clear();
        window.location.replace("/");
    })
}

async function renderDepartments() {
    const mainDepartments = document.querySelector(".mainDepartments");
    const result = await requestDepartments();

    Array.from(result).map((Element => {
        const card = document.createElement("li");
        const departmentName = document.createElement("h3");
        const departmentDescription = document.createElement("p");
        const companyName = document.createElement("span");
        const divSettings = document.createElement("div");
        const view = document.createElement("i");
        const edit = document.createElement("i");
        const remove = document.createElement("i");
        const hr = document.createElement("hr");

        departmentName.innerText = Element.name;
        departmentDescription.innerText = Element.description;
        companyName.innerText = Element.companies.name;

        divSettings.className = "divSettings";
        view.className = "fa-solid fa-eye";
        view.style = "cursor:pointer;";
        view.setAttribute("id", Element.uuid);
        view.setAttribute("data-modal-control", "containerViewDepartments");
        view.addEventListener("click", () => {
            renderViewDepartments(Element.name, Element.description, Element.companies.name, Element.uuid);
        })


        edit.className = "fa-solid fa-pencil";
        edit.style = "cursor:pointer;";
        edit.setAttribute("id", Element.uuid);
        edit.setAttribute("data-modal-control", "containerEditDepartments");
        edit.addEventListener("click", () => {
            editDepartments(edit.getAttribute("id"));
        })


        remove.className = "fa-regular fa-trash-can";
        remove.style = "cursor:pointer";
        remove.setAttribute("id", Element.uuid);
        remove.setAttribute("data-modal-control", "containerDeleteDepartments");

        const p = document.querySelector(".modalDeleteDepartments > .mainModal > p");

        remove.addEventListener("click", () => {
            const buttonConfirmed = document.getElementById("buttonConfirmed");
            p.innerHTML = `Realmente deseja deletar o Departamento ${Element.name} e demitir seus funcionários?`

            buttonConfirmed.addEventListener("click", () => {
                deleteDepartments(remove.getAttribute("id"));
                const Sucesso = document.querySelector(".Sucesso");
                Sucesso.innerHTML = "Deletado com sucesso";
                Sucesso.classList.add("showError");
                setTimeout(() => { Sucesso.classList.remove("showError") }, 1000);
                setTimeout(() => { window.location.replace("./admin.html") }, 1000);
            })
        })

        divSettings.append(view, edit, remove);

        card.append(departmentName, departmentDescription, companyName, divSettings, hr);
        mainDepartments.appendChild(card);

    }))
    showModal();
}



async function filterDepartments() {
    const select = document.getElementById("selectCompanies");

    select.addEventListener("change", async () => {

        if (select.value == "selecionar_empresas") {
            const mainDepartments = document.querySelector(".mainDepartments");
            mainDepartments.innerHTML = "";
            renderDepartments();
            showModal();
        } else {
            const result = await requestAllCompanies();
            const { uuid } = Array.from(result).find((Element => {
                if (Element.name == select.value) {
                    return Element.uuid;
                }
            }))

            const response = await requestDepartments();

            const resultFinal = Array.from(response).filter((Element => {
                if (Element.companies.uuid == uuid) {
                    return Element;
                }
            }))
            renderDepartmentsFilter(resultFinal);
            showModal();
        }

    })
}

function renderDepartmentsFilter(object) {
    const mainDepartments = document.querySelector(".mainDepartments");
    mainDepartments.innerHTML = "";

    if (object.length == 0) {
        const h1 = document.createElement("h1");
        h1.innerText = "Essa empresa ainda não tem departamentos";
        mainDepartments.appendChild(h1);
        showModal();

    } else {
        Array.from(object).map((Element => {
            const card = document.createElement("li");
            const departmentName = document.createElement("h3");
            const departmentDescription = document.createElement("span");
            const companyName = document.createElement("span");
            const divSettings = document.createElement("div");
            const view = document.createElement("i");
            const edit = document.createElement("i");
            const remove = document.createElement("i");
            const hr = document.createElement("hr");

            departmentName.innerText = Element.name;
            departmentDescription.innerText = Element.description;
            companyName.innerText = Element.companies.name;

            divSettings.className = "divSettings";
            view.className = "fa-solid fa-eye";
            view.style = "cursor:pointer;";
            view.setAttribute("id", Element.uuid);
            view.setAttribute("data-modal-control", "containerViewDepartments");
            view.addEventListener("click", () => {
                const containerViewDepartments = document.querySelector(".containerViewDepartments");
                containerViewDepartments.classList.add("show-modal");
                renderViewDepartments(Element.name, Element.description, Element.companies.name, Element.uuid);
            })

            edit.className = "fa-solid fa-pencil";
            edit.style = "cursor:pointer;";
            edit.setAttribute("id", Element.uuid);
            edit.setAttribute("data-modal-control", "containerEditDepartments");
            edit.addEventListener("click", () => {
                const containerEditDepartments = document.getElementById("containerEditDepartments");
                containerEditDepartments.classList.add("show-modal");
                editDepartments(edit.getAttribute("id"));
            })


            remove.className = "fa-regular fa-trash-can";
            remove.style = "cursor:pointer";
            remove.setAttribute("id", Element.uuid);
            remove.setAttribute("data-modal-control", "containerDeleteDepartments");
            const p = document.querySelector(".modalDeleteDepartments > .mainModal > p");

            remove.addEventListener("click", () => {
                const buttonConfirmed = document.getElementById("buttonConfirmed");
                const containerDeleteDepartments = document.getElementById("containerDeleteDepartments");
                containerDeleteDepartments.classList.add("show-modal");
                p.innerHTML = `Realmente deseja deletar o Departamento ${Element.name} e demitir seus funcionários?`;

                buttonConfirmed.addEventListener("click", () => {
                    deleteDepartments(remove.getAttribute("id"));
                    const Sucesso = document.querySelector(".Sucesso");
                    Sucesso.innerHTML = "Deletado com sucesso";
                    Sucesso.classList.add("showError");
                    setTimeout(() => { Sucesso.classList.remove("showError") }, 1000);
                    setTimeout(() => { window.location.replace("./admin.html") }, 1000);
                })

            })

            divSettings.append(view, edit, remove);

            card.append(departmentName, departmentDescription, companyName, divSettings, hr);
            mainDepartments.appendChild(card);


        }))
        showModal();
    }

}

function showModal() {
    const modals = document.querySelectorAll("[data-modal-control]");

    modals.forEach((Element => {
        Element.addEventListener("click", () => {
            const valueModal = Element.getAttribute("data-modal-control");
            document.getElementById(valueModal).classList.toggle("show-modal");
        })
    }))

    return modals;
}

async function createDepartments() {
    const closeModal = document.getElementById("closeModal");
    const select = document.getElementById("companies");
    const inputNameDepartments = document.getElementById("departamento");
    const inputDescription = document.getElementById("descricao");
    const createDepartments = document.getElementById("createDepartments");
    let id = "";

    closeModal.addEventListener("click", () => {
        inputNameDepartments.value = "";
        inputDescription.value = "";
    })

    select.addEventListener("change", async () => {

        if (select.value == "selecionar_empresas") {
            return 0;
        } else {
            const result = await requestAllCompanies();
            const { uuid } = Array.from(result).find((Element => {
                if (Element.name == select.value) {
                    return Element.uuid;
                }
            }))
            id = uuid;
        }
    })

    createDepartments.addEventListener("click", (event) => {
        event.preventDefault();
        if (!inputNameDepartments.value || !inputDescription.value || select.value == "selecionar_empresas") {
            const toastfyError = document.querySelector(".toastfyError");
            toastfyError.classList.toggle("errorAdmin");
            setTimeout(() => { toastfyError.classList.toggle("errorAdmin") }, 2000);
        } else {
            const datas = {
                name: inputNameDepartments.value,
                description: inputDescription.value,
                company_uuid: id
            }
            const result = requestCreateDepartments(datas);
            if (result) {
                const toastfySucess = document.querySelector(".toastfySucess");
                toastfySucess.classList.toggle("Sucess");
                setTimeout(() => { window.location.replace("./admin.html") }, 1000);
            }
        }
    })
    showModal();
}

async function editDepartments(id) {
    const descriptionDepartments = document.getElementById("descriptionDepartments");
    const buttonEditInfo = document.getElementById("editInfo");
    const result = await requestDepartments();
    const { description } = Array.from(result).find((Element => {
        if (Element.uuid == id) {
            return Element.description;
        }
    }))
    descriptionDepartments.value = description;

    buttonEditInfo.addEventListener("click", async (event) => {
        event.preventDefault();

        if (!descriptionDepartments.value) {
            const Error = document.querySelector(".Error");
            Error.classList.add("showError");
            setTimeout(() => { Error.classList.remove("showError") }, 2000);

        } else {
            const result = await editDescriptionDepartments(descriptionDepartments.value, id);
            const Sucesso = document.querySelector(".Sucesso");
            Sucesso.classList.add("showError");
            setTimeout(() => { Sucesso.classList.remove("showError") }, 1000);
            setTimeout(() => { window.location.replace("./admin.html") }, 1000);
        }
    })
}

async function renderViewDepartments(nameDepartments, descriptionDepartments, company, idDepartments) {
    const tituloDepartments = document.querySelector(".modalViewDepartments > .mainModal > .tituloDepartments > h1");
    const box1 = document.querySelector(".modalViewDepartments > .mainModal > .boxMain > .box1");
    box1.innerHTML = "";
    const box2 = document.querySelector(".modalViewDepartments > .mainModal > .boxMain > .box2");
    box2.innerHTML = "";
    const listemploess = document.querySelector(".listemploess");
    listemploess.innerHTML = "";

    const select = document.createElement("select");
    const option = document.createElement("option");
    const description = document.createElement("h3");
    const nameCompany = document.createElement("span");
    const buttonToHire = document.createElement("button");

    tituloDepartments.innerText = nameDepartments;
    description.innerText = descriptionDepartments;
    nameCompany.innerText = company;
    buttonToHire.className = "buttonGreen";
    buttonToHire.innerText = "Contratar";
    buttonToHire.classList.add("toHide");

    select.name = "employees";
    select.id = "employees";
    option.value = "selecionar usuario";
    option.innerText = "Selecionar usuário";

    select.append(option);

    const employees = await usersNoDepartments();

    Array.from(employees).map((Element => {
        const option = document.createElement("option");

        option.value = Element.username;
        option.id = Element.uuid;
        option.innerText = Element.username;

        select.append(option);
    }))

    buttonToHire.addEventListener("click", async () => {
        let employeesId = "";

        if (select.value == "selecionar usuario") {
            const ErrorView = document.querySelector(".ErrorView");
            ErrorView.style = "display:flex";
            setTimeout(() => { ErrorView.style = "display:none" }, 2000);
        } else {
            employeesId = Array.from(select.options).find((Element => {
                if (Element.value == select.value) {
                    return Element.id;
                }
            }))
            const result = await toHideEmployees(employeesId.getAttribute("id"), idDepartments);
            const SucessoView = document.querySelector(".SucessoView");
            SucessoView.style = "display:flex";
            setTimeout(() => { SucessoView.style = "display:none" }, 1000);
            setTimeout(() => { window.location.replace("./admin.html") }, 1000);
        }
    })
    const users = await requestAllUsers();
    let coworkers = Array.from(users).filter((Element => {
        if (Element.department_uuid == idDepartments) {
            return Element;
        }
    }))

    if (coworkers.length == 0) {
        const noEmploess = document.createElement("h1");
        noEmploess.innerText = "Esse departamento ainda não possui funcionarios";
        listemploess.appendChild(noEmploess);
    } else {
        coworkers.map((Element => {
            const li = document.createElement("li");
            const username = document.createElement("h3");
            const level = document.createElement("span");
            const companyName = document.createElement("span");
            const buttonOff = document.createElement("button");
            const hr = document.createElement("hr");

            username.innerText = Element.username;
            level.innerText = Element.professional_level;
            companyName.innerText = company;
            buttonOff.innerHTML = "Desligar";
            buttonOff.className = "buttonRed";
            buttonOff.classList.add("buttonOff");
            buttonOff.setAttribute("id", Element.uuid);

            buttonOff.addEventListener("click", async (event) => {
                const result = await requestOffEmploss(event.target.id);
                const Sucesso = document.querySelector(".Sucesso");
                Sucesso.innerHTML = "Funcionario demitido com sucesso";
                Sucesso.classList.add("showError");
                setTimeout(() => { Sucesso.classList.remove("showError") }, 1000);
                setTimeout(() => { window.location.replace("./admin.html") }, 1000);
            })


            li.append(username, level, companyName, buttonOff, hr);
            listemploess.append(li);
        }))

    }


    box1.append(description, nameCompany);
    box2.append(select, buttonToHire);
}

async function renderAllUsers() {
    const usersDepartments = document.querySelector(".usersDepartments");
    const users = await requestAllUsers();

    Array.from(users).map((async Element => {
        if (Element.email == "admin@mail.com") {
            return 0;
        } else {
            const li = document.createElement("li");
            const username = document.createElement("h3");
            const level = document.createElement("span");
            const itens = document.createElement("div");
            const hr = document.createElement("hr");
            const pencil = document.createElement("i");
            const trash = document.createElement("i");

            const departments = await requestDepartments();
            let companies = Array.from(departments).find((department => {
                if(department.uuid == Element.department_uuid){
                    return department.companies.name;
                }
            }))
            const companyName = document.createElement("span");
            if(companies == undefined){
                    companyName.innerText = "";
            }else{
                companyName.innerText = companies.companies.name;
            }

            username.innerText = Element.username;
            level.innerText = Element.professional_level;
            itens.className = "itens";
            trash.className = "fa-regular fa-trash-can";
            trash.style = "cursor:pointer";
            trash.setAttribute("id",Element.uuid);
            trash.setAttribute("data-modal-control","containerRemoveUser");
            trash.addEventListener("click",()=>{
                removeUser(Element.uuid,Element.username);
            })

            pencil.className = "fa-solid fa-pencil";
            pencil.style = "cursor:pointer";
            pencil.setAttribute("id",Element.uuid);
            pencil.setAttribute("data-modal-control","containerEditUser");
            pencil.addEventListener("click",()=>{
                editUser(Element.uuid);
            })

            showModal();

            itens.append(pencil,trash);
            li.append(username, level,companyName,itens,hr);
            usersDepartments.append(li);
            showModal();
        }
    }))
}
async function editUser(id){
    const modalidade = document.getElementById("modalidade");
    const nivel = document.getElementById("nivel");
    const buttonEditUser = document.getElementById("buttonEditUser");

    buttonEditUser.addEventListener("click", async(event)=>{
        event.preventDefault();
        const sucesso = document.querySelector(".Sucesso");
        sucesso.classList.add("showError");
        setTimeout(()=>{sucesso.classList.remove("showError")},1000);
        setTimeout(()=>{window.location.replace("./admin.html")},1000);
        
        const data = {
            kind_of_work:modalidade.value,
            professional_level:nivel.value
        }
        const result = await editInfoEmploess(data,id);
    })
    
}

async function removeUser(id,name){
    const mainModal = document.querySelector(".containerRemoveUser > .modalRemoveUser > .mainModal");
    mainModal.innerHTML = "";
    const description = document.createElement("h2");
    const button = document.createElement("button");

    description.innerText = `Realmente deseja remover o usuário ${name}?`;
    button.innerText = "Deletar";
    button.className = "buttonGreen";
    button.classList.add("buttonDeletar");

    button.addEventListener("click", async()=>{
        const sucesso = document.querySelector(".Sucesso");
        sucesso.classList.add("showError");
        setTimeout(()=>{sucesso.classList.remove("showError")},1000);
        setTimeout(()=>{window.location.replace("./admin.html")},1000);
        DeleteUser(id);
    })

    mainModal.append(description,button);
}

renderAllUsers();
createDepartments();
filterDepartments();
renderDepartments();
showModal();
logoutAdmin();