import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import Tips from "../Tips/Tips";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Popup from "reactjs-popup";
import { useToggle } from "../../hooks";
import { useState, useContext, useEffect } from "react";
import { TCPDataContext } from "../../App";
import { ethers } from "ethers";
import { TCPData } from "../../TCPData";

type PostImageT = {
	text: string;
	img: string;
	idx: number;
	author: string;
	onCommentSubmit: (comment: string) => void;
};

const PostImage: React.FC<PostImageT> = ({
	text,
	img,
	idx,
	author,
	children,
	onCommentSubmit,
}) => {
	const [showAddComment, toggleAddComment] = useToggle(false);

	const [etherTipBalance, setEtherTipBalance] = useState("0.0");
	const tcpdata = useContext(TCPDataContext) as TCPData;

	useEffect(() => {
		let isSubscribed = true;

		const fetchBalance = async () => {
			const balance = await tcpdata.getContentBalance(idx);
			const formatted_balance = ethers.utils.formatUnits(balance, "ether");
			if (isSubscribed) {
				setEtherTipBalance(formatted_balance);
			}
		};

		fetchBalance().catch(console.error);

		return () => {
			isSubscribed = false;
		};
	}, [idx, tcpdata]);

	function handleTip() {
		const result = tcpdata.tipContent(idx, {
			value: ethers.BigNumber.from("30000000000000000"),
		});
		result.catch(console.error);
	}

	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<div className={styles.creator}>
					<div className={styles.creatorInfo}>
						<div className={styles.creatorNick}>ja debugid:{idx}</div>
						<div className={styles.creatorWallet}>{author}</div>
					</div>
					<ProfilePicture address={author} />
				</div>
				<div className={styles.text}>{text}</div>
				<div className={styles.mediaContent}>
					{img && (
						<img
							alt=""
							src={"https://" + img}
							className={styles.mediaContent}
						/>
					)}
				</div>

				<div id="renderTips">
					<Tips
						amounts={{
							ethereum: etherTipBalance,
							dai: 32,
							additional: [
								{ name: "wap", amount: 23 },
								{ name: "wbtc", amount: 0.5 },
							],
						}}
					/>
				</div>

				<div className={styles.viewerAction}>
					<Popup
						trigger={
							<div className={styles.buttonBlue} /*onClick={handleTip}*/>
								Appreciate
							</div>
						}
						modal
					>
						<div className={styles.popup}>
							<input
								type="number"
								className={styles.popupInput}
								placeholder="Amount"
							/>
							<div className="currencyChooser">
								<select name="currency" id="currency">
									<option value="ETH">ETH</option>
									<option value="DAI">DAI</option>
									<option value="WBTC">WBTC</option>
								</select>
							</div>
							<div onClick={handleTip} className={styles.popupTip}>
								Send
							</div>
						</div>
					</Popup>
					<div
						className={styles.buttonBlack}
						onClick={() => toggleAddComment()}
					>
						Comment
					</div>
				</div>
				{showAddComment && <AddComment onSubmit={onCommentSubmit} />}
				{children}
			</div>
		</div>
	);
};

export default PostImage;
