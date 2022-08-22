const express = require('express');
const router = express.Router();
const fileUploadController = require('./fileuploadController');

router.post('/upload', (req, res) => {
	fileUploadController.fileUpload(req, res);
});

router.route('/:id/delete').delete(fileUploadController.removeFile);

module.exports = router;
