import { ethers } from "ethers";
import { TCPData } from "../TCPData";
import { Post } from "../types";
import tcpdataABI from "./abi.json";

export const tcpdata_address = "0xa398De2fEF0b37cf50c2F9D88b8953b94b49c78C";

export function setUpSigner() {
    // @ts-ignore
	if (!window.ethereum) return null;
	// @ts-ignore
	const provider = new ethers.providers.Web3Provider(window.ethereum);

    // refresh whenever a user changes the network
    provider.on("network", (newNetwork: any, oldNetwork: any) => {
        if (oldNetwork) window.location.reload();
    });
    const signer = provider.getSigner();

    return signer
}

export function getTCPData() {
    const signer = setUpSigner()

    if(!signer) {
        console.error("Couldn't get signer!");
        return null
    }

    const tcpdata = new ethers.Contract(
        tcpdata_address,
        tcpdataABI,
        signer
    );

    return tcpdata as unknown as TCPData;
}

export async function fetchContent(tcpdata: TCPData, addPost: ((post: Post) => void)) {
    // add all the fetched posts
    const contents = await tcpdata.getContent();

    if (!contents) return false;

    for (let idx in contents) {
        const author = contents[idx].author;
        const header = JSON.parse(contents[idx].header);
        const newPost: Post = {
            id: parseInt(idx),
            text: header.title,
            author: author,
        };

        addPost(newPost);
    }

    return true;
}