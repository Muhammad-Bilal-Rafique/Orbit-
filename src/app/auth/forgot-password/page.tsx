import type {Metadata} from "next"
import ForgotPassword from "./ForgotPassword"


export const metadata: Metadata = {
  title: "Reset Your Password | Orbit",
  description: "Forgot your credentials? Enter your registered email address to receive a secure password reset link instantly.",
};

export default function Forgot_Password(){
  return <ForgotPassword/>
}