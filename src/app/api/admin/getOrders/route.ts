import { NextRequest , NextResponse } from "next/server";
import {connectDb} from "@/lib/connectDb";
import {Order} from "@/models/Order";
import {getToken} from "next-auth/jwt"

export async function GET(request: NextRequest) {
    try {
         // 1. Secure Shield Admin Check Layer
            const token = await getToken({
              req: request,
              secret: process.env.AUTH_SECRET,
            });
        
            if (!token || token.role !== "admin") {
              return NextResponse.json(
                { message: "Unauthorized access path." },
                { status: 401 }
              );
            }
        await connectDb();
        const orders = await Order.find({}).sort({createdAt: -1});
        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}