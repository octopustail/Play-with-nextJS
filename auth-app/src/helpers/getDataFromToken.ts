import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

export type Token = {
    id: string;
    username: string;
    email: string;
}

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value ?? '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        return decodedToken.id ;

    } catch (error: any) {
        throw new Error(error.message);
    }
}