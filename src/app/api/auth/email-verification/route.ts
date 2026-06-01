import { Resend } from "resend";
import { NextResponse, NextRequest } from "next/server";
import { User } from "../../../../../models/User";
import { connectDb } from "../../../../../lib/connectDb";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // Connect to the database and find the user by email
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Save the code and expiration time to the user's record in the database
    user.code = code;
    user.expiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save();
    // Send the verification email using Resend
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      html: `
<div style="background:#f4f4f5;padding:2rem 1rem;font-family:sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
    
    <div style="background:#0E1117;padding:1.5rem 2rem;display:flex;align-items:center;gap:10px;">
      <div style="width:32px;height:32px;background:#F5960A;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;">
        <span style="color:#0E1117;font-weight:700;font-size:16px;">P</span>
      </div>
      <span style="color:#E8EDF5;font-size:18px;font-weight:600;margin-left:10px;">Postinger</span>
    </div>

    <div style="padding:2rem;">
      <p style="font-size:22px;font-weight:600;color:#0E1117;margin:0 0 8px;">Verify your email</p>
      <p style="font-size:14px;color:#6b7280;margin:0 0 24px;line-height:1.6;">
        Thanks for signing up! Enter the code below to verify your email address. This code expires in 15 minutes.
      </p>
      <div style="background:#FFF7ED;border:1.5px solid #F5960A;border-radius:12px;padding:1.5rem;text-align:center;margin:0 0 24px;">
        <p style="font-size:13px;color:#854F0B;margin:0 0 8px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;">Your verification code</p>
        <p style="font-size:36px;font-weight:700;color:#F5960A;letter-spacing:0.15em;margin:0;font-family:monospace;">${code}</p>
      </div>
      <p style="font-size:13px;color:#9ca3af;margin:0;">
        If you didn't create an account with Postinger, you can safely ignore this email.
      </p>
    </div>

    <div style="background:#f9fafb;border-top:1px solid #e4e4e7;padding:1rem 2rem;">
      <p style="font-size:12px;color:#9ca3af;margin:0;text-align:center;">© 2025 Postinger. All rights reserved.</p>
    </div>

  </div>
</div>
`,
    });

    return NextResponse.json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { message: "Failed to send verification email" },
      { status: 500 },
    );
  }
}
