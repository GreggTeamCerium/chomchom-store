import { NextRequest, NextResponse } from "next/server";
import { markProductSold } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeKey || !webhookSecret) {
      console.log("⚠️ Stripe webhook not configured");
      return NextResponse.json({ received: true });
    }

    const stripe = require("stripe")(stripeKey);
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Payment completed:", session.id);

      // In a real implementation, we'd look up which products
      // were in this session and mark them as sold
      // For now, this is a placeholder
      console.log("Order details:", {
        customerEmail: session.customer_details?.email,
        total: session.amount_total,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
