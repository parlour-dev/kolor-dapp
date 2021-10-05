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
        console.error("Failed to upload.");
        return;
    }

    const uploadedTo = await response.text();
    console.log("Uploaded to: " + uploadedTo);

    return uploadedTo
}

export { uploadImageToAWS }