import { Fab } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { useState } from "react";
import RichTextEditor from "react-rte";
import { green } from '@mui/material/colors';
import styles from "../CreateNewPost.module.css";

const CreateTextPost: React.FC = () => {
	const [text, setText] = useState(RichTextEditor.createEmptyValue());


	return (
		<>
			<div>
				<RichTextEditor value={text} onChange={setText} />
			</div>
			<div className={styles.submit} onClick={() => {}}>
					Submit
			</div>
		</>
	);
};

export default CreateTextPost;
