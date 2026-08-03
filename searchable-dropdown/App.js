import React, { useMemo, useState, useRef } from 'react';
import "./styles.css";

export default function App({ options }) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const inputRef = useRef(null)
  // TODO: Filter options based on inputValue and exclude selected ones
  const availableOptions = useMemo(() => {
    let result = options.filter(({ label }) => !selected.includes(label))
    if (inputValue) {
      result = result.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
    }
    // console.log(result)
    return result
  }, [options, inputValue, selected])

  const handleSelection = (fruit) => {
    setSelected(prev => [...prev, fruit])
    setInputValue('')
    setOpenDropdown(false)
    inputRef.current.blur()
    setHighlightIndex(0)
  }

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev => ((prev + 1) % availableOptions.length))
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev => ((prev - 1) % availableOptions.length))
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const { label } = availableOptions[highlightIndex]
      handleSelection(label)
    }

  }

  const handleDeselection = (removedFruit) => {
    setSelected(prev => prev.filter((fruit) => fruit !== removedFruit))
  }

  return (
    <div className="dropdown-wrapper">
      {/* TODO: Render selected tags */}
      <div className='selected-tags'>
        {selected.map((fruit) => <div key={fruit} data-testid={`selected-tag-${fruit.toLowerCase()}`} className='tag'>{fruit}
          <button data-testid={`remove-tag-${fruit.toLowerCase()}`} onClick={() => handleDeselection(fruit)}>X</button></div>)}
      </div>
      <input
        data-testid="search-input"
        placeholder="Search fruits..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setOpenDropdown(true)}
        // onBlur={() => setOpenDropdown(false)}
        onKeyDown={handleKey}
        ref={inputRef}
      />
      {openDropdown && (
        <div className='dropdown'>
          {availableOptions.length > 0 ?
            <div data-testid={`dropdown-container`}>
              {availableOptions.map(({ label, value }, index) => (
                <div
                  key={label}
                  data-testid={`dropdown-option-${value}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelection(label);
                  }}
                  className={`dropdown-option ${index === highlightIndex ? 'highlighted' : ''}`}>{label}
                </div>
              )
              )
              }
            </div> :
            <div className='no-options '>No options</div>
          }
        </div>
      )}

      {/* TODO: Render dropdown options */}
    </div>
  );
}
