import {
	Snackbar,
	Alert,
	AlertColor,
	SnackbarCloseReason,
} from "@mui/material";
import { SyntheticEvent } from "react";

type AlertSnackbarT = {
	open: boolean;
	severity: AlertColor;
	value: string;
	handleClose: (reason?: SnackbarCloseReason) => void;
};

const AlertSnackbar: React.FC<AlertSnackbarT> = ({
	open,
	severity,
	value,
	handleClose,
}) => {
	const handleCloseInternal = (
		event: SyntheticEvent<Element, Event>,
		reason?: SnackbarCloseReason
	) => {
		if (reason === "clickaway") {
			return;
		}

		handleClose(reason);
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={30000 /* 12 seconds */}
			onClose={handleCloseInternal}
		>
			<Alert
				onClose={handleCloseInternal}
				severity={severity}
				sx={{ width: "100%" }}
			>
				{value}
			</Alert>
		</Snackbar>
	);
};

export default AlertSnackbar;
