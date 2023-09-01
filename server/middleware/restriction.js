const restrictAccess = (req, res, next) => {
    // Check if the request is for the allowed route (/api/posts)
    if (req.path.startsWith("/api/posts")) {
      return next();
    }

    //add here multiple paths to be restricte
  
    res.status(404).json({ message: "Not Found" });
  };
  
  module.exports = restrictAccess;