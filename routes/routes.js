import express from "express";

// controler
import {
  createAnggota,
  deleteAnggota,
  getAnggota,
  getAnggotaById,
  updateAnggota,
} from "../controllers/anggota/anggotaControl.js";
import {
  adminCheck,
  login,
  register,
} from "../controllers/admin/adminControlers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send("API HOME");
});

// anggota route
routes.get("/anggota", getAnggota);
routes.get("/anggota/:id", getAnggotaById);
routes.post("/anggota", createAnggota);
routes.patch("/anggota/:id", updateAnggota);
routes.delete("/anggota/:id", deleteAnggota);

// admin route
routes.get("/admin", verifyToken, adminCheck);
routes.post("/auth/register", register);
routes.post("/auth/login", login);
routes.post("/token", refreshToken);

export default routes;
