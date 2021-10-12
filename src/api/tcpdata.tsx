import { ethers } from "ethers";
import { Post } from "../types";

export const tcpdata_address = "0xa398De2fEF0b37cf50c2F9D88b8953b94b49c78C";
export const tcpdata_abi = [
	"event ContentAdded(uint256 indexed idx)",
	"event TipReceived(uint256 indexed idx, uint256 amount)",
	"function addContent(string newHeader)",
	"function content(uint256) view returns (address author, string header)",
	"function getBalance() view returns (uint256)",
	"function getContent() view returns (tuple(address author, string header)[])",
	"function getContentBalance(uint256 idx) view returns (uint256)",
	"function getContentLength() view returns (uint256)",
	"function getContentTimestamp(uint256 idx) view returns (uint256)",
	"function getLastContent() view returns (string, address, uint256)",
	"function initialize()",
	"function owner() view returns (address)",
	"function removeContent(uint256 idx)",
	"function setOwner(address newOwner)",
	"function tipContent(uint256 idx) payable",
	"function tipPerson(address who) payable",
	"function version() pure returns (uint256)",
	"function withdrawBalance()",
];

export const tcpdata = new ethers.Contract(tcpdata_address, tcpdata_abi);

export function rawPostToPost(
	idx: number,
	author: string,
	header: string
): Post {
	try {
		const header_processed = JSON.parse(header);
		const post: Post = {
			author: author,
			id: idx,
			text: header_processed.title,
			file: "url" in header_processed ? header_processed.url : undefined,
		};
		return post;
	} catch (e) {
		const post: Post = {
			author: "0x123",
			id: 111,
			text: "error",
		};
		return post;
	}
}

export async function fetchAllPosts(
	tcpdata: ethers.Contract,
	addPost: (post: Post) => void
) {
	// add all the fetched posts
	const contents = await tcpdata.getContent();

	if (!contents) return false;

	for (let idx in contents) {
		const author = contents[idx].author;
		const header = JSON.parse(contents[idx].header);

		let url = undefined;

		if (header.url && !header.url.startsWith("blob")) url = header.url;

		const newPost: Post = {
			id: parseInt(idx),
			text: header.title,
			author: author,
			file: url,
		};

		addPost(newPost);
	}

	return true;
}

export async function fetchOnePost(tcpdata: ethers.Contract, idx: number) {
	const content = await tcpdata.content(idx);
	const author = content.author;
	const header = JSON.parse(content.header);
	const post: Post = {
		id: idx,
		text: header.title,
		author: author,
		file: header.url || undefined,
	};

	return post;
}
