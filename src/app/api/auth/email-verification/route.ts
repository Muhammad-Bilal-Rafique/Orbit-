import { Resend } from "resend";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/User";
import { connectDb } from "@/lib/connectDb";

const code: string = Math.floor(100000 + Math.random() * 900000).toString();

const htmlforEmail = `
<div style="background:#ffffff;padding:2rem 1rem;font-family: 'Inter', sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
    
    <div style="background:#ffffff;padding:1.5rem 2rem;border-bottom: 1px solid #e4e4e7;display:flex;align-items:center;">
      <span style="color:#18181b;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Orbit</span>
    </div>

    <div style="padding:2rem;">
      <p style="font-size:20px;font-weight:600;color:#18181b;margin:0 0 8px;">Verify your email</p>
      <p style="font-size:14px;color:#71717a;margin:0 0 24px;line-height:1.6;">
        Thanks for joining Orbit! Please use the following code to verify your account. This code expires in 15 minutes.
      </p>
      
      <div style="background:#fafafa;border:1px solid #e4e4e7;border-radius:8px;padding:1.5rem;text-align:center;margin:0 0 24px;">
        <p style="font-size:12px;color:#71717a;margin:0 0 8px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Verification Code</p>
        <p style="font-size:32px;font-weight:700;color:#18181b;letter-spacing:0.2em;margin:0;font-family:monospace;">${code}</p>
      </div>

      <p style="font-size:13px;color:#a1a1aa;margin:0;">
        If you didn't create an account with Orbit, you can safely ignore this email.
      </p>
    </div>

    <div style="background:#fafafa;border-top:1px solid #e4e4e7;padding:1rem 2rem;">
      <p style="font-size:12px;color:#a1a1aa;margin:0;text-align:center;">© 2026 Orbit. All rights reserved.</p>
    </div>

  </div>
</div>
`;

const htmlforResetPasswordEmail = `
<div style="background:#ffffff;padding:2rem 1rem;font-family: 'Inter', sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
    
    <div style="background:#ffffff;padding:1.5rem 2rem;border-bottom: 1px solid #e4e4e7;display:flex;align-items:center;">
      <span style="color:#18181b;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Orbit</span>
    </div>

    <div style="padding:2rem;">
      <p style="font-size:20px;font-weight:600;color:#18181b;margin:0 0 8px;">Reset your password</p>
      <p style="font-size:14px;color:#71717a;margin:0 0 24px;line-height:1.6;">
        We received a request to reset your Orbit account password. Enter the code below to proceed with the password change. This code expires in 15 minutes.
      </p>
      
      <div style="background:#fafafa;border:1px solid #e4e4e7;border-radius:8px;padding:1.5rem;text-align:center;margin:0 0 24px;">
        <p style="font-size:12px;color:#71717a;margin:0 0 8px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Reset Code</p>
        <p style="font-size:32px;font-weight:700;color:#18181b;letter-spacing:0.2em;margin:0;font-family:monospace;">${code}</p>
      </div>

      <p style="font-size:13px;color:#a1a1aa;margin:0;">
        If you didn't request a password reset, you can safely ignore this email.
      </p>
    </div>

    <div style="background:#fafafa;border-top:1px solid #e4e4e7;padding:1rem 2rem;">
      <p style="font-size:12px;color:#a1a1aa;margin:0;text-align:center;">© 2026 Orbit. All rights reserved.</p>
    </div>

  </div>
</div>
`;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, resetPassword } = await request.json();
    // Generate a 6-digit verification code

    // Connect to the database and find the user by email
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      if (resetPassword) {
        return NextResponse.json(
          {
            message: "If that email exists, you'll receive a reset link",
          },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Save the code and expiration time to the user's record in the database
    if (resetPassword) {
      user.resetCode = code;
      user.resetExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    } else {
      user.code = code;
      user.expiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    }
    await user.save();
    // Send the verification email using Resend
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: resetPassword
        ? "Reset your Orbit password"
        : "Verify your Orbit email",
      html: resetPassword ? htmlforResetPasswordEmail : htmlforEmail,
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
