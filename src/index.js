import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import "./styles.scss";

// const Context = React.createContext("locale")

const mountNode = document.getElementById("spir-announces");
ReactDOM.render( <App/> , mountNode);
// ReactDOM.render( <Context.Provider><App/></Context.Provider> , mountNode);