import { useState } from "react";

export function useToggle(initial) {
	const [state, setState] = useState(initial);

	const toggle = () => setState(!state);

	return [state, toggle];
}
