export type Post = {
	id: number;
	text: string;
	file?: string;
	tags?: string[];
	comments?: string[];
	author?: string;
};

export type ContractPost = {
	title: string;
	url?: string;
	tags?: string[];
};

export type PostAction =
	| {
			type: "add";
			value: Post;
	  }
	| {
			type: "update";
			value: Post;
			idx: number;
	  }
	| {
			type: "clear";
	  };

export type PostContextT = {
	posts: Post[];
	dispatch: (action: PostAction) => void;
};

export type TipAmounts = {
	ethereum: string | number;
	dai: string | number;
	additional?: {
		name: string;
		amount: string | number;
	}[];
};
