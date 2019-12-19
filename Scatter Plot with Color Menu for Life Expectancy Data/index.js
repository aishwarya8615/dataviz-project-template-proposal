import {
  select,
  csv,
  scaleLinear,
  extent,
  axisLeft,
  schemeCategory10,
  scaleOrdinal,
  axisBottom
} from 'd3';
import { dropdownMenu } from './dropdownMenu';
import { scatterPlot } from './scatterPlot';
import { colorLegend } from './colorLegend';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

let data;
let xColumn;
let yColumn;
let colorColumn;

const onXColumnClicked = column => {
  xColumn = column;
  render();
};

const onYColumnClicked = column => {
  yColumn = column;
  render();
};

const onColorColumnClicked = column => {
  colorColumn = column;
  render();
};

const render = () => {
  
  const colorValue = d => d[colorColumn];
  
  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(schemeCategory10);
  
  
  select('#x-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
    });
  
  select('#y-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
    });
  
  select('#color-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onColorColumnClicked,
      selectedOption: colorColumn
    });
  
  const circleRadius = 10;
  
  svg.call(scatterPlot, {
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    colorScale,
    colorValue,
    circleRadius,
    yAxisLabel: yColumn,
    margin: { top: 10, right: 40, bottom: 88, left: 80 },
    width,
    height,
    data
  });
  
  svg.append('g')
    .attr('transform', `translate(800,50)`)
    .call(colorLegend, {
      colorScale,
      circleRadius,
      spacing: 40,
      textOffset: 10
    });
};

csv('https://gist.githubusercontent.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a/raw/Life_Expectancy_Data.csv')
  .then(loadedData => {
    data = loadedData;
    data.forEach(d => {
      d.Life_expectancy  = +d.Life_expectancy ;
      d.Year = +d.Year ;
      d.BMI = +d.BMI ;
      d.Alcohol = +d.Alcohol;
      d.Diphtheria = +d.Diphtheria;
      d.GDP = +d.GDP;
      d.Schooling = +d.Schooling;
      d.Polio = +d.Polio; 
      d.Total_expenditure = +d.Total_expenditure;  
      d.Population = +d.Population;  
      d.Adult_Mortality = +d.Adult_Mortality;  
      d.infant_deaths = +d.infant_deaths;  
      d.percentage_expenditure = +d.percentage_expenditure;  
      d.Measles = +d.Measles; 
      d.under_five_deaths = +d.under_five_deaths; 
      d.Income_composition_of_resources = +d.Income_composition_of_resources; 
      //d.Year = +parseYear(d.Year)
    });
    xColumn = data.columns[11];
    yColumn = data.columns[4];
    colorColumn = data.columns[1];
  
    render();
  });