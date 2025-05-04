import { Hono } from "hono";
import { db } from "../../db"
import { penerbit } from "../../db/schema"
import { eq } from "drizzle-orm";

const penerbitRoute = new Hono();

penerbitRoute
    .get('/get', async (c) => {
        try {
            const result = await db.select().from(penerbit);
            console.log(result)
            return c.json(result, 200)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })
    .get('/get/:id', async (c) => {
        try {
            const id = c.req.param("id")
            const result = await db
                .select()
                .from(penerbit)
                .where(eq(penerbit.idPenerbit, Number(id)))

            return c.json(result, 200)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })

export default penerbitRoute