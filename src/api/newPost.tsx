import { TCPData } from "../TCPData";
import { ContractPost, Post } from "../types";

export async function addNewPostToContract(tcpdata: TCPData, newPostRaw: Post) {
	if (!tcpdata) {
		console.error("Can't post: no TCPData");
		return false;
	}

	const newPost: ContractPost = {
		title: newPostRaw.text,
		url: newPostRaw.file,
		tags: ["testtag"],
	};

	const result = tcpdata.addContent(JSON.stringify(newPost));
	result.catch(console.error);
}
