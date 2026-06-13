import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailPayload {
  email: string;
  orderId: string;
  totalAmount: number;
  items: any[];
}

export const sendOrderEmail = async (
  type: "confirmed" | "recieved",
  payload: EmailPayload,
) => {
  try {
    const { email, orderId, totalAmount, items } = payload;

    let subject = "";
    let htmlContent = "";

    // 1. CONDITION FOR ORDER CONFIRMED (PROCESSING)
    if (type === "recieved") {
      subject = `📦 Orbit Order Confirmed! — #${orderId.toUpperCase()}`;
      htmlContent = `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #ffffff; color: #0a0e27; border-radius: 12px;">
    <h2 style="color: #1e293b; text-align: center;">🎉 Your Orbit Order is Confirmed!</h2>
    
    <p style="font-size: 15px; line-height: 1.6; color: #334155;">
      Congratulations! Your order has been received and confirmed. Your payment went through successfully, and we're now preparing your items for shipment.
    </p>

    <div style="background: #f5f5f7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e293b;">
      <p style="margin: 8px 0; color: #0a0e27;"><strong>Order ID:</strong> #${orderId}</p>
      <p style="margin: 8px 0; color: #0a0e27;"><strong>Total Amount Paid:</strong> $${totalAmount}</p>
      <p style="margin: 8px 0; color: #16a34a;"><strong>Status:</strong> Order Confirmed ✓</p>
    </div>

    <h3 style="color: #1e293b; font-size: 14px; margin-top: 20px; margin-bottom: 10px;">YOUR ITEMS</h3>
    <ul style="background: #f5f5f7; padding: 12px; border-radius: 8px; margin: 0;">
      ${items.map((item) => `<li style="margin: 8px 0; font-size: 14px; color: #334155;">${item.name} (x${item.quantity}) — $${item.price}</li>`).join("")}
    </ul>

    <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; color: #475569;">
      Your order is being packed with care. You'll receive a shipping notification with tracking details soon.
    </p>

    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

    <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">
      Orbit Ecosystem — Curated High-End Tech<br>
      Thank you for your order!
    </p>
  </div>
`;
    }
    // 2. CONDITION FOR ORDER SHIPPED
    else if (type === "confirmed") {
      subject = `📦 Your Orbit Order Confirmed! — #${orderId.toUpperCase()}`;
      htmlContent = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #ffffff; color: #0a0e27; border-radius: 12px;">
    <h2 style="color: #1e293b; text-align: center; margin-top: 0;">📦 Order Shipped ✓</h2>
    
    <p style="font-size: 15px; line-height: 1.6; color: #334155;">
      Hi there,<br><br>
      Great news! Your order is on its way. We've packed your items with care and they're now in transit to your address. You can track your shipment anytime from your account.
    </p>

    <div style="background: #f5f5f7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e293b;">
      <p style="margin: 8px 0; color: #0a0e27;"><strong>Order ID:</strong> #${orderId}</p>
      <p style="margin: 8px 0; color: #0a0e27;"><strong>Status:</strong> <span style="color: #16a34a;">Processing</span></p>
    </div>

    <h3 style="color: #1e293b; font-size: 14px; margin-top: 20px; margin-bottom: 10px;">TRACKING INFORMATION</h3>
    <div style="background: #f5f5f7; padding: 12px; border-radius: 8px;">
      <p style="margin: 8px 0; font-size: 14px; color: #334155;">Your tracking details will be available in your account dashboard. Check for updates anytime.</p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; color: #475569;">
      Estimated delivery depends on your location. Most orders arrive within 5-7 business days. Keep an eye on your inbox for delivery notifications.
    </p>

    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

    <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">
      Orbit — Premium Tech Products<br>
      Questions? Reply to this email anytime.
    </p>
  </div>
`;
    }

    // Send via Resend SDK Engine
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error(" Resend email dispatch crash:", error);
  }
};
