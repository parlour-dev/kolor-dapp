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
import ReactGa from "react-ga";

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
	///O TUTAJ ANTONI PATRZYMY TUTAJ JEST NSFW!
	const [isActive, setActive] = useState(true);
	const handleToggle = () => {
		setActive(!isActive);
		console.log("you just clicked");
	};
	const [tipValue, handleTipValue] = useState("");
	const [isNSFW, setNSFW] = useState(true);

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
		ReactGa.event({
			category: "Tip",
			action: "Tip sent",
		});
		result.catch(console.error);
	}
	const refreshValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleTipValue(e.target.value);
	};
	function tipFunction1() {
		console.log("button1")
		handleTipValue("0.1");
	}
	function tipFunction2() {
		console.log("button2")
		handleTipValue("0.5");
	}
	function tipFunction3() {
		console.log("button3")
		handleTipValue("1");
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
							className={isNSFW && isActive ? styles.cont : styles.cont2}
							onClick={handleToggle}
						/>
					)}
				</div>

				<div id="renderTips">
					<Tips
						amounts={{
							ethereum: etherTipBalance,
							dai: 32,
							additional: [
								{ name: "WAP", amount: 23 },
								{ name: "WBTC", amount: 0.5 },
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
						<div className={styles.popupContainer}>
							<div className={styles.popup}>
								<input
									onChange={refreshValue}
									type="number"
									className={styles.popupInput}
									placeholder="Amount"
									value={tipValue}	
								/>
								<div className={styles.Currency}>ETH</div>

								<div onClick={handleTip} className={styles.popupTip}>
									Send
								</div>
							</div>
							<div className={styles.buttonTipContainer}>
								<button className={styles.buttonTip} onClick={tipFunction1}>0.1</button>
								<button className={styles.buttonTip} onClick={tipFunction2}>0.5</button>
								<button className={styles.buttonTip} onClick={tipFunction3}>1</button>
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
