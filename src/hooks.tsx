import { useContractCall, useContractFunction } from "@usedapp/core";
import { useContext } from "react";
import { useState } from "react";
import {
	LoadingContext,
	UniversalAlertContext,
} from "./components/UniversalAlert/UniversalAlertProvider";
import { kolordata, kolordata_abi, kolordata_address } from "./api/kolordata";
import { ethers } from "ethers";

export function useToggle(initial: boolean): [boolean, () => void] {
	const [state, setState] = useState(initial);

	const toggle = () => setState(!state);

	return [state, toggle];
}

export function useShowAlert() {
	return useContext(UniversalAlertContext);
}

export function useShowLoading() {
	return useContext(LoadingContext);
}

export function useKolorDataFunction(
	method: string,
	chain: number,
	transactionName?: string
) {
	return useContractFunction(
		//@ts-ignore
		kolordata[chain],
		method,
		{ transactionName: transactionName }
	);
}

export function useKolorDataCall(method: string, chain: number, args?: any[]) {
	return useContractCall({
		abi: new ethers.utils.Interface(kolordata_abi),
		address: kolordata_address[chain],
		method: method,
		args: args || [],
	});
}
