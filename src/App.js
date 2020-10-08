import React from "react";
import "./styles.css";

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';



export default function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      {/* <ImageLinkForm />
      <FaceRecognition /> */}
    </div>
  );
}
