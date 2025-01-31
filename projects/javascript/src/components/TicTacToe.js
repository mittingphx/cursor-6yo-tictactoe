import React from 'react';

/**
 * TicTacToe Component - A playable Tic Tac Toe game using keyboard numpad input
 * Players alternate between X and O, using numpad numbers corresponding to board positions:
 * 7|8|9
 * 4|5|6 
 * 1|2|3
 */
function TicTacToe() {
  // Game state management
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true); // true = X's turn, false = O's turn
  const [winner, setWinner] = React.useState(null); // null = game in progress, 'X'/'O' = winner, 'Draw' = tie game

  // Handle keyboard input for game moves
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      // Map keyboard numpad keys to board index positions
      const keyToIndex = {
        '7': 0, '8': 1, '9': 2,
        '4': 3, '5': 4, '6': 5,
        '1': 6, '2': 7, '3': 8,
        'Numpad7': 0, 'Numpad8': 1, 'Numpad9': 2,
        'Numpad4': 3, 'Numpad5': 4, 'Numpad6': 5,
        'Numpad1': 6, 'Numpad2': 7, 'Numpad3': 8
      };

      // Process valid moves only if game is still active
      if (keyToIndex.hasOwnProperty(e.key) && !winner) {
        const index = keyToIndex[e.key];
        if (!board[index]) { // Check if cell is empty
          const newBoard = [...board];
          newBoard[index] = xIsNext ? 'X' : 'O';
          setBoard(newBoard);
          setXIsNext(!xIsNext);
          checkWinner(newBoard);
        }
      }
    };

    // Add and cleanup keyboard event listeners
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [board, xIsNext, winner]);

  /**
   * Check if the current board state has a winner
   * @param {Array} currentBoard - Current state of the game board
   */
  const checkWinner = (currentBoard) => {
    // All possible winning combinations
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    // Check each winning combination
    for (let line of lines) {
      const [a, b, c] = line;
      if (currentBoard[a] && 
          currentBoard[a] === currentBoard[b] && 
          currentBoard[a] === currentBoard[c]) {
        setWinner(currentBoard[a]);
        return;
      }
    }

    // Check for draw (all cells filled with no winner)
    if (!currentBoard.includes(null)) {
      setWinner('Draw');
    }
  };

  /**
   * Reset the game state to initial values
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  // Game UI rendering
  return (
    <div style={{ 
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
      padding: '20px',
      fontFamily: 'Comic Sans MS, cursive'
    }}>
      <h1 style={{
        fontSize: '3em',
        color: '#FF4500',
        textShadow: '3px 3px 0px #FFF',
        marginBottom: '20px'
      }}>
        Tic Tac Toe Fun!
      </h1>
      <p style={{
        fontSize: '1.5em',
        color: '#4B0082',
        marginBottom: '20px'
      }}>
        Use numpad (789/456/123) to play!
      </p>
      {/* Game board grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 80px)',
        gap: '10px',
        margin: '20px auto',
        width: 'fit-content',
        background: '#FFF',
        padding: '15px',
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)'
      }}>
        {/* Render individual board cells */}
        {board.map((cell, index) => (
          <div key={index} style={{
            width: '80px',
            height: '80px',
            border: '3px solid #4B0082',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 'bold',
            color: cell === 'X' ? '#FF4500' : '#4B0082',
            background: '#FFF',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            ':hover': {
              transform: 'scale(1.05)'
            }
          }}>
            {cell}
          </div>
        ))}
      </div>
      {/* Winner announcement and reset button */}
      {winner && (
        <div style={{
          marginTop: '20px',
          animation: 'bounce 1s infinite'
        }}>
          <p style={{
            fontSize: '2em',
            color: '#4B0082',
            marginBottom: '15px'
          }}>
            {winner === 'Draw' ? "It's a Draw! 🤝" : `${winner} Wins! 🎉`}
          </p>
          <button onClick={resetGame} style={{
            fontSize: '1.5em',
            padding: '10px 30px',
            borderRadius: '25px',
            border: 'none',
            background: '#4B0082',
            color: '#FFF',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s',
            ':hover': {
              transform: 'scale(1.05)'
            }
          }}>
            Play Again! 🎮
          </button>
        </div>
      )}
      {/* Current player indicator */}
      {!winner && (
        <p style={{
          fontSize: '2em',
          color: '#4B0082',
          marginTop: '20px'
        }}>
          Next player: {xIsNext ? '❌' : '⭕'}
        </p>
      )}
    </div>
  );
}

export default TicTacToe; 