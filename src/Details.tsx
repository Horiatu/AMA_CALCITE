import {CalciteChip, CalciteLabel, CalciteRating} from "@esri/calcite-components-react";
// import WebMap from "@esri/WebMap";

import React from "react";
import {JSAPI_VERSION, VERSION} from "./version";

function Details() {
	return (
		<div id="info-content">
			<CalciteLabel>
				Version: {VERSION} (jsApi: {JSAPI_VERSION})
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
