"use client"
import { Signup } from "@/components/Signup";
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
            <Signup />
        </section>
    )
}

export default SignupPage;