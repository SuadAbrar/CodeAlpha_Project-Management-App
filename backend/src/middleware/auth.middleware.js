// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const protect = async (req, res, next) => {
//   const token = req.cookies?.token;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, no token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Not authorized, user not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Not authorized, token invalid" });
//   }
// };

// export default protect;

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
  try {
    // 🔥 DEV BYPASS (for now)
    if (process.env.NODE_ENV !== "production") {
      const user = await User.findOne().select("-password");

      if (!user) {
        return res.status(401).json({ message: "No users found in DB" });
      }

      req.user = user;
      return next();
    }

    // ✅ REAL AUTH (used later in production)
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default protect;
