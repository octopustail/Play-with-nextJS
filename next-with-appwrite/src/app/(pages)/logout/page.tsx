"use client"
import appwriteService from "@/appwrite/config";
import { Signup } from "@/components/Signup";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const SignupPage = () => {
    const router = useRouter();
    const { setAuthStatus } = useAuth();

    useEffect(() => {
        appwriteService.logout().then(() => setAuthStatus(false));
        router.push('/')
    }, []);

    return (
        <></>
    )
}

export default SignupPage;