import React, { useState } from "react";

let dataGroup = "Assets";
let dataBranch = "Property";

function SelectButton({ ChartData, dataSelection, passTextUp }) {
  let buttonItems = [];

  const [selectedItemState, setSelected] = useState({});

  if (dataSelection.length > 0) {
    let displayPath = dataSelection.split("/");
    dataGroup = displayPath[0];
    dataBranch = displayPath[1];
  } else {
    dataGroup = "Assets";
    dataBranch = "Property";
  }

  ChartData[dataGroup][0][dataBranch].map((displayGroupItems) => {
    return buttonItems.push(displayGroupItems);
  });

  function selectItem(el) {
    var selected = selectedItemState;
    selected[el.target.name] = !selected[el.target.name];

    setSelected((prevState) => ({
      ...prevState,
      [el.target.name]: selected[el.target.name],
    }));

    ChartData[dataGroup][0][dataBranch].map((displayGroupItems) => {
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
