'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function SignPage() {


    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verify-email", { token });
            setVerified(true)
            // router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
            setError(true)
        }
    }

    useEffect(() => {
        const [, newToken] = window.location.search.split("=");
        newToken && setToken(newToken);
    }, [])

    useEffect(() => {
        if (token.length) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4-xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "No Token"}</h2>
            {verified && (
                <div>
                    <h2>
                        Email Verified
                    </h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">
                        Error
                    </h2>
                </div>
            )}
        </div>
    )
}