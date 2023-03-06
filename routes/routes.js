import express from 'express'

import { getAcara, getAcaraWaktu, getAcaraWaktuByWaktu } from '../controller/acara/acara.js'
import { createKehadiran, getBelumHadirByAcaraWaktuID, getKehadiranByAcaraWaktuID } from '../controller/kehadiran/kehadiran.js'

const routes = express.Router()

routes.get("/health", (req, res) => {
    return res.status(200).send("Apps is Healthy")
})

routes.get("/", (req, res) => {
    return res.status(200).send("API HOME")
})

routes.get("/acara/waktu", getAcaraWaktu)
routes.get("/acara/waktu/waktu", getAcaraWaktuByWaktu)
routes.post("/acara/waktu", getAcaraWaktu)

routes.get("/acara/waktu/user/acara-waktu", getKehadiranByAcaraWaktuID)
routes.get("/acara/belum-hadir/user", getBelumHadirByAcaraWaktuID)
routes.post("/acara/waktu/user", createKehadiran)

export default routes