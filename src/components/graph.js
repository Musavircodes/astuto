import React, { useEffect } from "react";
import * as d3 from "d3";

const DonutChart = ({ data }) => {
  useEffect(() => {
    const svg = d3
      .select("#donut-chart")
      .append("svg")
      .attr("width", 900)
      .attr("height", 400);

    const width = 900;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(radius - 60)
      .outerRadius(radius - 40);

    const path = g
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "white");

    const polyline = g
      .selectAll("polyline")
      .data(pie(data))
      .enter()
      .append("polyline");

    polyline
      .attr("points", (d) => {
        const centroid = arc.centroid(d);
        const midAngle = Math.atan2(centroid[1], centroid[0]);
        const startX = centroid[0];
        const startY = centroid[1];
        const endX = Math.cos(midAngle) * (radius - 20);
        const endY = Math.sin(midAngle) * (radius - 20);
        return `${startX},${startY} ${endX},${endY}`;
      })
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    const text = g
      .selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("x", (d) => {
        const centroid = arc.centroid(d);
        const midAngle = Math.atan2(centroid[1], centroid[0]);
        const labelRadius = radius - 20;
        const labelX = Math.cos(midAngle) * labelRadius;
        return labelX > 0 ? labelX + 10 : labelX - 10; // Adjust labelX to the right or left based on the quadrant
      })
      .attr("y", (d) => {
        const centroid = arc.centroid(d);
        const midAngle = Math.atan2(centroid[1], centroid[0]);
        const labelRadius = radius - 20;
        const labelY = Math.sin(midAngle) * labelRadius;
        return labelY;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => {
        const centroid = arc.centroid(d);
        return centroid[0] > 0 ? "start" : "end"; // Adjust text-anchor based on the quadrant
      })
      .text((d) => d.data.label);

    return () => {
      svg.remove();
    };
  }, [data]);

  return <div id="donut-chart"></div>;
};

export default DonutChart;
