const uploadImageToAWS = async (blobUrl: string) => {
	const fileContents = await (await fetch(blobUrl)).arrayBuffer();

	const response = await fetch("https://api.desoapp.co/upload", {
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

	return uploadedTo;
};

const uploadAudioToAWS = async (blobUrl: string, contentType: string) => {
	const fileContents = await (await fetch(blobUrl)).arrayBuffer();

	const response = await fetch("https://api.desoapp.co/upload_audio", {
		method: "POST",
		body: fileContents,
		headers: {
			"Content-Type": contentType,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to upload.");
	}

	const uploadedTo = await response.text();

	return uploadedTo;
};

export { uploadImageToAWS, uploadAudioToAWS };
