import { Schema, Model, Document, model, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { softDeletePlugin } from '../plugins/softDelete';

export interface IPageSchema extends Document {
	name: String;
	code: String;
	widgets: String[];
}

const PageSchema = new Schema<IPageSchema>({
	name: String,
	code: String,
	widgets: [{ type: Types.ObjectId, ref: 'Widget' }],
});

PageSchema.plugin(softDeletePlugin);
PageSchema.plugin(mongoosePaginate);

const Page: Model<IPageSchema> = model('Page', PageSchema);

export default Page;
