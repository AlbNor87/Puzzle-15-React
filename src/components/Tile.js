import React, { Component } from 'react';
import styled from 'styled-components';

const TileWrapper = styled.div`
    position: absolute;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    background-color: black;
    color: dodgerblue;
    display: ${props => (props.visible ? "flex" : "none" )};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid dodgerblue;

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

        console.log(this.props.width);
        
        return (
            <TileWrapper
            id="TileWrapper"
            size={width}
            left={left}
            top={top}
            onClick={this.onClick}
            visible={visible}
            key
            >
            {digit}
            </TileWrapper>
          );
    }
}
 
export default Tile;