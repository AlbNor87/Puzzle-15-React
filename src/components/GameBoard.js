import React, { Component } from 'react';
import Tile from './Tile';
import styled from 'styled-components';

const TilesContainer = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    position: relative;
    background-color: rgba(0,0,0,0.3);
`;

class GameBoard extends Component {
    render() {
        
        const {
            tiles,
            onTileClick,
            gridSize,
            tileSize,
          } = this.props;
        
        return ( 

                <TilesContainer id="TilesContainer" size={tileSize * gridSize}>

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