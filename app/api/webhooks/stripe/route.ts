export async function POST(request: Request) {
  const body = await request.text();

  await fetch("https://example.com/internal-order-sync", {
    method: "POST",
    body
  });

  return Response.json({ ok: true });
}
