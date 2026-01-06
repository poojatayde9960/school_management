exports.adminProtected = (req, res, next) => {
    const { admin } = req.cookies
    if (!admin) {
        return res, status(401).json({ message: "No Cookie found" })
    }
    jwt.verify(admin, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
    })
    next()
}
// exports.clarkProtected = (req, res, next) => {
//     const { clark } = req.cookies
//     if (!clark) {
//         return res, status(401).json({ message: "No Cookie found" })
//     }
//     jwt.verify(clark, process.env.JWT_KEY, (error, decode) => {
//         if (error) {
//             console.log(error);
//             return res.status(401).json({ message: "Invalid Token" })
//         }
//         req.user = decode.userId
//         next()
//     })
// }
exports.clarkProtected = (req, res, next) => {
    const { clark } = req.cookies;

    if (!clark) {
        return res.status(401).json({ message: "No Cookie found" });
    }

    jwt.verify(clark, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" });
        }
        req.user = decode.userId;
    });
    next();
};
