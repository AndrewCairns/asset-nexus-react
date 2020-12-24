import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function LineChartNPV({ ChartData, colorRange }) {
  const d3Container = useRef(null);

  useEffect(() => {
    d3.select("#linechart").selectAll("*").remove();

    //Chart Config
    const margin = { top: 30, right: 100, bottom: 30, left: 51 };
    const width = 1124 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const parse = d3.timeParse("%d/%m/%Y");

    const Ydomain = [];
    const Xdomain = [];
    const t = d3.transition().duration(750).ease(d3.easeLinear);

    var formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "GBP",
    });

    const margin2 = {
      top: height + margin.top + margin.bottom,
      right: 150,
      bottom: 0,
      left: 30,
    };
    const height2 = 100;

    Ydomain.push(ChartData[0].NPV[0].value);
    Xdomain.push(parse(ChartData[0].NPV[0].date));

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

    let yScaleDivergingNegative;
    let yScaleDivergingPositive;
    if (d3.max(Ydomain) >= 0) {
      yScaleDivergingNegative = -d3.max(Ydomain) * 1.5;
      yScaleDivergingPositive = d3.max(Ydomain) * 1.5;
    } else {
      yScaleDivergingNegative = d3.max(Ydomain) * 1.5;
      yScaleDivergingPositive = -d3.max(Ydomain) * 1.5;
    }

    const yScale = d3
      .scaleLinear()
      .range([height, 20])
      .domain([yScaleDivergingNegative, yScaleDivergingPositive])
      .nice();

    const xAxisLine = svg
      .append("g")
      .attr("class", "xaxisLine axis")
      .attr("transform", "translate(0,0)");

    xAxisLine
      .append("line")
      .style("stroke", "#8097B1")
      .attr("fill", "none")
      .style("stroke-width", 1.5)
      .attr("opacity", 0.5)
      .attr("x1", margin.left)
      .attr("y1", height / 2 + 10)
      .attr("x2", width - margin.left)
      .attr("y2", height / 2 + 10);

    //Grid and ticks
    const yAxisGrid = svg
      .append("g")
      .attr("class", "yaxisGrid axis")
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
      .attr("transform", "translate(" + 0 + "," + margin2.top + ")");

    contextlineGroups.attr("class", "context contextNPV");

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

    var valuePointLines = d3
      .select("#linechart g.lines")
      .selectAll(".valuePointLines");

    valuePointLines.data(ChartData[0].NPV).join(
      (enter) =>
        enter
          .append("line")
          .attr("class", "valuePointLines")
          .style("clip-path", "url(#clip)") //<-- apply clipping
          .attr("fill", "none")
          .style("stroke", (d, i) => {
            return d.value >= 0 ? "#2075d3" : "#a84c85";
          }) // set the line colour
          .style("stroke-width", 2.5)
          .attr("x1", (d) => {
            return xScale(parse(d.date));
          })
          .attr("y1", height / 2 + 10)
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

    valuePoints.data(ChartData[0].NPV).join(
      (enter) =>
        enter
          .append("circle")
          .attr("class", "points")
          .style("clip-path", "url(#clipForPoints)") //<-- apply clipping
          .style("fill", (d, i) => {
            return d.value >= 0 ? "#2075d3" : "#a84c85";
          }) // set the line colour
          .style("opacity", (d) => {
            return d.hidden === true ? 0.1 : 1;
          })
          .style("stroke", (d, i) => {
            return d.value >= 0 ? "#2075d3" : "#a84c85";
          }) // set the line colour
          .style("r", 6)
          .attr("cx", (d) => {
            return xScale(parse(d.date));
          })
          .attr("cy", (d) => {
            return yScale(d.value);
          })
          .on("mouseover", function (d, i) {
            div.transition().duration(50).style("opacity", 1);

            let tipValue =
              "<strong> Net Present Value </strong><br/>" +
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
        .style("r", 10);

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
        .attr("y2", height / 2 + 10);

      xAxisLine.call(
        d3
          .axisBottom(xScale)
          .ticks(12)
          .tickSize(height / 2 + 20)
          .tickFormat(d3.timeFormat("%d/%m/%Y"))
      );
      yAxisGrid.call(d3.axisLeft(yScale).tickSize(-width + 50));
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

export default LineChartNPV;
