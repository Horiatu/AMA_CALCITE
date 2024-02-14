import React from "react";
import {useState} from "react";
import "./App.css";

import {setAssetPath} from "@esri/calcite-components/dist/components";
setAssetPath(window.location.href);

import {CalciteShell, CalciteShellPanel, CalciteActionBar, CalciteAction} from "@esri/calcite-components-react";

function App() {
	const [count] = useState(0);
	const reactLogo = "./src/assets/react.svg";
	const viteLogo = "./vite.svg";

	return (
		<>
			<CalciteShell content-behind>
				<h1
					id="header-title"
					slot="header">
					AMA C a l c i t e
					<div id="rightBtns">
						<a
							href="https://vitejs.dev"
							target="_blank">
							<img
								src={viteLogo}
								className="logo"
								alt="Vite logo"
							/>
						</a>
						<a
							href="https://react.dev"
							target="_blank">
							<img
								src={reactLogo}
								className="logo react"
								alt="React logo"
							/>
						</a>
					</div>
				</h1>
				<CalciteActionBar slot="action-bar">
					<CalciteAction
						data-action-id="layers"
						icon="layers"
						text="Layers"></CalciteAction>
					<CalciteAction
						data-action-id="basemaps"
						icon="basemap"
						text="Basemaps"></CalciteAction>
					<CalciteAction
						data-action-id="legend"
						icon="legend"
						text="Legend"></CalciteAction>
					<CalciteAction
						data-action-id="bookmarks"
						icon="bookmark"
						text="Bookmarks"></CalciteAction>
					<CalciteAction
						data-action-id="print"
						icon="print"
						text="Print"></CalciteAction>
					<CalciteAction
						data-action-id="information"
						icon="information"
						text="Information"></CalciteAction>
				</CalciteActionBar>
				<CalciteShellPanel
					slot="panel-start"
					display-mode="float"></CalciteShellPanel>

				<div id="viewDiv"></div>
			</CalciteShell>
		</>
	);
}

export default App;
