export const checkUserLoggued = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({Error:'Por favor, inicie sesión'});
    }
}