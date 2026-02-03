const Admin = require('../model/admin.model')
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');


module.exports.dashborad = async (req, res) => {
    try {
        const admin = req.user;
        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);
        return res.render('dashboard', { admin, allAdmin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong");
        console.log("Error : ", error);
        return res.redirect('/');
    }
}

module.exports.viewadmin = async (req, res) => {
    try {
        const admin = req.user;
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
    const admin = req.user;
    return res.render('addAdmin', { admin, currentPath: req.path })
}

module.exports.profile = async (req, res) => {
    const admin = req.user;
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

        // Check if OTP already exists in session
        if (req.session.OTP && req.session.id) {
            console.log("OTP already sent, redirecting to OTP page");
            return res.redirect('/Otp-Page');
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jenishpardava16@gmail.com",
                pass: "xucxgebdvgmdobmz"
            }
        });
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
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
            from: '"Admin Panel" <jenishpardava16@gmail.com>',
            to: req.body.email,
            subject: "Otp Verification",
            html: htmlTemplate
        });

        console.log("OTP sent:", OTP);
        console.log(info.messageId);

        req.session.OTP = OTP;
        req.session.id = myAdmin._id;

        return res.redirect('/Otp-Page');

    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.otpPage = async (req, res) => {
    try {
        if (!req.session.OTP || !req.session.id) {
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
        console.log(req.session);

        if (req.body.OTP !== req.session.OTP) {
            console.log("Invalid Otp - Expected:", req.session.OTP, "Got:", req.body.OTP);
            return res.redirect('/Otp-Page');
        }

        delete req.session.OTP;
        return res.redirect('/new-password');


    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }

}
module.exports.forgotPasswordPage = async (req, res) => {
    try {
        if (!req.session.id) {
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
        console.log(req.session);

        if (!req.session.id) {
            console.log("Invalid session");
            return res.redirect('/forgot-pass');
        }

        if (req.body.newPass !== req.body.ConfPass) {
            console.log("New and Confirm Password not matched");
            return res.redirect('/new-password');
        }

        const updatePassword = await Admin.findByIdAndUpdate(
            req.session.id,
            { password: req.body.newPass },
            { new: true }
        );

        delete req.session.id;
        delete req.session.OTP;

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
    const admin = req.user;
    return res.render('auth/changePassPage', { admin, currentPath: req.path })
}
module.exports.changePassword = async (req, res) => {
    try {
        const admin = req.user;
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
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    return res.render('auth/login')
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        return res.redirect('/');
    });
}



module.exports.addAdmin = async (req, res) => {
    try {
        console.log(req.body);
        try {
            if (req.file) {
                req.body.profile_image = req.file.path;
            }
            
            // Convert hobby checkboxes to array
            if (req.body.hobby) {
                if (typeof req.body.hobby === 'string') {
                    req.body.hobby = [req.body.hobby];
                }
            } else {
                req.body.hobby = [];
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
        console.log("Error : ", error);
        return res.redirect('/');
    }
}

// Helper function to delete image file
const deleteImageFile = (imagePath) => {
    if (imagePath && fs.existsSync(imagePath)) {
        try {
            fs.unlinkSync(imagePath);
            console.log("Image deleted:", imagePath);
            return true;
        } catch (error) {
            console.log("Error deleting image:", error);
            return false;
        }
    }
    return false;
};

module.exports.deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Attempting to delete admin with ID:", id);
        
        const adminToDelete = await Admin.findById(id);
        
        if (!adminToDelete) {
            console.log("Admin not found for deletion");
            return res.redirect('/viewAdmin');
        }

        // Delete the admin from database
        const deleteAdmin = await Admin.findByIdAndDelete(id);

        if (deleteAdmin) {
            console.log("Admin deleted:", deleteAdmin.fname, deleteAdmin.lname);
            
            // Delete associated profile image
            if (deleteAdmin.profile_image) {
                deleteImageFile(deleteAdmin.profile_image);
            }
            
            console.log("Admin Deleted Successfully!");
        }

        return res.redirect('/viewAdmin');

    } catch (err) {
        console.log("Delete error:", err);
        return res.redirect('/viewAdmin');
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

        // Get current admin data to access old image
        const currentAdmin = await Admin.findById(req.params.id);
        if (!currentAdmin) {
            console.log("Admin not found for update");
            return res.redirect('/viewAdmin');
        }

        // Convert hobby checkboxes to array
        if (req.body.hobby) {
            if (typeof req.body.hobby === 'string') {
                req.body.hobby = [req.body.hobby];
            }
        } else {
            req.body.hobby = [];
        }

        if (req.file) {
            // New image uploaded
            req.body.profile_image = req.file.path;
            
            const updatedData = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (updatedData) {
                // Delete old image after successful update
                if (currentAdmin.profile_image && currentAdmin.profile_image !== req.file.path) {
                    deleteImageFile(currentAdmin.profile_image);
                }
                console.log("Admin Updated Successfully with new image...");
            } else {
                // If update failed, delete the newly uploaded image
                deleteImageFile(req.file.path);
                console.log("Admin Update Failed...");
            }
        } else {
            // No new image uploaded, keep existing image
            const updatedData = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (updatedData) {
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Update Failed...");
            }
        }
        
        const returnTo = req.body.returnTo || '/viewAdmin';
        return res.redirect(returnTo);
        
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error :", err);
        
        // If there was an error and a file was uploaded, clean it up
        if (req.file) {
            deleteImageFile(req.file.path);
        }
        
        return res.redirect('/viewAdmin');
    }
}