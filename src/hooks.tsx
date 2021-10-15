import { useContractCall, useContractFunction } from "@usedapp/core";
import { useContext } from "react";
import { useState } from "react";
import { UniversalAlertContext } from "./components/UniversalAlert/UniversalAlertProvider";
import { tcpdata_abi, tcpdata_address } from "./api/tcpdata";
import { ethers } from "ethers";


export function useToggle(initial: boolean): [boolean, () => void] {
	const [state, setState] = useState(initial);

	const toggle = () => setState(!state);

	return [state, toggle];
}

export function useShowAlert() {
	return useContext(UniversalAlertContext);
}

export function useTCPDataFunction(method: string, transactionName: string) {
	return useContractFunction(
		// @ts-ignore
		new Contract(tcpdata_address, tcpdata_abi),
		method,
		{ transactionName: transactionName }
	);
}

export function useTCPDataCall(method: string, args?: any[]) {
	return useContractCall({
		abi: new ethers.utils.Interface(tcpdata_abi),
		address: tcpdata_address,
		method: method,
		args: args || [],
	})
}