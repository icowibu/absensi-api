import Admin from "../models/adminModels.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(403);
    const admin = Admin.findOne({ where: { refresh_token: refreshToken } });
    if (admin === null) return res.sendStatus(403);

    const { id, nama } = admin;
    const accessToken = jwt.sign({ id, nama }, process.env.REFRESH_TOKEN, {
      expiresIn: "15s",
    });
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};
