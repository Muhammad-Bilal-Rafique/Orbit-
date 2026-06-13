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
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
    <h2 style="color: #38bdf8; text-align: center;">🎉 Your Orbit Order is Confirmed!</h2>
    
    <p style="font-size: 15px; line-height: 1.6;">
      Congratulations! Your order has been received and confirmed. Your payment went through successfully, and we're now preparing your items for shipment.
    </p>

    <div style="background: #1e293b; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38bdf8;">
      <p style="margin: 8px 0;"><strong>Order ID:</strong> #${orderId}</p>
      <p style="margin: 8px 0;"><strong>Total Amount Paid:</strong> $${totalAmount}</p>
      <p style="margin: 8px 0; color: #4ade80;"><strong>Status:</strong> Order Confirmed ✓</p>
    </div>

    <h3 style="color: #38bdf8; font-size: 14px; margin-top: 20px; margin-bottom: 10px;">YOUR ITEMS</h3>
    <ul style="background: #1e293b; padding: 12px; border-radius: 8px; margin: 0;">
      ${items.map((item) => `<li style="margin: 8px 0; font-size: 14px;">${item.name} (x${item.quantity}) — $${item.price}</li>`).join("")}
    </ul>

    <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; color: #cbd5e1;">
      Your order is being packed with care. You'll receive a shipping notification with tracking details soon.
    </p>

    <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;" />

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
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
    <h2 style="color: #38bdf8; text-align: center; margin-top: 0;">Order Confirmed ✓</h2>
    
    <p style="font-size: 15px; line-height: 1.6;">
      Hi there,<br><br>
      Thanks for your order! We've received your payment and your order is now confirmed. Your items will be carefully packed and shipped soon.
    </p>

    <div style="background: #1e293b; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 8px 0;"><strong>Order ID:</strong> #${orderId}</p>
      <p style="margin: 8px 0;"><strong>Amount Paid:</strong> $${totalAmount}</p>
    </div>

    <h3 style="color: #38bdf8; font-size: 14px; margin-top: 20px; margin-bottom: 10px;">YOUR ITEMS</h3>
    <div style="background: #1e293b; padding: 12px; border-radius: 8px;">
      ${items.map((item) => `<p style="margin: 8px 0; font-size: 14px;">${item.name} <strong>×${item.quantity}</strong> — $${item.price}</p>`).join("")}
    </div>

    <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; color: #cbd5e1;">
      We'll send you a shipping update as soon as your order leaves our warehouse. You can track your order anytime from your account.
    </p>

    <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;" />

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

    console.log(` Resend: ${type} email dispatched successfully to ${email}`);
  } catch (error) {
    console.error(" Resend email dispatch crash:", error);
  }
};
