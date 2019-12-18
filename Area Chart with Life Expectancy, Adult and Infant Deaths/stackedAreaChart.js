export const stackedAreaChart = (selection, props) => {
  const {
    data,
    keys,
    width,
    height,
    margin,
    xValue,
    yValue,
    colorScale,
    yAxisTitle,
    yAxisTitleOffset
  } = props;
  
  selection.attr('transform', `translate(${margin.left},${margin.top})`);
  
  const stacked = d3.stack().order(d3.stackOrderAscending).keys(keys)(data);
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;
  
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);
  
  const yScale = d3.scaleLinear()
    .range([innerHeight, 0])
    .domain([
      d3.min(stacked, series => d3.min(series, d => d[0])),
      d3.max(stacked, series => d3.max(series, d => d[1]))
    ])
    .nice();
  
  const area = d3.area()
    .x(d => xScale(xValue(d.data)))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveBasis);
  
  const xAxisG = selection.selectAll('.x').data([null]);
  xAxisG.enter().append('g').attr('class', 'x axis')
    .merge(xAxisG)
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(
        d3.axisBottom(xScale)
          .tickFormat(d3.timeFormat('%Y'))
      );
  
  let yAxisG = selection.selectAll('.y').data([null]);
  yAxisG = yAxisG.enter().append('g').attr('class', 'y axis')
    .merge(yAxisG)
      .call(
        d3.axisLeft(yScale)
          .tickSize(-innerWidth)
      );
  
  // Remove the first tick line so it doesn't obscure the data.
  yAxisG.select('.tick line').remove();
  
  const yAxisLabel = yAxisG.selectAll('.axis-label').data([null]);
  yAxisLabel
    .enter().append('text')
      .attr('class', 'axis-label')
      .attr('transform', `rotate(-90)`)
      .attr('y', yAxisTitleOffset)
      .style('text-anchor', 'middle')
    .merge(yAxisLabel)
      .text(yAxisTitle)
      .attr('x', -innerHeight / 2);
  
  const areas = selection.selectAll('.area').data(stacked);
  const areasEnter = areas.enter().append('path').attr('class', 'area');
  areasEnter
    .merge(areas)
      .attr('fill', d => colorScale(d.key))
      .attr('d', area);
  
  // Basic tooltips.
  areas.select('title')
    .merge(areasEnter.append('title'))
      .text(d => d.key);

  var labels = selection.selectAll('.area-label').data(stacked)
  labels
    .enter().append('text')
      .attr('class', 'area-label')
    .merge(labels)
      .text(d => d.key)
      .attr('transform', d3.areaLabel(area).interpolateResolution(1000));
}