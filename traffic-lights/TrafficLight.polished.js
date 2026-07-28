import { useEffect, useState } from 'react';
import "./styles.css";

const TRANSITIONS = {
  Red: { next: 'Yellow', delay: 3000 },
  Yellow: { next: 'Green', delay: 1000 },
  Green: { next: 'Red', delay: 2000 },
};

const TrafficLight = () => {
  const [activeColor, setActiveColor] = useState('Red');

  useEffect(() => {
    const { next, delay } = TRANSITIONS[activeColor];
    const timerId = setTimeout(setActiveColor, delay, next);
    return () => clearTimeout(timerId);
  }, [activeColor]);

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
