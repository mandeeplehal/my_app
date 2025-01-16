import dbConnect from "@/lib/dbConnect";
import user from "@/model/user";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/Types/ApiResponse";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();

    // Check if user exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists"
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Create new user with verification details
    const newUser = new user({
      username,
      email,
      verificationCode: hashedOtp,
      verificationCodeExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      isVerified: false
    });
    await newUser.save();

    // Send verification email
    const emailResponse: ApiResponse = await sendVerificationEmail(
      username,
      email,
      otp
    );

    if (!emailResponse.success) {
      // If email fails, delete the created user
      await user.findOneAndDelete({ email });
      return NextResponse.json({
        success: false,
        message: "Failed to send verification email"
      });
    }

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully"
    });

  } catch (error) {
    console.error("Error in sign-up:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    });
  }
}
