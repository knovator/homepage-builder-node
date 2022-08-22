import express from 'express';
require('express-list-endpoints-descriptor')(express);

import validate from '../utils/validate';
import * as tileValidation from '../utils/validations/tile';
import * as tileController from '../controllers/TileController';
import { IRouter } from '../Router';

const routes: IRouter = express.Router();
routes.use(express.json());

// Tile Routes
// Get all tiles
routes
	.get(`/:widgetId`, validate(tileValidation.list), tileController.getTiles)
	.descriptor('tile.getAll');
// Create a tile
routes
	.post(`/`, validate(tileValidation.create), tileController.createTile)
	.descriptor('tile.create');
// Update a tile
routes
	.put(`/:id`, validate(tileValidation.update), tileController.updateTile)
	.descriptor('tile.update');
// Delete a tile
routes.delete(`/:id`, tileController.deleteTile).descriptor('tile.delete');

export default routes;
