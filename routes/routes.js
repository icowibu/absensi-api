import express from 'express'

// controler
import { createAnggota, deleteAnggota, getAnggota, getAnggotaById, updateAnggota } from "../controllers/anggota/anggotaControl.js"
import { getAllAdmin, login, register } from '../controllers/admin/adminControlers.js'
import { verifyToken } from '../middleware/verifyToken.js'

const routes = express.Router()

routes.get("/", (req, res) => {
    return res.status(200).send("API HOME")
})

// anggota route
routes.get("/anggota", getAnggota)
routes.get("/anggota/:id", getAnggotaById)
routes.post("/anggota", createAnggota)
routes.patch("/anggota/:id", updateAnggota)
routes.delete("/anggota/:id", deleteAnggota)

// admin route
routes.get("/admin", getAllAdmin)
routes.post("/admin", register)
routes.post("/login", login)

// routes.get("/acara/waktu", getAcaraWaktu)
// routes.get("/acara/waktu/waktu", getAcaraWaktuByWaktu)
// routes.post("/acara/waktu", getAcaraWaktu)

// routes.get("/acara/waktu/user/acara-waktu", getKehadiranByAcaraWaktuID)
// routes.get("/acara/belum-hadir/user", getBelumHadirByAcaraWaktuID)
// routes.post("/acara/waktu/user", createKehadiran)

export default routes  