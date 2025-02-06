module.exports = async (req,res,next) => {
    const isAdmin = req.user.role === "ADMIN"

    if (isAdmin) {
        return next()
    };

    res.status(403).json({
        message : "This route accessible only for admin",
    })
}