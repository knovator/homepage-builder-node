import { Schema, Model, Types, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { TileTypes } from '../enums';
import { softDeletePlugin } from '../plugins/softDelete';

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
