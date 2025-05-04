import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { db } from "../db";

const app = new Hono();

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello from Hono API!" });
});

app.get("/test", async (c) =>{
  const result = await db.execute("select 1")
  return c.json(result, 200)
})

// Jalankan server di port 3000
serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("✅ Hono server running at http://localhost:3000");
