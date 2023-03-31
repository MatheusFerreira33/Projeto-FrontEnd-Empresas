import { requestAllCompanies,checkUserType } from "./request.js"

async function checkUser(){
    if(localStorage.getItem("JWT") == null){
        
    }else{
        const token = JSON.parse(localStorage.getItem("JWT"));
        const result = await checkUserType(token);
        if(result.is_admin == true){
            window.location.replace("src/pages/admin/admin.html");
        }else{
            window.location.replace("src/pages/user/user.html");
        }
    }
}
checkUser();

const container = document.querySelector("main > .container");
const ul = document.createElement("ul");

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

async function getValueSelect() {

    const select = document.createElement("select");
    const optionDescription = document.createElement("option");
    const optionAlimenticio = document.createElement("option");
    const optionVarejo = document.createElement("option");
    const optionTextil = document.createElement("option");
    const optionManufatura = document.createElement("option");
    const optionAeroEspacial = document.createElement("option");
    const optionAutomotiva = document.createElement("option");
    const optionTI = document.createElement("option");
    const optionAtacado = document.createElement("option");

    select.name = "departments";
    select.id = "departments";

    optionDescription.value = "Selecionar Setor";
    optionDescription.innerText = "Selecionar Setor";

    optionAlimenticio.value = "Alimenticio";
    optionAlimenticio.innerText = "Alimenticio";
    optionVarejo.value = "Varejo";
    optionVarejo.innerText = "Varejo";
    optionTextil.value = "Textil";
    optionTextil.innerText = "Textil";
    optionManufatura.value = "Manufatura";
    optionManufatura.innerText = "Manufatura";
    optionAeroEspacial.value = "Aeroespacial";
    optionAeroEspacial.innerText = "Aero Espacial";
    optionAutomotiva.value = "Automotiva";
    optionAutomotiva.innerText = "Automotiva";
    optionTI.value = "TI";
    optionTI.innerText = "TI";
    optionAtacado.value = "Atacado";
    optionAtacado.innerText = "Atacado";

    select.append(optionDescription, optionAlimenticio, optionVarejo,
        optionTextil, optionManufatura, optionAeroEspacial, optionAutomotiva,
        optionTI, optionAtacado);

    container.appendChild(select);

    let object = {};
    select.addEventListener("change", async (event) => {
        event.preventDefault();
        const ul = document.querySelector("main > .container > ul");
        ul.innerText = "";

        if (select.value == "Selecionar Setor") {
            const allCompanies = await requestAllCompanies();
            renderAllCompanies(allCompanies);

        } else {
            const result = await requestAllCompanies();
            object = Array.from(result).filter((Element => {
                return Element.sectors.description == select.value;
            }))

            Array.from(object).map((Element => {
                const li = document.createElement("li");
                const nameCompanie = document.createElement("h2");
                const openingTime = document.createElement("span");
                const sector = document.createElement("button");
                const hr = document.createElement("hr");

                nameCompanie.innerText = Element.name;
                openingTime.innerText = Element.opening_hours;

                sector.innerText = Element.sectors.description;
                sector.className = "buttonWhite";
                sector.classList.add("buttonSector");

                li.append(nameCompanie, openingTime, sector, hr);
                ul.appendChild(li);
                container.appendChild(ul);

            }))
        }
    })

}

async function renderAllCompanies() {
    const object = await requestAllCompanies();
    ul.innerText = "";

    Array.from(object).map((Element => {
        const li = document.createElement("li");
        const nameCompanie = document.createElement("h2");
        const openingTime = document.createElement("span");
        const sector = document.createElement("button");
        const hr = document.createElement("hr");

        nameCompanie.innerText = Element.name;
        openingTime.innerText = Element.opening_hours;

        sector.innerText = Element.sectors.description;
        sector.className = "buttonWhite";
        sector.classList.add("buttonSector");

        li.append(nameCompanie, openingTime, sector, hr);
        ul.appendChild(li);
        container.appendChild(ul);

    }))
}
renderAllCompanies();

function redirect() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((Element => {
        Element.addEventListener("click", () => {
            if (Element.className == "buttonWhite login desktop" || Element.className == "buttonWhite login") {
                window.location.replace("./src/pages/login/login.html");

            } else if (Element.className == "buttonBrand registrer desktop" || Element.className == "buttonBrand registrer") {
                window.location.replace("./src/pages/cadastro/cadastro.html");
            }
        })
    }))
}

redirect();
getValueSelect();
showLoginRegister();
