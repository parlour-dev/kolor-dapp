const uploadImageToAWS = async (blobUrl: string) => {
	const fileContents = await (await fetch(blobUrl)).arrayBuffer();

	const response = await fetch("https://imageupload.desoapp.co/upload", {
		method: "POST",
		body: fileContents,
		headers: {
			"Content-Type": "application/octet-stream",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to upload.");
	}

	const uploadedTo = await response.text();
	console.log("Uploaded to: " + uploadedTo);

	return uploadedTo;
};

export { uploadImageToAWS };
