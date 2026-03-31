const UserAuthService = require("../../../services/auth/user/user.service");
const moment = require("moment");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const statusCodes = require("http-status-codes");
const { errorResponse, successResponse } = require("../../../utils/response");
const { MSG } = require("../../../utils/msg");
const { sendEmail } = require("../../../utils/mailer");

const userAuthService = new UserAuthService();

module.exports.registerUser = async (req, res) => {
    try {
        const user = await userAuthService.fetchSingleUser({ email: req.body.email })

        if (user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.User_Registration_Failed));
        }

        req.body.password = await bycrypt.hash(req.body.password, 11);

        req.body.create_at = moment().format("YYYY-MM-DD HH:mm:ss A");
        req.body.update_at = moment().format("YYYY-MM-DD HH:mm:ss A");

        const newUser = await userAuthService.registerUser(req.body);

        if (!newUser) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.User_Registration_Failed));
        }

        return res.status(statusCodes.CREATED).json(successResponse(statusCodes.CREATED, true, MSG.User_Registration_Success, newUser));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
    }
}


module.exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);

        const user = await userAuthService.fetchSingleUser({ email: req.body.email });

        if (!user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.User_Not_Found));
        }

        const isPassword = await bycrypt.compare(req.body.password, user.password);

        if (!isPassword) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.User_Login_Failed));
        }

        const payload = {
            id: user.id,
            isAdmin: false
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });


        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.User_Login_Success, { token }));

    } catch (err) {
        console.log("Error : ", err);
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        console.log(req.body);
        const user = await userAuthService.fetchSingleUser({ email: req.body.email });

        if (!user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.User_Not_Found));
        }

        if (user.attempt_expire < Date.now()) {
            user.attempt = 0;
        }

        if (user.attempt >= 3) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Many_Time_Otp));
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        await sendEmail(req.body.email, OTP);

        user.attempt++;

        const expireOTPTime = new Date(Date.now() + 1000 * 60 * 2);

        await userAuthService.updateUser(user.id, { OTP: OTP, OTP_Expire: expireOTPTime, attempt: user.attempt, attempt_expire: new Date(Date.now() + 1000 * 60 * 60) });

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.Otp_send_successFully));

    } catch (err) {
        console.log("Error : ", err);
    }
}

module.exports.verifyOtp = async (req, res) => {
    try {
        const user = await userAuthService.fetchSingleUser({ email: req.body.email });

        if (!user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.User_Not_Found));
        }

        if (user.verify_attempt_expire < Date.now()) {
            user.verify_attempt = 0;
        }

        if (user.verify_attempt >= 3) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Many_Time_Otp));
        }

        if (user.OTP_Expire < Date.now()) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Otp_Expire));
        }

        user.verify_attempt++;

        await userAuthService.updateUser(user.id, { verify_attempt: user.verify_attempt, verify_attempt_expire: new Date(Date.now() + 1000 * 60 * 60) });


        if (req.body.OTP != user.OTP) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.Invalid_Otp));
        }

        await userAuthService.updateUser(user.id, { OTP: 0, OTP_Expire: null, verify_attempt: user.verify_attempt, verify_attempt_expire: new Date(Date.now() + 1000 * 60 * 60) });

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.VERIFY_OTP));

    } catch (error) {
        console.log("Error : ", error);
    }
}


module.exports.resetPassword = async (req, res) => {
    try {
        console.log(req.body);

        const user = await userAuthService.fetchSingleUser({ email: req.body.email });

        console.log(user);

        if (!user) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.User_Not_Found));
        }

        req.body.new_password = await bycrypt.hash(req.body.new_password, 11);

        const updatedPassword = await userAuthService.updateUser(user.id, { password: req.body.new_password });

        if (!updatedPassword) {
            return res.status(statusCodes.BAD_REQUEST).json(errorResponse(statusCodes.BAD_REQUEST, true, MSG.USER_PASSWORD_UPDATE_FAILED));
        }

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.USER_PASSWORD_UPDATED));


    } catch (err) {
        console.log("Error : ", err);
    }
}

module.exports.fetchAllUser = async (req, res) => {
    try {
        const allAdmin = await adminAuthService.fetchAllAdmin();

        return res.status(statusCodes.OK).json(successResponse(statusCodes.OK, false, MSG.ADMIN_FETCH_SUCCESS, allAdmin));
    } catch (err) {
        console.log("Error : ", err);
    }
}

