import { useEffect, useState } from "react"

interface Buku {
    buku: {
        idBuku: number
        namaBuku: string
        isbn: string
        issn: string
        tahunPembuatan: number
        harga: number
        keterangan: string
    }
    kategori: {
        namaKategori: string
    } | null
    penerbit: {
        namaPenerbit: string
    } | null
    pembuat: {
        namaPembuat: string
    } | null
}

const BookTable = () => {
    const [data, setData] = useState<Buku[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/buku/get")
                const json = await res.json()
                setData(json)
            } catch (e) {
                console.error("Gagal fetch data buku:", e)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <p className="p-5">Memuat data buku...</p>

    return (
        <div className="overflow-auto rounded-lg shadow bg-white">
            <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th className="p-3 text-sm">Id</th>
                        <th className="p-3 text-sm">Nama Buku</th>
                        <th className="p-3 text-sm">Kategori</th>
                        <th className="p-3 text-sm">Penerbit</th>
                        <th className="p-3 text-sm">ISBN</th>
                        <th className="p-3 text-sm">ISSN</th>
                        <th className="p-3 text-sm">Pembuat</th>
                        <th className="p-3 text-sm">Tahun</th>
                        <th className="p-3 text-sm">Harga</th>
                        <th className="p-3 text-sm">Keterangan</th>
                        <th className="p-3 text-sm">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row, i) => (
                        <tr key={row.buku.idBuku} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="p-3 text-sm">{row.buku.idBuku}</td>
                            <td className="p-3 text-sm">{row.buku.namaBuku}</td>
                            <td className="p-3 text-sm">{row.kategori?.namaKategori ?? "-"}</td>
                            <td className="p-3 text-sm">{row.penerbit?.namaPenerbit ?? "-"}</td>
                            <td className="p-3 text-sm">{row.buku.isbn}</td>
                            <td className="p-3 text-sm">{row.buku.issn}</td>
                            <td className="p-3 text-sm">{row.pembuat?.namaPembuat ?? "-"}</td>
                            <td className="p-3 text-sm">{row.buku.tahunPembuatan}</td>
                            <td className="p-3 text-sm">{row.buku.harga}</td>
                            <td className="p-3 text-sm">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${row.buku.keterangan
                                            ? 'bg-green-200 text-green-800'
                                            : 'bg-red-200 text-red-800'
                                        }`}
                                >
                                    {row.buku.keterangan ? 'Tersedia' : 'Kosong'}
                                </span>
                            </td>

                            <td className="p-3 text-sm flex gap-2">
                                <button className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">Edit</button>
                                <button className="px-2 py-1 bg-rose-500 text-white rounded hover:bg-rose-600">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookTable
