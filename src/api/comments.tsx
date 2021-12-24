import { backendURI } from "./backend";

const postComment = (
	targetPost: string,
	content: string,
	address: string,
	signature: string
) => {
	const a = encodeURIComponent(address);
	const c = encodeURIComponent(content);
	const s = encodeURIComponent(signature);
	const t = encodeURIComponent(targetPost);

	const query = `a=${a}&c=${c}&s=${s}&t=${t}`;

	return fetch(`${backendURI}/upload_comment`, {
		method: "POST",
		body: query,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
};

export { postComment };
