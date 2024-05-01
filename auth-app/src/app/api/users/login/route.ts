import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log('reqBody', reqBody);
        //check if user Exit
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User dose not exist" }, { status: 400 })
        };
        console.log('user.password', user.password, password);
        //valid  password;
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({ error: "incorrect password" }, { status: 400 })
            
        }

        // create a token data
        const token_id = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create a token with JWT
        const token = jwt.sign(token_id, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // send to cookie later.
        const response = NextResponse.json({
            message: "login successful",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        console.log('error', error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}