import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient()

export const getMe = async () => {
    try{
        const res = await fetch("http://localhost:8080/api/auth/getme", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json() 
        console.log(data)
        if(data.error) return false
        return data
    }catch(err){
        console.log(err)
    }
}

export const submitSignUp = async (formData) => {
    const {email, password, username} = formData

    try{
        const res = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                username
            })
        })

        const data = await res.json()
        console.log(data)

        return data
    }catch(err){
        console.log(err)
    }
}

export const submitLogIn = async (formData) => {
    const {email, password} = formData

    try{
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
        })

        const data = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.log(err)
    }
}

export const getAllBooks = async () => {
    try{
        const res = await fetch("http://localhost:8080/api/books/all", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json() 

        console.log(data)

        return data
    }catch(err){
        console.log(err)
    }
}

export const getBooksByStatus = async (status) => {

    try{
        const res = await fetch("http://localhost:8080/api/books/status/" + status, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json() 

        console.log(data)

        return data
    }catch(err){
        console.log(err)
    }
}

export const getBookById = async (id) => {
    try{
        const res = await fetch("http://localhost:8080/api/books/" + id, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json() 

        console.log(data)

        return data
    }catch(err){
        console.log(err)
    }
}

export const addBook = async (formData) => {
    try{
        const res = await fetch("http://localhost:8080/api/books/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               ...formData
            })
        })

        const data = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.log(err)
    }
}

export const deleteBook = async (id) => {
    try{
        const res = await fetch("http://localhost:8080/api/books/delete/" + id, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.log(err)
    }
}

export const updateBook = async (formData) => {

    const id = formData._id

    
    try{
        const res = await fetch("http://localhost:8080/api/books/update/" + id, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               ...formData
            })
        })

        const data = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.log(err)
    }
}