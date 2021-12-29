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
	[ChainId.BSCTestnet]: "0xFEc8d2071fD4916FaacB60C4EFC35831ec62a54B",
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

export const kolortoken_abi = [
	"event Approval(address indexed owner, address indexed spender, uint256 value)",
	"event AuthorizedOperator(address indexed operator, address indexed tokenHolder)",
	"event Burned(address indexed operator, address indexed from, uint256 amount, bytes data, bytes operatorData)",
	"event Minted(address indexed operator, address indexed to, uint256 amount, bytes data, bytes operatorData)",
	"event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
	"event RevokedOperator(address indexed operator, address indexed tokenHolder)",
	"event Sent(address indexed operator, address indexed from, address indexed to, uint256 amount, bytes data, bytes operatorData)",
	"event Transfer(address indexed from, address indexed to, uint256 value)",
	"function allowance(address holder, address spender) view returns (uint256)",
	"function approve(address spender, uint256 value) returns (bool)",
	"function authorizeOperator(address operator)",
	"function balanceOf(address tokenHolder) view returns (uint256)",
	"function burn(uint256 amount, bytes data)",
	"function decimals() pure returns (uint8)",
	"function defaultOperators() view returns (address[])",
	"function granularity() view returns (uint256)",
	"function initialize()",
	"function isOperatorFor(address operator, address tokenHolder) view returns (bool)",
	"function mint(uint256 amount)",
	"function name() view returns (string)",
	"function operatorBurn(address account, uint256 amount, bytes data, bytes operatorData)",
	"function operatorSend(address sender, address recipient, uint256 amount, bytes data, bytes operatorData)",
	"function owner() view returns (address)",
	"function renounceOwnership()",
	"function revokeOperator(address operator)",
	"function send(address recipient, uint256 amount, bytes data)",
	"function symbol() view returns (string)",
	"function totalSupply() view returns (uint256)",
	"function transfer(address recipient, uint256 amount) returns (bool)",
	"function transferFrom(address holder, address recipient, uint256 amount) returns (bool)",
	"function transferOwnership(address newOwner)",
];

export const kolordata: KolorDataT = {
	[ChainId.Ropsten]: new ethers.Contract(
		kolordata_address[ChainId.Ropsten],
		kolordata_abi
	),
	[ChainId.BSCTestnet]: new ethers.Contract(
		kolordata_address[ChainId.BSCTestnet],
		kolordata_abi
	),
};
