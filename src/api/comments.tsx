const BATCH_SIZE = 20;

const fetchComments = async (idx: number) => {
	const batchid = Math.floor(idx / BATCH_SIZE);
	const index_in_batch = idx % BATCH_SIZE;

	const response = await fetch(
		`https://api.desoapp.co/comments/batch-${batchid}`,
		{
			method: "GET",
			cache: "default",
		}
	);

	const data = await response.json();
	return data[index_in_batch] || [];
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
