export const Marks = ({
  data,
  xScale,
  xValue,
  yScale,
  yValue,
  colorScale,
  colorValue,
  circleScale,
  circleValue,
  tooltipFormat,
}) =>
  data.map(d => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={circleScale(circleValue(d))}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ));
