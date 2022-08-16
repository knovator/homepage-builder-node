import {
	Model,
	FilterQuery,
	QueryOptions,
	ProjectionType,
	Document,
} from 'mongoose';
import { IWidgetSchema, ITileSchema } from '../models';

type EntityType = IWidgetSchema | ITileSchema;
type ReturnDocument = EntityType & Document;

// create
export async function create<T extends EntityType>(
	Modal: Model<T>,
	data: Partial<T>
): Promise<ReturnDocument> {
	let modalInstance = new Modal(data);
	return await modalInstance.save();
}
// update
export async function update<T extends EntityType>(
	Modal: Model<T>,
	query: FilterQuery<EntityType>,
	data: Partial<T>
): Promise<ReturnDocument | undefined> {
	await getOne(Modal, query);
	let result = await Modal.findOneAndUpdate(query, data, { new: true });
	return result || undefined;
}
// soft-delete
export async function remove<T extends EntityType>(
	Modal: Model<T>,
	query: FilterQuery<EntityType>
): Promise<ReturnDocument | undefined> {
	let modalInstance = await getOne(Modal, query);
	return await modalInstance.remove();
}
// get-all
export async function getAll<T extends EntityType>(
	Modal: Model<T>,
	query: FilterQuery<EntityType> = {},
	options?: QueryOptions<EntityType>,
	projection?: ProjectionType<EntityType>
): Promise<ReturnDocument[]> {
	return Modal.find(query, projection, options);
}
// list
export async function list<T extends EntityType>(
	Modal: Model<T>,
	where: FilterQuery<T>,
	options: QueryOptions<T>
): Promise<ReturnDocument[]> {
	try {
		// @ts-ignore
		let documents = Modal.paginate(where, options);
		return documents;
	  } catch (error) {
		throw new Error((error as Error).message);
	  }
}
// get-one
export async function getOne<T extends EntityType>(
	Modal: Model<T>,
	query: FilterQuery<EntityType>
): Promise<ReturnDocument> {
	let modalInstance = await Modal.findOne(query);
	if (!modalInstance) throw new Error(`Record not found in ${Modal.name}`);

	return modalInstance;
}
