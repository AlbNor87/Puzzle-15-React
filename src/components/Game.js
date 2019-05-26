import React, { Component } from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import config from '../config';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* padding: 5px; */
    margin-bottom: ${props => props.size}px;
    margin-top: ${props => props.size}px;
`;

const Dashboard = styled.div`
    width: 100%;
    background-color: dodgerblue;
`;

const MoveCounter = styled.div`
    border: none;
    width: 100%;
    height: ${props => props.size}px;
    min-height: 50px;
    font-size: ${props => props.size/2}px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.secondary};
    color: ${props => props.colors.tertiary};
`;

const ResetButton = styled.button`
    border: none;
    width: 100%;
    height: ${props => props.size}px;
    min-height: 50px;
    font-size: ${props => props.size/2}px;
    font-weight: 700;
    color: ${props => props.colors.secondary};
    cursor: pointer;
    :active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
    }
`;

class Game extends Component {

    constructor(props) {
        super(props);        
        
        const { tileSet, tileSize, rows, columns } = props;
        const tiles = this.generateTiles(tileSet, tileSize, rows, columns);
        
        this.state = {
            tiles,
            moveCount: 0
        }
        this.onResetClick = this.onResetClick.bind(this);
        this.onTileClick = this.onTileClick.bind(this);
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
            <Container size={tileSize}>
                <GameBoard  
                    rows={rows}
                    columns={columns}
                    tileSize={tileSize}
                    tiles={this.state.tiles}
                    onTileClick={this.onTileClick}
                />
                <Dashboard>
                    <MoveCounter size={tileSize} colors={config.colors}> Move count: {this.state.moveCount}  </MoveCounter>
                    <ResetButton onClick={this.onResetClick} size={tileSize} colors={config.colors}>Reset</ResetButton>
                </Dashboard>
            </Container>
         );
    }

    generateTiles(tileSet, tileSize, rows, columns) {

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

    generateTilePosition(index, tileSize, rows, columns) {
        const column = index % columns;
        const row = index / columns << 0;
        return {
            column,
            row,
            left: column * tileSize,
            top: row * tileSize,
            tileId: index,
        };
    }

    onResetClick() {
        this.setState({
            moveCount: 0,
          })
        this.props.onResetClick(this.props);
    }

    onTileClick(tile) {
    
        const emptyTile = this.state.tiles.find(t => t.digit === this.props.rows * this.props.columns);
        const emptyTileIndex = this.state.tiles.indexOf(emptyTile);
        const tileIndex = this.state.tiles.findIndex(t => t.digit === tile.digit);

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
                moveCount: this.state.moveCount + 1
            });
        }
    };

    tilesAreNeighbours(tileAPosition, tileBPosition) {
        const sameRow = tileAPosition.row === tileBPosition.row;
        const sameColumn = tileAPosition.column === tileBPosition.column;
        const columnDiff = tileAPosition.column - tileBPosition.column;
        const rowDiff = tileAPosition.row - tileBPosition.row;
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