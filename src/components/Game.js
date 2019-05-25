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
            tiles,
        }

        this.onTileClick = this.onTileClick.bind(this);
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
        const column = index % gridSize;
        const row = index / gridSize << 0;
        return {
            column,
            row,
            left: column * tileSize,
            top: row * tileSize,
            tileId: index,
        };
    }

    onTileClick(tile) {
    
        const emptyTile = this.state.tiles.find(t => t.digit === this.props.gridSize ** 2);
        const emptyTileIndex = this.state.tiles.indexOf(emptyTile);
        const tileIndex = this.state.tiles.findIndex(t => t.digit === tile.digit);

        if (this.tilesAreNeighbours(tile, emptyTile)) {

            let tilesArray = [...this.state.tiles];

            this.swap(tilesArray, emptyTileIndex, tileIndex, [
                'top',
                'left',
                'row',
                'column',
                'tileId',
            ]);

            this.setState({
                tiles: tilesArray,
            });
        }
    };

    tilesAreNeighbours(tileACoords, tileBCoords) {
        const sameRow = tileACoords.row === tileBCoords.row;
        const sameColumn = tileACoords.column === tileBCoords.column;
        const columnDiff = tileACoords.column - tileBCoords.column;
        const rowDiff = tileACoords.row - tileBCoords.row;
        const diffColumn = Math.abs(columnDiff) === 1;
        const diffRow = Math.abs(rowDiff) === 1;
        const sameRowDiffColumn = sameRow && diffColumn;
        const sameColumnDiffRow = sameColumn && diffRow;

        return sameRowDiffColumn || sameColumnDiffRow;
    };

    swap = (array, indexA, indexB, fields) => {
        console.log("Swap!");
        fields.forEach(field => {
          const swap = array[indexA][field];
          array[indexA][field] = array[indexB][field];
          array[indexB][field] = swap;
        });
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