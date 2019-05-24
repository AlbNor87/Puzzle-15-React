import React, { Component } from 'react';
import Tile from './Tile';
import styled from 'styled-components';

const Container = styled.div`
    margin: auto;
    display: flex;
    padding: 5px;
    width: 50vw;
    height: 25vw;
    background-color: rgba(0,0,0,0.3);
`;

class GameBoard extends Component {
    state = {  }
    render() { 
        return ( 
            <Container>
                <Tile/>
            </Container>
         );
    }
}
 
export default GameBoard;