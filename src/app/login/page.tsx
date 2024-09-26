"use client"

import AuthForm from "@/components/AuthForm"
import { getAccessToken } from "@/utils/utils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const LoginPage = () => {
    const router = useRouter()
    useEffect(() => {
        if(getAccessToken()) {
            router.push('/admin')
        }
    },[router])

    return (
        <AuthForm />
    )
}

export default LoginPage;