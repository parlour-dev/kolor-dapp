import { ChainId } from "@usedapp/core";
import { Contract, ethers } from "ethers";

type KolorDataAddressT = {
	[I: number]: string;
};

type KolorDataT = {
	[I: number]: Contract;
};

export const kolordata_address: KolorDataAddressT = {
	[ChainId.Ropsten]: "0x0531aFBb877b438D213A39681D97F29Ddf53a51a",
};

export const kolordata_abi = [
	"event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
	"event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
	"event ContentAdded(uint256 indexed idx, address indexed author)",
	"event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
	"event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
	"function approve(address to, uint256 tokenId)",
	"function balanceOf(address owner) view returns (uint256)",
	"function burnPost(uint256 id)",
	"function createPost(string uri) returns (uint256)",
	"function getApproved(uint256 tokenId) view returns (address)",
	"function getLastPostId() view returns (uint256)",
	"function getPostTimestamp(uint256 id) view returns (uint256)",
	"function initialize()",
	"function isApprovedForAll(address owner, address operator) view returns (bool)",
	"function name() view returns (string)",
	"function owner() view returns (address)",
	"function ownerOf(uint256 tokenId) view returns (address)",
	"function safeTransferFrom(address from, address to, uint256 tokenId)",
	"function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)",
	"function setApprovalForAll(address operator, bool approved)",
	"function supportsInterface(bytes4 interfaceId) view returns (bool)",
	"function symbol() view returns (string)",
	"function tokenURI(uint256 tokenId) view returns (string)",
	"function transferFrom(address from, address to, uint256 tokenId)",
	"function version() pure returns (uint256)",
];

export const kolordata: KolorDataT = {
	[ChainId.Ropsten]: new ethers.Contract(
		kolordata_address[ChainId.Ropsten],
		kolordata_abi
	),
	/*[ChainId.BSCTestnet]: new ethers.Contract(
		tcpdata_address[ChainId.BSCTestnet],
		tcpdata_abi
	),*/
};
