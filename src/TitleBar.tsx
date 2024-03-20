import React from "react";

// import "./App.css";

export default function TitleBar() {
	const tsLogo = "./Typescript-white.svg";
	const reactLogo = "./react.svg";
	const viteLogo = "./vite.svg";

	return (
		<h1
			slot="header"
			id="title-bar">
			<span id="map-title">[AMA C a l c i t e]</span>
			<div id="rightBtns">
				{/* <span>AMA C a l c i t e</span> */}
				<a
					href="https://vitejs.dev"
					target="_blank">
					<img
						src={viteLogo}
						className="logo"
						alt="Vite logo"
						title="Vite"
					/>
				</a>
				<a
					href="https://react.dev"
					target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
						title="React"
					/>
				</a>
				<a
					href="https://www.typescriptlang.org/docs/"
					target="_blank">
					<img
						src={tsLogo}
						className="logo"
						alt="TypeScript logo"
						title="TypeScript"
					/>
				</a>
			</div>
		</h1>
	);
}

// export default TitleBar;
