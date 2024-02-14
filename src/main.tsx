import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
	console.log(
		`Profiler: id=${id}, phase=${phase}, actualDuration=${actualDuration}, baseDuration=${baseDuration}, startTime=${startTime}, commitTime=${commitTime}`
	);
};

ReactDOM.createRoot(document.getElementById("root") as any).render(
	<React.StrictMode>
		<React.Profiler
			id="App"
			onRender={onRender}>
			<App />
		</React.Profiler>
	</React.StrictMode>
);
