import {User} from "@/models/User";
import { connectDb } from "@/lib/connectDb";
import bcrypt from "bcryptjs";
import { NextResponse ,NextRequest} from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json();
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}