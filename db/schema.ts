
import { relations } from "drizzle-orm";
import { pgTable, serial, varchar,timestamp ,numeric, integer, char, boolean } from "drizzle-orm/pg-core";

export const kategori = pgTable("kategori", {
    idKategori: serial("id_kategori").primaryKey(),
    kodeKategori: varchar("kode_kategori").notNull(),
    namaKategori: varchar("nama_kategori").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})

export const penerbit = pgTable("penerbit", {
    idPenerbit: serial("id_penerbit").primaryKey(),
    namaPenerbit: varchar("nama_penerbit").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})

export const pembuat = pgTable("pembuat", {
    idPembuat: serial("id_pembuat").primaryKey(),
    namaPembuat: varchar("nama_pembuat").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})

export const buku = pgTable("buku", {
    idBuku: serial("id_buku").primaryKey(),
    idKategori: integer("id_kategori")
        .notNull()
        .references(() => kategori.idKategori, {
            onDelete: "cascade",
            onUpdate: "cascade"
        }),
    idPenerbit: integer("id_penerbit")
        .notNull()
        .references(() => penerbit.idPenerbit, {
            onDelete: "cascade",
            onUpdate: "cascade"
        }),
    idPembuat: integer("id_pembuat")
        .notNull()
        .references(() => pembuat.idPembuat, {
            onDelete: "cascade",
            onUpdate: "cascade"
        }),
    namaBuku: varchar("nama_buku").notNull(),
    isbn: varchar("isbn").notNull(),
    issn: varchar("issn").notNull(),
    tahunPembuatan: char("tahun_pembuatan", {length: 4}).notNull(),
    harga: numeric("harga").notNull(),
    keterangan: boolean("keterangan").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
})

export const relasiKategoriToBuku = relations(kategori, ({ many }) => ({
    kategori: many(buku)
}))

export const relasiBukuToKategori = relations(buku, ({ one }) =>  ({
    kategori: one(kategori, {
        fields: [buku.idKategori],
        references: [kategori.idKategori]
    })
}))

export const relasiPenerbitToBuku = relations(penerbit, ({ many })=>({
    penerbit: many(buku)
}))

export const relasiBukuToPenerbit = relations(buku, ({ one }) =>({
    penerbit: one(penerbit, {
        fields: [buku.idPenerbit],
        references: [penerbit.idPenerbit]
    })
}))

export const relasiPembuatToBuku = relations(pembuat, ({ many })=>({
    pembuat: many(buku)
}))

export const relasiBukuToPembuat = relations(buku, ({ one }) =>({
    pembuat: one(pembuat, {
        fields: [buku.idPembuat],
        references: [pembuat.idPembuat]
    })
}))