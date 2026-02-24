
const JWT = require("jsonwebtoken");
const status = require('http-status-codes');
const { MSG } = require("../utils/msg");
const { errorResponse } = require("../utils/response");
const AdminAuthService = require('../services/auth/admin/admin.service');

const adminAuthService = new AdminAuthService();

module.exports.authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;

    token = token.slice(7, token.length);

    if (!token) {
        return res.status(status.BAD_REQUEST).json(errorResponse(status.BAD_REQUEST, true, MSG.Token_Not_Provided));
    }
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await adminAuthService.FetchSingleAdmin({ id: decoded.adminId });
        if (admin) {
            next();
        }
        else {
            return res.status(status.BAD_REQUEST).json(errorResponse(status.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }
    } catch (error) {
        return res.status(status.BAD_REQUEST).json(errorResponse(status.BAD_REQUEST, true, MSG.Token_Invalid));
    }
}
