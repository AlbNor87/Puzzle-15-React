import React, { Component } from 'react';
import Game from './Game';
import styled from 'styled-components';
import config from '../config';

const ShuffleButton = styled.button`
    width: 150px;
    height: 50px;
`;

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      tileSet: this.generateTileSet(config.rows, config.columns) 
    }
    
    this.shuffleTiles = this.shuffleTiles.bind(this);
  }

  componentDidMount(){
    // this.shuffleTiles();
    console.log("Rows: ", config.rows);
    console.log("Columns: ", config.columns);

    console.log("AppState: ", this.state);

    // this.generateTileSet(config.rows, config.columns);


  }
  
  render() {
    
    const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const tileSize = (viewWidth + viewHeight)/2 * 0.1;

    // const numberOfTiles = rows * columns;


    //Grid 80vw
    // const gridWidth = viewWidth * 0.8;
    // const tileSize = gridWidth / numberOfTiles;

    
    return ( 
      <div>
      <Game
        rows={config.rows}
        columns={config.columns}
        tileSet={this.state.tileSet}
        tileSize={tileSize}
      />
      <ShuffleButton onClick={this.shuffleTiles}>Reset</ShuffleButton>
    </div>
     );
  }

  generateTileSet(rows, columns){
    const tileCount = rows * columns;
    const tileSet = [];
    
    for(let i = 0; i < tileCount; i++){
      tileSet[i] = i +1;
    }

    // console.log("tileSet: ", tileSet);

    return tileSet;

  }

  shuffleTiles(){
    console.log("SHUFFLE!")
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
