import { WidgetType, CardTypes } from '../../types/enums';
import { Schema, Model, Document, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { softDeletePlugin } from '../plugins/softDelete';

export interface IWidgetSchema extends Document {
	name: String;
	code: String;
	webPerRow: Number;
	mobilePerRow: Number;
	tabletPerRow: Number;
	widgetType: WidgetType;
	cardType: CardTypes;
}

const WidgetSchema = new Schema<IWidgetSchema>({
	name: String,
	code: String,
	webPerRow: Number,
	mobilePerRow: Number,
	tabletPerRow: Number,
	widgetType: {
		type: String,
		enum: Object.values(WidgetType),
		default: WidgetType.Static,
		required: true,
	},
	cardType: {
		type: String,
		enum: Object.values(CardTypes),
		default: CardTypes.Fixed,
		required: true,
	},
});

WidgetSchema.plugin(softDeletePlugin);
WidgetSchema.plugin(mongoosePaginate);

const Widget: Model<IWidgetSchema> = model('Widget', WidgetSchema);

export default Widget;
