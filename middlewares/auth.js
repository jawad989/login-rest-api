import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(403).json({ message: "Not authenticated." })
  }

  if (!token && req.headers["x-access-token"]) {
    token = req.headers["x-access-token"]
  }

  if (token.startsWith('Bearer ')) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return res.status(403).json({ message: "Not authenticated." })
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).json({message: "Token is not valid!"})
    req.user = payload
    next()
  })
}
