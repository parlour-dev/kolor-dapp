import { ethers } from "ethers";
import { TCPData } from "../TCPData";
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

export function getTCPData(provider: ethers.providers.Provider) {
	provider.on("network", (newNetwork: any, oldNetwork: any) => {
		if (oldNetwork) window.location.reload();
	});

	if (!provider) {
		console.error("Couldn't get provider!");
		return null;
	}

	const tcpdata = new ethers.Contract(tcpdata_address, tcpdata_abi, provider);

	return tcpdata as unknown as TCPData;
}

export async function fetchAllPosts(
	tcpdata: TCPData,
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

export async function fetchOnePost(tcpdata: TCPData, idx: number) {
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
