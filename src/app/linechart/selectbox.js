import { filter } from "d3";
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
                {
                  return Object.keys(item2).map((item3, j) => {
                    return (
                      <option key={j} value={item + "/" + item3}>
                        {item3}
                      </option>
                    );
                  });
                }
              })}
            </optgroup>
          );
        })}

        {/* <ng-container *ngFor="let item of this.items | keyvalue">
        <optgroup *ngFor="let item2 of item.value" label="{{item.key}}">
            <option *ngFor="let item3 of item2 | keyvalue" value='{{item.key}}/{{item3.key}}'> {{item3.key}}</option>
        </optgroup>
        </ng-container> */}
      </select>
    </>
  );
}

export default SelectBox;
