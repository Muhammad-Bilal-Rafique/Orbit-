import type {Metadata} from "next"
import RegisterPage from "./Register"


export const metadata: Metadata = {
  title: "Create Your Account | Orbit",
  description: "Join Orbit today. Create a secure account to enjoy seamless checkout, exclusive luxury product access, and order telemetry tracking.",
};

export default function Register(){
  return <RegisterPage/>
}