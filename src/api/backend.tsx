import { ChainId } from "@usedapp/core";
import { ChainData, ChainIdsT, CommentT, Post } from "../types";

type BackendResponse = {
	expiry: Date;
	fresh: boolean;
	now: Date;
	posts: BackendPostDb[];
};

type BackendPost = {
	name: string;
	description: string;
	image: string; // NOTE: this is not necessarily an image
	contentType: string;
	author: string;
};

type BackendPostDb = {
	uuid: string;
	mintid: number;
	timestamp: Date;
	post: BackendPost;
	comments: CommentT[] | null;
};

export const backendURI = "https://backend.kolor.social";

// The ERC721 standard allows for adding metadata to NFTs.
// Our metadata is stored at ${MintingBaseURI}/${postUUID}.
// This is an important constant for minting posts on the blockchain.
export const MintingBaseURI = "https://backend.kolor.social/post";

export function getURIToMint(postUUID: string) {
	return `${MintingBaseURI}/${postUUID}`;
}

export async function fetchAllPostsBackend() {
	const raw_response = await fetch(`${backendURI}/get_posts`, {
		method: "GET",
	});

	if (!raw_response.ok) {
		throw new Error("Failed to fetch.");
	}

	const response = (await raw_response.json()) as BackendResponse;
	var allposts: Post[] = [];

	for (const idx in response.posts) {
		const processedPost = rawPostToPost(
			parseInt(idx),
			ChainId.BSC,
			response.posts[idx]
		);

		if (!processedPost.removed) {
			allposts.push(processedPost);
		}
	}

	return allposts.reverse();
}

const chainIds: ChainIdsT = {
	0: { name: "Unminted", color: "#fff", currency: "BNB" },
	3: { name: "Ropsten", color: "#ff0b8d", currency: "ETH" },
	56: { name: "Binance Smart Chain", color: "#fce705", currency: "BNB" },
	97: { name: "BSC Testnet", color: "#fce705", currency: "BNB" },
};

export function resolveChainId(chainId: number): ChainData {
	if (chainId in chainIds) {
		return chainIds[chainId];
	} else {
		return { name: chainId.toString(), color: "#fff", currency: "BNB" };
	}
}

// type SignedHeader struct {
// 	Title       string `form:"title"`
// 	Text        string `form:"text"`
// 	ContentType string `form:"contentType"`
// 	File        string `form:"file"`
// 	Address     string `form:"addr"`
// 	Signature   string `form:"sign"`
// }

export function createNewPostBackend(
	title: string,
	text: string,
	contentType: string,
	file: string,
	address: string,
	signature: string
) {
	const title_url = encodeURIComponent(title);
	const text_url = encodeURIComponent(text);
	const contentType_url = encodeURIComponent(contentType);
	const file_url = encodeURIComponent(file);
	const addr_url = encodeURIComponent(address);
	const sign_url = encodeURIComponent(signature);

	const query = `title=${title_url}&text=${text_url}&contentType=${contentType_url}&file=${file_url}&addr=${addr_url}&sign=${sign_url}`;

	return fetch(`${backendURI}/upload_post`, {
		method: "POST",
		body: query,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
}

export function deletePostBackend(uuid: string, signature: string) {
	const uuid_url = encodeURIComponent(uuid);
	const sign_url = encodeURIComponent(signature);

	const query = `uuid=${uuid_url}&sign=${sign_url}`;

	return fetch(`${backendURI}/delete_post`, {
		method: "POST",
		body: query,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
}

export function registerTipBackend(txHash: string, postUUID: string) {
	const tx_url = encodeURIComponent(txHash);
	const uuid_url = encodeURIComponent(postUUID);

	const query = `tx=${tx_url}&uuid=${uuid_url}`;

	return fetch(`${backendURI}/register_tip`, {
		method: "POST",
		body: query,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
}

function rawPostToPost(id: number, chainid: number, raw: BackendPostDb): Post {
	try {
		const post: Post = {
			author: raw.post.author,
			uuid: raw.uuid,
			id: id,
			chainid: raw.mintid ? chainid : 0,
			tokenid: raw.mintid,
			balance: 0,
			comments: raw.comments || [],
			text: raw.post.description,
			tags: [],
			file: raw.post.image || undefined,
			contentType: raw.post.contentType || undefined,
			timestamp: new Date(raw.timestamp),
		};
		return post;
	} catch (e) {
		const post: Post = {
			author: raw.post.author,
			uuid: raw.uuid,
			id: id,
			chainid: 0,
			tokenid: 0,
			balance: 0,
			text: "[removed]",
			comments: [],
			removed: true,
			timestamp: new Date(raw.timestamp),
		};
		return post;
	}
}
