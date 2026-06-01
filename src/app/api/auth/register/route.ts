import { connectDb } from "../../../../../lib/connectDb";
import { User } from "../../../../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { name, email, password } = await request.json();
    //IF USER ALREADY EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }
    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    //CREATE THE USER
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error }, { status: 500 });
  }
}
