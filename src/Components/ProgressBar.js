import React from "react";
import "./ProgressBar.css"; // Add styles for the progress bar

const ProgressBar = ({ savingsAmount, goalAmount }) => {
  // Calculate the progress percentage
  const progress = (savingsAmount / goalAmount) * 100;

  // Determine the color based on progress thresholds
  let barColor;
  if (progress <= 30) {
    barColor = "#ff4d4d"; // Red for 0-30%
  } else if (progress <= 60) {
    barColor = "#ffa64d"; // Orange for 30-60%
  } else {
    barColor = "#4dff4d"; // Green for 60-100%
  }

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`, // Set the width based on progress
          backgroundColor: barColor, // Set the color based on thresholds
        }}
      ></div>
      <div className="progress-text">{`${progress.toFixed(2)}%`}</div>
    </div>
  );
};

export default ProgressBar;