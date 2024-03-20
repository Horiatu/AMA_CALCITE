import React from "react";

import {
	CalciteShell,
	CalciteShellPanel,
	CalciteActionBar,
	CalciteAction,
	CalcitePanel,
} from "@esri/calcite-components-react";

import "./styles/atomic.css";
import "./styles/App.css";
import TitleBar from "./TitleBar";
import Details from "./Details";
import Persist from "./Persist";

export let WebmapId: string;

export const Remember = (name: string, value: any) => {
	if (Persist.WebmapId) {
		localStorage[name + "?" + Persist.WebmapId] = value;
	}
};

export const Recall = (name: string, _default?: any): any => {
	if (Persist.WebmapId) {
		let value = localStorage[name + "?" + Persist.WebmapId];
		if (!value && _default != null) {
			value = _default;
			// AddressManagerVM.remember(name, value);
		}
		return value;
	}
	return null;
};

export default function App() {
	// const [count] = useState(0);
	const tsLogo = "./Typescript-white.svg";
	const reactLogo = "./react.svg";
	const viteLogo = "./vite.svg";

	return (
		<>
			<CalciteShell content-behind>
				<TitleBar></TitleBar>

				<CalciteShellPanel
					slot="panel-start"
					display-mode="float">
					<CalciteActionBar slot="action-bar">
						<CalciteAction
							data-action-id="information"
							icon="information"
							text="Information"></CalciteAction>
						<CalciteAction
							data-action-id="p_layers"
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
					</CalciteActionBar>

					<CalcitePanel
						heading="Layers"
						height-scale="l"
						data-panel-id="p_layers"
						className="pMax90"
						hidden>
						<div id="layers-container"></div>
					</CalcitePanel>
					<CalcitePanel
						heading="Basemaps"
						height-scale="l"
						data-panel-id="basemaps"
						className="pMax90"
						hidden>
						<div id="basemaps-container"></div>
					</CalcitePanel>
					<CalcitePanel
						heading="Legend"
						height-scale="l"
						data-panel-id="legend"
						className="pMax90"
						hidden>
						<div id="legend-container"></div>
					</CalcitePanel>
					<CalcitePanel
						heading="Bookmarks"
						height-scale="l"
						data-panel-id="bookmarks"
						className="pMax90"
						hidden>
						<div id="bookmarks-container"></div>
					</CalcitePanel>
					<CalcitePanel
						heading="Print"
						height-scale="l"
						data-panel-id="print"
						className="pMax90"
						hidden>
						<div id="print-container"></div>
					</CalcitePanel>

					<CalcitePanel
						heading="Details"
						data-panel-id="information"
						className="pMax90"
						hidden>
						<Details />
					</CalcitePanel>
				</CalciteShellPanel>

				<div id="viewDiv"></div>
			</CalciteShell>
		</>
	);
}

// export default App;
