const AdminAuthService = require('../../../services/auth/admin/admin.service');
const { successResponse, errorResponse } = require('../../../utils/response');
const { MSG } = require('../../../utils/msg');
const moment = require('moment');
const statusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../../../utils/mailer');

const adminAuthService = new AdminAuthService();

module.exports.registerAdmin = async (req, res) => {
    try {
        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email, isDelete: false, isActive: true }, true);

        if (admin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.ADMIN_Allready_exist));
        }

        const password = req.body.password;
        req.body.password = await bcrypt.hash(req.body.password, 11);

        req.body.create_at = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.update_at = moment().format('YYYY-MM-DD HH:mm:ss');

        const newAdmin = await adminAuthService.registerAdmin(req.body);

        if (!newAdmin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_Registration_Failed));
        }

        await sendEmail(req.body.email, password);
        return res.status(statusCodes.CREATED).json(successResponse(statusCodes.CREATED, false, MSG.Admin_Registration_Success));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.loginAdmin = async (req, res) => {
    try {
        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email, isDelete: false, isActive: true }, false);

        if (!admin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password);

        if (!isPasswordMatch) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_INCORRECT_PAASWORD));
        }

        const payload = {
            id: admin._id,
            isAdmin: true,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.Admin_Login_Success, { token }));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email, isDelete: false, isActive: true }, false);

        if (!admin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        if (!admin.attempt_expire || new Date(admin.attempt_expire).getTime() < Date.now()) {
            admin.attempt = 0;
        }

        if (admin.attempt >= 3) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Many_Time_Otp));
        }

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        await sendEmail(admin.email, OTP);

        admin.attempt++;

        await adminAuthService.updateAdmin(admin._id, {
            attempt: admin.attempt,
            OTP: OTP,
            OTP_Expire: new Date(Date.now() + 2 * 60 * 1000),
            attempt_expire: new Date(Date.now() + 60 * 60 * 1000)
        });

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.Otp_send_successFully));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.verifyOtp = async (req, res) => {
    try {
        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email, isDelete: false, isActive: true }, false);

        if (!admin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        if (admin.verify_attempt_expire < Date.now()) {
            admin.verify_attempt = 0;
        }

        if (admin.verify_attempt >= 3) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Many_Time_Otp));
        }

        if (admin.OTP_Expire < Date.now()) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Otp_Expire));
        }

        admin.verify_attempt++;

        await adminAuthService.updateAdmin(admin._id, {
            verify_attempt: admin.verify_attempt,
            verify_attempt_expire: new Date(Date.now() + 60 * 60 * 1000)
        });

        if (req.body.OTP.toString() !== admin.OTP.toString()) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Invalid_Otp));
        }

        await adminAuthService.updateAdmin(admin._id, {
            OTP: null,
            OTP_Expire: null,
            verify_attempt: 0,
            verify_attempt_expire: null
        });

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.VERIFY_OTP));
    } catch (error) {
        console.log("Error : ", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email, isDelete: false, isActive: true }, true);

        if (!admin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        req.body.new_password = await bcrypt.hash(req.body.new_password, 11);

        const updatedPassword = await adminAuthService.updateAdmin(admin._id, { password: req.body.new_password });

        if (!updatedPassword) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.ADMIN_PASSWORD_UPDATE_FAILED));
        }

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.ADMIN_PASSWORD_UPDATED));
    } catch (error) {
        console.log("Error : ", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.fetchAllAdmin = async (req, res) => {
    try {
        if (req.user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Unauthorized_Access));
        }

        const allAdmins = await adminAuthService.fetchAllAdmin();
        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.Admins_Fetched, allAdmins));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        if (req.user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Unauthorized_Access));
        }

        const admin = await adminAuthService.fetchSingleAdmin({ _id: req.query.id, isDelete: false, isActive: true }, true);

        if (!admin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        const deletedAdmin = await adminAuthService.updateAdmin(req.query.id, { isDelete: true, isActive: false });

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.Admin_Deleted, deletedAdmin));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.updateAdmin = async (req, res) => {
    try {
        if (req.user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Unauthorized_Access));
        }

        const admin = await adminAuthService.fetchSingleAdmin({ _id: req.query.id, isDelete: false, isActive: true }, true);

        if (!admin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        req.body.update_at = moment().format('YYYY-MM-DD HH:mm:ss');
        const updatedAdmin = await adminAuthService.updateAdmin(req.query.id, req.body);

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.Admin_Updated, updatedAdmin));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.isActive = async (req, res) => {
    try {
        if (req.user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Unauthorized_Access));
        }

        const admin = await adminAuthService.fetchSingleAdmin({ _id: req.query.id, isDelete: false }, true);

        if (!admin) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        const updatedAdmin = await adminAuthService.updateAdmin(req.query.id, { isActive: !admin.isActive });

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, `${admin.first_name} ${admin.last_name} is ${updatedAdmin.isActive ? 'active' : 'inactive'}`));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.adminProfile = async (req, res) => {
    try {
        if (req.user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Unauthorized_Access));
        }

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.ADMIN_Profile_fetch_success, req.admin));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        if (req.user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Unauthorized_Access));
        }

        const admin = await adminAuthService.fetchSingleAdmin({ _id: req.admin.id }, false);

        const isPassword = await bcrypt.compare(req.body.current_password, admin.password);

        if (!isPassword) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.CHANGE_PASSWORD_FAILED));
        }

        req.body.new_password = await bcrypt.hash(req.body.new_password, 11);

        await adminAuthService.updateAdmin(req.admin.id, { password: req.body.new_password });

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.CHANGE_PASSWORD));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse(statusCodes.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}
