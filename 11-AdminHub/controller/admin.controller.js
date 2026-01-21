const Admin = require('../model/admin.model')
const nodemailer = require('nodemailer');
const fs = require('fs');


module.exports.dashborad = async (req, res) => {
    const admin = req.admin;
    return res.render('dashboard', { admin, currentPath: req.path });
}

module.exports.viewadmin = async (req, res) => {
    try {
        const admin = req.admin;
        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);
        return res.render('viewAdmin', { allAdmin, admin, currentPath: req.path })
    } catch (error) {
        console.log("Something went wrong");
        console.log("Error : ", error);
        return res.redirect('/dashboard');
    }
}

module.exports.addAdminPage = async (req, res) => {
    const admin = req.admin;
    return res.render('addAdmin', { admin, currentPath: req.path })
}

module.exports.profile = async (req, res) => {
    const admin = req.admin;
    return res.render('Profile/Profile', { admin, currentPath: req.path })
}

module.exports.verifyEmail = async (req, res) => {
    console.log(req.body);
    try {
        const myAdmin = await Admin.findOne(req.body);

        if (!myAdmin) {
            console.log("Admin not found....");
            return res.redirect('/');
        }

        let transporter = nodemailer.createTransporter({
            service: "gmail",
            auth: {
                user: "sujalkidecha68@gmail.com",
                pass: "ztjqvhajgetvlngu"
            }
        });
        const OTP = Math.floor(10000000 + Math.random() * 90000000).toString();
        const htmlTemplate = `
<div style="background-color: #f4f7f9; padding: 50px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <tr>
            <td style="padding: 40px 0 20px 0; text-align: center; background-color: #212529;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Admin Panel</h1>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="color: #333333; font-size: 20px; margin-top: 0;">Verification Required</h2>
                <p style="color: #666666; font-size: 15px; line-height: 1.6;">
                    Hello Administrator, <br>
                    You requested a secure access code for your account. Please use the following One-Time Password (OTP) to complete the verification process.
                </p>
                
                <div style="margin: 30px 0; text-align: center;">
                    <div style="display: inline-block; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 15px 30px;">
                        <span style="font-size: 32px; font-weight: 700; color: #0d6efd; letter-spacing: 8px;">${OTP}</span>
                    </div>
                </div>
                
                <p style="color: #888888; font-size: 13px; text-align: center; margin-top: 20px;">
                    This code will expire in <strong>10 minutes</strong>. <br>
                    If you did not make this request, please secure your account immediately.
                </p>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 20px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="color: #aaaaaa; font-size: 12px; margin: 0;">
                    &copy; 2026 Security Systems | Internal Use Only
                </p>
            </td>
        </tr>
    </table>
</div>
`;
        const info = await transporter.sendMail({
            from: '"Admin Panel" <sujalkidecha68@gmail.com>',
            to: req.body.email,
            subject: "Otp Verification",
            html: htmlTemplate
        });

        console.log(info.messageId);

        res.cookie("OTP", OTP);
        res.cookie("id", myAdmin._id);

        return res.redirect('/Otp-Page');

    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.otpPage = async (req, res) => {
    try {
        if (!req.cookies.OTP || !req.cookies.id) {
            return res.redirect('/');
        }
        return res.render('auth/otpPage');
    }
    catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.VerifyOtp = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.cookies);

        if (req.body.OTP !== req.cookies.OTP) {
            console.log("Invalid Otp");
            return res.redirect('/Otp-Page');
        }

        res.clearCookie('OTP');
        return res.redirect('/forgot-pass');


    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }

}
module.exports.forgotPasswordPage = async (req, res) => {
    try {
        if (!req.cookies.id) {
            return res.redirect('/');
        }
        return res.render('auth/forgotPass');
    }
    catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.cookies);

        if (!req.cookies.id) {
            console.log("Invalid session");
            return res.redirect('/Otp-Page');
        }

        if (req.body.newPass !== req.body.ConfPass) {
            console.log("New and Confirm Password not matched");
            return res.redirect('/forgot-pass');
        }

        const updatePassword = await Admin.findByIdAndUpdate(
            req.cookies.id,
            { password: req.body.newPass },
            { new: true }
        );

        res.clearCookie('id');   // bilkul same pattern
        res.clearCookie('OTP');  // bilkul same pattern

        if (updatePassword) {
            console.log("Password Update...");
            return res.redirect('/');
        } else {
            console.log("Password Not Update...");
            return res.redirect('/');
        }

    } catch (err) {
        console.log("Something went wrong", err);
        return res.redirect('/');
    }
}


module.exports.changePasswordPage = async (req, res) => {
    const admin = req.admin;
    return res.render('auth/changePassPage', { admin, currentPath: req.path })
}
module.exports.changePassword = async (req, res) => {
    try {
        const admin = req.admin;
        const { currentPass, newPass, ConfPass } = req.body;

        if (currentPass != admin.password) {
            console.log('Current Password Is Not Matched Original Password!!');
            return res.redirect('/change-password')
        }

        if (newPass === admin.password) {
            console.log("New Password or original Password Is Matched!! try Again");
            return res.redirect('/change-password')
        }

        if (ConfPass != newPass) {
            console.log("Confirm Password Note Matched New Password!!");
            return res.redirect('/change-password')
        }

        const ChangePass = await Admin.findByIdAndUpdate(admin._id, { password: newPass }, { new: true });
        console.log(ChangePass);

        if (ChangePass) {
            console.log("Password Updated!!!");
        } else {
            console.log("Password Updation failed!!!");
        }

        return res.redirect('/')

    } catch (error) {
        console.log("Delete error:", error);
        return res.redirect('/');
    }
}

module.exports.loginPage = async (req, res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId && admin) {
        return res.redirect('/dashboard');
    }
    return res.render('auth/login')
}

module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
}

module.exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            console.log("Admin Not Found!!");
            return res.redirect('/');
        }

        if (admin.password != req.body.password) {
            console.log("Password not matched!!");
            return res.redirect('/');
        }

        res.cookie('adminId', admin._id);
        return res.redirect('/dashboard');

    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/')
    }
}

module.exports.addAdmin = async (req, res) => {
    try {

        console.log(req.body);
        try {
            if (req.file) {
                req.body.profile = req.file.path;
            }
            const AddAdmin = await Admin.create(req.body);
            if (AddAdmin) {
                console.log("Admin Insertion SuccessFully!");
                return res.redirect('/viewAdmin')
            }
            else {
                console.log("Admin Insertion failed!");
                return res.redirect('/addAdmin')
            }
        } catch (error) {
            console.log("Something Went Wrong", error);
        }
    } catch (error) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        const currentAdmin = req.admin;

        if (currentAdmin.email !== "sujalkidecha68@gmail.com") {
            return res.redirect('/viewAdmin');
        }

        const id = req.params.id;
        const deleteAdmin = await Admin.findByIdAndDelete(id);

        if (deleteAdmin) {
            if (deleteAdmin.profile && fs.existsSync(deleteAdmin.profile)) {
                fs.unlinkSync(deleteAdmin.profile);
            }
            console.log("Admin Deleted Successfully!");
        }

        return res.redirect('/viewAdmin');

    } catch (err) {
        console.log("Delete error:", err);
        return res.redirect('/');
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        const singleAdmin = await Admin.findById(req.params.id);
        const returnTo = req.query.returnTo || '/viewAdmin';
        return res.render('editAdmin', { singleAdmin, currentPath: req.path, returnTo });
    } catch (err) {
        console.log(err);
        return res.redirect('/viewAdmin');
    }
}

module.exports.updateAdmin = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {

            req.body.profile = req.file.path;

            const updatedData = await Admin.findByIdAndUpdate(req.params.id, req.body);

            if (updatedData) {
                fs.unlink(updatedData.profile, () => { });
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }

        } else {

            const updatedData = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (updatedData) {
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }
        }
        const returnTo = req.body.returnTo || '/viewAdmin';

        return res.redirect(returnTo);
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error :", err);
        return res.redirect('/viewAdmin');
    }
}