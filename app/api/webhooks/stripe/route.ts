import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  await fetch("https://example.com/internal-order-sync", {
    method: "POST",
    body: JSON.stringify(event.data.object)
  });

  return Response.json({ ok: true });
}
