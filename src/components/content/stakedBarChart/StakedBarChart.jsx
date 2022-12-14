import React, { useState, useEffect, useRef } from "react";
import classes from "./StakedBarChart.module.css";
import {
  select,
  scaleLinear,
  scaleBand,
  axisBottom,
  stack,
  max,
  axisLeft,
  stackOrderAscending,
} from "d3";
import useResizeObserver from "./../../../hooks/useResizeObserver";
import Tooltip from "@mui/material/Tooltip";

const data = [
  {
    year: 2019,
    Москва: 268549,
    "Санкт-Петербург": 422274,
    Волгоград: 295936,
    Екатеринбург: 443746,
  },
  {
    year: 2020,
    Москва: 741951,
    "Санкт-Петербург": 318810,
    Волгоград: 748666,
    Екатеринбург: 349583,
  },
  {
    year: 2021,
    Москва: 481025,
    "Санкт-Петербург": 325282,
    Волгоград: 265404,
    Екатеринбург: 727678,
  },
  {
    year: 2022,
    Москва: 376871,
    "Санкт-Петербург": 294065,
    Волгоград: 702741,
    Екатеринбург: 307434,
  },
];

const allKeys = ["Москва", "Санкт-Петербург", "Волгоград", "Екатеринбург"];

const colors = {
  Москва: "#EB6C64",
  "Санкт-Петербург": "#EBCA46",
  Волгоград: "#5274B5",
  Екатеринбург: "#52B5AA",
};

const StakedBarChart = () => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  const [keys, setKeys] = useState(allKeys);
  const [tooptipText, setTooltipText] = useState("")

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const stackGenerator = stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    const xScale = scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.25);

    const yScale = scaleLinear();
    yScale.domain(extent).range([height, 0]);

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAsix = axisLeft(yScale);
    svg.select(".y-axis").call(yAsix);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      //.attr("transform", "scale(1, -1)")
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      //.attr("class", layer => layer)
      .attr("x", (sequence) => {
        return xScale(sequence.data.year);
      })
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .on("mouseenter", (event, value) => {
        console.log(event.toElement)
        const { data } = value;
        const cites = Object.keys(data);
        let string = "";
        for (let i = 1; i < cites.length; i++) {
          string += `${cites[i]}: ${data[cites[i]]}\n`
        }
        setTooltipText(string);
      })
      .on("mouseleave", () => {
        setTooltipText("");
      })
      //.transition()
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));
  }, [dimensions, keys]);

  return (
    <>
      <div ref={wrapperRef} className={classes.wrapper}>
        <Tooltip title={tooptipText} followCursor>
          <svg ref={svgRef} className={classes.svgContainer}>
            <g className="x-axis" />
            <g className="y-axis" />
          </svg>
        </Tooltip>
      </div>

      <div className={classes.fields}>
        {allKeys.map((key) => {
          return (
            <div key={key} className={classes.field}>
              <input
                id={key}
                type="checkbox"
                checked={keys.includes(key)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setKeys(Array.from(new Set([...keys, key])));
                  } else {
                    setKeys(keys.filter((_key) => _key !== key));
                  }
                }}
              />
              <label htmlFor={key} style={{ color: colors[key] }}>
                {key}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StakedBarChart;
