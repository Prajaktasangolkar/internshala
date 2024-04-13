import jwt from "jsonwebtoken";
export const validateUser = (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) throw new Error("Token not found");
  try {
    const decoded = jwt.verify(token, "secret");
    if (decoded) {
      req.user = decoded;
      next(); //function 
    }
  } catch (error) {
    throw new Error("Invalid Token");
  }
};
