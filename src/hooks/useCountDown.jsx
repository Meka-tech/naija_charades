import {useEffect, useState} from 'react';

export const useCountDown = ({number, beginTimer}) => {
  const [currentNumber, setCurrentNumber] = useState(number);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    if (currentNumber >= 0 && beginTimer) {
      setTimeout(() => setCurrentNumber(currentNumber - 1), 1000);
    }
    if (currentNumber === 0) {
      setTimerDone(true);
    }
  }, [currentNumber, timerDone, beginTimer]);

  return {currentNumber, timerDone};
};
