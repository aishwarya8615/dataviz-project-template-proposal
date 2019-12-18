import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleOrdinal, max, format, extent } from 'd3';
import ReactDropdown from 'react-dropdown';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';
import { ColorLegend } from './ColorLegend';

const width = 960;
const menuHeight = 80;
const height = 500 - menuHeight;
const margin = { top: 20, right: 200, bottom: 65, left: 90 };
const xAxisLabelOffset = 55;
const yAxisLabelOffset = 55;
const fadeOpacity = 0.2;

const attributes = [
  { value: 'infant_deaths', label: 'Infant deaths' },
  //{ value: 'Continent', label: 'Continent' },
  { value: 'Life_expectancy ', label: 'Life expectancy ' } ,
  //{ value: 'GDP', label: 'GDP' } ,
  //{ value: 'Income_composition_of_resources', label: 'Income Composition' } ,
  //{ value: 'Status', label: 'Status' } ,
  //{ value: 'BMI ', label: 'BMI' } ,
  { value: 'Adult_Mortality', label: 'Adult Mortality' } ,
  //{ value: 'Diphtheria', label: 'Diphtheria' } ,
  //{ value: 'Measles ', label: 'Measles ' } ,

];

const getLabel = value => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);
  
  const initialXAttribute = 'infant_deaths';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'Life_expectancy ';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);
  
  const initialradiusAttribute = 'GDP';
  const [radiusAttribute, setradiusAttribute] = useState(initialradiusAttribute);
  const radiusValue = d => d[radiusAttribute];

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  const colorValue = d => d.Continent;
  const colorLegendLabel = 'Continent';

  const filteredData = data.filter(d => hoveredValue === colorValue(d));

  const circleRadius = 7;

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
  const yAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');


  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

  const radiusScale = scaleLinear()
    .domain(extent(data, radiusValue))
    .range([2, 20]); 
  
  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['lightgreen', 'lightblue', 'brown', 'gold', 'teal','orange', 'cyan', 'grey'])
  
  
  return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">X</span>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
        />
         <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={5}
          />

        <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${innerHeight /
              2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
        
      <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
        
        
        <g transform={`translate(${innerWidth + 60}, 60)`}>
            <text x={35} y={-25} className="axis-label" textAnchor="middle">
              {colorLegendLabel}
            </text>
            <ColorLegend
              tickSpacing={22}
              tickSize={10}
              tickTextOffset={12}
              tickSize={circleRadius}
              colorScale={colorScale}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
 		
 		<g opacity={hoveredValue ? fadeOpacity : 1}>
          <Marks
            data={data}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            circleScale={radiusScale}
          	circleValue={radiusValue}
            tooltipFormat={yAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
         <Marks
            data={filteredData}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
          	colorValue={colorValue}
            circleScale={radiusScale}
          	circleValue={radiusValue}
            tooltipFormat={yAxisTickFormat}
            circleRadius={circleRadius}
          />
      </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
