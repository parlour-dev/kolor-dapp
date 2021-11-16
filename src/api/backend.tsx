import { ChainData, ChainIdsT, Post } from "../types";

type BackendResponse = {
	chainIds: number[];
	expiry: Date;
	fresh: boolean;
	now: Date;
	posts: BackendPost[][];
};

type BackendPost = {
	Author: string;
	Header: string;
	Balance: number;
};

export async function fetchAllPostsBackend() {
	const raw_response = await fetch("https://backend.kolor.social/get_posts", {
		method: "GET",
	});

	if (!raw_response.ok) {
		throw new Error("Failed to fetch.");
	}

	const response = (await raw_response.json()) as BackendResponse;
	var allposts: Post[] = [];

	for (var i = 0; i < response.chainIds.length; i++) {
		for (const idx in response.posts[i]) {
			const post = response.posts[i][idx];
			const chainId = response.chainIds[i];

			allposts.push(rawPostToPost(parseInt(idx), chainId, post));
		}
	}

	return allposts.reverse();
}

const chainIds: ChainIdsT = {
	3: { name: "Ropsten", color: "#fc0511", currency: "ETH" },
	97: { name: "BSC Testnet", color: "#fce705", currency: "BNB" },
};

export function resolveChainId(chainId: number): ChainData {
	if (chainId in chainIds) {
		return chainIds[chainId];
	} else {
		return { name: chainId.toString(), color: "#fff", currency: "ETH" };
	}
}

function rawPostToPost(id: number, chainid: number, raw: BackendPost): Post {
	try {
		const header_processed = JSON.parse(raw.Header);
		const post: Post = {
			author: raw.Author,
			id: id,
			chainid: chainid,
			balance: raw.Balance,
			text: header_processed.title,
			file: "url" in header_processed ? header_processed.url : undefined,
		};
		return post;
	} catch (e) {
		const post: Post = {
			author: raw.Author,
			id: id,
			chainid: chainid,
			balance: raw.Balance,
			text: "[removed]",
			removed: true,
		};
		return post;
	}
}
