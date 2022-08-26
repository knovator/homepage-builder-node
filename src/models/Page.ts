import { Schema, Model, model, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { softDeletePlugin } from '../plugins/softDelete';

const PageSchema = new Schema<IPageSchema>({
	name: String,
	code: String,
	widgets: [{ type: Types.ObjectId, ref: 'Widget' }],
});

PageSchema.plugin(softDeletePlugin);
PageSchema.plugin(mongoosePaginate);

const Page: Model<IPageSchema> = model('Page', PageSchema);

export default Page;
