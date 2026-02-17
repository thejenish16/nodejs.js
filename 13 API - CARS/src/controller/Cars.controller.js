const Cars = require('../model/Cars.model');

module.exports.AddCars = async (req, res) => {
    try {
        const data = await Cars.create(req.body);
        return res.status(200).json({
            error: false,
            message: "Cars Added Successfully",
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
};
module.exports.DeleteCars = async (req, res) => {
    try {
        console.log('Delete request id:', req.query.id);

        const deletedCar = await Cars.findByIdAndDelete(req.query.id);

        if (!deletedCar) {
            return res.status(404).json({
                status: 404,
                error: true,
                message: "Cars Deletetion Failed!!",
            });
        }
        return res.status(201).json({
            status: 201,
            error: false,
            message: "Cars Deletetion Successfully",
        });

    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
}
module.exports.GetCars = async (req, res) => {
    try {
        const data = await Cars.find();
        return res.status(200).json({
            error: false,
            message: "Cars Fetched Successfully",
            data: data,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
};

module.exports.UpdateCars = async (req, res) => {
    try {
        console.log('Update request id:', req.params.id);
        console.log('Update body:', req.body);
        
        const updatedCars = await Cars.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCars) {
            return res.status(404).json({
                status: 404,
                error: true,
                message: "Cars Updation Failed!!",
            });
        }

        return res.status(200).json({
            error: false,
            message: "Cars updated Successfully",
            data: updatedCars,
        });

    } catch (err) {
        console.log('Update error:', err);
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Something Went Wrong",
            error: err,
        });
    }
}