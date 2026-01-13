const verifyAdmin = (req, res, next) => {
     try {
       if (!req.user) {
         return res.status(401).json({ message: "Unauthorized: No user info" });
       }

       if (!req.user.roles || !req.user.roles.includes("admin")) {
         return res.status(403).json({ message: "Forbidden: Admins only" });
       }
       next();
     } catch (error) {
       next(error);
     }
}

module.exports = {
    verifyAdmin
}