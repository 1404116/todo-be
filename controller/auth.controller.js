const authController = {};
//통큰이 만료되었는지 확인해줌
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            throw new Error("invalid token");
        }
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                throw new Error("invalid token!!");
            }
            // res.status(200).json({ status: "success", userId: payload._id });
            req.userId = payload._id;
            next();
        });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

module.exports = authController;