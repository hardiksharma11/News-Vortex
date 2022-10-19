import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  
  state={
    progress:0
  };

  setProgress=(progress)=>{
    this.setState({progress:progress});
  }

  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          onLoaderFinished={() => this.setState({ progress: 0 })}
          waitingTime={700}
          height={2}
        />
        <News setProgress={this.setProgress} />

      </div>
    )
  }
}
