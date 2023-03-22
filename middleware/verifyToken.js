import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const tokenFromReq = authHeader?.split(" ")[1];

  if (tokenFromReq === undefined) return res.sendStatus(401);

  jwt.verify(tokenFromReq, process.env.ACCESS_TOKEN, (err, admin) => {
    if (err) return res.sendStatus(403);
    req.admin = admin;
    next();
  });
};
