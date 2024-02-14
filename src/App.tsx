import React from "react";
import {useState} from "react";
import "./App.css";

import {setAssetPath} from "@esri/calcite-components/dist/components";
setAssetPath(window.location.href);

import {
	CalciteShell,
	CalciteShellPanel,
	CalciteActionBar,
	CalciteAction,
	CalcitePanel,
	CalciteLabel,
	CalciteRating,
} from "@esri/calcite-components-react";

function App() {
	const [count] = useState(0);
	const tsLogo = "./src/assets/Typescript.svg";
	const reactLogo = "./src/assets/react.svg";
	const viteLogo = "./vite.svg";

	return (
		<>
			<CalciteShell content-behind>
				<h1
					slot="header"
					id="header-title">
					<span id="map-title">...</span>
					<div id="rightBtns">
						<span>AMA C a l c i t e</span>
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
						<a
							href="https://www.typescriptlang.org/docs/"
							target="_blank">
							<img
								src={tsLogo}
								className="logo"
								alt="TypeScript logo"
							/>
						</a>
					</div>
				</h1>

				<CalciteShellPanel
					slot="panel-start"
					display-mode="float">
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

					<CalcitePanel
						heading="Layers"
						height-scale="l"
						data-panel-id="layers"
						hidden>
						<div id="layers-container"></div>
					</CalcitePanel>
					<CalcitePanel
						heading="Basemaps"
						height-scale="l"
						data-panel-id="basemaps"
						hidden>
						<div id="basemaps-container"></div>
					</CalcitePanel>
					<CalcitePanel
						heading="Legend"
						height-scale="l"
						data-panel-id="legend"
						hidden>
						<div id="legend-container"></div>
					</CalcitePanel>
					<CalcitePanel
						heading="Bookmarks"
						height-scale="l"
						data-panel-id="bookmarks"
						hidden>
						<div id="bookmarks-container"></div>
					</CalcitePanel>
					<CalcitePanel
						heading="Print"
						height-scale="l"
						data-panel-id="print"
						hidden>
						<div id="print-container"></div>
					</CalcitePanel>
				</CalciteShellPanel>

				<CalcitePanel
					heading="Details"
					data-panel-id="information"
					hidden>
					<div id="info-content">
						<img
							id="item-thumbnail"
							alt="webmap thumbnail"
						/>
						<div id="item-description"></div>
						<CalciteLabel layout="inline">
							<b>Rating:</b>
							<CalciteRating
								id="item-rating"
								read-only></CalciteRating>
						</CalciteLabel>
					</div>
				</CalcitePanel>

				<div id="viewDiv"></div>
			</CalciteShell>
		</>
	);
}

export default App;
