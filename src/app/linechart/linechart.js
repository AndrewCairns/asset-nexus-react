import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function LineChart({ ChartData, dataSelection }) {
  const d3Container = useRef(null);

  useEffect(() => {
    d3.select("#linechart").selectAll("*").remove();

    //Chart Config
    const margin = { top: 0, right: 100, bottom: 0, left: 0 };
    const width = 1124 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const parse = d3.timeParse("%m/%d/%Y");
    // colorsArray = ["#7400b8", "#5e60ce", "#48bfe3", "#64dfdf", "#80ffdb"]
    // colorsArray = ["red", "green", "blue"]
    const colorsArray = ["#2E5BFF", "#8C54FF"];
    // colorsOrg = d3.scaleOrdinal(d3.schemeCategory10);
    // colorsFull = d3.scaleOrdinal(["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"]);
    const colors = d3.scaleOrdinal(colorsArray);

    const Ydomain = [];
    const Xdomain = [];
    const representedValues = [];
    const t = d3.transition().duration(750).ease(d3.easeLinear);

    // Data
    let dataGroup = "Assets";
    let dataBranch = "Property";

    const margin2 = { top: 380, right: 150, bottom: 0, left: 30 };
    const height2 = 100;

    const area = d3
      .area()
      .curve(d3.curveLinear)
      .x((d) => xScale2(parse(d.date)))
      .y0(height2)
      .y1((d) => yScale2(d.value));

    if (dataSelection.length > 0) {
      let displayPath = dataSelection.split("/");
      dataGroup = displayPath[0];
      dataBranch = displayPath[1];
    } else {
      dataGroup = "Assets";
      dataBranch = "Property";
    }

    // Domain scale function - TODO
    ChartData[dataGroup][0][dataBranch].map((displayGroupItems, i) => {
      displayGroupItems.color = colors(i);
      return displayGroupItems.values.forEach((displayGroupItemValues) => {
        Ydomain.push(displayGroupItemValues.value);
        Xdomain.push(parse(displayGroupItemValues.date));
        displayGroupItemValues.color = colors(i);
        displayGroupItemValues.hidden = displayGroupItems.hidden;
        displayGroupItemValues.name = displayGroupItems.key;
        return representedValues.push(displayGroupItemValues);
      });
    });

    const svg = d3
      .select("#linechart")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 " + 1024 + " " + 768)
      .append("g")
      .attr("class", "lines")
      .attr("transform", "translate(" + 30 + ", " + margin.top + ")");

    const xScale = d3
      .scaleTime()
      .range([30, width - margin.left])
      .domain(d3.extent(Xdomain));

    const yScale = d3
      .scaleLinear()
      .range([height - 20, 20])
      .domain(d3.extent(Ydomain))
      .nice();

    const xAxis = svg
      .append("g")
      .attr("class", "xaxis axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    const yAxis = svg
      .append("g")
      .attr("class", "yaxis axis")
      .attr("transform", "translate(30,0)")
      .call(d3.axisLeft(yScale));

    const xAxis2 = svg
      .append("g")
      .attr("class", "xaxis2 axis")
      .attr("transform", "translate(0," + (margin2.top + height2) + ")")
      .call(d3.axisBottom(xScale));

    // AXIS Labels
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 30)
      .attr("y", height2 + margin2.top + 45)
      .text("Full Date Range (year)");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 30)
      .attr("y", height + 45)
      .text("Date (day/month/year)");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", -20)
      .attr("y", -25)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Value (£/k)");

    const contextlineGroups = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + 0 + "," + margin2.top + ")");

    var context = contextlineGroups.selectAll("g");

    const chartLegend = d3.select("#linechart g.lines").append("g");

    chartLegend
      .append("line")
      .attr("x1", width - 290)
      .attr("y1", 28)
      .attr("x2", width - 250)
      .attr("y2", 28)
      .attr("stroke", "#8097B1")
      .attr("stroke-width", "2px")
      .style("fill", "none");
    chartLegend
      .append("text")
      .attr("x", width - 245)
      .attr("y", 32)
      .text("Validated")
      .style("fill", "#8097B1");

    chartLegend
      .append("line")
      .attr("x1", width - 160)
      .attr("y1", 28)
      .attr("x2", width - 120)
      .attr("y2", 28)
      .attr("stroke", "#8097B1")
      .attr("stroke-width", "2px")
      .style("stroke-dasharray", "8,8")
      .style("fill", "none");
    chartLegend
      .append("text")
      .attr("x", width - 115)
      .attr("y", 32)
      .text("Unvalidated")
      .style("fill", "#8097B1");

    d3.select("#linechart g.yaxis").transition(100).call(d3.axisLeft(yScale));
    d3.select("#linechart g.xaxis").call(d3.axisBottom(xScale));

    d3.select("#linechart g.lines").selectAll(".grid").remove(); // clears grid when updating data ??

    const gridHorizontal = d3
      .select("#linechart g.lines")
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .style("stroke-dasharray", "5,5")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(10)
          .tickSize(-height + 20)
          .tickFormat("")
      );
    gridHorizontal
      .selectAll("line")
      .attr("stroke", "#8097B1")
      .attr("opacity", 0.3);

    const gridVertical = d3
      .select("#linechart g.lines")
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(30,0)")
      .style("stroke-dasharray", "5,5")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(4)
          .tickSize(-width + 40)
          .tickFormat("")
      );

    gridVertical
      .selectAll("line, path")
      .attr("stroke", "#8097B1")
      .attr("opacity", 0.3);

    var lineWithDefinedTrue = d3
      .line()
      .curve(d3.curveLinear)
      .x((d) => xScale(parse(d.date)))
      .y((d) => yScale(d.value));

    var areaWithDefinedTrue = d3
      .area()
      .curve(d3.curveLinear)
      .x((d) => xScale(parse(d.date)))
      .y0(height)
      .y1((d) => yScale(d.value));

    var valuePaths = d3.select("#linechart g.lines").selectAll(".lineElements");

    valuePaths.data(ChartData[dataGroup][0][dataBranch]).join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "lineElements")
          .attr("fill", "none")
          .attr("d", (d) => {
            lineWithDefinedTrue(d.values);
          })
          .attr("opacity", (d) => {
            return d.hidden === true ? 0.1 : 1;
          })
          .style("clip-path", "url(#clip)") //<-- apply clipping
          .attr("filter", "url(#dropshadow)")
          .attr("stroke", (d, i) => colors(i))
          .attr("stroke-width", "2px")
          .style("stroke-dasharray", "5,5")
          .call((enter) => enter.transition(t)),
      (update) =>
        update
          .attr("stroke", (d, i) => colors(i))
          .attr("d", (d) => lineWithDefinedTrue(d.values))
          .call((update) => update.transition(t)),
      (exit) => exit.call((exit) => exit.transition(t)).remove()
    );

    // var valueAreas = d3.select("#linechart g.lines").selectAll(".AreaElements");
    // valueAreas.data(ChartData[dataGroup][0][dataBranch]).join(
    //   (enter) =>
    //     enter
    //       .append("path")
    //       .attr("class", "AreaElements")
    //       .attr("fill", (d, i) => colors(i))
    //       .attr("d", (d) => areaWithDefinedTrue(d.values))
    //       .attr("opacity", (d) => {
    //         return d.opacity === 1 ? 0.2 : 0;
    //       })
    //       .style("clip-path", "url(#clip)") //<-- apply clipping
    //       .attr("stroke", (d, i) => colors(i))
    //       .call((enter) => enter.transition(t)),
    //   (update) =>
    //     update
    //       .attr("stroke", (d, i) => colors(i))
    //       .attr("opacity", (d) => {
    //         return d.opacity === 1 ? 0.2 : 0;
    //       })
    //       .attr("d", (d) => areaWithDefinedTrue(d.values))
    //       .call((update) => update.transition(t)),
    //   (exit) => exit.call((exit) => exit.transition(t)).remove()
    // );

    var valuePointLines = d3
      .select("#linechart g.lines")
      .selectAll(".valuePointLines");

    valuePointLines.data(representedValues).join(
      (enter) =>
        enter
          .append("line")
          .attr("class", "valuePointLines")
          .style("clip-path", "url(#clip)") //<-- apply clipping
          .attr("fill", "none")
          .style("opacity", (d) => {
            return d.hidden === true ? 0.1 : 1;
          })
          .attr("filter", "url(#dropshadow)")
          .attr("stroke", (d, i) => d.color)
          .style("stroke-width", 1.5)
          .attr("x1", (d) => {
            return xScale(parse(d.date));
          })
          .attr("y1", 0)
          .attr("x2", (d) => {
            return xScale(parse(d.date));
          })
          .attr("y2", (d) => {
            return yScale(d.value);
          })
          .call((enter) => enter.transition(t)),
      (update) => update.call((update) => update.transition(t)),
      (exit) => exit.call((exit) => exit.transition(t)).remove()
    );

    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip-donut")
      .style("opacity", 0);

    var valuePoints = d3.select("#linechart g.lines").selectAll(".points");

    valuePoints.data(representedValues).join(
      (enter) =>
        enter
          .append("circle")
          .attr("class", "points")
          .style("clip-path", "url(#clipForPoints)") //<-- apply clipping
          .style("fill", (d, i) => {
            return d.verified === true ? d.color : "#fff8ee";
          })
          .style("opacity", (d) => {
            return d.hidden === true ? 0.1 : 1;
          })
          .style("stroke", (d, i) => d.color) // set the line colour
          .style("stroke-width", (d, i) => {
            return d.verified === true ? 3.5 : 4.5;
          })
          .style("r", (d, i) => {
            return d.verified === true ? 4 : 6;
          })
          .attr("cx", (d) => {
            return xScale(parse(d.date));
          })
          .attr("cy", (d) => {
            return yScale(d.value);
          })
          .on("mouseover", function (d, i) {
            div.transition().duration(50).style("opacity", 1);

            let tipValue =
              "<strong>Name</strong>: " +
              d.name +
              "<br /><strong>Value</strong>: " +
              d.value +
              "<br/> Date: " +
              d.date +
              "<br /> Verified: <em>" +
              d.verified +
              "</em>";

            div
              .html(tipValue)
              .style("left", d3.event.pageX + 10 + "px")
              .style("top", d3.event.pageY - 15 + "px");
          })
          .on("mouseout", function (d, i) {
            div.transition().duration("50").style("opacity", 0);
          })
          .call((enter) => enter.transition(t)),
      (update) =>
        update
          .attr("cx", (d) => {
            return xScale(parse(d.date));
          })
          .attr("cy", (d) => {
            return yScale(d.value);
          })
          .call((update) => update.transition(t)),
      (exit) => exit.call((exit) => exit.transition(t)).remove()
    );

    const xScale2 = d3
      .scaleTime()
      .range([30, width - margin.left])
      .domain(d3.extent(Xdomain));

    const yScale2 = d3
      .scaleLinear()
      .range([height2 - 20, 20])
      .domain(d3.extent(Ydomain));

    context.data(ChartData[dataGroup][0][dataBranch]).join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "lineElementsContext")
          .attr("fill", () => {
            var mid = colorsArray.length / 2;
            return colorsArray[Math.round(mid) - 1];
          })
          .attr("opacity", "0.2")
          .attr("d", (d) => area(d.values))
          .call((enter) => enter.transition(t)),
      (update) =>
        update
          .attr("opacity", "0.2")
          .call((update) =>
            update.transition(t).attr("d", (d) => area(d.values))
          ),
      (exit) => exit.call((exit) => exit.transition(t)).remove()
    );

    var brush = d3
      .brushX()
      .extent([
        [30, 0],
        [width - 20, height2],
      ])
      .on("brush end", brushed.bind(this));

    var context2 = d3.select("#linechart g.context");

    d3.select("#linechart")
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width - 40)
      .attr("height", height)
      .attr("transform", "translate(30,0)");

    d3.select("#linechart")
      .append("defs")
      .append("clipPath")
      .attr("id", "clipForPoints")
      .append("rect")
      .attr("width", width - 40)
      .attr("height", height)
      .attr("transform", "translate(22,0)");

    d3.select("#linechart .brush").remove(); // clears brush scrolling element

    context2
      .append("g")
      .attr("class", "brush")
      .attr("width", 100)
      .call(brush)
      .call(brush.move, [
        (xScale2.range()[1] / 5) * 2,
        (xScale2.range()[1] / 5) * 3,
      ]);

    function brushed() {
      let extent = d3.event.selection;
      let xsDomain = extent.map(xScale2.invert, xScale2);
      xScale.domain(xsDomain);

      d3.select("#linechart g.lines")
        .selectAll(".points")
        .attr("cx", (d) => {
          return xScale(parse(d.date));
        })
        .attr("cy", (d) => {
          return yScale(d.value);
        })
        .style("fill", (d, i) => {
          return d.verified === false ? d.color : "#fff8ee";
        })
        .attr("opacity", "1")
        .style("stroke", (d, i) => d.color) // set the line colour
        .style("stroke-width", (d, i) => {
          return d.verified === false ? 3.5 : 4.5;
        })
        .style("r", (d, i) => {
          return d.verified === false ? 4 : 6;
        });

      d3.select("#linechart g.lines")
        .selectAll(".valuePointLines")
        .attr("x1", (d) => {
          return xScale(parse(d.date));
        })
        .attr("y1", (d) => {
          return yScale(d.value);
        })
        .attr("x2", (d) => {
          return xScale(parse(d.date));
        })
        .attr("y2", height);

      d3.select("#linechart g.lines")
        .selectAll(".AreaElements")
        .attr("d", (d) => areaWithDefinedTrue(d.values));
      d3.select("#linechart g.lines")
        .selectAll(".lineElements")
        .attr("d", (d) => lineWithDefinedTrue(d.values));
      // d3.select("#linechart g.lines").selectAll(".lineElementsDashed").attr("d", d => lineWithDefinedFalse(d.values))
      d3.select(".xaxis").call(d3.axisBottom(xScale));
    }
  });

  return (
    <div className="elements">
      <svg
        id="linechart"
        className="d3-component"
        width={400}
        height={200}
        ref={d3Container}
      />
    </div>
  );
}

export default LineChart;
