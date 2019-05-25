import React, { Component } from 'react';
import Tile from './Tile';
import styled from 'styled-components';

const GameBoardContainer = styled.div`
    margin: auto;
    margin-top: 100px;
    display: flex;
    padding: 5px;
    background-color: rgba(0,0,0,0.3);
    flex: 1;

    & .tilesContainer {
        width: ${props => props.width}px;
        height: ${props => props.height}px;
        position: relative;
        text-align: center;
    }
`;

const TilesContainer = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.3);
`;

class GameBoard extends Component {
    state = {  }
    render() {
        
        const {
            tiles,
            onTileClick,
            gridSize,
            tileSize,
          } = this.props;
        
        return ( 

                <TilesContainer size={tileSize * gridSize}>

                    {tiles.map((tile, tileId) => {
                        return (
                        <Tile
                            {...tile}
                            key={`tile-${tileId}`}
                            correct={tile.tileId + 1 === tile.digit}
                            onClick={onTileClick}
                            visible={tile.digit < gridSize ** 2}
                        />
                        );
                    })}
                    
                </TilesContainer>

         );
    }
}
 
export default GameBoard;