import { shortenAddress } from "@usedapp/core";

const resolveNickname = (address: string) => {
	try {
		return shortenAddress(address);
	} catch (e) {
		console.error(e);
	}

	return address;
};

export { resolveNickname };
