import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../models/User";
import { connectDb } from "../../../../../lib/connectDb";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    // Connect to the database and find the user by email
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Check if the code is correct and not expired
    if (user.code === code && user.expiration > new Date()) {
      user.isVerified = true;
      user.code = null;
      user.expiration = null;
      await user.save();
      return NextResponse.json({ message: "Email verified successfully" });
    } else {
      return NextResponse.json(
        { message: "Invalid or expired code" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
