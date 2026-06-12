import type {Metadata} from "next"
import ResetPasswordPage from "./ResetPassword"


export const metadata: Metadata = {
  title: "Update Password | Orbit",
  description: "Securely update your account credentials. Choose a strong new password to keep your profile data locked and protected.",
};

export default function Reset_password(){
  return <ResetPasswordPage/>
}