import { NextRequest , NextResponse } from "next/server";
import {connectDb} from "@/lib/connectDb";
import {Order} from "@/models/Order";

export async function GET(request: NextRequest) {
    try {
        await connectDb();
        const orders = await Order.find({}).sort({createdAt: -1});
        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}