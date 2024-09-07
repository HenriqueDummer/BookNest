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