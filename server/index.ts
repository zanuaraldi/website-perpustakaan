import { Hono } from "hono";
import { serve } from "@hono/node-server";
import kategoriRoute from "./routes/kategori" 
import pembuatRoute from "./routes/pembuat" 
import penerbitRoute from "./routes/penerbit" 
import bukuRoute from "./routes/buku" 
import { cors } from 'hono/cors'

const app = new Hono();

app.use('*', cors({
  origin: 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type'],
}))

app.route('/kategori', kategoriRoute)
app.route('/pembuat', pembuatRoute)
app.route('/penerbit', penerbitRoute)
app.route('/buku', bukuRoute)


serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("✅ Hono server running at http://localhost:3000");
