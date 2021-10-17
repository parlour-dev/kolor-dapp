import MersenneTwister from "mersenne-twister";
import { useMemo } from "react";
import styles from "./ProfilePicture.module.css";

const generateProfilePictureGradient = (address: string, height: string) => {
	const generator = new MersenneTwister(parseInt(address.substr(2)));
	const randomInt = (min: number, max: number) =>
		min + generator.random() * (max - min);

	const color1 = randomInt(0, 255);
	const color2 = randomInt(0, 255);
	const color3 = randomInt(0, 255);
	const color4 = randomInt(0, 255);
	const color5 = randomInt(0, 255);
	const color6 = randomInt(0, 255);

	const tilt = 0; //randomInt(0, 360);

	let style = {
		background: `linear-gradient(${tilt}deg, rgba(${color1},${color2},${color3},1) 0%, rgba(${color4},${color5},${color6},1) 100%)`,
		height: height,
	};

	return style;
};

type ProfilePictureT = {
	address: string;
	className?: string;
	height?: string;
};

const ProfilePicture: React.FC<ProfilePictureT> = ({
	address,
	className,
	height,
}) => {
	let profilePictureStyles = useMemo(
		() => generateProfilePictureGradient(address, height || "3.5vmax"),
		[address, height]
	);

	return (
		<div
			style={profilePictureStyles}
			className={[styles.profilePicture, className].join(" ")}
		></div>
	);
};

export default ProfilePicture;
