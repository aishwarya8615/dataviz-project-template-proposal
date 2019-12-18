import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie } from 'd3';
import { range } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv';

const width = 960;
const height = 500;
const centerX = width / 200;
const centerY = height / 200;


const pieArc = arc()
  .innerRadius(50)
  .outerRadius(200);


//var margin = {left: 20, top: 20, right: 20, bottom: 20},
		//width = Math.min(screenWidth, 500) - margin.left - margin.right,
		//height = Math.min(screenWidth, 500) - margin.top - margin.bottom;
					
///var svg = d3.select("#chart").append("svg")
		//.attr("width", (width + margin.left + margin.right))
		//.attr("height", (height + margin.top + margin.bottom))
    //.append("g").attr("class", "wrapper")
	  //.attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const colorPie = pie().value(1);

  
  return (
    <svg width={width} height={height}>
      <g transform="translate(400,220) rotate(180) skewX(220) skewY(20) ">
        {colorPie(data).map(d => (
          <path fill={d.data['RGB hex value']} d={pieArc(d)} />
        ))}
      </g>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// To compute the arcs manually (without d3.pie):
// data.map((d, i) => (
//   <path
//     fill={d['RGB hex value']}
//     d={pieArc({
//       startAngle: (i / data.length) * 2 * Math.PI,
//       endAngle: ((i + 1) / data.length) * 2 * Math.PI
//     })}
//   />
// ))
