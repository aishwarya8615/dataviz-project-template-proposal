(function (React$1,d3,ReactDOM,ReactDropdown) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
  ReactDropdown = ReactDropdown && ReactDropdown.hasOwnProperty('default') ? ReactDropdown['default'] : ReactDropdown;

  const csvUrl =
    'https://gist.githubusercontent.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a/raw/Life_Expectancy_Data.csv';

  const useData = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      const row = d => {
        d.Life_expectancy  = +d.Life_expectancy ;
        d.Total_expenditure = +d.Total_expenditure;
        d.Year = +d.Year;
        //d.Continent = +d.Continent;
        d.percentage_expenditure = +d.percentage_expenditure;
        d.GDP = +d.GDP;
        //d.Schooling = +d.Schooling;
        d.Year = +d.Year ;
        d.Status = +d.Status ;
        d.Alcohol = +d.Alcohol;
        d.Diphtheria = +d.Diphtheria;
        //d.Schooling = +d.Schooling;
        d.Polio = +d.Polio; 
        d.Hepatitis_B = +d.Hepatitis_B;  
        d.Adult_Mortality = +d.Adult_Mortality;  
        d.infant_deaths = +d.infant_deaths;   
        d.Measles = +d.Measles; 
        d.under_five_deaths = +d.under_five_deaths; 
        d.Income_composition_of_resources = +d.Income_composition_of_resources; 
        return d;
      };
      d3.csv(csvUrl, row).then(setData);
    }, []);
    
    return data;
  };

  const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks().map(tickValue => (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
    yScale.ticks().map(tickValue => (
      React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
          tickValue
        )
      )
    ));

  const Marks = ({
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
      React.createElement( 'circle', {
        className: "mark", cx: xScale(xValue(d)), cy: yScale(yValue(d)), fill: colorScale(colorValue(d)), r: circleScale(circleValue(d)) },
        React.createElement( 'title', null, tooltipFormat(xValue(d)) )
      )
    ));

  const ColorLegend = ({
    colorScale,
    tickSpacing = 20,
    tickSize = 10,
    tickTextOffset = 20,
    onHover,
    hoveredValue,
    fadeOpacity
  }) =>
    colorScale.domain().map((domainValue, i) => (
      React.createElement( 'g', {
        className: "tick", transform: `translate(0,${i * tickSpacing})`, onMouseEnter: () => {
          onHover(domainValue);
        }, onMouseOut: () => {
          onHover(null);
        }, opacity: hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1 },
        React.createElement( 'circle', { fill: colorScale(domainValue), r: tickSize }),
        React.createElement( 'text', { x: tickTextOffset, dy: ".32em" },
          domainValue
        )
      )
    ));

  const width = 960;
  const menuHeight = 80;
  const height = 500 - menuHeight;
  const margin = { top: 20, right: 200, bottom: 65, left: 90 };
  const xAxisLabelOffset = 55;
  const yAxisLabelOffset = 55;
  const fadeOpacity = 0.2;

  const attributes = [
    { value: 'Total_expenditure', label: 'Health expenditure' },
    //{ value: 'Continent', label: 'Continent' },
    { value: 'Life_expectancy ', label: 'Life expectancy ' } ,
    { value: 'GDP', label: 'GDP' } ,
    { value: 'Income_composition_of_resources', label: 'Income Composition' } ,
    //{ value: 'Status', label: 'Status' } ,
    //{ value: 'BMI ', label: 'BMI' } ,
    { value: 'Adult_Mortality', label: 'Adult Mortality' } ,
    //{ value: 'Diphtheria', label: 'Diphtheria' } ,
    { value: 'Measles ', label: 'Measles ' } ,

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
    const [hoveredValue, setHoveredValue] = React$1.useState(null);
    
    const initialXAttribute = 'Adult_Mortality';
    const [xAttribute, setXAttribute] = React$1.useState(initialXAttribute);
    const xValue = d => d[xAttribute];
    const xAxisLabel = getLabel(xAttribute);

    const initialYAttribute = 'Life_expectancy ';
    const [yAttribute, setYAttribute] = React$1.useState(initialYAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = getLabel(yAttribute);
    
    const initialradiusAttribute = 'GDP';
    const [radiusAttribute, setradiusAttribute] = React$1.useState(initialradiusAttribute);
    const radiusValue = d => d[radiusAttribute];

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;


    const colorValue = d => d.Continent;
    const colorLegendLabel = 'Continent';

    const filteredData = data.filter(d => hoveredValue === colorValue(d));

    const circleRadius = 7;

    const siFormat = d3.format('.2s');
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');


    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0]);

    const radiusScale = d3.scaleLinear()
      .domain(d3.extent(data, radiusValue))
      .range([2, 20]); 
    
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(colorValue))
      .range(['red', 'yellow', 'orange', 'purple', 'blue','green', 'cyan', 'magenta']);

    return (
      React$1__default.createElement( React$1__default.Fragment, null,
        React$1__default.createElement( 'div', { className: "menus-container" },
          React$1__default.createElement( 'span', { className: "dropdown-label" }, "X"),
          React$1__default.createElement( ReactDropdown, {
            options: attributes, value: xAttribute, onChange: ({ value }) => setXAttribute(value) }),
           React$1__default.createElement( 'span', { className: "dropdown-label" }, "Y"),
          React$1__default.createElement( ReactDropdown, {
            options: attributes, value: yAttribute, onChange: ({ value }) => setYAttribute(value) })
        ),
        React$1__default.createElement( 'svg', { width: width, height: height },
          React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
            React$1__default.createElement( AxisBottom, {
              xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 5 }),

          React$1__default.createElement( 'text', {
              className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset},${innerHeight /
              2}) rotate(-90)` },
              yAxisLabel
            ),
          
        React$1__default.createElement( AxisLeft, { yScale: yScale, innerWidth: innerWidth, tickOffset: 5 }),
            React$1__default.createElement( 'text', {
              className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" },
              xAxisLabel
            ),
          
          
          React$1__default.createElement( 'g', { transform: `translate(${innerWidth + 60}, 60)` },
              React$1__default.createElement( 'text', { x: 35, y: -25, className: "axis-label", textAnchor: "middle" },
                colorLegendLabel
              ),
              React$1__default.createElement( ColorLegend, {
                tickSpacing: 22, tickSize: 10, tickTextOffset: 12, tickSize: circleRadius, colorScale: colorScale, onHover: setHoveredValue, hoveredValue: hoveredValue, fadeOpacity: fadeOpacity })
            ),
   		
   		React$1__default.createElement( 'g', { opacity: hoveredValue ? fadeOpacity : 1 },
            React$1__default.createElement( Marks, {
              data: data, xScale: xScale, xValue: xValue, yScale: yScale, yValue: yValue, colorScale: colorScale, colorValue: colorValue, circleScale: radiusScale, circleValue: radiusValue, tooltipFormat: xAxisTickFormat, circleRadius: circleRadius })
          ),
           React$1__default.createElement( Marks, {
              data: filteredData, xScale: xScale, xValue: xValue, yScale: yScale, yValue: yValue, colorScale: colorScale, colorValue: colorValue, circleScale: radiusScale, circleValue: radiusValue, tooltipFormat: xAxisTickFormat, circleRadius: circleRadius })
        )
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React,d3,ReactDOM,ReactDropdown));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3VzZURhdGEuanMiLCIuLi9BeGlzQm90dG9tLmpzIiwiLi4vQXhpc0xlZnQuanMiLCIuLi9NYXJrcy5qcyIsIi4uL0NvbG9yTGVnZW5kLmpzIiwiLi4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9XG4gICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fpc2h3YXJ5YTg2MTUvODlkOWYzNmZjMDE0ZGVhNjI0ODdmNzM0Nzg2NGQxNmEvcmF3L0xpZmVfRXhwZWN0YW5jeV9EYXRhLmNzdic7XG5cbmV4cG9ydCBjb25zdCB1c2VEYXRhID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJvdyA9IGQgPT4ge1xuICAgICAgZC5MaWZlX2V4cGVjdGFuY3kgID0gK2QuTGlmZV9leHBlY3RhbmN5IDtcbiAgICAgIGQuVG90YWxfZXhwZW5kaXR1cmUgPSArZC5Ub3RhbF9leHBlbmRpdHVyZTtcbiAgICAgIGQuWWVhciA9ICtkLlllYXI7XG4gICAgICAvL2QuQ29udGluZW50ID0gK2QuQ29udGluZW50O1xuICAgICAgZC5wZXJjZW50YWdlX2V4cGVuZGl0dXJlID0gK2QucGVyY2VudGFnZV9leHBlbmRpdHVyZTtcbiAgICAgIGQuR0RQID0gK2QuR0RQO1xuICAgICAgLy9kLlNjaG9vbGluZyA9ICtkLlNjaG9vbGluZztcbiAgICAgIGQuWWVhciA9ICtkLlllYXIgO1xuICAgICAgZC5TdGF0dXMgPSArZC5TdGF0dXMgO1xuICAgICAgZC5BbGNvaG9sID0gK2QuQWxjb2hvbDtcbiAgICAgIGQuRGlwaHRoZXJpYSA9ICtkLkRpcGh0aGVyaWE7XG4gICAgICAvL2QuU2Nob29saW5nID0gK2QuU2Nob29saW5nO1xuICAgICAgZC5Qb2xpbyA9ICtkLlBvbGlvOyBcbiAgICAgIGQuSGVwYXRpdGlzX0IgPSArZC5IZXBhdGl0aXNfQjsgIFxuICAgICAgZC5BZHVsdF9Nb3J0YWxpdHkgPSArZC5BZHVsdF9Nb3J0YWxpdHk7ICBcbiAgICAgIGQuaW5mYW50X2RlYXRocyA9ICtkLmluZmFudF9kZWF0aHM7ICAgXG4gICAgICBkLk1lYXNsZXMgPSArZC5NZWFzbGVzOyBcbiAgICAgIGQudW5kZXJfZml2ZV9kZWF0aHMgPSArZC51bmRlcl9maXZlX2RlYXRoczsgXG4gICAgICBkLkluY29tZV9jb21wb3NpdGlvbl9vZl9yZXNvdXJjZXMgPSArZC5JbmNvbWVfY29tcG9zaXRpb25fb2ZfcmVzb3VyY2VzOyBcbiAgICAgIHJldHVybiBkO1xuICAgIH07XG4gICAgY3N2KGNzdlVybCwgcm93KS50aGVuKHNldERhdGEpO1xuICB9LCBbXSk7XG4gIFxuICByZXR1cm4gZGF0YTtcbn07IiwiZXhwb3J0IGNvbnN0IEF4aXNCb3R0b20gPSAoeyB4U2NhbGUsIGlubmVySGVpZ2h0LCB0aWNrRm9ybWF0LCB0aWNrT2Zmc2V0ID0gMyB9KSA9PlxuICB4U2NhbGUudGlja3MoKS5tYXAodGlja1ZhbHVlID0+IChcbiAgICA8Z1xuICAgICAgY2xhc3NOYW1lPVwidGlja1wiXG4gICAgICBrZXk9e3RpY2tWYWx1ZX1cbiAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3hTY2FsZSh0aWNrVmFsdWUpfSwwKWB9XG4gICAgPlxuICAgICAgPGxpbmUgeTI9e2lubmVySGVpZ2h0fSAvPlxuICAgICAgPHRleHQgc3R5bGU9e3sgdGV4dEFuY2hvcjogJ21pZGRsZScgfX0gZHk9XCIuNzFlbVwiIHk9e2lubmVySGVpZ2h0ICsgdGlja09mZnNldH0+XG4gICAgICAgIHt0aWNrRm9ybWF0KHRpY2tWYWx1ZSl9XG4gICAgICA8L3RleHQ+XG4gICAgPC9nPlxuICApKTtcbiIsImV4cG9ydCBjb25zdCBBeGlzTGVmdCA9ICh7IHlTY2FsZSwgaW5uZXJXaWR0aCwgdGlja09mZnNldCA9IDMgfSkgPT5cbiAgeVNjYWxlLnRpY2tzKCkubWFwKHRpY2tWYWx1ZSA9PiAoXG4gICAgPGcgY2xhc3NOYW1lPVwidGlja1wiIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgwLCR7eVNjYWxlKHRpY2tWYWx1ZSl9KWB9PlxuICAgICAgPGxpbmUgeDI9e2lubmVyV2lkdGh9IC8+XG4gICAgICA8dGV4dFxuICAgICAgICBrZXk9e3RpY2tWYWx1ZX1cbiAgICAgICAgc3R5bGU9e3sgdGV4dEFuY2hvcjogJ2VuZCcgfX1cbiAgICAgICAgeD17LXRpY2tPZmZzZXR9XG4gICAgICAgIGR5PVwiLjMyZW1cIlxuICAgICAgPlxuICAgICAgICB7dGlja1ZhbHVlfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJleHBvcnQgY29uc3QgTWFya3MgPSAoe1xuICBkYXRhLFxuICB4U2NhbGUsXG4gIHhWYWx1ZSxcbiAgeVNjYWxlLFxuICB5VmFsdWUsXG4gIGNvbG9yU2NhbGUsXG4gIGNvbG9yVmFsdWUsXG4gIGNpcmNsZVNjYWxlLFxuICBjaXJjbGVWYWx1ZSxcbiAgdG9vbHRpcEZvcm1hdCxcbn0pID0+XG4gIGRhdGEubWFwKGQgPT4gKFxuICAgIDxjaXJjbGVcbiAgICAgIGNsYXNzTmFtZT1cIm1hcmtcIlxuICAgICAgY3g9e3hTY2FsZSh4VmFsdWUoZCkpfVxuICAgICAgY3k9e3lTY2FsZSh5VmFsdWUoZCkpfVxuICAgICAgZmlsbD17Y29sb3JTY2FsZShjb2xvclZhbHVlKGQpKX1cbiAgICAgIHI9e2NpcmNsZVNjYWxlKGNpcmNsZVZhbHVlKGQpKX1cbiAgICA+XG4gICAgICA8dGl0bGU+e3Rvb2x0aXBGb3JtYXQoeFZhbHVlKGQpKX08L3RpdGxlPlxuICAgIDwvY2lyY2xlPlxuICApKTtcbiIsImV4cG9ydCBjb25zdCBDb2xvckxlZ2VuZCA9ICh7XG4gIGNvbG9yU2NhbGUsXG4gIHRpY2tTcGFjaW5nID0gMjAsXG4gIHRpY2tTaXplID0gMTAsXG4gIHRpY2tUZXh0T2Zmc2V0ID0gMjAsXG4gIG9uSG92ZXIsXG4gIGhvdmVyZWRWYWx1ZSxcbiAgZmFkZU9wYWNpdHlcbn0pID0+XG4gIGNvbG9yU2NhbGUuZG9tYWluKCkubWFwKChkb21haW5WYWx1ZSwgaSkgPT4gKFxuICAgIDxnXG4gICAgICBjbGFzc05hbWU9XCJ0aWNrXCJcbiAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgwLCR7aSAqIHRpY2tTcGFjaW5nfSlgfVxuICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiB7XG4gICAgICAgIG9uSG92ZXIoZG9tYWluVmFsdWUpO1xuICAgICAgfX1cbiAgICAgIG9uTW91c2VPdXQ9eygpID0+IHtcbiAgICAgICAgb25Ib3ZlcihudWxsKTtcbiAgICAgIH19XG4gICAgICBvcGFjaXR5PXtob3ZlcmVkVmFsdWUgJiYgZG9tYWluVmFsdWUgIT09IGhvdmVyZWRWYWx1ZSA/IGZhZGVPcGFjaXR5IDogMX1cbiAgICA+XG4gICAgICA8Y2lyY2xlIGZpbGw9e2NvbG9yU2NhbGUoZG9tYWluVmFsdWUpfSByPXt0aWNrU2l6ZX0gLz5cbiAgICAgIDx0ZXh0IHg9e3RpY2tUZXh0T2Zmc2V0fSBkeT1cIi4zMmVtXCI+XG4gICAgICAgIHtkb21haW5WYWx1ZX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjc3YsIHNjYWxlTGluZWFyLCBzY2FsZU9yZGluYWwsIG1heCwgZm9ybWF0LCBleHRlbnQgfSBmcm9tICdkMyc7XG5pbXBvcnQgUmVhY3REcm9wZG93biBmcm9tICdyZWFjdC1kcm9wZG93bic7XG5pbXBvcnQgeyB1c2VEYXRhIH0gZnJvbSAnLi91c2VEYXRhJztcbmltcG9ydCB7IEF4aXNCb3R0b20gfSBmcm9tICcuL0F4aXNCb3R0b20nO1xuaW1wb3J0IHsgQXhpc0xlZnQgfSBmcm9tICcuL0F4aXNMZWZ0JztcbmltcG9ydCB7IE1hcmtzIH0gZnJvbSAnLi9NYXJrcyc7XG5pbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJy4vRHJvcGRvd24nO1xuaW1wb3J0IHsgQ29sb3JMZWdlbmQgfSBmcm9tICcuL0NvbG9yTGVnZW5kJztcblxuY29uc3Qgd2lkdGggPSA5NjA7XG5jb25zdCBtZW51SGVpZ2h0ID0gODA7XG5jb25zdCBoZWlnaHQgPSA1MDAgLSBtZW51SGVpZ2h0O1xuY29uc3QgbWFyZ2luID0geyB0b3A6IDIwLCByaWdodDogMjAwLCBib3R0b206IDY1LCBsZWZ0OiA5MCB9O1xuY29uc3QgeEF4aXNMYWJlbE9mZnNldCA9IDU1O1xuY29uc3QgeUF4aXNMYWJlbE9mZnNldCA9IDU1O1xuY29uc3QgZmFkZU9wYWNpdHkgPSAwLjI7XG5cbmNvbnN0IGF0dHJpYnV0ZXMgPSBbXG4gIHsgdmFsdWU6ICdUb3RhbF9leHBlbmRpdHVyZScsIGxhYmVsOiAnSGVhbHRoIGV4cGVuZGl0dXJlJyB9LFxuICAvL3sgdmFsdWU6ICdDb250aW5lbnQnLCBsYWJlbDogJ0NvbnRpbmVudCcgfSxcbiAgeyB2YWx1ZTogJ0xpZmVfZXhwZWN0YW5jeSAnLCBsYWJlbDogJ0xpZmUgZXhwZWN0YW5jeSAnIH0gLFxuICB7IHZhbHVlOiAnR0RQJywgbGFiZWw6ICdHRFAnIH0gLFxuICB7IHZhbHVlOiAnSW5jb21lX2NvbXBvc2l0aW9uX29mX3Jlc291cmNlcycsIGxhYmVsOiAnSW5jb21lIENvbXBvc2l0aW9uJyB9ICxcbiAgLy97IHZhbHVlOiAnU3RhdHVzJywgbGFiZWw6ICdTdGF0dXMnIH0gLFxuICAvL3sgdmFsdWU6ICdCTUkgJywgbGFiZWw6ICdCTUknIH0gLFxuICB7IHZhbHVlOiAnQWR1bHRfTW9ydGFsaXR5JywgbGFiZWw6ICdBZHVsdCBNb3J0YWxpdHknIH0gLFxuICAvL3sgdmFsdWU6ICdEaXBodGhlcmlhJywgbGFiZWw6ICdEaXBodGhlcmlhJyB9ICxcbiAgeyB2YWx1ZTogJ01lYXNsZXMgJywgbGFiZWw6ICdNZWFzbGVzICcgfSAsXG5cbl07XG5cbmNvbnN0IGdldExhYmVsID0gdmFsdWUgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXR0cmlidXRlc1tpXS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBhdHRyaWJ1dGVzW2ldLmxhYmVsO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICBjb25zdCBkYXRhID0gdXNlRGF0YSgpO1xuICBjb25zdCBbaG92ZXJlZFZhbHVlLCBzZXRIb3ZlcmVkVmFsdWVdID0gdXNlU3RhdGUobnVsbCk7XG4gIFxuICBjb25zdCBpbml0aWFsWEF0dHJpYnV0ZSA9ICdBZHVsdF9Nb3J0YWxpdHknO1xuICBjb25zdCBbeEF0dHJpYnV0ZSwgc2V0WEF0dHJpYnV0ZV0gPSB1c2VTdGF0ZShpbml0aWFsWEF0dHJpYnV0ZSk7XG4gIGNvbnN0IHhWYWx1ZSA9IGQgPT4gZFt4QXR0cmlidXRlXTtcbiAgY29uc3QgeEF4aXNMYWJlbCA9IGdldExhYmVsKHhBdHRyaWJ1dGUpO1xuXG4gIGNvbnN0IGluaXRpYWxZQXR0cmlidXRlID0gJ0xpZmVfZXhwZWN0YW5jeSAnO1xuICBjb25zdCBbeUF0dHJpYnV0ZSwgc2V0WUF0dHJpYnV0ZV0gPSB1c2VTdGF0ZShpbml0aWFsWUF0dHJpYnV0ZSk7XG4gIGNvbnN0IHlWYWx1ZSA9IGQgPT4gZFt5QXR0cmlidXRlXTtcbiAgY29uc3QgeUF4aXNMYWJlbCA9IGdldExhYmVsKHlBdHRyaWJ1dGUpO1xuICBcbiAgY29uc3QgaW5pdGlhbHJhZGl1c0F0dHJpYnV0ZSA9ICdHRFAnO1xuICBjb25zdCBbcmFkaXVzQXR0cmlidXRlLCBzZXRyYWRpdXNBdHRyaWJ1dGVdID0gdXNlU3RhdGUoaW5pdGlhbHJhZGl1c0F0dHJpYnV0ZSk7XG4gIGNvbnN0IHJhZGl1c1ZhbHVlID0gZCA9PiBkW3JhZGl1c0F0dHJpYnV0ZV07XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuIDxwcmU+TG9hZGluZy4uLjwvcHJlPjtcbiAgfVxuXG4gIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuXG5cbiAgY29uc3QgY29sb3JWYWx1ZSA9IGQgPT4gZC5Db250aW5lbnQ7XG4gIGNvbnN0IGNvbG9yTGVnZW5kTGFiZWwgPSAnQ29udGluZW50JztcblxuICBjb25zdCBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IGhvdmVyZWRWYWx1ZSA9PT0gY29sb3JWYWx1ZShkKSk7XG5cbiAgY29uc3QgY2lyY2xlUmFkaXVzID0gNztcblxuICBjb25zdCBzaUZvcm1hdCA9IGZvcm1hdCgnLjJzJyk7XG4gIGNvbnN0IHhBeGlzVGlja0Zvcm1hdCA9IHRpY2tWYWx1ZSA9PiBzaUZvcm1hdCh0aWNrVmFsdWUpLnJlcGxhY2UoJ0cnLCAnQicpO1xuICBjb25zdCB5QXhpc1RpY2tGb3JtYXQgPSB0aWNrVmFsdWUgPT4gc2lGb3JtYXQodGlja1ZhbHVlKS5yZXBsYWNlKCdHJywgJ0InKTtcblxuXG4gIGNvbnN0IHhTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB4VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pXG4gICAgLm5pY2UoKTtcblxuICBjb25zdCB5U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihleHRlbnQoZGF0YSwgeVZhbHVlKSlcbiAgICAucmFuZ2UoW2lubmVySGVpZ2h0LCAwXSk7XG5cbiAgY29uc3QgcmFkaXVzU2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihleHRlbnQoZGF0YSwgcmFkaXVzVmFsdWUpKVxuICAgIC5yYW5nZShbMiwgMjBdKTsgXG4gIFxuICBjb25zdCBjb2xvclNjYWxlID0gc2NhbGVPcmRpbmFsKClcbiAgICAuZG9tYWluKGRhdGEubWFwKGNvbG9yVmFsdWUpKVxuICAgIC5yYW5nZShbJ3JlZCcsICd5ZWxsb3cnLCAnb3JhbmdlJywgJ3B1cnBsZScsICdibHVlJywnZ3JlZW4nLCAnY3lhbicsICdtYWdlbnRhJ10pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudXMtY29udGFpbmVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb3Bkb3duLWxhYmVsXCI+WDwvc3Bhbj5cbiAgICAgICAgPFJlYWN0RHJvcGRvd25cbiAgICAgICAgICBvcHRpb25zPXthdHRyaWJ1dGVzfVxuICAgICAgICAgIHZhbHVlPXt4QXR0cmlidXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoeyB2YWx1ZSB9KSA9PiBzZXRYQXR0cmlidXRlKHZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb3Bkb3duLWxhYmVsXCI+WTwvc3Bhbj5cbiAgICAgICAgPFJlYWN0RHJvcGRvd25cbiAgICAgICAgICBvcHRpb25zPXthdHRyaWJ1dGVzfVxuICAgICAgICAgIHZhbHVlPXt5QXR0cmlidXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoeyB2YWx1ZSB9KSA9PiBzZXRZQXR0cmlidXRlKHZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCR7bWFyZ2luLnRvcH0pYH0+XG4gICAgICAgICAgPEF4aXNCb3R0b21cbiAgICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgICAgaW5uZXJIZWlnaHQ9e2lubmVySGVpZ2h0fVxuICAgICAgICAgICAgdGlja0Zvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgICAgdGlja09mZnNldD17NX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgIDx0ZXh0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LXlBeGlzTGFiZWxPZmZzZXR9LCR7aW5uZXJIZWlnaHQgL1xuICAgICAgICAgICAgICAyfSkgcm90YXRlKC05MClgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt5QXhpc0xhYmVsfVxuICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgXG4gICAgICA8QXhpc0xlZnQgeVNjYWxlPXt5U2NhbGV9IGlubmVyV2lkdGg9e2lubmVyV2lkdGh9IHRpY2tPZmZzZXQ9ezV9IC8+XG4gICAgICAgICAgPHRleHRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIlxuICAgICAgICAgICAgeD17aW5uZXJXaWR0aCAvIDJ9XG4gICAgICAgICAgICB5PXtpbm5lckhlaWdodCArIHhBeGlzTGFiZWxPZmZzZXR9XG4gICAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eEF4aXNMYWJlbH1cbiAgICAgICAgICA8L3RleHQ+XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7aW5uZXJXaWR0aCArIDYwfSwgNjApYH0+XG4gICAgICAgICAgICA8dGV4dCB4PXszNX0geT17LTI1fSBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCIgdGV4dEFuY2hvcj1cIm1pZGRsZVwiPlxuICAgICAgICAgICAgICB7Y29sb3JMZWdlbmRMYWJlbH1cbiAgICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgICAgIDxDb2xvckxlZ2VuZFxuICAgICAgICAgICAgICB0aWNrU3BhY2luZz17MjJ9XG4gICAgICAgICAgICAgIHRpY2tTaXplPXsxMH1cbiAgICAgICAgICAgICAgdGlja1RleHRPZmZzZXQ9ezEyfVxuICAgICAgICAgICAgICB0aWNrU2l6ZT17Y2lyY2xlUmFkaXVzfVxuICAgICAgICAgICAgICBjb2xvclNjYWxlPXtjb2xvclNjYWxlfVxuICAgICAgICAgICAgICBvbkhvdmVyPXtzZXRIb3ZlcmVkVmFsdWV9XG4gICAgICAgICAgICAgIGhvdmVyZWRWYWx1ZT17aG92ZXJlZFZhbHVlfVxuICAgICAgICAgICAgICBmYWRlT3BhY2l0eT17ZmFkZU9wYWNpdHl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZz5cbiBcdFx0XG4gXHRcdDxnIG9wYWNpdHk9e2hvdmVyZWRWYWx1ZSA/IGZhZGVPcGFjaXR5IDogMX0+XG4gICAgICAgICAgPE1hcmtzXG4gICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICB4VmFsdWU9e3hWYWx1ZX1cbiAgICAgICAgICAgIHlTY2FsZT17eVNjYWxlfVxuICAgICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgICBjb2xvclNjYWxlPXtjb2xvclNjYWxlfVxuICAgICAgICAgICAgY29sb3JWYWx1ZT17Y29sb3JWYWx1ZX1cbiAgICAgICAgICAgIGNpcmNsZVNjYWxlPXtyYWRpdXNTY2FsZX1cbiAgICAgICAgICBcdGNpcmNsZVZhbHVlPXtyYWRpdXNWYWx1ZX1cbiAgICAgICAgICAgIHRvb2x0aXBGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICAgIGNpcmNsZVJhZGl1cz17Y2lyY2xlUmFkaXVzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZz5cbiAgICAgICAgIDxNYXJrc1xuICAgICAgICAgICAgZGF0YT17ZmlsdGVyZWREYXRhfVxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICB4VmFsdWU9e3hWYWx1ZX1cbiAgICAgICAgICAgIHlTY2FsZT17eVNjYWxlfVxuICAgICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgICBjb2xvclNjYWxlPXtjb2xvclNjYWxlfVxuICAgICAgICAgIFx0Y29sb3JWYWx1ZT17Y29sb3JWYWx1ZX1cbiAgICAgICAgICAgIGNpcmNsZVNjYWxlPXtyYWRpdXNTY2FsZX1cbiAgICAgICAgICBcdGNpcmNsZVZhbHVlPXtyYWRpdXNWYWx1ZX1cbiAgICAgICAgICAgIHRvb2x0aXBGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICAgIGNpcmNsZVJhZGl1cz17Y2lyY2xlUmFkaXVzfVxuICAgICAgICAgIC8+XG4gICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICA8Lz5cbiAgKTtcbn07XG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgcm9vdEVsZW1lbnQpO1xuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiY3N2IiwiUmVhY3QiLCJmb3JtYXQiLCJzY2FsZUxpbmVhciIsImV4dGVudCIsInNjYWxlT3JkaW5hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUdBLE1BQU0sTUFBTTtJQUNWLGdIQUFnSCxDQUFDOztBQUVuSCxFQUFPLE1BQU0sT0FBTyxHQUFHLE1BQU07SUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBR0EsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFFdkNDLGlCQUFTLENBQUMsTUFBTTtNQUNkLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSTtRQUNmLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFO1FBQ3pDLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztRQUMzQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUks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