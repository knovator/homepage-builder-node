const service = require('../dbService');
const File = require('../models/file');
const { promisify } = require('util');
const fs = require('fs');
const sizeOf = promisify(require('image-size'));

const fileData = async (file, folder) => {
	if (
		!file.name.match(
			/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF|docx|DOCX|mp4|MP4|doc|DOC|webm|WEBM|avi|AVI)$/
		)
	) {
		throw new Error('Only images files are allowed.');
	}
	const fileName = file.name;
	let pathToStore = `./public/uploads/${folder}/${fileName}`;
	await file.mv(pathToStore);
	let fileObj = {
		name: file.name,
		mimetype: file.mimetype,
		size: file.size,
		uri: `/uploads/${folder}/${fileName}`,
		type: file.mimetype,
	};
	if (file.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
		const dimensions = await sizeOf(pathToStore);
		fileObj.height = dimensions.height;
		fileObj.width = dimensions.width;
	}
	return fileObj;
};
const removeFile = async (req, res) => {
	let id = req.params.id;
	const findFile = await service.getDocumentByQuery(File, { _id: id });
	let result = await service.deleteDocument(File, { _id: id });
	if (result.deletedCount) {
		const path = `./public/uploads${findFile.uri}`;
		if (fs.existsSync(path)) {
			fs.unlinkSync(path);
		}
		return res.status(200).send({
			message: 'File Deleted Successfully',
		});
	} else {
		return res.status(400).send({
			message: 'Error occured while deleting file',
		});
	}
};
const fileUpload = async (req, res) => {
	try {
		if (!req.files) {
			return res.status(400).send({
				message: 'No file uploaded',
			});
		} else {
			let result;
			let files = req.files[Object.keys(req.files)[0]];
			const folder = 'temp';
			if (Array.isArray(files) === false) {
				const data = await fileData(files, folder);
				result = await service.createDocument(File, data);
			} else {
				result = [];
				return res.status(400).send({
					message: 'Only single file upload is allowed',
				});
			}
			return res.status(200).send({
				code: 'SUCCESS',
				data: result,
				message: 'Image Uploaded successfully.',
			});
		}
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
};

module.exports = {
	fileData: fileData,
	fileUpload,
	removeFile,
};
