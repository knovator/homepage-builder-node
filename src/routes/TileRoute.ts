import express from 'express';

import validate from '../utils/validate';
import * as tileValidation from '../utils/validations/tile';
import * as tileController from '../controllers/TileController';

const routes = express.Router();
routes.use(express.json());

// Tile Routes
// Get all tiles
routes.get(
	`/:widgetId`,
	validate(tileValidation.list),
	tileController.getTiles
);
// Create a tile
routes.post(`/`, validate(tileValidation.create), tileController.createTile);
// Update a tile
routes.put(`/:id`, validate(tileValidation.update), tileController.updateTile);
// Delete a tile
routes.delete(`/:id`, tileController.deleteTile);

export default routes;
