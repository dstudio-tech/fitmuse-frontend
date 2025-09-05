import { NextRequest } from "next/server";
import { stripe } from "@/libs/stripe";

export async function POST(req: NextRequest) {
  try {
    const { subscriptionId, userId } = await req.json();

    if (!subscriptionId || !userId) {
      return new Response("Missing subscriptionId or userId", { status: 400 });
    }

    // ✅ First, attach userId (or client_reference_id equivalent) to subscription metadata
    const updated = await stripe.subscriptions.update(subscriptionId, {
      metadata: {
        userId: String(userId), // store your own identifier
      },
      cancel_at_period_end: true,
    });

    return new Response(JSON.stringify(updated), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
