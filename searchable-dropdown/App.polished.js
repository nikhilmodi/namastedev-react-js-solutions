import React, { useEffect, useMemo, useRef, useState } from 'react';
import "./styles.css";

export default function App({ options }) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef(null);

  const availableOptions = useMemo(() => {
    const query = inputValue.toLowerCase();
    return options
      .filter(({ label }) => !selected.includes(label))
      .filter(({ label }) => label.toLowerCase().includes(query));
  }, [options, inputValue, selected]);

  // Filtering can shrink the list out from under a stale highlightIndex,
  // so re-anchor to the first result whenever the available options change.
  useEffect(() => {
    setHighlightIndex(0);
  }, [availableOptions]);

  const handleSelection = (fruit) => {
    setSelected(prev => [...prev, fruit]);
    setInputValue('');
    setOpenDropdown(false);
    inputRef.current.blur();
  };

  const handleDeselection = (removedFruit) => {
    setSelected(prev => prev.filter((fruit) => fruit !== removedFruit));
  };

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev => (prev + 1) % availableOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev => (prev - 1 + availableOptions.length) % availableOptions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const option = availableOptions[highlightIndex];
      if (option) handleSelection(option.label);
    } else if (e.key === 'Backspace' && inputValue === '' && selected.length > 0) {
      setSelected(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="dropdown-wrapper">
      <div className='selected-tags'>
        {selected.map((fruit) => (
          <div key={fruit} data-testid={`selected-tag-${fruit.toLowerCase()}`} className='tag'>
            {fruit}
            <button data-testid={`remove-tag-${fruit.toLowerCase()}`} onClick={() => handleDeselection(fruit)}>X</button>
          </div>
        ))}
      </div>
      <input
        data-testid="search-input"
        placeholder="Search fruits..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setOpenDropdown(true)}
        onKeyDown={handleKey}
        ref={inputRef}
      />
      {openDropdown && (
        <div className='dropdown'>
          {availableOptions.length > 0 ? (
            <div data-testid="dropdown-container">
              {availableOptions.map(({ label, value }, index) => {
                const isHighlighted = index === highlightIndex;
                return (
                  <div
                    key={label}
                    data-testid={isHighlighted ? 'highlighted-option' : `dropdown-option-${value}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelection(label);
                    }}
                    className={`dropdown-option ${isHighlighted ? 'highlighted' : ''}`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='no-options'>No options</div>
          )}
        </div>
      )}
    </div>
  );
}
