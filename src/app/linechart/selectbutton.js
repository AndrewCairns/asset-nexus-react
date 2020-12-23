import React, { useState } from "react";

let dataBranch = "All";

function SelectButton({ ChartData, dataSelection, passTextUp, colorRange }) {
  let buttonItems = [];

  const [selectedItemState, setSelected] = useState({});

  if (dataSelection.length > 0) {
    dataBranch = dataSelection;
  } else {
    dataBranch = "All";
  }

  ChartData[0][dataBranch].map((displayGroupItems) => {
    return buttonItems.push(displayGroupItems);
  });

  function selectItem(el) {
    var selected = selectedItemState;
    selected[el.target.name] = !selected[el.target.name];

    setSelected((prevState) => ({
      ...prevState,
      [el.target.name]: selected[el.target.name],
    }));

    ChartData[0][dataBranch].map((displayGroupItems) => {
      if (
        displayGroupItems.key === el.target.name &&
        selected[el.target.name] === true
      ) {
        return (displayGroupItems.hidden = true);
      } else if (
        displayGroupItems.hidden === true &&
        displayGroupItems.key !== el.target.name
      ) {
        return (displayGroupItems.hidden = true);
      } else {
        return (displayGroupItems.hidden = false);
      }
    });

    passTextUp(selectedItemState);
  }

  function RenderItem(el, i) {
    var className = selectedItemState[el.key] ? "active" : "inactive";

    return (
      <button
        name={el.key}
        key={i}
        className={`selectButton ${className}`}
        onClick={(el) => selectItem(el)}
        style={{ borderLeft: "4px solid " + colorRange[i] }}
      >
        <span>{el.key}</span>
        <span className="currentValue">
          £{el.values[el.values.length - 1].value}k
        </span>
      </button>
    );
  }

  return <div>{buttonItems.map(RenderItem)}</div>;
}

export default SelectButton;
