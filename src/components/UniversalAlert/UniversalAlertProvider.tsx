import {
	AlertColor,
	Backdrop,
	CircularProgress,
	SnackbarCloseReason,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import AlertSnackbar from "./AlertSnackbar";
import styles from "./UniversalAlertProvider.module.css";

type ShowAlertT = (text: string, severity: AlertColor) => void;

export const UniversalAlertContext = React.createContext<ShowAlertT>(
	(text, severity) => {}
);

type ShowLoadingT = (value: boolean) => void;

export const LoadingContext = React.createContext<ShowLoadingT>((value) => {});

const UniversalAlertProvider: React.FC = ({ children }) => {
	const [alertSeverity, setAlertSeveirty] = useState<AlertColor>("info");
	const [alertText, setAlertText] = useState("");
	const [alertOpen, setAlertOpen] = useState(false);

	const [loading, setLoading] = useState(false);

	const showAlert: ShowAlertT = (text, severity) => {
		setAlertSeveirty(severity);
		setAlertText(text);
		setAlertOpen(true);
	};

	const showLoading = (value: boolean) => {
		setLoading(value);
	};

	const handleAlertClose = (reason?: SnackbarCloseReason) => {
		setAlertOpen(false);
		setAlertText("");
	};

	return (
		<UniversalAlertContext.Provider value={showAlert}>
			<LoadingContext.Provider value={showLoading}>
				{children}
				{alertOpen && (
					<div className={styles.alertContainer}>
						<AlertSnackbar
							severity={alertSeverity}
							value={alertText}
							open={alertOpen}
							handleClose={handleAlertClose}
						/>
					</div>
				)}
				{loading && (
					<Backdrop sx={{ color: "#fff", zIndex: 999999 }} open={loading}>
						<CircularProgress />
					</Backdrop>
				)}
			</LoadingContext.Provider>
		</UniversalAlertContext.Provider>
	);
};

export default UniversalAlertProvider;
