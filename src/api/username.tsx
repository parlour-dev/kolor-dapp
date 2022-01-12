import { shortenAddress } from "@usedapp/core";

const expandUsername = (address: string) => {
	try {
		return shortenAddress(address);
	} catch (e) {
		console.error(e);
	}

	return address;
};

const useUsername = (address: string | undefined | null) => {
	//const [username, setUsername] = useState("");
	//setUsername();

	return expandUsername(address || "");
};

export { expandUsername, useUsername };
