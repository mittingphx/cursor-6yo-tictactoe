import { isMobileDevice } from '../utils/deviceDetection';

function Instructions() {
  const isMobile = isMobileDevice();

  return (
    <div className="instructions">
      <h2>How to Play</h2>
      <p>Fill in the grid with numbers 1-9 so that:</p>
      <ul>
        <li>Each row contains numbers 1-9 without repetition</li>
        <li>Each column contains numbers 1-9 without repetition</li>
        <li>Each 3x3 box contains numbers 1-9 without repetition</li>
      </ul>
      {!isMobile && (
        <p>Use the numpad or number keys to fill in squares:</p>
      )}
      {isMobile && (
        <p>Touch a square to select it, then touch again to set a number</p>
      )}
    </div>
  );
}

export default Instructions; 