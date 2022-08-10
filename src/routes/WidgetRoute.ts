import express from 'express';

import validate from '../utils/validate';
import * as widgetValidation from '../utils/validations/widget';
import * as widgetController from '../controllers/WidgetController';

const routes = express.Router();
routes.use(express.json());

// Widget Routes
// Get all widgets
routes.get(`/`, validate(widgetValidation.list), widgetController.getWidgets);
// Create a widget
routes.post(
	`/`,
	validate(widgetValidation.create),
	widgetController.createWidget
);
// Update a widget
routes.put(
	`/:id`,
	validate(widgetValidation.update),
	widgetController.updateWidget
);
// Delete a widget
routes.delete(`/:id`, widgetController.deleteWidget);

export default routes;
