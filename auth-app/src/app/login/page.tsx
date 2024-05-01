'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email && user.password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    // connect to database;
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile")

        } catch (error: any) {
            console.log("Login Failed", error.message);
            toast.error("Login Fail", error.message);
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                {loading ? "Processing" : "Login"}
            </h1>
            <hr />

            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  text-black"
                id="email"
                type="text"
                value={user.email}
                placeholder="email"
                onChange={
                    (e) => setUser({
                        ...user,
                        email: e.target.value
                    })
                } />

            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                placeholder="password"
                onChange={
                    (e) => setUser({
                        ...user,
                        password: e.target.value
                    })
                } />
            <button
                disabled={buttonDisabled}
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >Login</button>
            <Link href="/signup">visit signup page</Link>
        </div>
    )
}