import react, { useState, useEffect } from "react";
import { Path } from "react-native-svg";
import { scaleLinear } from "d3-scale";
import * as shape from "d3-shape";

export default function PathGraph({
  datos,
  width,
  height,
  margin,
  color = "orange",
}) {
  const maximosMinimos = {
    max0: Math.max(...datos.map((u) => u[0])),
    min0: Math.min(...datos.map((u) => u[0])),
    max1: Math.max(...datos.map((u) => u[1])),
    min1: Math.min(...datos.map((u) => u[1])),
  };

  const scaleY = scaleLinear()
    .domain([maximosMinimos.min1, maximosMinimos.max1])
    .range([height - margin.bottom, margin.top]);

  const scaleBody = scaleLinear()
    .domain([maximosMinimos.min0, maximosMinimos.max0])
    .range([margin.left, width - margin.left]);

  const h = shape
    .line()
    .x((p) => scaleBody(p[0]))
    .y((p) => scaleY(p[1]))
    .curve(shape.curveNatural)(datos);

  return (
    <Path
      d={`${h}L ${width} ${height} L 0 ${height}`}
      stroke={color}
      strokeWidth={1}
    />
  );
}
