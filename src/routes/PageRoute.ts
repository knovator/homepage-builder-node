import express from 'express';
require('express-list-endpoints-descriptor')(express);

import validate from '../utils/validate';
import * as pageValidation from '../utils/validations/page';
import * as pageController from '../controllers/PageController';
import { IRouter } from '../Router';

const routes: IRouter = express.Router();
routes.use(express.json());

// Get all pages
routes
	.post(`/list`, validate(pageValidation.list), pageController.getPages)
	.descriptor('page.getAll');
// Create a page
routes
	.post(`/`, validate(pageValidation.create), pageController.createPage)
	.descriptor('page.create');
// Update a page
routes
	.put(`/:id`, validate(pageValidation.update), pageController.updatePage)
	.descriptor('page.update');
// Delete a page
routes.delete(`/:id`, pageController.deletePage).descriptor('page.delete');

export default routes;
