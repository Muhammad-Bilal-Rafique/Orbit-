import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/User";
import { connectDb } from "@/lib/connectDb";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    await connectDb();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid Code" }, { status: 404 });
    }

    if (user.resetCode !== code) {
      return NextResponse.json(
        { message: "Invalid reset code" },
        { status: 400 },
      );
    }

    if (user.resetExpiration < new Date()) {
      return NextResponse.json(
        { message: "Reset code has expired" },
        { status: 400 },
      );
    }

    // Reset the reset code and expiration
    user.resetCode = null;
    user.resetExpiration = null;
    await user.save();

    return NextResponse.json({ message: "Reset code verified successfully" },{status: 200});
  } catch (error) {
    console.error("Error verifying reset code:", error);
    return NextResponse.json(
      { message: "Failed to verify reset code" },
      { status: 500 },
    );
  }
}
