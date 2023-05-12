import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("ini accessToken di server " + token);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ msg: "Token expired" });
      } else {
        return res.status(401).json({ msg: "Unauthorized" });
      }
    }
    req.admin = decode;
    next();
  });
};
