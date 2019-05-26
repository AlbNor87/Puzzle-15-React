import React, { Component } from 'react';
import Game from './Game';
import styled from 'styled-components';
import config from '../config';

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: radial-gradient(${props => props.colors.primary}, ${props => props.colors.tertiary});
  display: flex;
  justify-content: center;
  align-items: center;  
  width: 100vw;
  min-height: 100vh;
`;

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      tileSet: this.generateTileSet(config.rows, config.columns) 
    }
    
    this.shuffleTiles = this.shuffleTiles.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
  }

  componentDidMount(){
    this.shuffleTiles();
  }
  
  render() {

    const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let orientationValue;

    if(viewWidth < viewHeight){
      //portrait
      orientationValue = 0.3;
    } else {
      //landscape
      orientationValue = 0.18;
    } 

    const tileSize = (viewWidth + viewHeight) / config.columns * orientationValue;

    return ( 
      <AppContainer colors={config.colors}>
      <Game
        rows={config.rows}
        columns={config.columns}
        tileSet={this.state.tileSet}
        tileSize={tileSize}
        onResetClick={this.onResetClick}
      />
      </AppContainer>
     );
  }

  generateTileSet(rows, columns){
    const tileCount = rows * columns;
    const tileSet = [];
    
    for(let i = 0; i < tileCount; i++){
      tileSet[i] = i +1;
    }

    return tileSet;
  }

  onResetClick() {
    this.shuffleTiles();
  }

  shuffleTiles(){
    //Fisher-Yates style
    let array = [...this.state.tileSet];
    let shuffled = array.slice(0), i = array.length, temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
  
    this.setState({
        tileSet: shuffled
    }) 
  };
  
}

export default App;
