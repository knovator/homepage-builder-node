import { Schema, Model, Document, Types, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { TileTypes } from '../enums';
import { softDeletePlugin } from '../plugins/softDelete';

export interface ITileSchema extends Document {
	widgetId: typeof Types.ObjectId;
	title: string;
	altText: string;
	link: string;
	sequence: Number;
	tileType: TileTypes;
	img: any;
}

const TileSchema = new Schema<ITileSchema>({
	widgetId: {
		type: Types.ObjectId,
		ref: 'Widget',
	},
	title: String,
	altText: String,
	link: String,
	sequence: Number,
	img: { type: Schema.Types.ObjectId, ref: 'file' },
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
