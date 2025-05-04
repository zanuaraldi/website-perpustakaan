import { Hono } from "hono";
import { db } from "../../db"
import { buku, kategori, pembuat, penerbit } from "../../db/schema"
import { eq } from "drizzle-orm";

const bukuRoute = new Hono();

bukuRoute
    .get('/get', async (c) => {
        try {
            const result = await db
                .select()
                .from(buku)
                .leftJoin(kategori, eq(buku.idKategori, kategori.idKategori))
                .leftJoin(penerbit, eq(buku.idPenerbit, penerbit.idPenerbit))
                .leftJoin(pembuat, eq(buku.idPembuat, pembuat.idPembuat))
            console.log(result)
            console.log(result.map(r => r.kategori?.namaKategori))
            return c.json(result, 200)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })

    .get('/get/:id', async (c) => {
        try {
            const id = c.req.param("id");
            const result = await db
                .select()
                .from(buku)
                .where(eq(buku.idBuku, Number(id)))

            return c.json(result, 200)
        } catch (e) {
            return c.json({message: e}, 400)
        }
    })

    .post('/tambah-buku', async (c) => {
        try {
            const { idKategori, idPenerbit, idPembuat, namaBuku, isbn, issn, tahunPembuatan, harga, keterangan } = await c.req.json();
            const result = await db.insert(buku).values({
                idKategori,
                idPembuat,
                idPenerbit,
                namaBuku,
                isbn,
                issn,
                tahunPembuatan,
                harga,
                keterangan
            }).returning();
            return c.json({ message: "Tambah data berhasil", result }, 200)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })

    .delete('/hapus-buku/:id', async (c) => {
        try {
            const id = c.req.param("id")
            const result = await db
                .delete(buku)
                .where(eq(buku.idBuku, Number(id)))
                .returning();
            return c.json({ message: "Hapus data berhasil", result }, 200)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })

    .put('/update-buku/:id', async (c) => {
        try {
            const id = c.req.param("id")
            const { idKategori, idPenerbit, idPembuat, namaBuku, isbn, issn, tahunPembuatan, harga, keterangan } = await c.req.json();
            const result = await db.update(buku).set({
                idKategori,
                idPembuat,
                idPenerbit,
                namaBuku,
                isbn,
                issn,
                tahunPembuatan,
                harga,
                keterangan
            })
                .where(eq(buku.idBuku, Number(id)))
                .returning();
            return c.json({ message: "Edit data berhasil", result }, 200)
        } catch (e) {
            return c.json({ message: e }, 400)
        }
    })

export default bukuRoute