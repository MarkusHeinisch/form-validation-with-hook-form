import React from "react";
import ReactDom from "react-dom";
import App from "./App";

//import './style.css';
//console.log(kb_strings);

const entryPoint = document.getElementById("app");
if(entryPoint) {
	ReactDom.render(
		<App {...app.dataset} />,
		entryPoint
	);
}