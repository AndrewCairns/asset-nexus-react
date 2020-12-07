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
        {Object.keys(items).map((item, i) => {
          return (
            <optgroup key={i} label={item}>
              {items[item].map((item2) => {
                return Object.keys(item2).map((item3, j) => {
                  return (
                    <option key={j} value={item + "/" + item3}>
                      {item3}
                    </option>
                  );
                });
              })}
            </optgroup>
          );
        })}
      </select>
    </>
  );
}

export default SelectBox;
