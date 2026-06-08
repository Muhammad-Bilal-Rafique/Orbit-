import { NextRequest,NextResponse } from "next/server";
import {connectDb} from "@/lib/connectDb";
import {Product} from "@/models/Product";

export async function GET(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        console.log("Getting with id " , id)
        if(!id){
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        await connectDb();
        const product = await Product.findById(id);
        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
