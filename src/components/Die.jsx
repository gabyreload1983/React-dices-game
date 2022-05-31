import React from "react";

const Die = (props) => {
  const { value, isHeld, holdDice } = props;
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <div onClick={holdDice} style={styles} className="die">
      {value}
    </div>
  );
};

export default Die;
