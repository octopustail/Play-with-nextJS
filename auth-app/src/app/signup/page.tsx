'use client'
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";
export default function SignPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    // connect to database;
    const onSignUp = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                SignUp
            </h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                value={user.username}
                placeholder="username"
                onChange={
                    (e) => setUser({
                        ...user,
                        username: e.target.value
                    })
                } />

            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
                onClick={onSignUp} 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >SignUp</button>
            <Link href="/login">visit login page</Link>
        </div>
    )
}