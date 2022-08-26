require('dotenv').config();
require('./db');
const cors = require('cors');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const { WidgetRoutes, TileRoutes, PageRoutes, setConfig } = require('../.');
const fileUploadRoute = require('./src/routes/fileuploadRoute');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(
	fileUpload({
		createParentPath: true,
	})
);
setConfig({
	collections: [
		{
			title: 'Notifications',
			collectionName: 'notifications',
			filters: { isDeleted: false, isActive: true },
			searchColumns: ['name', 'code'],
		},
	],
});
app.get('/status', (_req, res) => {
	res.send('All Okay');
});
app.use('/widgets', WidgetRoutes);
app.use('/tiles', TileRoutes);
app.use('/media', fileUploadRoute);
app.use('/pages', PageRoutes);
app.use(express.static(path.join(__dirname, './public')));

app.listen(PORT, () => {
	console.log(`App started on ${PORT}`);
});
