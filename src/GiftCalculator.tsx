// GiftCalculator.tsx

import React, { useState, useEffect } from "react";
import { calculateGiftAmount, params, Relationship, Event } from "./giftUtils";

const GiftCalculator: React.FC = () => {
  const [selectedParams, setSelectedParams] = useState<
    (Relationship | Event)[]
  >([Relationship.TeamMate, Event.Birthday]);
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    calculateAmount();
  }, [selectedParams]);

  const calculateAmount = () => {
    const totalAmount = calculateGiftAmount(
      selectedParams[0],
      selectedParams[1]
    );
    setAmount(totalAmount);
  };

  const renderButtons = (
    options: (Relationship | Event)[],
    selectedOption: Relationship | Event,
    onOptionSelect: (option: Relationship | Event) => void
  ) => {
    return options.map((option) => (
      <button
        key={option}
        style={selectedOption === option ? chosenButtonStyle : buttonStyle}
        onClick={() => onOptionSelect(option)}
      >
        {option}
      </button>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        maxWidth: "400px",
        margin: "0 auto"
      }}
    >
      <h2>Gift Calculator</h2>
      {params.map((paramObject, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "20px"
          }}
        >
          <p>Select {paramObject.name}:</p>
          {renderButtons(
            Object.values(paramObject.enum),
            selectedParams[index],
            (option: Relationship | Event) => {
              const newSelectedParams = [...selectedParams];
              newSelectedParams[index] = option;
              setSelectedParams(newSelectedParams);
            }
          )}
        </div>
      ))}
      {amount !== null && (
        <p style={resultStyle}>Amount to give as a present: ${amount}</p>
      )}
    </div>
  );
};

// Styles
const buttonStyle: React.CSSProperties = {
  margin: "5px",
  padding: "10px 20px",
  fontSize: "14px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
  transition: "background-color 0.3s"
};

const chosenButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#3498db",
  color: "white"
};

const resultStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginTop: "20px"
};

export default GiftCalculator;
