const protect = async (req, res, next) => {
  // TODO: verify JWT from HTTP-only cookie and attach user to req
  next();
};

export default protect;
