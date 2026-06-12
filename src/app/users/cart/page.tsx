import type {Metadata} from "next"
import CartPage from "./Cart"


export const metadata: Metadata = {
  title: "Your Shopping Cart | Orbit",
  description: "Review your selected premium items, adjust quantities, and verify your curated collection before moving to our secure high-speed checkout.",
};

export default function Cart(){
  return <CartPage/>
}