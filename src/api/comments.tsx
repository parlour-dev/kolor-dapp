const fetchComments = async (idx: number) => {
	const response = await fetch(`https://api.desoapp.co/comments/${idx}`, {
		method: "GET",
	});

	const data = await response.json();

	return data;
};

const postComment = (idx: number, content: string) => {
	return fetch(`https://api.desoapp.co/comments/${idx}`, {
		method: "POST",
		body: content,
		headers: {
			"Content-Type": "text/plain",
		},
	});
};

export { fetchComments, postComment };
