export function GET() {
  return new Response("", {
    status: 302,
    headers: {
      "Set-Cookie": "connect-sid=;Max-Age=0",
      Location: "/",
    },
  });
}
