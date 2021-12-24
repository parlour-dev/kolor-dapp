import { ChainData, ChainIdsT, Post } from "../types";

type BackendResponse = {
	expiry: Date;
	fresh: boolean;
	now: Date;
	posts: BackendPostDb[];
};

type BackendPost = {
	title: string;
	type: string;
	properties: {
		text: ERC721Property;
		file: ERC721Property;
		contentType: ERC721Property;
		author: ERC721Property;
	};
};

type ERC721Property = {
	type: string;
	description: string;
};

type BackendPostDb = {
	uuid: string;
	mintid: string;
	timestamp: Date;
	post: BackendPost;
};

const backendURI = "http://localhost:8000"; //"backend.kolor.social"

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
			parseInt(response.posts[idx].mintid),
			response.posts[idx]
		);

		if (!processedPost.removed) {
			allposts.push(processedPost);
		}
	}

	return allposts.reverse();
}

const chainIds: ChainIdsT = {
	0: { name: "Unminted", color: "#fff", currency: "" },
	3: { name: "Ropsten", color: "#ff0b8d", currency: "ETH" },
	56: { name: "BSC Mainnet", color: "#fce705", currency: "BNB" },
	97: { name: "BSC Testnet", color: "#fce705", currency: "BNB" },
};

export function resolveChainId(chainId: number): ChainData {
	if (chainId in chainIds) {
		return chainIds[chainId];
	} else {
		return { name: chainId.toString(), color: "#fff", currency: "ETH" };
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

function rawPostToPost(id: number, chainid: number, raw: BackendPostDb): Post {
	try {
		const post: Post = {
			author: raw.post.properties.author.description,
			id: id,
			chainid: chainid,
			balance: 0,
			text: raw.post.properties.text.description,
			tags: [],
			file: raw.post.properties.file.description || undefined,
			contentType: raw.post.properties.contentType.description || undefined,
			timestamp: new Date(raw.timestamp),
		};
		return post;
	} catch (e) {
		const post: Post = {
			author: raw.post.properties.author.description,
			id: id,
			chainid: chainid,
			balance: 0,
			text: "[removed]",
			removed: true,
			timestamp: new Date(raw.timestamp),
		};
		return post;
	}
}
