require('dotenv').config();
require('./db');
const express = require('express');
const app = express();
const PORT = 8080;
const { WidgetRoutes, TileRoutes } = require('../.');

app.get('/status', (_req, res) => {
	res.send('All Okay');
});
app.use('/widgets', WidgetRoutes);
app.use('/tiles', TileRoutes);

app.listen(PORT, () => {
	console.log(`App started on ${PORT}`);
});
