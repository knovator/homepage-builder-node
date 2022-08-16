import { Schema, Model, Document, Types, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { TileTypes } from '../enums';
import { softDeletePlugin } from '../plugins/softDelete';

export interface ITileSchema extends Document {
	widgetId: typeof Types.ObjectId;
	title: string;
	alt: string;
	link: string;
	imageUrl: string;
	sequence: Number;
	tileType: TileTypes;
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
	sequence: Number,
	tileType: {
		type: String,
		enum: Object.values(TileTypes),
		default: TileTypes.Web,
		required: true,
	},
});

TileSchema.plugin(softDeletePlugin);
TileSchema.plugin(mongoosePaginate);

const Tile: Model<ITileSchema> = model('Tile', TileSchema);

export default Tile;
