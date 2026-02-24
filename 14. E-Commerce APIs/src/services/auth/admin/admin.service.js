const Admin = require("../../../model/admin.model");

module.exports = class AdminAuthService {
    async registerAdmin(body) {
        try {
            return await Admin.create(body);
        } catch (err) {
            console.log("Admin Register Error: ", err);
        }
    }

    async FetchSingleAdmin(body) {
        try {
            return await Admin.findOne(body);
        } catch (err) {
            console.log("Admin Fetch Error: ", err);
        }
    }
    async FetchallAdmin() {
        try {
            return await Admin.find();
        } catch (err) {
            console.log("Admin Fetch Error: ", err);
        }
    }
}
