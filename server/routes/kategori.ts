import { Hono } from "hono";
import { db } from "../../db"
import { kategori } from "../../db/schema"
import { eq } from "drizzle-orm";

const kategoriRoute = new Hono();

kategoriRoute
    .get('/get', async (c) => {
        try {
            const result = await db.select().from(kategori);
            console.log(result)
            c.header('Content-Type', 'application/json');
            return c.json(result)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })
    .get('/get/:id', async (c) => {
        try {
            const id = c.req.param("id")
            const result = await db
                .select()
                .from(kategori)
                .where(eq(kategori.idKategori, Number(id)))

            return c.json(result, 200)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })

export default kategoriRoute