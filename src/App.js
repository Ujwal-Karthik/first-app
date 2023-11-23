import React, { useState, useEffect } from "react";

function App({ totalPoints }) {
  const maxAttribute = totalPoints === 1 ? 1 : Math.floor(0.7 * totalPoints);

  const [remainingPoints, setRemainingPoints] = useState(totalPoints);

  const [healthPoints, setHealthPoints] = useState(0);
  const [staminaPoints, setStaminaPoints] = useState(0);
  const [speedPoints, setSpeedPoints] = useState(0);

  const handleSliderChange = (value, setAttribute) => {
    const availablePoints = Math.max(
      totalPoints - (healthPoints + staminaPoints + speedPoints),
      0
    );
    const clampedValue = Math.min(value, maxAttribute, availablePoints);
   // console.log(clampedValue, availablePoints, value);
    setAttribute(clampedValue);
  };

  useEffect(() => {
    // Calculate the used points based on the current state of sliders
    const usedPoints = healthPoints + staminaPoints + speedPoints;
    // Calculate the remaining points considering the total points available
    setRemainingPoints(() => Math.max(totalPoints - usedPoints, 0));
  }, [totalPoints, healthPoints, staminaPoints, speedPoints]);

  return (
    <div>
      Character stats: <span id="points">{remainingPoints}</span> points left.
      <div>
        <input
          type="range"
          id="health"
          min={0}
          max={totalPoints}
          value={healthPoints}
          step={1}
          onChange={(e) => handleSliderChange(+e.target.value, setHealthPoints)}
        />
        Health
        <p>{healthPoints}</p>
      </div>
      <div>
        <input
          type="range"
          id="stamina"
          min={0}
          max={totalPoints}
          value={staminaPoints}
          step={1}
          onChange={(e) =>
            handleSliderChange(+e.target.value, setStaminaPoints)
          }
        />
        Stamina
        <p>{staminaPoints}</p>
      </div>
      <div>
        <input
          type="range"
          id="speed"
          min={0}
          max={totalPoints}
          value={speedPoints}
          step={1}
          onChange={(e) => handleSliderChange(+e.target.value, setSpeedPoints)}
        />
        Speed
        <p>{speedPoints}</p>
      </div>
    </div>
  );
}

export default App;
