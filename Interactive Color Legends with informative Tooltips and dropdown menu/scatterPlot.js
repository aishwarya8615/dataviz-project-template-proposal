import {
  select,
  scaleLog,
  extent,
  axisLeft,
  axisBottom,
  format
} from 'd3';

export const scatterPlot = (selection, props) => {
  const {
    xValue,
    xAxisLabel,
    yValue,
    circleRadius,
    yAxisLabel,
    margin,
    width,
    height,
    data,
    color,
    cValue,
    selectedLegend,
    tipMouseover,
    tipMouseout
  } = props;
    
  const innerWidth = width - margin.left - margin.right -230;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = scaleLog()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
  
  const yScale = scaleLog()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();
  
  const g = selection.selectAll('.container').data([null]);
  const gEnter = g
    .enter().append('g')
      .attr('class', 'container');
  gEnter.merge(g)
      .attr('transform', 
        `translate(${margin.left},${margin.top})`
      );
  
  const AxisTickFormat = number => format(".1s")(number)
    .replace('G', 'B');
  
  const xAxis = axisBottom(xScale)
    .tickFormat(AxisTickFormat) 
    .tickSize(-innerHeight)
    .tickPadding(15);
  
  const yAxis = axisLeft(yScale)
    .tickFormat(AxisTickFormat) 
    .tickSize(-innerWidth)
    .tickPadding(10);
  
  const yAxisG = g.select('.y-axis');  
  const yAxisGEnter = gEnter
    .append('g')
      .attr('class', 'y-axis');
  
  yAxisG
    .merge(yAxisGEnter)
      .call(yAxis)
      .selectAll('.domain').remove();
  
  
  const yAxisLabelText = yAxisGEnter
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', -55)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
    .merge(yAxisG.select('.axis-label'))
      .attr('x', -innerHeight / 2)
      .text(yAxisLabel);
  
  
  const xAxisG = g.select('.x-axis');  
  const xAxisGEnter = gEnter
    .append('g')
      .attr('class', 'x-axis');
  xAxisG
    .merge(xAxisGEnter)
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('.domain').remove();
  
  const xAxisLabelText = xAxisGEnter
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', 75)
      .attr('fill', 'black')
    .merge(xAxisG.select('.axis-label'))
      .attr('x', innerWidth / 2)
      .text(xAxisLabel);
  
  const circles = g.merge(gEnter)
    .selectAll('circle').data(data);
  circles
    .enter().append('circle')
      .attr('cx', innerWidth / 2)
      .attr('cy', innerHeight / 2)
      .attr('r', 0)
  		.attr('opacity', 0.8)
    	.on('mouseover', tipMouseover)
      .on('mouseout', tipMouseout)
    .merge(circles)
    .transition().duration(1000)
    .delay((d, i) => i * 2)
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius)
      .attr('fill', d => color(cValue(d)));
  
  circles
    .merge(circles)
      .attr('opacity', d =>
        (!selectedLegend || selectedLegend === cValue(d))
          ? 0.8
          : 0.05
      )
    	.attr('r', d =>
        (selectedLegend === cValue(d))
          ? 2*circleRadius
          : circleRadius
     	);

};