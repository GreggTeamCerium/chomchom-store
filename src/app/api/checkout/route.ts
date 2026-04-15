import { NextRequest, NextResponse } from "next/server";

// Stripe checkout session creation
// Requires STRIPE_SECRET_KEY env var to be set
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const itemsJson = formData.get("items") as string;

    if (!itemsJson) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    const items = JSON.parse(itemsJson);

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      // Demo mode: redirect to success page directly
      console.log("⚠️ Stripe not configured — demo mode, redirecting to success");
      return NextResponse.redirect(
        new URL("/checkout/success", request.url)
      );
    }

    // Real Stripe integration
    const stripe = require("stripe")(stripeKey);

    const lineItems = items.map((item: { name: string; brand: string; size: string; price: number }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.brand} - ${item.name}`,
          description: `Size ${item.size}`,
        },
        unit_amount: item.price,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
