import React, { useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import * as d3 from "d3";

function Sunburst({ ChartData, colorsArray }) {
  useEffect(() => {
    const width = 1024;
    const radius = width / 6;
    // const colorsArray = ["#5e60ce", "#48bfe3", "#64dfdf"];
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const color = d3
      .scaleOrdinal()
      .domain([0, ChartData + 1])
      .range(colorsArray);

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.02))
      .padRadius(radius * 1.5)
      .innerRadius((d) => d.y0 * radius)
      .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 5));

    const partition = (data) => {
      const root = d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);
      return d3.partition().size([2 * Math.PI, root.height + 1])(root);
    };

    function getBrightness(color) {
      var rgb = d3.rgb(color);
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    }

    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          x = text.attr("x"),
          y = text.attr("y"),
          dy = 0, //parseFloat(text.attr("dy")),
          tspan = text
            .text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", dy + "em");
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", 20)
              .text(word);
          }
        }
      });
    }
    function chart() {
      const root = partition(ChartData);

      root.each((d) => {
        d.current = d;
      });

      const svg = d3
        .select("#sunburst")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + 1024 + " " + 1024)
        .style("font", "10px sans-serif");

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2} ,${width / 2})`);

      const innerTitleLine1 = g
        .append("text")
        .data(root.ancestors())
        .attr("text-anchor", "middle")
        .style("font-size", "3em")
        .style("font-weight", "600")
        .attr("dy", "-0.55em")
        .attr("fill", colorsArray[0])
        .attr("fill-opacity", 1)
        .text((d) => `${d.data.name}`);

      const innerTitleLine2 = g
        .append("text")
        .data(root.ancestors())
        .attr("text-anchor", "middle")
        .style("font-size", "4em")
        .style("font-weight", "600")
        .attr("dy", "0.75em")
        .attr("fill", colorsArray[0])
        .attr("fill-opacity", 1)
        .text((d) => `${formatter.format(d.value)}`);

      const path = g
        .append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", (d) => {
          while (d.depth > 1) d = d.parent;
          return color(d.data.name);
        })
        .attr("fill-opacity", (d) =>
          arcVisible(d.current) ? (d.children ? 1 : 0.6) : 0
        )
        .attr("d", (d) => arc(d.current));

      path
        .filter((d) => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);

      path.append("title").text(
        (d) =>
          `${d
            .ancestors()
            .map((d) => d.data.name)
            .reverse()
            .join("/")} \n ${formatter.format(d.value)}`
      );

      const label = g
        .append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .style("font-size", "1.8em")
        .style("font-weight", "600")
        .style("fill", (d) => {
          while (d.depth > 1) d = d.parent;
          return getBrightness(color(d.data.name)) < 125 ? "#fff" : "#000";
        })
        .attr("fill-opacity", (d) => +labelVisible(d.current))
        .attr("transform", (d) => labelTransform(d.current))
        .text((d) => {
          return d.data.value !== undefined && d.data.date !== undefined
            ? d.data.name +
                " " +
                formatter.format(d.data.value) +
                " " +
                d.data.date
            : d.data.value !== undefined
            ? d.data.name + " " + formatter.format(d.data.value)
            : d.data.name;
        })
        .call(wrap, 30); // wrap the text in <= 30 pixels

      const parent = g
        .append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

      let transitionTime = 500;

      function clicked(p) {
        parent.datum(p.parent || root);

        innerTitleLine1.text(`${p.data.name}`);
        innerTitleLine2
          .data(root.ancestors())
          .text((d) => `${formatter.format(p.value)}`);

        root.each(
          (d) =>
            (d.target = {
              x0:
                Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
                2 *
                Math.PI,
              x1:
                Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
                2 *
                Math.PI,
              y0: Math.max(0, d.y0 - p.depth),
              y1: Math.max(0, d.y1 - p.depth),
            })
        );

        const t = g.transition().duration(transitionTime);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path
          .transition(t)
          .tween("data", (d) => {
            const i = d3.interpolate(d.current, d.target);
            return (t) => (d.current = i(t));
          })
          .filter(function (d) {
            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
          })
          .attr("fill-opacity", (d) =>
            arcVisible(d.target) ? (d.children ? 1 : 0.6) : 0
          )
          .attrTween("d", (d) => () => arc(d.current));

        label
          .filter(function (d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
          })
          .transition(t)
          .attr("fill-opacity", (d) => +labelVisible(d.target))
          .attrTween("transform", (d) => () => labelTransform(d.current));
      }

      function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }

      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.2;
      }

      function labelTransform(d) {
        const x = (((d.x0 + d.x1) / 2) * 182) / Math.PI;
        const y = ((d.y0 + d.y1) / 2) * 170;
        return `rotate(${x - 90}) translate(${y},0) rotate(${
          x < 180 ? 0 : 180
        })`;
      }

      return svg.node();
    }
    chart();
  });

  return (
    <>
      <div className="sunburst-block">
        <div id="sunburst" className="sunburstChart"></div>
      </div>
    </>
  );
}

export default Sunburst;
