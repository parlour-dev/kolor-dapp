import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import Tips from "../Tips/Tips";
import { useToggle } from "../../hooks";
import { useState, useContext, useEffect } from "react";
import { TCPDataContext } from "../../App";
import { ethers } from "ethers";

function PostImage({ text, img, idx, author, children, onCommentSubmit }) {
	const [showAddComment, toggleAddComment] = useToggle(false);

	const [etherTipBalance, setEtherTipBalance] = useState(0);
	const tcpdata = useContext(TCPDataContext);

	useEffect(() => {
		const fetchBalance = async () => {
			const balance = await tcpdata.getContentBalance(idx);
			const formatted_balance = ethers.utils.formatUnits(balance, "ether");
			setEtherTipBalance(formatted_balance);
		};

		fetchBalance().catch(console.error);
	}, [idx, tcpdata]);

	function handleTip() {
		const result = tcpdata.tipContent(idx, {
			value: ethers.utils.bigNumberify("30000000000000000"),
		});
		result.catch(console.error);
	}

	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<div className={styles.creator}>
					<div className={styles.creatorInfo}>
						<div className={styles.creatorNick}>ja</div>
						<div className={styles.creatorWallet}>{author}</div>
					</div>
					<div className={styles.profPicture}></div>
				</div>
				<div className={styles.text}>{text}</div>
				<div className={styles.mediaContent}>
					{img && <img alt="" src={img} className={styles.mediaContent} />}
				</div>

				<div id="renderTips">
					<Tips
						amounts={{
							main: etherTipBalance,
							additional: { dai: 23, wbtc: 0.5 },
						}}
					/>
				</div>

				<div className={styles.viewerAction}>
					<div className={styles.buttonBlue} onClick={handleTip}>
						Appreciate
					</div>
					<div className={styles.buttonBlack} onClick={toggleAddComment}>
						Comment
					</div>
				</div>
				{showAddComment && <AddComment onSubmit={onCommentSubmit} />}
				{children}
			</div>
		</div>
	);
}

export default PostImage;
