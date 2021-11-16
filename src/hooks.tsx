import { useContractCall, useContractFunction } from "@usedapp/core";
import { useContext } from "react";
import { useState } from "react";
import {
	LoadingContext,
	UniversalAlertContext,
} from "./components/UniversalAlert/UniversalAlertProvider";
import { tcpdata, tcpdata_abi, tcpdata_address } from "./api/tcpdata";
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

export function useTCPDataFunction(
	method: string,
	chain: number,
	transactionName?: string
) {
	return useContractFunction(
		//@ts-ignore
		tcpdata[chain],
		method,
		{ transactionName: transactionName }
	);
}

export function useTCPDataCall(method: string, chain: number, args?: any[]) {
	return useContractCall({
		abi: new ethers.utils.Interface(tcpdata_abi),
		address: tcpdata_address[chain],
		method: method,
		args: args || [],
	});
}
