const AdminAuthService = require("../../../services/auth/admin/admin.service");
const { MSG } = require("../../../utils/msg");
const { errorResponse, successResponse } = require("../../../utils/response");
const bcrypt = require('bcrypt');
const statusCode = require('http-status-codes');
const moment = require('moment');
const JWT = require('jsonwebtoken')

const adminAuthService = new AdminAuthService();

module.exports.registerAdmin = async (req, res) => {
    try {

        req.body.password = await bcrypt.hash(req.body.password, 11);

        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss');

        const newAdmin = await adminAuthService.registerAdmin(req.body);

        if (!newAdmin) {
            return res.status(400).json(errorResponse(400, true, MSG.ADMIN_REGISTRATION_FAILED));
        }

        const singleAdmin = adminAuthService.FetchSingleAdmin({ email: req.body.email });

        if (singleAdmin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_LOGIN_FAILED));
        }

        return res.status(statusCode.CREATED).json(successResponse(statusCode.CREATED, false, MSG.ADMIN_REGISTRATION_SUCCESS));

    } catch (err) {
        console.log("Error : ", err);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Internal_Server_Error));
    }
}

module.exports.loginAdmin = async (req, res) => {
    try {
        const admin = await adminAuthService.FetchSingleAdmin({ email: req.body.email });
        if (!admin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password);
        if (!isPasswordMatch) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_INCORRECT_PAASWORD));
        }
        const payload = {
            id: admin._id,
        }
        const Token = JWT.sign(payload, process.env.JWT_SECRET_KEY)

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.ADMIN_LOGIN_SUCCESS, { Token }));
    } catch (err) {
        console.log("Error : ", err);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Internal_Server_Error));
    }
}

module.exports.Fetchadmins = async (req, res) => {
    try {
        const alladmins = await adminAuthService.FetchallAdmin();
        return res.status(statusCode.OK).json(errorResponse(statusCode.OK, true, MSG.ADMIN_FETCH_SUCCESS, { allAdmins: alladmins }));

    } catch (err) {
        console.log("Error : ", err);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Internal_Server_Error));
    }


}