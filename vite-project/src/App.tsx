import { useState } from 'react'
import './App.css'
import { countDoubleNumber, type Domino, sort, removeDuplicates, removeByTotal} from './utils'

export default function App() {
  const initialDominoes = [
    [6, 1],
    [4, 3],
    [5, 1],
    [3, 4],
    [1, 1],
    [3, 4],
    [1, 2],
  ] as Domino[];

  const [dominoes, setDominoes] = useState(initialDominoes);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [inputNumber, setInputNumber] = useState('');

  const sortedDominoes = sortDirection ? sort(dominoes, sortDirection) : dominoes;

  const handleRemoveByTotal = () => {
    if (!isNaN(Number(inputNumber))) {
      setDominoes(prev => removeByTotal(prev, Number(inputNumber)));
      setSortDirection(null);
    }
    setInputNumber('');
  };

  const handleFlip = () => {
    setDominoes(prev => 
      prev.map(domino => [...domino].reverse() as Domino)
    );
  };

  return (
    <div className="domino-app">
      <div className="domino-container">
        <h1 className="domino-title">Dominoes</h1>
        <div className="domino-subtitle">Interactive Domino Cards Manager</div>
        
        <div className="double-counter">
          Double Numbers: {countDoubleNumber(dominoes)}
        </div>

        <div className="controls-container">
          <button 
            className="control-button button-sort-asc" 
            onClick={() => setSortDirection('asc')}
          >
            Sort (ASC)
          </button>
          <button 
            className="control-button button-sort-desc" 
            onClick={() => setSortDirection('desc')}
          >
            Sort (DESC)
          </button>
          <button 
            className="control-button button-flip" 
            onClick={handleFlip}
          >
            Flip
          </button>
          <button 
            className="control-button button-remove-dup" 
            onClick={() => {
              setDominoes(removeDuplicates(dominoes));
              setSortDirection(null);
            }}
          >
            Remove Dup
          </button>
          <button 
            className="control-button button-reset" 
            onClick={() => {
              setDominoes(initialDominoes);
              setSortDirection(null);
            }}
          >
            Reset
          </button>
        </div>

        <div className="input-container">
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            placeholder="Enter total to remove"
            className="number-input"
          />
          <button 
            className="button-remove" 
            onClick={handleRemoveByTotal}
          >
            Remove
          </button>
        </div>

        <div className="domino-grid">
          {sortedDominoes.map(([left, right], index) => (
            <div
              key={index}
              className="domino-card"
            >
              <div className="domino-half domino-left">
                {left}
              </div>
              <div className="domino-half domino-right">
                {right}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}