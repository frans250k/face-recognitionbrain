import React, { Component } from "react";
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'e38f8459b93e464bbe9fb7d723ffe1b1'
 });

const particlesOptions = {
      particles: {
        number: {
          value: 180,
          density: {
            enable: true,
            value_area: 900
            }
          }
        }
      }

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
    }
  }

onInputChange = (e) => {
  console.log(e.target.value)
}

onButtonSubmit = () => {
  console.log('click')
  app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response)
    },
    function(err) {

    }
  )
}

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} 
        />
        {/* <FaceRecognition /> */}
      </div>
    );

  }
}

export default App;