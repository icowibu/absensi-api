import Admin from "../models/adminModels.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  try {
    if (!refreshToken) return res.sendStatus(401);
    const admin = Admin.findOne({ where: { refresh_token: refreshToken } });
    if (admin === null) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
      if (err) return res.sendStatus(403);
      const { id, username } = admin;
      const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN, {
        expiresIn: "10m",
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};
