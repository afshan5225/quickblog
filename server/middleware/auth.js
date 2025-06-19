import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization; // Or req.body.token if it's in body
  const secret = process.env.JWT_SECRET || "THIS@2025"; // fallback secret

  try {
    jwt.verify(token, secret); // ✅ FIXED this line
    next();
  } catch (error) {
    res.json({ success: false, message: "invalid token" });
  }
};

export default auth;
