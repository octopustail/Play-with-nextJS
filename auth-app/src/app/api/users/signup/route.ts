import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { EmailType, sendEmail } from "@/helpers/mailer";



connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log('reqBody', reqBody);

        // do some validation
        const user = await User.findOne({ email });
        console.log('user', user);
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        const savedUser = await newUser.save();
        // send verification email
        await sendEmail({ email, emailType: EmailType.VERIFY, userId: savedUser._id });


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        console.log('error', error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}