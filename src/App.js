import React, { Component } from "react";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  console.log(box)
  this.setState({box: box})
}

onInputChange = (e) => {
  this.setState({input: e.target.value})
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input})
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
      
    }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' 
          params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
        :  (
          this.state.route === 'signin' ?
          <Signin onRouteChange={this.onRouteChange} /> :
          <Register onRouteChange={this.onRouteChange} />  
          )  
        }
      </div>
    );

  }
}

export default App;