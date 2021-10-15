import { AlertColor, SnackbarCloseReason } from "@mui/material";
import React from "react";
import { useState } from "react";
import AlertSnackbar from "./AlertSnackbar";

type ShowAlertT = (text: string, severity: AlertColor) => void;

export const UniversalAlertContext = React.createContext<ShowAlertT>(
	(text: string, severity: AlertColor) => {}
);

const UniversalAlertProvider: React.FC = ({ children }) => {
	const [alertSeverity, setAlertSeveirty] = useState<AlertColor>("info");
	const [alertText, setAlertText] = useState("");
	const [alertOpen, setAlertOpen] = useState(false);

	const showAlert: ShowAlertT = (text, severity) => {
		setAlertSeveirty(severity);
		setAlertText(text);
		setAlertOpen(true);
	};

	const handleAlertClose = (reason?: SnackbarCloseReason) => {
		setAlertOpen(false);
	};

	return (
		<UniversalAlertContext.Provider value={showAlert}>
			{children}
			{alertOpen && (
				<AlertSnackbar
					severity={alertSeverity}
					value={alertText}
					open={alertOpen}
					handleClose={handleAlertClose}
				/>
			)}
		</UniversalAlertContext.Provider>
	);
};

export default UniversalAlertProvider;
