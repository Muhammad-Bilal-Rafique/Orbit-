import {NextRequest , NextResponse} from "next/server";
import {connectDb} from "@/lib/connectDb";
import {Order} from "@/models/Order";
import {Review} from "@/models/Review"


export async function POST(request:NextRequest) {
    try{
        await connectDb();
        const {userId , productId ,orderId, rating , comment} = await request.json();
        if(!userId || !productId || !rating || !comment || !orderId) return NextResponse.json({message:"Missing required fields"} , {status:400});

        const order = await Order.findById(orderId);
        if(!order) return NextResponse.json({message:"Order not found"} , {status:404});

        const review = new Review({
            userId,
            productId,
            orderId,
            rating,
            comment
        });

        await review.save();
        
        order.isReviewed = true;
        await order.save();

        return NextResponse.json({message:"Review submitted successfully"} , {status:200});


    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Something went wrong"} , {status:500});
    }
}



