import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import "./styles.css";
import "./styles.scss";

// const Context = React.createContext("locale")

const mountNode = document.getElementById("app");
ReactDOM.render( <App/> , mountNode);
// ReactDOM.render( <Context.Provider><App/></Context.Provider> , mountNode);