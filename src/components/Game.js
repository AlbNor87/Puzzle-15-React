import React, { Component } from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';

const Container = styled.div`
    margin: auto;
    display: flex;
    padding: 5px;
    width: 50vw;
    height: 25vw;
    background-color: rgba(0,0,0,0.3);
`;

class Game extends Component {
    state = {  }
    render() { 
        return ( 
            <Container>
                <GameBoard></GameBoard>
            </Container>
         );
    }
}
 
export default Game;