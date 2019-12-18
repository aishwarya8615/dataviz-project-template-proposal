(function (React$1,d3,ReactDOM) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const csvUrl =
    'https://gist.githubusercontent.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a/raw/Life_Expectancy_Data.csv';

  const useData = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      const row = d => {
        d.Life_expectancy  = +d.Life_expectancy ;
        d.Population  = +d.Population ;
        d.Total_expenditure = +d.Total_expenditure; 
        //d.percentage_expenditure = +d.percentage_expenditure;
        //d.Year = +d.Year;
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
    tooltipFormat,
    circleRadius
  }) =>
    data.map(d => (
      React.createElement( 'circle', {
        className: "mark", cx: xScale(xValue(d)), cy: yScale(yValue(d)), fill: colorScale(colorValue(d)), r: circleRadius },
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
          //onHover(console.log(domainValue))
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
  const height = 500;
  const margin = { top: 20, right: 200, bottom: 65, left: 90 };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 45;
  const fadeOpacity = 0.2;

  const App = () => {
    const data = useData();
    const [hoveredValue, setHoveredValue] = React$1.useState(null);

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.Total_expenditure ;
    const xAxisLabel = 'Healthcare Expenditure';

    const yValue = d => d.Year ;
    const yAxisLabel = 'Year';

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
      .range([0, innerHeight]);

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(colorValue))
      .range(['#E6842A', '#137B80', '#8E6C8A', '#69b3a2','#007AFF','#FFF500','#7fa67a','#7ab5e3']);

    return (
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
              data: data, xScale: xScale, xValue: xValue, yScale: yScale, yValue: yValue, colorScale: colorScale, colorValue: colorValue, tooltipFormat: xAxisTickFormat, circleRadius: circleRadius })
          ),
          React$1__default.createElement( Marks, {
            data: filteredData, xScale: xScale, xValue: xValue, yScale: yScale, yValue: yValue, colorScale: colorScale, colorValue: colorValue, tooltipFormat: xAxisTickFormat, circleRadius: circleRadius })
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React,d3,ReactDOM));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3VzZURhdGEuanMiLCIuLi9BeGlzQm90dG9tLmpzIiwiLi4vQXhpc0xlZnQuanMiLCIuLi9NYXJrcy5qcyIsIi4uL0NvbG9yTGVnZW5kLmpzIiwiLi4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9XG4gICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fpc2h3YXJ5YTg2MTUvODlkOWYzNmZjMDE0ZGVhNjI0ODdmNzM0Nzg2NGQxNmEvcmF3L0xpZmVfRXhwZWN0YW5jeV9EYXRhLmNzdic7XG5cbmV4cG9ydCBjb25zdCB1c2VEYXRhID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJvdyA9IGQgPT4ge1xuICAgICAgZC5MaWZlX2V4cGVjdGFuY3kgID0gK2QuTGlmZV9leHBlY3RhbmN5IDtcbiAgICAgIGQuUG9wdWxhdGlvbiAgPSArZC5Qb3B1bGF0aW9uIDtcbiAgICAgIGQuVG90YWxfZXhwZW5kaXR1cmUgPSArZC5Ub3RhbF9leHBlbmRpdHVyZTsgXG4gICAgICAvL2QucGVyY2VudGFnZV9leHBlbmRpdHVyZSA9ICtkLnBlcmNlbnRhZ2VfZXhwZW5kaXR1cmU7XG4gICAgICAvL2QuWWVhciA9ICtkLlllYXI7XG4gICAgICByZXR1cm4gZDtcbiAgICB9O1xuICAgIGNzdihjc3ZVcmwsIHJvdykudGhlbihzZXREYXRhKTtcbiAgfSwgW10pO1xuICBcbiAgcmV0dXJuIGRhdGE7XG59OyIsImV4cG9ydCBjb25zdCBBeGlzQm90dG9tID0gKHsgeFNjYWxlLCBpbm5lckhlaWdodCwgdGlja0Zvcm1hdCwgdGlja09mZnNldCA9IDMgfSkgPT5cbiAgeFNjYWxlLnRpY2tzKCkubWFwKHRpY2tWYWx1ZSA9PiAoXG4gICAgPGdcbiAgICAgIGNsYXNzTmFtZT1cInRpY2tcIlxuICAgICAga2V5PXt0aWNrVmFsdWV9XG4gICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4U2NhbGUodGlja1ZhbHVlKX0sMClgfVxuICAgID5cbiAgICAgIDxsaW5lIHkyPXtpbm5lckhlaWdodH0gLz5cbiAgICAgIDx0ZXh0IHN0eWxlPXt7IHRleHRBbmNob3I6ICdtaWRkbGUnIH19IGR5PVwiLjcxZW1cIiB5PXtpbm5lckhlaWdodCArIHRpY2tPZmZzZXR9PlxuICAgICAgICB7dGlja0Zvcm1hdCh0aWNrVmFsdWUpfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJleHBvcnQgY29uc3QgQXhpc0xlZnQgPSAoeyB5U2NhbGUsIGlubmVyV2lkdGgsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHlTY2FsZS50aWNrcygpLm1hcCh0aWNrVmFsdWUgPT4gKFxuICAgIDxnIGNsYXNzTmFtZT1cInRpY2tcIiB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMCwke3lTY2FsZSh0aWNrVmFsdWUpfSlgfT5cbiAgICAgIDxsaW5lIHgyPXtpbm5lcldpZHRofSAvPlxuICAgICAgPHRleHRcbiAgICAgICAga2V5PXt0aWNrVmFsdWV9XG4gICAgICAgIHN0eWxlPXt7IHRleHRBbmNob3I6ICdlbmQnIH19XG4gICAgICAgIHg9ey10aWNrT2Zmc2V0fVxuICAgICAgICBkeT1cIi4zMmVtXCJcbiAgICAgID5cbiAgICAgICAge3RpY2tWYWx1ZX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpO1xuIiwiZXhwb3J0IGNvbnN0IE1hcmtzID0gKHtcbiAgZGF0YSxcbiAgeFNjYWxlLFxuICB4VmFsdWUsXG4gIHlTY2FsZSxcbiAgeVZhbHVlLFxuICBjb2xvclNjYWxlLFxuICBjb2xvclZhbHVlLFxuICB0b29sdGlwRm9ybWF0LFxuICBjaXJjbGVSYWRpdXNcbn0pID0+XG4gIGRhdGEubWFwKGQgPT4gKFxuICAgIDxjaXJjbGVcbiAgICAgIGNsYXNzTmFtZT1cIm1hcmtcIlxuICAgICAgY3g9e3hTY2FsZSh4VmFsdWUoZCkpfVxuICAgICAgY3k9e3lTY2FsZSh5VmFsdWUoZCkpfVxuICAgICAgZmlsbD17Y29sb3JTY2FsZShjb2xvclZhbHVlKGQpKX1cbiAgICAgIHI9e2NpcmNsZVJhZGl1c31cbiAgICA+XG4gICAgICA8dGl0bGU+e3Rvb2x0aXBGb3JtYXQoeFZhbHVlKGQpKX08L3RpdGxlPlxuICAgIDwvY2lyY2xlPlxuICApKTtcbiIsImV4cG9ydCBjb25zdCBDb2xvckxlZ2VuZCA9ICh7XG4gIGNvbG9yU2NhbGUsXG4gIHRpY2tTcGFjaW5nID0gMjAsXG4gIHRpY2tTaXplID0gMTAsXG4gIHRpY2tUZXh0T2Zmc2V0ID0gMjAsXG4gIG9uSG92ZXIsXG4gIGhvdmVyZWRWYWx1ZSxcbiAgZmFkZU9wYWNpdHlcbn0pID0+XG4gIGNvbG9yU2NhbGUuZG9tYWluKCkubWFwKChkb21haW5WYWx1ZSwgaSkgPT4gKFxuICAgIDxnXG4gICAgICBjbGFzc05hbWU9XCJ0aWNrXCJcbiAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgwLCR7aSAqIHRpY2tTcGFjaW5nfSlgfVxuICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiB7XG4gICAgICAgIG9uSG92ZXIoZG9tYWluVmFsdWUpO1xuICAgICAgICAvL29uSG92ZXIoY29uc29sZS5sb2coZG9tYWluVmFsdWUpKVxuICAgICAgfX1cbiAgICAgIG9uTW91c2VPdXQ9eygpID0+IHtcbiAgICAgICAgb25Ib3ZlcihudWxsKTtcbiAgICAgIH19XG4gICAgICBvcGFjaXR5PXtob3ZlcmVkVmFsdWUgJiYgZG9tYWluVmFsdWUgIT09IGhvdmVyZWRWYWx1ZSA/IGZhZGVPcGFjaXR5IDogMX1cbiAgICA+XG4gICAgICA8Y2lyY2xlIGZpbGw9e2NvbG9yU2NhbGUoZG9tYWluVmFsdWUpfSByPXt0aWNrU2l6ZX0gLz5cbiAgICAgIDx0ZXh0IHg9e3RpY2tUZXh0T2Zmc2V0fSBkeT1cIi4zMmVtXCI+XG4gICAgICAgIHtkb21haW5WYWx1ZX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjc3YsIHNjYWxlTGluZWFyLCBzY2FsZU9yZGluYWwsIG1heCwgZm9ybWF0LCBleHRlbnQgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyB1c2VEYXRhIH0gZnJvbSAnLi91c2VEYXRhJztcbmltcG9ydCB7IEF4aXNCb3R0b20gfSBmcm9tICcuL0F4aXNCb3R0b20nO1xuaW1wb3J0IHsgQXhpc0xlZnQgfSBmcm9tICcuL0F4aXNMZWZ0JztcbmltcG9ydCB7IE1hcmtzIH0gZnJvbSAnLi9NYXJrcyc7XG5pbXBvcnQgeyBDb2xvckxlZ2VuZCB9IGZyb20gJy4vQ29sb3JMZWdlbmQnO1xuXG5jb25zdCB3aWR0aCA9IDk2MDtcbmNvbnN0IGhlaWdodCA9IDUwMDtcbmNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiA2NSwgbGVmdDogOTAgfTtcbmNvbnN0IHhBeGlzTGFiZWxPZmZzZXQgPSA1MDtcbmNvbnN0IHlBeGlzTGFiZWxPZmZzZXQgPSA0NTtcbmNvbnN0IGZhZGVPcGFjaXR5ID0gMC4yO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB1c2VEYXRhKCk7XG4gIGNvbnN0IFtob3ZlcmVkVmFsdWUsIHNldEhvdmVyZWRWYWx1ZV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm4gPHByZT5Mb2FkaW5nLi4uPC9wcmU+O1xuICB9XG5cbiAgY29uc3QgaW5uZXJIZWlnaHQgPSBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgY29uc3QgaW5uZXJXaWR0aCA9IHdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG5cbiAgY29uc3QgeFZhbHVlID0gZCA9PiBkLlRvdGFsX2V4cGVuZGl0dXJlIDtcbiAgY29uc3QgeEF4aXNMYWJlbCA9ICdIZWFsdGhjYXJlIEV4cGVuZGl0dXJlJztcblxuICBjb25zdCB5VmFsdWUgPSBkID0+IGQuWWVhciA7XG4gIGNvbnN0IHlBeGlzTGFiZWwgPSAnWWVhcic7XG5cbiAgY29uc3QgY29sb3JWYWx1ZSA9IGQgPT4gZC5Db250aW5lbnQ7XG4gIGNvbnN0IGNvbG9yTGVnZW5kTGFiZWwgPSAnQ29udGluZW50JztcblxuICBjb25zdCBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IGhvdmVyZWRWYWx1ZSA9PT0gY29sb3JWYWx1ZShkKSk7XG5cbiAgY29uc3QgY2lyY2xlUmFkaXVzID0gNztcblxuICBjb25zdCBzaUZvcm1hdCA9IGZvcm1hdCgnLjJzJyk7XG4gIGNvbnN0IHhBeGlzVGlja0Zvcm1hdCA9IHRpY2tWYWx1ZSA9PiBzaUZvcm1hdCh0aWNrVmFsdWUpLnJlcGxhY2UoJ0cnLCAnQicpO1xuXG4gIGNvbnN0IHhTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB4VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pXG4gICAgLm5pY2UoKTtcblxuICBjb25zdCB5U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihleHRlbnQoZGF0YSwgeVZhbHVlKSlcbiAgICAucmFuZ2UoWzAsIGlubmVySGVpZ2h0XSk7XG5cbiAgY29uc3QgY29sb3JTY2FsZSA9IHNjYWxlT3JkaW5hbCgpXG4gICAgLmRvbWFpbihkYXRhLm1hcChjb2xvclZhbHVlKSlcbiAgICAucmFuZ2UoWycjRTY4NDJBJywgJyMxMzdCODAnLCAnIzhFNkM4QScsICcjNjliM2EyJywnIzAwN0FGRicsJyNGRkY1MDAnLCcjN2ZhNjdhJywnIzdhYjVlMyddKTtcblxuICByZXR1cm4gKFxuICAgIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sJHttYXJnaW4udG9wfSlgfT5cbiAgICAgICAgPEF4aXNCb3R0b21cbiAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICBpbm5lckhlaWdodD17aW5uZXJIZWlnaHR9XG4gICAgICAgICAgdGlja0Zvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgIHRpY2tPZmZzZXQ9ezV9XG4gICAgICAgIC8+XG4gICAgICAgIDx0ZXh0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiXG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LXlBeGlzTGFiZWxPZmZzZXR9LCR7aW5uZXJIZWlnaHQgL1xuICAgICAgICAgICAgMn0pIHJvdGF0ZSgtOTApYH1cbiAgICAgICAgPlxuICAgICAgICAgIHt5QXhpc0xhYmVsfVxuICAgICAgICA8L3RleHQ+XG4gICAgICAgIDxBeGlzTGVmdCB5U2NhbGU9e3lTY2FsZX0gaW5uZXJXaWR0aD17aW5uZXJXaWR0aH0gdGlja09mZnNldD17NX0gLz5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICB4PXtpbm5lcldpZHRoIC8gMn1cbiAgICAgICAgICB5PXtpbm5lckhlaWdodCArIHhBeGlzTGFiZWxPZmZzZXR9XG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eEF4aXNMYWJlbH1cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtpbm5lcldpZHRoICsgNjB9LCA2MClgfT5cbiAgICAgICAgICA8dGV4dCB4PXszNX0geT17LTI1fSBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCIgdGV4dEFuY2hvcj1cIm1pZGRsZVwiPlxuICAgICAgICAgICAge2NvbG9yTGVnZW5kTGFiZWx9XG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIDxDb2xvckxlZ2VuZFxuICAgICAgICAgICAgdGlja1NwYWNpbmc9ezIyfVxuICAgICAgICAgICAgdGlja1NpemU9ezEwfVxuICAgICAgICAgICAgdGlja1RleHRPZmZzZXQ9ezEyfVxuICAgICAgICAgICAgdGlja1NpemU9e2NpcmNsZVJhZGl1c31cbiAgICAgICAgICAgIGNvbG9yU2NhbGU9e2NvbG9yU2NhbGV9XG4gICAgICAgICAgICBvbkhvdmVyPXtzZXRIb3ZlcmVkVmFsdWV9XG4gICAgICAgICAgICBob3ZlcmVkVmFsdWU9e2hvdmVyZWRWYWx1ZX1cbiAgICAgICAgICAgIGZhZGVPcGFjaXR5PXtmYWRlT3BhY2l0eX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2c+XG4gICAgICAgIDxnIG9wYWNpdHk9e2hvdmVyZWRWYWx1ZSA/IGZhZGVPcGFjaXR5IDogMX0+XG4gICAgICAgICAgPE1hcmtzXG4gICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICB4VmFsdWU9e3hWYWx1ZX1cbiAgICAgICAgICAgIHlTY2FsZT17eVNjYWxlfVxuICAgICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgICBjb2xvclNjYWxlPXtjb2xvclNjYWxlfVxuICAgICAgICAgICAgY29sb3JWYWx1ZT17Y29sb3JWYWx1ZX1cbiAgICAgICAgICAgIHRvb2x0aXBGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICAgIGNpcmNsZVJhZGl1cz17Y2lyY2xlUmFkaXVzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZz5cbiAgICAgICAgPE1hcmtzXG4gICAgICAgICAgZGF0YT17ZmlsdGVyZWREYXRhfVxuICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgIHhWYWx1ZT17eFZhbHVlfVxuICAgICAgICAgIHlTY2FsZT17eVNjYWxlfVxuICAgICAgICAgIHlWYWx1ZT17eVZhbHVlfVxuICAgICAgICAgIGNvbG9yU2NhbGU9e2NvbG9yU2NhbGV9XG4gICAgICAgICAgY29sb3JWYWx1ZT17Y29sb3JWYWx1ZX1cbiAgICAgICAgICB0b29sdGlwRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgY2lyY2xlUmFkaXVzPXtjaXJjbGVSYWRpdXN9XG4gICAgICAgIC8+XG4gICAgICA8L2c+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3RFbGVtZW50KTtcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImNzdiIsIlJlYWN0IiwiZm9ybWF0Iiwic2NhbGVMaW5lYXIiLCJleHRlbnQiLCJzY2FsZU9yZGluYWwiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUdBLE1BQU0sTUFBTTtJQUNWLGdIQUFnSCxDQUFDOztBQUVuSCxFQUFPLE1BQU0sT0FBTyxHQUFHLE1BQU07SUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBR0EsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFFdkNDLGlCQUFTLENBQUMsTUFBTTtNQUNkLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSTtRQUNmLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFO1FBQ3pDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFO1FBQy9CLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQzs7O1FBRzNDLE9BQU8sQ0FBQyxDQUFDO09BQ1YsQ0FBQztNQUNGQyxNQUFHLENBQUMsTUFBTSxF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