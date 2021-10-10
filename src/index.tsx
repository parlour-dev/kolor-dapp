import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DAppProvider, ChainId } from "@usedapp/core";

ReactDOM.render(
	<React.StrictMode>
		<DAppProvider
			config={{
				readOnlyChainId: ChainId.Ropsten,
				readOnlyUrls: {
					[ChainId.Ropsten]:
						"https://ropsten.infura.io/v3/40ecaa4d584d4e2e8624f7352dfd5136",
				},
				supportedChains: [ChainId.Ropsten]
			}}
		>
			<App />
		</DAppProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
