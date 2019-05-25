import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 12px;
    color: red;
`;

const TileWrapper = styled.div`
    margin: 5px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    background-color: black;
`;

class Tile extends Component {
    state = {  }
    render() {
        
        const { digit } = this.props;
        
        return (
            <TileWrapper id="TileWrapper">
                <Title>{digit}</Title>
            </TileWrapper>
          );
    }
}
 
export default Tile;