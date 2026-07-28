import { useEffect, useState } from 'react';
import "./styles.css";

const TrafficLight = () => {
  const [activeColor, setActiveColor] = useState('Red')

  useEffect(() => {
    let color = ''
    let delay = 1000
    let timerID

    if (activeColor === 'Red') {
      color = 'Yellow'
      delay = 3000
      timerID = setTimeout(setActiveColor, delay, color)
    }
    if (activeColor === 'Yellow') {
      color = 'Green'
      delay = 1000
      timerID = setTimeout(setActiveColor, delay, color)
    }
    if (activeColor === 'Green') {
      color = 'Red'
      delay = 2000
      timerID = setTimeout(setActiveColor, delay, color)
    }

    return () => { clearTimeout(timerID) }
  }, [activeColor])
  return (
    <div>
      <h2 data-testid="title">Traffic Lights</h2>
      <div
        className="traffic-light"
        id="traffic-light"
        data-testid="traffic-light"
      >
        <div
          id="red-light"
          data-testid="red-light"
          className={`circle ${activeColor === 'Red' ? 'red-on' : ''}`}
        ></div>
        <div
          id="yellow-light"
          data-testid="yellow-light"
          className={`circle ${activeColor === 'Yellow' ? 'yellow-on' : ''}`}
        ></div>
        <div
          id="green-light"
          data-testid="green-light"
          className={`circle ${activeColor === 'Green' ? 'green-on' : ''}`}
        ></div>
      </div>
    </div>
  );
};

export default TrafficLight;
