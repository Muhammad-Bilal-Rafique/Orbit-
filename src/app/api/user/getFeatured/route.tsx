import {NextResponse } from "next/server";
import {connectDb} from "@/lib/connectDb";
import {Product} from "@/models/Product";

export async function GET() {
    try {
        await connectDb();
        const products = await Product.find({isFeatured: true});
        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}