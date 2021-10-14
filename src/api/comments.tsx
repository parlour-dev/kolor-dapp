const fetchComments = async (idx: number) => {
	const response = await fetch(`https://api.desoapp.co/comments/${idx}`, {
		method: "GET",
	});

	const data = await response.json();

	return data;
};

const postComment = (
	idx: number,
	content: string,
	address: string,
	signature: string
) => {
	const value = {
		a: address,
		c: content,
		s: signature,
	};

	return fetch(`https://api.desoapp.co/comments/${idx}`, {
		method: "POST",
		body: JSON.stringify(value),
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export { fetchComments, postComment };
