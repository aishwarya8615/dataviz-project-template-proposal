import {
  select,
  csv,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  format,
  scaleOrdinal,
  schemeCategory10
} from 'd3';

import { dropDownMenu } from './dropDownMenu';
import { scatterPlot } from './scatterPlot';
import { colorLegend } from './colorLegend';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = { top: 10, right: -50, bottom: 90, left: 40 };

const color = scaleOrdinal(schemeCategory10);

const cValue = data => data['Continent'];
  

let data;
let xColumn;
let yColumn;
let selectedLegend;


const onXColumnClicked = column => {
  xColumn = column;  
  render();
};

const onYColumnClicked = column => {
  yColumn = column;  
  render();
};

const onClick = d => {
  selectedLegend = d;
//  console.log({selectedLegend});
  render();
};

const scatterG = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

var tipMouseover = function (d) {
  var html = d['Continent'] + "<br/>" +
    "<span style='color:" + color(cValue(d)) + ";'>" + d['Year'] + "</span><br/>" +
    "<b>" + d[xColumn] + `</b> ${xColumn}, <b/>` + d[yColumn] + `</b> ${yColumn}`;
  select('.tooltip').html(html)
    .style("left", (d3.event.pageX + 15) + "px")
    .style("top", (d3.event.pageY - 28) + "px")
    .transition()
    .duration(200) 
    .style("opacity", .9)
  
};

// tooltip mouseout event handler
var tipMouseout = function (d) {
  select('.tooltip').transition()
    .duration(300) 
    .style("opacity", 0);
};


const render = () => {
  
  select('#x-menu')
    .call(dropDownMenu, {
      options: data.columns.filter(column =>
        column !== 'Country' &&
        column !== 'Status' &&
        column !== 'Alcohol'&&
        column !== 'percentage_expenditure' &&
        column !== 'Hepatitis_B' &&
        column !== 'Measles '&&        
        column !== 'Schooling' &&
        column !== 'under_five_deaths '&&
        column !== 'Polio' &&
        column !== 'Total_expenditure' &&
        column !== 'Diphtheria '&&
        column !== 'Population'&&        
        column !== ' thinness  1-19 years' &&
        column !== ' thinness 5-9 years'&&
        column !== 'Income_composition_of_resources' &&
        //column !== 'under_five_deaths' && 
        column !== 'Continent' &&
        column !== 'infant_deaths' &&
        column !== yColumn
      ),
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
  });
  
  select('#y-menu')
    .call(dropDownMenu, {
      options: data.columns.filter(column =>
        column !== 'Country' &&
        column !== 'Status' &&
        column !== 'Alcohol'&&
        column !== 'percentage_expenditure' &&
        column !== 'Hepatitis_B' &&
        column !== 'Measles '&&        
        column !== 'Schooling' &&
        column !== 'under_five_deaths '&&
        column !== 'Polio' &&
        column !== 'Total_expenditure' &&
        column !== 'Diphtheria ' &&
        column !== 'Population' &&        
        column !== ' thinness  1-19 years' &&
        column !== ' thinness 5-9 years'&&
        column !== 'Income_composition_of_resources' &&   
        //column !== 'under_five_deaths' && 
        column !== 'Continent' &&
        column !== 'infant_deaths' &&
        column !== xColumn
      ),
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
  });
  
  scatterG.call(scatterPlot, {
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    circleRadius: 4,
    yAxisLabel: yColumn,
    margin: margin,
    width,
    height,
    data,
    color,
    cValue,
    selectedLegend,
    tipMouseover,
    tipMouseout
  });
  
  svg.call(colorLegend, {
    color,
    width,
    onClick,
    selectedLegend
  });
  
  select('body').append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

};

csv('https://gist.githubusercontent.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a/raw/Life_Expectancy_Data.csv')
  .then(loadedData => {
    data = loadedData;
    data.forEach(d => {
      d['Adult_Mortality'] = +d['Adult_Mortality'];
      d['infant_deaths'] = +d['infant_deaths'];
      d['Life_expectancy '] = +d['Life_expectancy '];
      d['Schooling'] = +d['Schooling'];
      d['GDP'] = +d['GDP'];
      d['Year'] = +d['Year'];
      d[' HIV/AIDS'] = +d[' HIV/AIDS'];
      d['Alcohol'] = +d['Alcohol'];
       d['BMI'] = +d['BMI'];
    });
    xColumn = data.columns[16];
    yColumn = data.columns[4];
    render();
});

