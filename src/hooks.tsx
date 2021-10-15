import { useContext } from "react";
import { useState } from "react";
import { UniversalAlertContext } from "./components/UniversalAlert/UniversalAlertProvider";

export function useToggle(initial: boolean): [boolean, () => void] {
	const [state, setState] = useState(initial);

	const toggle = () => setState(!state);

	return [state, toggle];
}

export function useShowAlert() {
	return useContext(UniversalAlertContext);
}
