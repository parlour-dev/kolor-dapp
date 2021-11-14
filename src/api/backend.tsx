import { ChainIdsT, Post } from "../types";

type BackendResponse = {
	chainIds: number[];
	expiry: Date;
	fresh: boolean;
	now: Date;
	posts: {
		Author: string;
		Header: string;
	}[][];
};

export async function fetchAllPostsBackend() {
	const raw_response = await fetch("http://localhost:8080/get_posts", {
		method: "GET",
	});

	if (!raw_response.ok) {
		throw new Error("Failed to upload.");
	}

	const response = (await raw_response.json()) as BackendResponse;
	var allposts: Post[] = [];

	for (var i = 0; i < response.chainIds.length; i++) {
		for (const idx in response.posts[i]) {
			const post = response.posts[i][idx];
			const chainId = response.chainIds[i];

			allposts.push(
				rawPostToPost(parseInt(idx), chainId, post.Author, post.Header)
			);
		}
	}

	return allposts.reverse();
}

const chainIds: ChainIdsT = {
	3: { name: "Ropsten", color: "#fc0511" },
	97: { name: "BSC Testnet", color: "#fce705" },
};

export function resolveChainId(chainId: number): {
	name: string;
	color: string;
} {
	if (chainId in chainIds) {
		return chainIds[chainId];
	} else {
		return { name: chainId.toString(), color: "#fff" };
	}
}

function rawPostToPost(
	id: number,
	chainid: number,
	author: string,
	header: string
): Post {
	try {
		const header_processed = JSON.parse(header);
		const post: Post = {
			author: author,
			id: id,
			chainid: chainid,
			text: header_processed.title,
			file: "url" in header_processed ? header_processed.url : undefined,
		};
		return post;
	} catch (e) {
		const post: Post = {
			author: author,
			id: id,
			chainid: chainid,
			text: "[removed]",
			removed: true,
		};
		return post;
	}
}
