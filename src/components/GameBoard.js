import React, { Component } from 'react';
import Tile from './Tile';
import styled from 'styled-components';

const TilesContainer = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    position: relative;
    background-color: rgba(0,0,0,0.3);
`;

class GameBoard extends Component {
    render() {

        const {
            tiles,
            onTileClick,
            rows,
            columns,
            tileSize,
          } = this.props;
        
        return ( 

                <TilesContainer
                id="TilesContainer"
                width={tileSize * columns}
                height={tileSize * rows}>

                    {tiles.map((tile, tileId) => {
                        return (
                        <Tile
                            {...tile}
                            key={`tile-${tileId+1}`}
                            correct={tile.tileId + 1 === tile.digit}
                            onClick={onTileClick}
                            visible={tile.digit < rows * columns}
                        />
                        );
                    })}

                </TilesContainer>
        );
    }
}
 
export default GameBoard;