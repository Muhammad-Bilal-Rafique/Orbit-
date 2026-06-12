import type {Metadata} from "next"
import OrderSuccessPage from "./Success"


export const metadata: Metadata = {
  title: "Order Confirmed | Orbit",
  description: "Thank you for your purchase. Your payment was verified successfully, and your order telemetry tracking has been initialized.",
};

export default function SuccessPage(){
  return <OrderSuccessPage/>
}