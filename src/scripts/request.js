
export async function requestAllCompanies() {
    const responseJSON = await fetch("http://localhost:6278/companies")
    const response = await responseJSON.json();
    return response;
}


export async function requestCreateUser(object) {
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(object)
    }
    const responseJSON = await fetch("http://localhost:6278/auth/register", settings)
    const response = await responseJSON.json();

    return await response;
}

export async function loginUser(data) {

    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    const responseJSON = await fetch("http://localhost:6278/auth/login", settings)
    const response = await responseJSON.json();

    return response;
}

export async function checkUserType(object) {
    const { token } = object;

    const settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    const responseJSON = await fetch("http://localhost:6278/auth/validate_user", settings)
    const response = await responseJSON.json();

    return response;
}

export async function getAllInfoUser(object) {
    const { token } = object;

    const responseJSON = await fetch("http://localhost:6278/users/profile", {

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    const response = await responseJSON.json();
    return response;
}

export async function updateInfoUser(object, JWT) {
    const { token } = JWT;
    const settings = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(object)
    }
    const responseJSON = await fetch("http://localhost:6278/users", settings)
    const response = await responseJSON.json();

    return response;
}


export async function requestDepartments() {
    const { token } = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    const responseJSON = await fetch("http://localhost:6278/departments", settings)
    const response = await responseJSON.json();

    return response;
}

export async function requestCreateDepartments(object) {
    const { token } = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify(object)
    }
    const responseJSON = await fetch("http://localhost:6278/departments",settings)
    const response = await responseJSON.json();

    return response;
}

export async function editDescriptionDepartments(description,id){
    const {token} = JSON.parse(localStorage.getItem("JWT"));

    const data = {
        description:description
    }

    const settings = {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
    const responseJSON = await fetch(`http://localhost:6278/departments/${id}`,settings)
    const response = await responseJSON.json();

    
    return response;
}

export async function deleteDepartments(id){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    fetch(`http://localhost:6278/departments/${id}`,settings)
    
}

export async function usersNoDepartments(){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const responseJSON = await fetch("http://localhost:6278/admin/out_of_work",settings)
    const response = await responseJSON.json();

    return response;
}

export async function toHideEmployees(idUser,idDepartment){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const datas = {
            user_uuid: idUser,
            department_uuid: idDepartment 
    }
    const settings = {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(datas)
    }
    const responseJSON = await fetch("http://localhost:6278/departments/hire/",settings)
    const response = await responseJSON.json();
    return response;
}

export async function requestAllUsers(){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const responseJSON = await fetch("http://localhost:6278/users",settings)
    const response = await responseJSON.json();

    return response;
}

export async function requestOffEmploss(idEmploess){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const responseJSON = await fetch(`http://localhost:6278/departments/dismiss/${idEmploess}`,settings)
    const response = await responseJSON.json();
    return response;
}

export async function listDepartmentUser(){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const responseJSON = await fetch("http://localhost:6278/users/departments",settings)
    const response = await responseJSON.json();
    return response;
}

export async function listEmploessSameDepartment(){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method: "GET",
        headers:{
            "Content-Type":"application",
            Authorization: `Bearer ${token}`
        }
    }
    const responseJSON = await fetch("http://localhost:6278/users/departments/coworkers",settings)
    const response = await responseJSON.json();
    return response;
}

export async function editInfoEmploess(object,idEmploess){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(object)
    }
    const responseJSON = await fetch(`http://localhost:6278/admin/update_user/${idEmploess}`,settings)
    const response = await responseJSON.json();
    return response;
}

export async function DeleteUser(id){
    const {token} = JSON.parse(localStorage.getItem("JWT"));
    const settings = {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const responseJSON = await fetch(`http://localhost:6278/admin/delete_user/${id}`,settings)
    const response = await responseJSON.json();
    return response;
}
