import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";
import { Review } from "@/models/Review";
import { Product } from "@/models/Product";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function triggerBackgroundAISummary(productId: string) {
  try {
    const [reviews, product] = await Promise.all([
      Review.find({ productId }).select("comment rating").lean(),
      Product.findById(productId).select("name category description").lean(),
    ]);

    if (reviews.length < 3 || !product) return;

    const formattedReviews = reviews
      .map((r, i) => `Review #${i + 1} (Rating: ${r.rating}/5): "${r.comment}"`)
      .join("\n");

    const totalReviewsCount = reviews.length;
    const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
    const averageRating = (
      reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount
    ).toFixed(1);

    const productIdentityContext = `
Product Name: "${product.name}"
Category: "${product.category || "Luxury Minimalist Wear"}"
Product Description: "${product.description || ""}"

[CRITICAL GROUND TRUTH METRICS - DO NOT CALCULATE YOUR OWN]:
Total Reviews Volume: ${totalReviewsCount}
Exact 5-Star Reviews Count: ${fiveStarCount} out of ${totalReviewsCount}
Calculated Average Rating: ${averageRating} / 5.0
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an elite product analyst for "Orbit" - a luxury minimalist fashion and lifestyle wear brand.
          You are analyzing user reviews specifically for this product profile:
          ${productIdentityContext}
          
          Instructions:
          - Generate a single summary paragraph (max 3 short sentences) based ONLY on the customer comments.
          - Use very simple English, natural words, and clean phrasing. Avoid complex or academic words.
          - Mention specific details if reviewers talk about the item's fit, fabric, quality, or style.
          - Clearly state overall customer satisfaction, main pros, and common cons.
          - Never call it tech hardware or electronics. It is a premium lifestyle apparel/wear asset.
          - Do not start with phrases like 'Based on the reviews'. Start directly and keep the tone professional and clean.
          - Never calculate or guess review numbers, math percentages, or star counts yourself. 
- Strictly use the provided 'CRITICAL GROUND TRUTH METRICS' for any numbers or star ratio references in your summary.`,
        },
        {
          role: "user",
          content: `Here are the customer reviews for ${product.name}:\n\n${formattedReviews}`,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 150,
    });

    const aiTextOutput =
      chatCompletion.choices[0]?.message?.content?.trim() || "";

    if (aiTextOutput) {
      await Product.findByIdAndUpdate(productId, {
        aiSummary: aiTextOutput,
        aiSummaryUpdatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Orbit AI Processing background engine failure:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { userId, productId, orderId, rating, comment } =
      await request.json();
    if (!userId || !productId || !rating || !comment || !orderId)
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );

    const order = await Order.findById(orderId);
    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    const review = new Review({
      userId,
      productId,
      orderId,
      rating,
      comment,
    });

    await review.save();

    order.isReviewed = true;
    await order.save();

    triggerBackgroundAISummary(productId).catch((err) =>
      console.error("AI aggregation update schedule leaked:", err),
    );

    return NextResponse.json(
      { message: "Review submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
