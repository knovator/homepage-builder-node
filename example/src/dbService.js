/*
 * getDocumentByQuery : find document by dynamic query
 * @param  model      : mongoose model
 * @param  where      : {}
 * @param  select     : [] *optional
 */
const getDocumentByQuery = (model, where, select = [], options = {}) =>
	new Promise((resolve, reject) => {
		model
			.findOne(where, select, options, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			})
			.lean();
	});
/*
 * deleteDocument : delete any existing mongoose document
 * @param  model  : mongoose model
 * @param  id     : mongoose document's _id
 */
const deleteDocument = (model, filter) =>
	new Promise((resolve, reject) => {
		model.deleteOne(filter, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});

const createDocument = (model, data) =>
	new Promise((resolve, reject) => {
		model.create(data, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});

module.exports = {
	createDocument,
	deleteDocument,
	getDocumentByQuery,
};
