import type {Metadata} from "next"
import LoginPage from "./Login"


export const metadata: Metadata = {
  title: "Login | Orbit",
  description: "Sign in to your secure Orbit account to manage your orders, track shipments, and access your personalized premium dashboard.",
};

export default function Login(){
  return <LoginPage/>
}