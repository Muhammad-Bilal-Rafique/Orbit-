import { OrderType } from "@/types/OrderTypes"
import OrdersPage from "@/components/admin/Orders/ordersPage" 

const fetchOrders = async (): Promise<OrderType[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/admin/getOrders", { cache: "no-store" })
    const data = await res.json()
    return data.orders || []
  } catch (error) {
    console.log("Error fetching orders:", error)
    return []
  }
}

const OrderPage = async () => {
  const orders = await fetchOrders()
  
  // Clean pass to client component
  return <OrdersPage initialOrders={orders} />
}

export default OrderPage