import React, { Component } from 'react';
import styled from 'styled-components';
import config from '../config';

const TileContainer = styled.div`
    position: absolute;
    width: ${props => props.size - 4}px;
    height: ${props => props.size - 4}px;
    left: ${props => props.left + 2}px;
    top: ${props => props.top + 2}px;
    font-size: ${props => props.size/4}px;
    font-weight: 700;
    background-image: linear-gradient(to bottom right, ${props => props.colors.primary}, ${props => props.colors.secondary});
    color: ${props => props.colors.tertiary};
    display: ${props => (props.visible ? "flex" : "none" )};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    /* border: 1px solid ${props => props.colors.secondary}; */
    transition-duration: .200s;
    transition-timing-function: ease-in;
`;

class Tile extends Component {
    constructor(props) {
        super(props);
    
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
    this.props.onClick(this.props);
    }
    
    render() {
        
        const { digit, width, left, top, visible } = this.props;
        
        return (
            <TileContainer
            id="TileContainer"
            size={width}
            left={left}
            top={top}
            onClick={this.onClick}
            visible={visible}
            key
            colors={config.colors}
            >
            {digit}
            </TileContainer>
          );
    }
}
 
export default Tile;