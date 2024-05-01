import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { EmailType, sendEmail } from "@/helpers/mailer";

connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log('token', token);

        const user = await User.findOne({
            verifiedToken: token,
            verifiedTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({
                error: "Invalid token",
            },
                {
                    status: 400
                })
        }

        console.log(user);
        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: 'Email verified Successfully',
            success: true,
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
        }, { status: 500 })

    }
}