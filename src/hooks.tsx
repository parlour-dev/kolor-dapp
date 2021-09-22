import { useState } from "react";

export function useToggle(initial: boolean): [ boolean, () => void ] {
	const [state, setState] = useState(initial);

	const toggle = () => setState(!state);

	return [state, toggle];
}
