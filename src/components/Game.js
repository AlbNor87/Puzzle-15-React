import React, { Component } from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';

const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

class Game extends Component {

    constructor(props) {
        super(props);        
        
        const { tileSet, tileSize, rows, columns } = props;
        const tiles = this.generateTiles(tileSet, tileSize, rows, columns);
        
        this.state = {
            tiles
        }

        this.onTileClick = this.onTileClick.bind(this);
        console.log("TILESET: ", tileSet);
        console.log("Game Constructor: ");
        console.log("rows: ", rows);
        console.log("columns: ", columns);

    }

    componentWillReceiveProps(nextProps) {
        const { tileSize, rows, columns } = this.props;
        const newTiles = this.generateTiles(nextProps.tileSet, tileSize, rows, columns);
    
        this.setState({
          tiles: newTiles,
        });
    }

    render() {
        const {
            tileSize,
            rows,
            columns
          } = this.props;

        return ( 
            <Container>
                <GameBoard
                    
                    rows={rows}
                    columns={columns}
                    tileSize={tileSize}
                    tiles={this.state.tiles}
                    onTileClick={this.onTileClick}
                />
               
            </Container>
         );
    }

    generateTiles(tileSet, tileSize, rows, columns) {

        console.log("generateTiles rows: ", rows);
        console.log("generateTiles columns: ", columns);

        const tiles = [];

        tileSet.forEach((digit, index) => {

            tiles[index] = {
                ...this.generateTilePosition(index, tileSize, rows, columns),
                width: this.props.tileSize,
                height: this.props.tileSize,
                digit,
            }
        })

        console.log({tiles});

        return tiles;
    }
    // generateTiles(tileSet, gridSize, tileSize) {

    //     const tiles = [];

    //     tileSet.forEach((digit, index) => {

    //         tiles[index] = {
    //             ...this.generateTilePosition(index, gridSize, tileSize),
    //             width: this.props.tileSize,
    //             height: this.props.tileSize,
    //             digit,
    //         }
    //     })

    //     return tiles;
    // }

    generateTilePosition(index, tileSize, rows, columns) {
        const column = index % columns;
        const row = index / columns << 0;

        // const row = index % rows;
        // const row = index / rows << 0;
        // const row = index % rows;
        // const row =  rows / index << 0;
        return {
            index,
            COLS: columns, 
            ROWS: rows,
            column,
            row,
            left: column * tileSize,
            top: row * tileSize,
            tileId: index,
        };
    }
    // generateTilePosition(index, gridSize, tileSize) {
    //     const column = index % gridSize;
    //     const row = index / gridSize << 0;
    //     return {
    //         column,
    //         row,
    //         left: column * tileSize,
    //         top: row * tileSize,
    //         tileId: index,
    //     };
    // }

    onTileClick(tile) {

        // console.log("this.props.rows: ", this.props.rows);
        // console.log("this.props.columns: ", this.props.columns);
    
        const emptyTile = this.state.tiles.find(t => t.digit === this.props.rows * this.props.columns);
        const emptyTileIndex = this.state.tiles.indexOf(emptyTile);
        const tileIndex = this.state.tiles.findIndex(t => t.digit === tile.digit);

        // console.log({tile})
        // console.log("emptyTile: ", emptyTile);

        if (this.tilesAreNeighbours(tile, emptyTile)) {

            let tilesArray = [...this.state.tiles];

            this.swapPlaces(tilesArray, emptyTileIndex, tileIndex, [
                'top',
                'left',
                'row',
                'column',
                'tileId',
            ]);

            this.isGameOver(tilesArray);

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

    swapPlaces = (array, indexA, indexB, fields) => {
        fields.forEach(field => {
          const swap = array[indexA][field];
          array[indexA][field] = array[indexB][field];
          array[indexB][field] = swap;
        });
    };

    isGameOver(tilesArray) {
        const correctedTiles = tilesArray.filter(tile => {
          return tile.tileId + 1 === tile.digit;
        });

        if(correctedTiles.length === this.state.tiles.length) {
            alert("Win!");
            return true;
        } else {
            return false;
        }
    }

}
 
export default Game;