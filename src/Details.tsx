import {CalciteChip, CalciteLabel, CalciteRating} from "@esri/calcite-components-react";
// import WebMap from "@esri/WebMap";

import React from "react";
import {VERSION} from "./version";

const JSAPI_VERSION = "?";

function Details() {
	return (
		<div id="info-content">
			<CalciteLabel>
				Version: {VERSION} (jsApi: {(window as any).JSAPI_VERSION})
			</CalciteLabel>
			<img
				id="item-thumbnail"
				alt="webmap thumbnail"
			/>
			<div
				id="item-description"
				style={{
					height: "5rem",
				}}></div>
			<CalciteLabel layout="inline">
				<b>Rating:</b>
				<CalciteRating
					id="item-rating"
					read-only></CalciteRating>
			</CalciteLabel>
		</div>
	);
}

export default Details;
