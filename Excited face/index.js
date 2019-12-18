import React from 'react';
import ReactDOM from 'react-dom';
import { arc } from 'd3';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 40;
const mouthWidth = 120;
const mouthRadius = -170

const mouthArc = arc()
  .innerRadius(mouthWidth+mouthRadius)
  .outerRadius(mouthWidth)
  .startAngle(Math.PI /2)
  .endAngle(Math.PI*3/2);
	

const App = () => (
  <svg width={width} height={height}>
    <g transform={`translate(${centerX},${centerY})`}>
      <circle
        r={centerY - strokeWidth / 2}
        fill="yellow"
        stroke="black"
        stroke-width={strokeWidth}
      />
      <circle
        cx={-eyeOffsetX}
        cy={-eyeOffsetY}
        r={eyeRadius}
        stroke="white"
        stroke-width="25"
      />
      <circle
        cx={eyeOffsetX}
        cy={-eyeOffsetY}
        r={eyeRadius}
        stroke="white"
        stroke-width="25"
      />
      <path d={mouthArc()}
        fill="white"
        stroke = "black"
        stroke-width="10"/>
    </g>
  </svg>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);