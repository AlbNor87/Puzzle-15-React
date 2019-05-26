import React, { Component } from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import config from '../config';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* margin-bottom: ${props => props.size/2}px;
    margin-top: ${props => props.size/2}px; */
    box-shadow: 5px 5px 25px rgba(0,0,0, 0.4);
`;

const Dashboard = styled.div`
    width: 100%;
    background-color: rgba(0,0,0,0.3);
`;

const MoveCounter = styled.div`
    border: none;
    width: 100%;
    height: ${props => props.size}px;
    min-height: 50px;
    font-size: ${props => props.size/2}px;
    font-size: 200%;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.secondary};
    color: ${props => props.colors.tertiary};
`;

const Button = styled.button`
    border: none;
    width: 100%;
    height: ${props => props.size}px;
    min-height: 50px;
    font-size: 200%;
    font-weight: 700;
    color: ${props => props.colors.secondary};
    outline: none;
    background-color: ${props => props.colors.tertiary};
    cursor: pointer;
    :active {
    box-shadow: 5px 5px 25px rgba(0,0,0, 0.2);
    outline: none;
    transform: translateY(4px);
    }
    :focus {
        outline: none;
    }
`;

const Dialog = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 10%;
    margin: auto;
    width: 50%;
    min-height: 40vh;
    background-color: ${props => props.colors.tertiary};
    display: ${props => (props.visible ? "flex" : "none" )};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 180%;
    padding: 5%;
    text-align: center;
    box-shadow: 5px 5px 25px rgba(0,0,0, 0.3);
    @media (max-width: 700px) {
        width: 90%;
        font-size: 130%;
    }
    h1{
        font-size: 140%;
        margin-bottom: 20px;
    }
`;

const DialogButton = styled(Button)`
    margin-top: 5%;
    font-size: 100%;
    width: 50%;
    padding: 30px;
    height: auto;
    box-shadow: 5px 5px 25px rgba(0,0,0, 0.1);
    @media (max-width: 1025px) {
        width: 90%;
        font-size: 100%;
    }
`;

class Game extends Component {

    constructor(props) {
        super(props);        
        
        const { tileSet, tileSize, rows, columns } = props;
        const tiles = this.generateTiles(tileSet, tileSize, rows, columns);
        
        this.state = {
            tiles,
            moveCount: 0,
            showVictoryDialog: false,
            showStartDialog: true,
        }
        this.onResetClick = this.onResetClick.bind(this);
        this.onStartClick = this.onStartClick.bind(this);
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
                    <Button onClick={this.onResetClick} size={tileSize} colors={config.colors}>Reset</Button>
                </Dashboard>

                <Dialog
                visible={this.state.showStartDialog}
                colors={config.colors}
                >
                <h1>Welcome to a Game of Tiles!</h1> 
                Your mission is to arrange all the tiles in numeric order, starting with number 1 in the left top corner and ending with the empty tile in the right bottom corner of the game board. Good luck!
                <DialogButton
                onClick={this.onStartClick}
                size={tileSize}
                colors={config.colors}
                >Start</DialogButton>
                </Dialog>

                <Dialog
                    visible={this.state.showVictoryDialog}
                    colors={config.colors}>
                    <h1>Congratulations!</h1> 
                    You finished the game in {this.state.moveCount} moves!
                    <DialogButton
                    onClick={this.onResetClick}
                    size={tileSize}
                    colors={config.colors}
                    >Reset</DialogButton>
                </Dialog>


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

    onStartClick() {
        this.setState({
            moveCount: 0,
            showStartDialog: false,
        })
    }

    onResetClick() {
        this.setState({
            moveCount: 0,
            showVictoryDialog: false,
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

            this.isGameOver();
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

    isGameOver() {

        let tilesArray = [...this.state.tiles];
        const correctedTiles = tilesArray.filter(tile => {
          return tile.tileId + 1 === tile.digit;
        });

        if(correctedTiles.length === this.state.tiles.length) {

            this.showVictoryDialog();
            return true;
        } else {
            return false;
        }
    }

    showVictoryDialog(){
        
        // alert("Win!")
        this.setState({
            showVictoryDialog: !this.state.showVictoryDialog
        })
    }
}
 
export default Game;