import jwt from "jsonwebtoken";

export const createJWT = (payload, remember) => {
  const expiryDate = remember
    ? process.env.JWT_REMEMBER_ME_EXPIRY
    : process.env.JWT_EXPIRY;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: expiryDate,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
