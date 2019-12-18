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
      <title>{tooltipFormat(yValue(d),xValue(d))}</title>
    </circle>
  ));
