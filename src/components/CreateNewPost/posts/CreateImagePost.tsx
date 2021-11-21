import { useEffect, useState } from "react";
import imagePlaceholder from "../image.png";
import styles from "./CreateImagePost.module.css";
import ReactGa from "react-ga";
import RichTextEditor from "react-rte";

export default function CreateImagePost() {
	const [file, setFile] = useState("");

	const [text, setText] = useState(RichTextEditor.createEmptyValue());

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			// @ts-ignore
			setFile(URL.createObjectURL(e.target.files[0]));
		} catch (e) {}
	};

	useEffect(() => {
		console.log(text.toString("html"));
	}, [text]);

	return (
		<>
			<div>
				<RichTextEditor value={text} onChange={setText} />
			</div>
			<div
				className={styles.uploadImage}
				onClick={() => {
					document.getElementById("multi")!.click();
					ReactGa.event({
						category: "Post creating",
						action: "Image submission",
					});
				}}
			>
				<img
					src={file ? file : imagePlaceholder}
					alt="Upload"
					className={styles.uploadImagePreview}
				/>
				<input
					style={{ display: "none", width: 0, height: 0 }}
					type="file"
					onChange={handleChange}
					id="multi"
				/>
			</div>
		</>
	);
}
