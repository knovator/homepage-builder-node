const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
		},
		uri: {
			type: String,
		},
		mime_type: {
			type: String,
		},
		file_size: {
			type: String,
		},
		title: {
			type: String,
		},
		alt: {
			type: String,
		},
		module: {
			type: String,
			default: null,
		},
		link: {
			type: String,
		},
		width: {
			type: String,
		},
		height: {
			type: String,
		},
		status: {
			type: String,
		},
		isVerified: {
			type: Boolean,
		},
		createdBy: {
			type: JSON,
		},
		updatedBy: {
			type: JSON,
		},
		deletedBy: {
			type: JSON,
		},
		deletedAt: {
			type: Date,
		},
		isDelete: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

schema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

const file = mongoose.model('file', schema, 'file');
module.exports = file;
