import { ChainId } from "@usedapp/core";
import { Contract, ethers } from "ethers";

type TCPDataAddressT = {
	[I: number]: string;
};

type TCPDataT = {
	[I: number]: Contract;
};

export const tcpdata_address: TCPDataAddressT = {
	[ChainId.Ropsten]: "0x0D3E48e537F69d4BDbdc84a1A5BbD70Ad1fD0756",
	[ChainId.BSCTestnet]: "0xa398De2fEF0b37cf50c2F9D88b8953b94b49c78C",
};

export const tcpdata_abi = [
	"event ContentAdded(uint256 indexed idx)",
	"event TipReceived(uint256 indexed idx, uint256 amount)",
	"function addContent(string newHeader)",
	"function content(uint256) view returns (address author, string header)",
	"function getBalance(address target) view returns (uint256)",
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

export const tcpdata: TCPDataT = {
	[ChainId.Ropsten]: new ethers.Contract(
		tcpdata_address[ChainId.Ropsten],
		tcpdata_abi
	),
	[ChainId.BSCTestnet]: new ethers.Contract(
		tcpdata_address[ChainId.BSCTestnet],
		tcpdata_abi
	),
};
