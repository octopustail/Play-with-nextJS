import nodemailer from "nodemailer";
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
export enum EmailType {
    VERIFY = 'verify',
    RESET = 'reset',
}


export const sendEmail = async ({ email, emailType, userId }: { email: string; emailType: any; userId: string }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === EmailType.VERIFY) {
            await User.findByIdAndUpdate(userId, {
                verifiedToken: hashedToken,
                verifiedTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === EmailType.RESET) {
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            //@ts-ignore
            host: process.env.MAIL_HOST!,
            port: process.env.MAIL_PORT!,
            auth: {
                user: process.env.MAIL_USER_NAME,
                pass: process.env.MAIL_PSW,
            }
        });

        const mailOptions = {
            from: process.env.MAIL_SENDER,
            to: email,
            subject: emailType === EmailType.VERIFY ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here to ${emailType}</a></p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error('Validate Email');
    }
}
