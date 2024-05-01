'use client'
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {

    const [user, setUser] = useState<{ _id: string; username: string }>(null);
    const router = useRouter();
    const Logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Log out Successfully");
            router.push("/login")
        } catch (error: any) {
            toast.error("Log out failed:", error.message);
        }
    }

    const getDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setUser(res.data.data);
    }
    useEffect(() => {
        getDetails();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h2>{user ? <Link href={`/profile/${user._id}`}>{user.username}</Link> : "Nothing"}</h2>
            <button
                onClick={Logout}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >Log out</button>
            <p>Profile Page</p>
        </div>
    )
}