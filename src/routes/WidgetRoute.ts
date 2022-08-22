import express from 'express';
require('express-list-endpoints-descriptor')(express);

import validate from '../utils/validate';
import * as widgetValidation from '../utils/validations/widget';
import * as widgetController from '../controllers/WidgetController';
import { IRouter } from '../Router';

const routes: IRouter = express.Router();
routes.use(express.json());

// Widget Routes
// Get all widgets
routes
	.post(`/list`, validate(widgetValidation.list), widgetController.getWidgets)
	.descriptor('widget.getAll');
// Create a widget
routes
	.post(`/`, validate(widgetValidation.create), widgetController.createWidget)
	.descriptor('widget.create');
// Update a widget
routes
	.put(
		`/:id`,
		validate(widgetValidation.update),
		widgetController.updateWidget
	)
	.descriptor('widget.update');
// Delete a widget
routes
	.delete(`/:id`, widgetController.deleteWidget)
	.descriptor('widget.delete');

export default routes;
