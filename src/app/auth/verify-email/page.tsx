import type {Metadata} from "next"
import VerifyEmailPage from "./VerifyEmail"


export const metadata: Metadata = {
  title: "Verify Your Email | Orbit",
  description: "One last step to secure your account. Verify your email address to unlock your full user profile access on Orbit.",
};

export default function Verify_Email(){
  return <VerifyEmailPage/>
}