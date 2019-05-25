import React, { Component } from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';

const Container = styled.div`
    margin: auto;
    display: flex;
    padding: 5px;
    width: 50vw;
    height: 25vw;
`;

class Game extends Component {

    constructor(props) {
        super(props);        
        
        const { tileSet, gridSize, tileSize } = props;
        const tiles = this.generateTiles(tileSet, gridSize, tileSize);

        this.state = {
            tiles
        }
    }

    render() {
        const {
            gridSize,
            tileSize,
          } = this.props;

        return ( 
            <Container>
                <GameBoard
                    gridSize={gridSize}
                    tileSize={tileSize}
                    tiles={this.state.tiles}
                    onTileClick={this.onTileClick}
                />
            </Container>
         );
    }

    generateTiles(tileSet, gridSize, tileSize) {

        const tiles = [];

        tileSet.forEach((digit, index) => {

            tiles[index] = {
                ...this.generateTilePosition(index, gridSize, tileSize),
                width: this.props.tileSize,
                height: this.props.tileSize,
                digit,
            }
        })

        return tiles;

    }

    generateTilePosition(index, gridSize, tileSize) {

        console.log('Index: ', index);

        const column = index % gridSize;
        const row = index / gridSize << 0;

        console.log('left: ', column * tileSize);
        console.log('top: ', row * tileSize);

        
        return {
            column,
            row,
            left: column * tileSize,
            top: row * tileSize,
            tileId: index,
        };
    }

    onTileClick = tile => {

        // const { gridSize } = this.props;
    
        // // Find empty tile
        // const emptyTile = this.state.tiles.find(t => t.number === gridSize ** 2);
        // const emptyTileIndex = this.state.tiles.indexOf(emptyTile);
    
        // // Find index of tile
        // const tileIndex = this.state.tiles.findIndex(t => t.number === tile.number);
    
        // // Is this tale neighbouring the zero tile? If so, switch them.
        // const d = distanceBetween(tile, emptyTile);
        // if (d.neighbours) {
        //   let t = Array.from(this.state.tiles).map(t => ({ ...t }));
    
        //   invert(t, emptyTileIndex, tileIndex, [
        //     'top',
        //     'left',
        //     'row',
        //     'column',
        //     'tileId',
        //   ]);
    
        //   const checkGameOver = this.isGameOver(t);
    
        //   this.setState({
        //     gameState: checkGameOver ? GAME_OVER : GAME_STARTED,
        //     tiles: t,
        //     moves: this.state.moves + 1,
        //     dialogOpen: checkGameOver ? true : false,
        //   });
        // }
      };

    // generateRandomArray(arr, size) {

    //     let shuffled = arr.slice(0), i = arr.length, temp, index;
    //     while (i--) {
    //       index = Math.floor((i + 1) * Math.random());
    //       temp = shuffled[index];
    //       shuffled[index] = shuffled[i];
    //       shuffled[i] = temp;
    //     }
      
    //     return shuffled.slice(0, size);
    // };
}
 
export default Game;