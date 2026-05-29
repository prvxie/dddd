// Health check endpoint
export default function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  res.status(200).json({ status: "ok" });
}
