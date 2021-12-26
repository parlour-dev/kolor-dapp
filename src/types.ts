export type Post = {
	id: number;
	uuid: string;
	chainid: number;
	tokenid: number;

	timestamp: Date;
	text: string;
	balance: number;

	file?: string;
	contentType?: string;

	tags?: string[];
	author?: string;
	removed?: boolean;

	comments: CommentT[];
};

export type CommentT = {
	author: string;
	content: string;
};

export type ContractPost = {
	title: string;
	url?: string;
	tags?: string[];
};

export type TipAmounts = {
	ethereum: string | number;
	dai?: string | number;
	additional?: {
		name: string;
		amount: string | number;
	}[];
};

export type ChainData = {
	name: string;
	color: string;
	currency: string;
};

export type ChainIdsT = {
	[U: number]: ChainData;
};

export type PostType = "text" | "image" | "audio";

export type OnSubmit = (
	text: string | undefined,
	type: PostType,
	file?: string,
	fileContentType?: string
) => void;

export type GetContractPost = (
	text: string | undefined,
	type: PostType,
	file?: string,
	fileContentType?: string
) => Promise<ContractPost | undefined>;
