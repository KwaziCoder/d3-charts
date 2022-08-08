import React, { useEffect, useRef, useState } from "react";
import classes from "./BarChart.module.css";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand, mouse } from "d3";
import Tooltip from "@mui/material/Tooltip";

const chartdata = [
  { year: 2019, sales: 12342 },
  { year: 2020, sales: 41323 },
  { year: 2021, sales: 32143 },
  { year: 2022, sales: 76573 },
];

const BarChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([...chartdata]);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 900])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 100000]).range([450, 0]);

    const colorScale = scaleLinear()
      .domain([0, 50000, 100000])
      .range(["green", "yellow", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).tickFormat((index) => data[index].year);
    svg.select(".x-axis").style("transform", "translateY(450px)").call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

  

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("transform", "scale(1, -1)")
      .attr("x", (_, index) => xScale(index))
      .attr("y", -450)
      .attr("width", xScale.bandwidth())
      
      .transition()
      .attr("height", (value) => 450 - yScale(value.sales))
      .attr("fill", (value) => colorScale(value.sales));
  }, []);
  return (
    <div className={classes.chart}>
      <svg className={classes.svgContainer} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;
