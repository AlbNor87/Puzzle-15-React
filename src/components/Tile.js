import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 22;
    color: red;
`;

const Wrapper = styled.div`
    margin: 5px;
    width: 50px;
    height: 50px;
    background-color: black;
`;

class Tile extends Component {
    state = {  }
    render() {
        
        const {
            numberOfTiles
        } = this.props;
        
        return (
            <Wrapper>
                <Title>{this.props.numberOfTiles}</Title>
            </Wrapper>
          );
    }
}
 
export default Tile;