import { stackedAreaChart } from './stackedAreaChart';

const svg = d3.select(document.body).append('svg');


var parseRow = d => {
  d.Year = new Date(d.Year);
  d.Life_expectancy 
  
  return d;
};
  
d3.csv('https://gist.githubusercontent.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a/raw/Life_Expectancy_Data.csv', parseRow, data => {
  data = data.filter(d => d.Year > new Date("1999"));
  
  const render = () => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    
    svg.attr('width', width).attr('height', height);
    
    let g = svg.selectAll('g').data([null]);
    g = g.enter().append('g').merge(g);
    
    stackedAreaChart(g, {
      data,
      keys: ["Adult_Mortality", "Life_expectancy ", "infant_deaths"],
      width,
      height,
      xValue: d => d.Year,
      xAxisTitle: 'Year',
      colorScale: d3.scaleOrdinal(d3.schemeDark2),
      margin: { top: 10, right: 20, bottom: 40, left: 57 },
      yAxisTitle: 'Life Expectancy based on Adult and Infant Deaths',
      yAxisTitleOffset: -40
    });
  };
  render();
  
  window.addEventListener('resize', render);
});