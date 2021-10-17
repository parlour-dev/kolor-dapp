import { ChainId } from "@usedapp/core";

export type Post = {
	id: number;
	text: string;
	file?: string;
	tags?: string[];
	comments?: string[];
	author?: string;
	removed?: boolean;
};

export type CommentT = {
	a: string; // author
	c: string; // content
	s?: string; // signature
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

export enum SupportedChains {
	Ropsten = ChainId.Ropsten
}