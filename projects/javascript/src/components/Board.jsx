import { isMobileDevice } from '../utils/deviceDetection';

function Board() {
  // ... existing state and other code ...

  const handleCellClick = (rowIndex, colIndex) => {
    // If cell is already selected, cycle through numbers 1-9
    if (selectedCell?.row === rowIndex && selectedCell?.col === colIndex) {
      const currentValue = board[rowIndex][colIndex];
      const nextValue = currentValue === 9 ? 0 : (currentValue + 1);
      handleNumberInput(nextValue);
    } else {
      // Select the cell
      setSelectedCell({ row: rowIndex, col: colIndex });
    }
  };

  // ... rest of the component code ...

  return (
    // ... existing JSX ...
  );
}

export default Board; 