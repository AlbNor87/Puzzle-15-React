import React, { Component } from 'react';
import Game from './Game';
import styled from 'styled-components';

const ShuffleButton = styled.button`
    width: 150px;
    height: 50px;
`;

class App extends Component {

  constructor(props) {
    super(props);        
    this.state = {
      tileSet: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    }
    
    this.shuffleTiles = this.shuffleTiles.bind(this);
  }

  componentDidMount(){
    this.shuffleTiles()
  }
  
  render() { 
    return ( 
      <div>
      <Game
        gridSize={4}
        tileSet={this.state.tileSet}
        tileSize={90}
      />
      <ShuffleButton onClick={this.shuffleTiles}>
      Reset
      </ShuffleButton>
    </div>
     );
  }

  shuffleTiles(){
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
