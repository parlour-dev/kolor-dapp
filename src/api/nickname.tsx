import { shortenIfAddress } from "@usedapp/core";

const resolveNickname = (address: string) => {
	return shortenIfAddress(address);
};

export { resolveNickname };
