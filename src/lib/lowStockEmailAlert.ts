import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LowStockEmailParams {
  productName: string;
  variantColor: string;
  variantSize: string;
  currentStock: number;
}

export async function sendLowStockAlertEmail({
  productName,
  variantColor,
  variantSize,
  currentStock,
}: LowStockEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bilalrafique271@gmail.com",
      subject: `[INVENTORY ALERT] Low Stock Detected: ${productName}`,
      html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #ffffff;">
    
    <div style="margin-bottom: 24px;">
      <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; tracking-content: 0.05em; background-color: #fef2f2; color: #ef4444; padding: 4px 8px; border-radius: 4px; border: 1px solid #fee2e2;">
        Critical Notification
      </span>
      <h2 style="color: #09090b; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; margin: 12px 0 4px 0;">
        Inventory Threshold Breached
      </h2>
      <p style="font-size: 13px; color: #71717a; margin: 0;">
        Orbit Automated Inventory Management System Telemetry
      </p>
    </div>

    <div style="background-color: #fafafa; padding: 20px; border-radius: 8px; border: 1px solid #f4f4f5; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #71717a; width: 40%;">Product Identifier:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #09090b; font-weight: 600;">${productName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #71717a;">Variant Configuration:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #09090b; font-weight: 600;">
            Color: <span style="color: #09090b;">${variantColor}</span> &bull; Size: <span style="color: #09090b;">${variantSize}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #71717a;">Remaining Inventory:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #ef4444; font-weight: 700;">
            ${currentStock} units remaining
          </td>
        </tr>
      </table>
    </div>
    
    <p style="font-size: 14px; color: #3f3f46; line-height: 1.6; margin: 0 0 24px 0;">
      The specified product variant has dropped below the minimum stock allocation limits. Please evaluate active conversion metrics and initiate immediate replenishment cycles with production suppliers to eliminate stockout overhead risks on the storefront gateway.
    </p>

    <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
    <table style="width: 100%;">
      <tr>
        <td style="font-size: 11px; color: #a1a1aa; text-align: left;">
          System Timestamp: ${new Date().toUTCString()}
        </td>
        <td style="font-size: 11px; color: #a1a1aa; text-align: right; font-weight: 500;">
          Velox Automation Engine
        </td>
      </tr>
    </table>

  </div>
`,
    });

    if (error) {
      return console.error(" Resend Delivery Error:", error);
    }

    console.log(
      `Resend Automated Alert dispatched successfully. ID: ${data?.id}`,
    );
  } catch (error) {
    console.error(" Critical Infrastructure mail delivery crash:", error);
  }
}
