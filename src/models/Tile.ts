import { Schema, Model, Document, Types, model } from 'mongoose';
import { softDeletePlugin } from '../plugins/softDelete';

export interface ITileSchema extends Document {
	widgetId: typeof Types.ObjectId;
	title: string;
	alt: string;
	link: string;
	imageUrl: string;
}

const TileSchema = new Schema<ITileSchema>({
	widgetId: {
		type: Types.ObjectId,
		ref: 'Widget',
	},
	title: String,
	alt: String,
	link: String,
	imageUrl: String,
});

TileSchema.plugin(softDeletePlugin);

const Tile: Model<ITileSchema> = model('Tile', TileSchema);

export default Tile;
