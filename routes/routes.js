import express from "express";

// controler

// anggota
import {
  createAnggota,
  deleteAnggota,
  getAmountAnggota,
  getAnggota,
  getAnggotaById,
  updateAnggota,
} from "../controllers/anggota/anggotaControl.js";

// admin
import {
  adminCheck,
  login,
  register,
} from "../controllers/admin/adminControlers.js";

// acara
import {
  createAcara,
  getAcaraById,
  getAcaraSekarang,
  getAllAcara,
  getArsipAcara,
} from "../controllers/acara/acaraControl.js";

// absensi
import {
  getDataAbsensi,
  getDataHadirId,
  getDataIzinId,
  getDataKehadiranById,
  getDetailAbsensi,
  getJumlahDataKehadiranById,
  submitAbsensi,
  updateAbsensi,
} from "../controllers/absensi/absensiControler.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send("API HOME");
});

// anggota
routes.get("/anggota", getAnggota);
routes.get("/anggota/count", getAmountAnggota);
routes.get("/anggota/:id", getAnggotaById);
routes.post("/anggota", createAnggota);
routes.patch("/anggota/:id", updateAnggota);
routes.delete("/anggota/:id", deleteAnggota);

// admin
routes.get("/admin", verifyToken, adminCheck);
routes.post("/auth/register", register);
routes.post("/auth/login", login);
routes.post("/token", refreshToken);

// acara
routes.post("/acara", createAcara);
routes.get("/acara/now", getAcaraSekarang);
routes.get("/acara/:id", getAcaraById);
routes.get("/acara", getAllAcara);

// absensi
routes.get("/absensi", getDataAbsensi);
routes.get("/absensi/arsip", getArsipAcara);
routes.get("/absensi/kehadiran/jumlah/:id", getJumlahDataKehadiranById);
routes.get("/absensi/kehadiran/data/:id", getDataKehadiranById);
routes.get("/absensi/kehadiran/detail/:kel/:id", getDetailAbsensi);
routes.get("/absensi/hadir/:id", getDataHadirId);
routes.get("/absensi/izin/:id", getDataIzinId);
routes.post("/absensi", updateAbsensi);
routes.post("/absensi/submit", submitAbsensi);

export default routes;
