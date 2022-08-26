import { Schema, Model, model, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { softDeletePlugin } from '../plugins/softDelete';
import { WidgetType, SelectionTypes } from '../../types/enums';

const WidgetSchema = new Schema<IWidgetSchema>({
	name: String,
	code: String,
	autoPlay: {
		type: Boolean,
		default: false,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	selectionTitle: String,
	webPerRow: Number,
	mobilePerRow: Number,
	tabletPerRow: Number,
	collectionName: String,
	collectionItems: [{ type: Types.ObjectId, refPath: 'collectionName' }],
	widgetType: {
		type: String,
		default: WidgetType.Image,
		required: true,
	},
	selectionType: {
		type: String,
		enum: Object.values(SelectionTypes),
		default: SelectionTypes.FixedCard,
		required: true,
	},
});

WidgetSchema.plugin(softDeletePlugin);
WidgetSchema.plugin(mongoosePaginate);

const Widget: Model<IWidgetSchema> = model('Widget', WidgetSchema);

export default Widget;
