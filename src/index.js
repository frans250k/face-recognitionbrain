import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import 'tachyons';
import './styles.css';


const rootElement = document.getElementById("root");
ReactDOM.render(
      <App />, rootElement
  );
  
  // ReactDOM.render(
  //   <div>
  //     <App />, document.getElementById("root")
  //   </div>
  // );
