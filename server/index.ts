import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { db } from "../db"; // asumsi path db-mu

const app = new Hono();

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello from Hono API!" });
});

// Jalankan server di port 3000
serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("✅ Hono server running at http://localhost:3000");
