import { Hono } from "hono";
import { db } from "../../db"
import { pembuat } from "../../db/schema"
import { eq } from "drizzle-orm";

const pembuatRoute = new Hono();

pembuatRoute
    .get('/get', async (c) => {
        try {
            const result = await db.select().from(pembuat);
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
                .from(pembuat)
                .where(eq(pembuat.idPembuat, Number(id)))
            return c.json(result, 200)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })
export default pembuatRoute