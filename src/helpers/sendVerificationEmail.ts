import { resend } from "@/lib/resend";

import VerificationEmail  from "../../emails/verificationEmail"; 

import { ApiResponse } from "@/Types/ApiResponse";


export const sendVerificationEmail = async (
  username: string,
  email: string, 
  otp: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verification code',
      react: VerificationEmail({
        username,
        otp
      })
    });

    return {
      success: true,
      message: "Verification email sent successfully"
    };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return {
      success: false, 
      message: "Failed to send verification email"
    };
  }
};
