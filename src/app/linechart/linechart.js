import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function LineChart({ ChartData, dataSelection, colorRange }) {
  const d3Container = useRef(null);

  useEffect(() => {
    d3.select("#linechart").selectAll("*").remove();

    //Chart Config
    const margin = { top: 30, right: 100, bottom: 30, left: 51 };
    const width = 1124 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const parse = d3.timeParse("%d/%m/%Y");
    // colorsArray = ["#7400b8", "#5e60ce", "#48bfe3", "#64dfdf", "#80ffdb"]
    // colorsArray = ["red", "green", "blue"]
    const colorsArray = colorRange;
    // colorsOrg = d3.scaleOrdinal(d3.schemeCategory10);
    // colorsFull = d3.scaleOrdinal(["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"]);
    const colors = d3.scaleOrdinal(colorsArray);

    const Ydomain = [];
    const Xdomain = [];
    const representedValues = [];
    const t = d3.transition().duration(750).ease(d3.easeLinear);

    var formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "GBP",

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    // Data
    let dataBranch = "All";

    const margin2 = {
      top: height + margin.top + margin.bottom,
      right: 150,
      bottom: 0,
      left: 30,
    };
    const height2 = 100;

    const area = d3
      .area()
      .curve(d3.curveLinear)
      .x((d) => xScale2(parse(d.date)))
      .y0(height2)
      .y1((d) => yScale2(d.value));

    if (dataSelection.length > 0) {
      dataBranch = dataSelection;
    } else {
      dataBranch = "All";
    }

    // Domain scale function - TODO
    ChartData[0][dataBranch].map((displayGroupItems, i) => {
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
      .attr("transform", "translate(" + 35 + ", " + margin.top + ")");

    const xScale = d3
      .scaleTime()
      .range([margin.left, width])
      .domain(d3.extent(Xdomain));

    const yScale = d3
      .scaleLinear()
      .range([height, 20])
      .domain([0, d3.max(Ydomain)])
      .nice();

    const xAxis = svg
      .append("g")
      .attr("class", "xaxis axis")
      .attr("transform", "translate(0," + (10 + height) + ")")
      .style("stroke-dasharray", "5,5")
      .style("stroke", "#8097B1");

    const yAxis = svg
      .append("g")
      .attr("class", "yaxis axis")
      .attr("transform", "translate(" + margin.left + ",0)")
      .style("stroke-dasharray", "5,5")
      .style("stroke", "#8097B1");

    const xAxis2 = svg
      .append("g")
      .attr("class", "xaxis2 axis")
      .attr("transform", "translate(0," + (margin2.top + height2) + ")");

    xAxis2.call(d3.axisBottom(xScale).ticks(0));

    // AXIS Labels
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 30)
      .attr("y", height2 + margin2.top + 45)
      .style("fill", "#8097B1")
      .text("Full Date Range (year)");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 30)
      .attr("y", height + 45)
      .style("fill", "#8097B1")
      .text("Date (day/month/year)");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", -15)
      .attr("y", -35)
      .attr("dy", ".75em")
      .style("fill", "#8097B1")
      .attr("transform", "rotate(-90)")
      .text("Value (£/k)");

    const contextlineGroups = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + 0 + "," + margin2.top + ")");

    var context = contextlineGroups.selectAll("g");

    const chartLegend = d3.select("#linechart g.lines").append("g");

    chartLegend
      .append("circle")
      .style("fill", "#8097B1")
      .style("stroke", "#8097B1")
      .style("stroke-width", 4)
      .style("r", 6)
      .attr("cx", width - 140)
      .attr("cy", 0);

    chartLegend
      .append("text")
      .attr("x", width - 245)
      .attr("y", 5)
      .text("Validated")
      .style("fill", "#8097B1");

    chartLegend
      .append("circle")
      .style("fill", "#fff")
      .style("stroke", "#8097B1")
      .style("stroke-width", 4)
      .style("r", 6)
      .attr("cx", width - 260)
      .attr("cy", 0);

    chartLegend
      .append("text")
      .attr("x", width - 115)
      .attr("y", 5)
      .text("Unvalidated")
      .style("fill", "#8097B1");

    d3.select("#linechart g.lines").selectAll(".grid").remove(); // clears grid when updating data ??

    var lineWithDefinedTrue = d3
      .line()
      .curve(d3.curveLinear)
      .x((d) => xScale(parse(d.date)))
      .y((d) => yScale(d.value));

    var lineWithDefinedFalse = d3
      .line()
      .curve(d3.curveLinear)
      .x((d) => xScale(parse(d.date)))
      .y((d) => yScale(d.value))
      .defined((d, i) => {
        return d.verified === true;
      });

    var areaWithDefinedTrue = d3
      .area()
      .curve(d3.curveLinear)
      .x((d) => xScale(parse(d.date)))
      .y0(height)
      .y1((d) => yScale(d.value));

    var valuePaths = d3.select("#linechart g.lines").selectAll(".lineElements");
    valuePaths.data(ChartData[0][dataBranch]).join(
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

    var valuePathDashed = d3
      .select("#linechart g.lines")
      .selectAll(".lineElementsDashed");
    valuePathDashed.data(ChartData[0][dataBranch]).join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "lineElementsDashed")
          .attr("fill", "none")
          .attr("d", (d) => {
            lineWithDefinedFalse(d.values);
          })
          .attr("opacity", (d) => {
            return d.hidden === true ? 0.1 : 1;
          })
          .style("clip-path", "url(#clip)") //<-- apply clipping
          .attr("stroke", (d, i) => colors(i))
          .attr("stroke-width", "2px")
          .call((enter) => enter.transition(t)),
      (update) =>
        update
          .attr("stroke", (d, i) => colors(i))
          .attr("d", (d) => lineWithDefinedFalse(d.values))
          .call((update) => update.transition(t)),
      (exit) => exit.call((exit) => exit.transition(t)).remove()
    );

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
            return d.verified === false || d.hidden === true ? 0 : 1;
          })
          .attr("stroke", (d, i) => d.color)
          .style("stroke-width", 2.5)
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
              "<strong>Provider name:</strong><br/>" +
              d.name +
              "<br /><strong>Value provided:</strong> <br />" +
              formatter.format(d.value) +
              "<br/><br/> <em>" +
              d.date +
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
      .range([margin.left, width])
      .domain(d3.extent(Xdomain));

    const yScale2 = d3
      .scaleLinear()
      .range([height2 - 20, 20])
      .domain(d3.extent(Ydomain));

    context.data(ChartData[0][dataBranch]).join(
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
        [margin.left, 0],
        [width, height2],
      ])
      .on("brush end", brushed.bind(this));

    var context2 = d3.select("#linechart g.context");

    d3.select("#linechart")
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width + 20)
      .attr("height", height)
      .attr("transform", "translate(" + (margin.left - 10) + ",0)");

    d3.select("#linechart")
      .append("defs")
      .append("clipPath")
      .attr("id", "clipForPoints")
      .append("rect")
      .attr("width", width + 20)
      .attr("height", height)
      .attr("transform", "translate( " + (margin.left - 10) + ",0)");

    d3.select("#linechart .brush").remove(); // clears brush scrolling element

    context2
      .append("g")
      .attr("class", "brush")
      .attr("width", 100)
      .call(brush)
      .call(brush.move, [
        (xScale2.range()[1] / 100) * 0 + margin.left,
        (xScale2.range()[1] / 100) * 100,
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
          return d.verified === false ? 8.5 : 5.5;
        })
        .style("r", (d, i) => {
          return d.verified === false ? 4 : 10;
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
      d3.select("#linechart g.lines")
        .selectAll(".lineElementsDashed")
        .attr("d", (d) => lineWithDefinedFalse(d.values));

      yAxis.call(d3.axisLeft(yScale).tickSize(-width + 50));
      xAxis.call(
        d3
          .axisBottom(xScale)
          .ticks(12)
          .tickSize(-height + 20)
      );
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
