import type {Metadata} from "next"
import CheckoutPage from "./Checkout"


export const metadata: Metadata = {
  title: "Secure Checkout | Orbit",
  description: "Complete your purchase safely. Review order totals, configure shipping destinations, and finalize your payment via secure Stripe processing.",
};

export default function Checkout(){
  return <CheckoutPage/>
}