import React from "react";

function SelectBox({ ChartData, passChildData }) {
  const items = ChartData;

  function filter(e) {
    passChildData(e.target.value);
  }

  return (
    <>
      <select defaultValue={"DEFAULT"} onChange={(e) => filter(e)}>
        <option disabled value="DEFAULT">
          Please select an item
        </option>
        {Object.keys(items[0]).map((item2, j) => {
          return (
            <option key={j} value={item2}>
              {item2}
            </option>
          );
        })}
        ;
      </select>
    </>
  );
}

export default SelectBox;
