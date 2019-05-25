import React from 'react';
import Game from './Game';

function App() {
  return (
    <div>
      <Game
        gridSize={4}
        tileSet={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]}
        tileSize={90}
      />
    </div>
  );
}

export default App;
