import jwt from "jsonwebtoken";

const verifyToken = (token: string): jwt.JwtPayload | null => {
  return jwt.verify(token, 'petstore-jwt-secret') as jwt.JwtPayload;
};

export const authenticateUser = async (req: any, res: any, next: ()=>void) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('token :>> ', token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
    const decoded = verifyToken(token)
    if(!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if(decoded?.exp && decoded.exp < Date.now() / 1000) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.token = decoded;
    next();
};
