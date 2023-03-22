import Admin from "../../models/adminModels.js";
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";

export const adminCheck = async (req, res) => {
  res.status(200).json({ isLoggedIn: true });
};

export const register = async (req, res) => {
  const { username, password, token } = req.body;
  const pwRule = /^.{8,}$/;

  // validate
  const temp = await Admin.findOne({ where: { username } });
  if (temp !== null)
    return res.status(400).json({ msg: "username telah digunakan" });
  if (pwRule.test(password) !== true)
    return res
      .status(400)
      .json({ msg: "password minimal memiliki 8 karakter" });
  if (token !== "initoken123")
    return res.status(400).json({
      msg: "tokennya salah !. silahkan hubungi developer untuk mendapatkan token",
    });

  const garam = await genSalt(10);
  const hashPassword = await hash(password, garam);
  const obj = { username, password: hashPassword };

  try {
    await Admin.create(obj);
    res.status(201).json({ msg: "berhasil membuat akun admin" });
  } catch (e) {
    console.log(e.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ where: { username } });
  if (admin === null)
    return res.status(400).json({ msg: "username tidak ditemukan" });

  const pwMatch = await compare(password, admin.password);
  if (!pwMatch) return res.status(400).json({ msg: "password salah" });

  const { id, nama } = admin;

  const accessToken = jwt.sign({ id, nama }, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });
  const refreshToken = jwt.sign({ id, nama }, process.env.REFRESH_TOKEN, {
    expiresIn: "1d",
  });

  await Admin.update(
    {
      refresh_token: refreshToken,
    },
    {
      where: { id },
    }
  );

  res.json({ accessToken, refreshToken });
};
