import React, { useState, useEffect, useRef } from "react";
import classes from "./StakedBarChart.module.css";
import { select, scaleLinear, scaleBand, axisBottom, stack, max, axisLeft, stackOrderAscending } from "d3";
import useResizeObserver from "./../../../hooks/useResizeObserver";

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
  Москва: "red",
  "Санкт-Петербург": "blue",
  Волгоград: "purple",
  Екатеринбург: "green",
};

const StakedBarChart = () => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  const [keys, setKeys] = useState(allKeys);

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

    const yScale = scaleLinear()
    yScale.domain(extent).range([height, 0])
      

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAsix = axisLeft(yScale);
    svg
      .select(".y-axis")
      .call(yAsix);


    svg
      .selectAll('.layer')
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", layer => colors[layer.key])
      .selectAll("rect")
      .data(layer => layer)
      .join('rect')
      .attr("x", sequence => {
        return xScale(sequence.data.year)
      })
      .attr("width", xScale.bandwidth())
      .attr("y", sequence => yScale(sequence[1]))
      .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]))

  }, [dimensions, keys]);

  return (
    <>
      <div ref={wrapperRef} className={classes.wrapper}>
        <svg ref={svgRef} className={classes.svgContainer}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>

      <div className={classes.fields}>
        {allKeys.map((key) => {
          return (
            <div key={key} className={classes.field}>
              <input
                id={key}
                type="checkbox"
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
