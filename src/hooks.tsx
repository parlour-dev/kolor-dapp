import { useReducer } from "react";
import { useState } from "react";
import { PostAction, Post } from "./types";

export function useToggle(initial: boolean): [boolean, () => void] {
	const [state, setState] = useState(initial);

	const toggle = () => setState(!state);

	return [state, toggle];
}

function postsReducer(state: Post[], action: PostAction): Post[] {
	switch (action.type) {
		case "add": {
			const { value } = action;
			return [value, ...state];
		}
		case "update": {
			const { value, idx } = action;

			// bail if idx is null or undefined
			if (idx == null) return state;

			state[idx] = value;
			return state;
		}
		case "clear": {
			return [];
		}
		default: {
			return state;
		}
	}
}

export function usePosts(): [Post[], React.Dispatch<PostAction>] {
	return useReducer(postsReducer, []);
}
