"use client"
import Login from "@/components/Login";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";


const SignupPage = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/profile");
        return <>/</>
    }

    return (
        <section>
            <Login />
        </section>
    )
}

export default SignupPage;