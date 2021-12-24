import { ChainId } from "@usedapp/core";
import { Contract, ethers } from "ethers";

type TCPDataAddressT = {
	[I: number]: string;
};

type TCPDataT = {
	[I: number]: Contract;
};

export const tcpdata_address: TCPDataAddressT = {
	[ChainId.Ropsten]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
};

export const tcpdata_abi = [
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

export const tcpdata: TCPDataT = {
	[ChainId.Ropsten]: new ethers.Contract(
		tcpdata_address[ChainId.Ropsten],
		tcpdata_abi
	),
	/*[ChainId.BSCTestnet]: new ethers.Contract(
		tcpdata_address[ChainId.BSCTestnet],
		tcpdata_abi
	),*/
};
