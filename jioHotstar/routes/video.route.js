const express = require('express');
const multer = require('multer');

const router = express.Router();
const videoController = require('../controllers/video.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Home page
router.get('/', videoController.getHomePage);

// Add video routes
router.get('/add-video', videoController.getAddVideoForm);
router.post('/add-video', videoController.addVideo);

// Edit video routes
router.get('/edit-video/:id', videoController.getEditVideoForm);
router.post('/edit-video/:id', videoController.updateVideo);

// Delete video
router.get('/delete-video/:id', videoController.deleteVideo);

// Watch video
router.get('/watch/:id', videoController.watchVideo);

module.exports = router;