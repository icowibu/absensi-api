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
  getAcaraSekarang,
  getAllAcara,
} from "../controllers/acara/acaraControl.js";

// absensi
import {
  getDataAbsensi,
  getDataHadirId,
  getDataIzinId,
  getDataKehadiranKelompok,
  updateAbsensi,
} from "../controllers/absensi/absensiControler.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send("API HOME");
});

// anggota route
routes.get("/anggota", getAnggota);
routes.get("/anggota/count", getAmountAnggota);
routes.get("/anggota/:id", getAnggotaById);
routes.post("/anggota", createAnggota);
routes.patch("/anggota/:id", updateAnggota);
routes.delete("/anggota/:id", deleteAnggota);

// admin route
routes.get("/admin", verifyToken, adminCheck);
routes.post("/auth/register", register);
routes.post("/auth/login", login);
routes.post("/token", refreshToken);

// acara route
routes.post("/acara", createAcara);
routes.get("/acara/now", getAcaraSekarang);
routes.get("/acara", getAllAcara);

// absensi route
routes.get("/absensi", getDataAbsensi);
routes.get("/absensi/kehadiran/kelompok/:id", getDataKehadiranKelompok);
routes.get("/absensi/:id", getDataHadirId);
routes.get("/absensi/izin/:id", getDataIzinId);
routes.post("/absensi", updateAbsensi);

export default routes;
