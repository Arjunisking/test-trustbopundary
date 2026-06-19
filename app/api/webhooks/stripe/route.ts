export async function POST(request: Request) {
  const payload = await request.json();

  await fetch("https://example.com/internal-order-sync", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return Response.json({ ok: true });
}