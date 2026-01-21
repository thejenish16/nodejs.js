const Admin = require('./model/admin.model');
require('./config/db.config');

const createMainAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'jenishpardava16@gmail.com' });
        
        if (existingAdmin) {
            console.log('Main admin already exists!');
            return;
        }

        // Create main admin
        const mainAdmin = await Admin.create({
            profile: 'upload/admin/default-admin.jpg',
            fname: 'Jenish',
            lname: 'Pardava',
            email: 'jenishpardava16@gmail.com',
            password: 'jenox321',
            phone: 9081603142,
            gander: 'Male',
            hobby: ['Coding', 'Gaming', 'Reading'],
            city: 'Surat',
            about: 'Main Administrator with full system access and control.'
        });

        if (mainAdmin) {
            console.log('Main admin created successfully!');
            console.log('Email: jenishpardava16@gmail.com');
            console.log('Password: jenox321');
        }

    } catch (error) {
        console.log('Error creating main admin:', error);
    }
    
    process.exit();
};

createMainAdmin();