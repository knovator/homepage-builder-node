declare module '@knovator/homepage-builder-node' {
	// Models
	var Page: import('mongoose').Model<IPageSchema>;
	var Widget: import('mongoose').Model<IWidgetSchema>;
	var Tile: import('mongoose').Model<ITileSchema>;
	// Routes
	var WidgetRoutes: import('express').Router;
	var TileRoutes: import('express').Router;
	var PageRoutes: import('express').Router;
	// Utils
	var setConfig: (config: Parital<iConfig>) => void;
}
type TypesType = { value: string; label: string };
type CollectionItem = {
	title: string;
	collectionName: string;
	filters?: { [key: string]: string };
	searchColumns: string[];
};
interface iConfig {
	logger: any;
	catchAsync: (
		fn: any,
		modal?: string
	) => (req: any, res: any, next: any) => void;
	collections: CollectionItem[];
}
interface IPageSchema extends import('mongoose').Document {
	name: String;
	code: String;
	widgets: String[];
}
interface IWidgetSchema extends import('mongoose').Document {
	name: String;
	code: String;
	autoPlay: Boolean;
	isActive: Boolean;
	selectionTitle: String;
	webPerRow: Number;
	mobilePerRow: Number;
	tabletPerRow: Number;
	widgetType: WidgetType;
	selectionType: SelectionTypes;
	collectionName: String;
	collectionItems: String[];
}
interface ITileSchema extends import('mongoose').Document {
	widgetId: typeof Types.ObjectId;
	title: string;
	altText: string;
	link: string;
	sequence: Number;
	tileType: TileTypes;
	img: any;
}