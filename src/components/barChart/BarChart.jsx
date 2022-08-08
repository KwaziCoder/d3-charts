import React, { useEffect, useRef, useState } from "react";
import classes from "./BarChart.module.css";
import {
  select,
  axisBottom,
  axisLeft,
  scaleLinear,
  scaleBand,
} from "d3";
import useResizeObserver from "../../hooks/useResizeObserver";




const chartdata = [
  { year: 2019, sales: 12342 },
  { year: 2020, sales: 41323 },
  { year: 2021, sales: 32143 },
  { year: 2022, sales: 76573 },
];

const BarChart = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [data, setData] = useState([...chartdata]);

  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 100000])
      .range([dimensions.height, 0]);

    const colorScale = scaleLinear()
      .domain([0, 50000, 100000])
      .range(["green", "yellow", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).tickFormat((index) => data[index].year);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg
      .select(".y-axis")
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("transform", "scale(1, -1)")
      .attr("x", (_, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("height", (value) => dimensions.height - yScale(value.sales))
      .attr("fill", (value) => colorScale(value.sales));
  }, [dimensions]);
  return (
    <div className={classes.chart}>
      <div className={classes.wrapper} ref={wrapperRef}>
        <svg className={classes.svgContainer} ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </div>
  );
};

export default BarChart;
