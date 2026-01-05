const Video = require('../models/video.model');
const upload = require('../middleware/upload');

const videoController = {

    // Home page
    getHomePage: async (req, res) => {
        try {
            const videos = await Video.find().sort({ createdAt: -1 });
            return res.render('index', { videos });
        } catch (error) {
            return res.render('error', { error: error.message });
        }
    },

    // Add video page
    getAddVideoForm: (req, res) => {
        return res.render('addVideo');
    },

    // Create video
    addVideo: [
        upload.single('thumbnail'),
        async (req, res) => {
            try {
                const data = {
                    ...req.body,
                    thumbnail: req.file ? `/uploads/${req.file.filename}` : ''
                };

                await Video.create(data);
                return res.redirect('/');
            } catch (error) {
                return res.render('error', { error: error.message });
            }
        }
    ],

    // Edit video page
    getEditVideoForm: async (req, res) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) {
                return res.render('error', { error: 'Video not found' });
            }
            return res.render('editVideo', { video });
        } catch (error) {
            return res.render('error', { error: error.message });
        }
    },

    // Update video
    updateVideo: [
        upload.single('thumbnail'),
        async (req, res) => {
            try {
                const updateData = {
                    ...req.body,
                    ...(req.file && { thumbnail: `/uploads/${req.file.filename}` })
                };

                await Video.findByIdAndUpdate(req.params.id, updateData);
                return res.redirect('/');
            } catch (error) {
                return res.render('error', { error: error.message });
            }
        }
    ],

    // Delete video
    deleteVideo: async (req, res) => {
        try {
            await Video.findByIdAndDelete(req.params.id);
            return res.redirect('/');
        } catch (error) {
            return res.render('error', { error: error.message });
        }
    },

    // Watch video
    watchVideo: async (req, res) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video) {
                return res.render('error', { error: 'Video not found' });
            }
            return res.render('watchVideo', { video });
        } catch (error) {
            return res.render('error', { error: error.message });
        }
    }

};

module.exports = videoController;
