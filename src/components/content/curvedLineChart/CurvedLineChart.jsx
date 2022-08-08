import React, { useRef, useEffect } from "react";
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear} from "d3";
import classes from "./CurvedLineChart.module.css"

const data = [25, 30, 45, 60, 20, 65, 75];

const CurvedLineChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300])

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0])

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1)
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis)

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis)

    const curvedLine = line()
      .x((_, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", curvedLine)
      .attr("fill", "none")
      .attr("stroke", "blue")
  }, []);

  return (
    <div className={classes.chart}>
      <svg className={classes.svgContainer} ref={svgRef}>
        <g className="x-axis"/>
        <g className="y-axis"/>
      </svg>
    </div>
  );
};

export default CurvedLineChart;
