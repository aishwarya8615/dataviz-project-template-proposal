(function (React, ReactDOM, d3) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 20;
  const eyeOffsetX = 90;
  const eyeOffsetY = 100;
  const eyeRadius = 40;
  const mouthWidth = 120;
  const mouthRadius = -170;

  const mouthArc = d3.arc()
    .innerRadius(mouthWidth+mouthRadius)
    .outerRadius(mouthWidth)
    .startAngle(Math.PI /2)
    .endAngle(Math.PI*3/2);
  	

  const App = () => (
    React.createElement( 'svg', { width: width, height: height },
      React.createElement( 'g', { transform: `translate(${centerX},${centerY})` },
        React.createElement( 'circle', {
          r: centerY - strokeWidth / 2, fill: "yellow", stroke: "black", 'stroke-width': strokeWidth }),
        React.createElement( 'circle', {
          cx: -eyeOffsetX, cy: -eyeOffsetY, r: eyeRadius, stroke: "white", 'stroke-width': "25" }),
        React.createElement( 'circle', {
          cx: eyeOffsetX, cy: -eyeOffsetY, r: eyeRadius, stroke: "white", 'stroke-width': "25" }),
        React.createElement( 'path', { d: mouthArc(), fill: "white", stroke: "black", 'stroke-width': "10" })
      )
    )
  );

  const rootElement = document.getElementById('root');
  ReactDOM.render(React.createElement( App, null ), rootElement);

}(React, ReactDOM, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGFyYyB9IGZyb20gJ2QzJztcblxuY29uc3Qgd2lkdGggPSA5NjA7XG5jb25zdCBoZWlnaHQgPSA1MDA7XG5jb25zdCBjZW50ZXJYID0gd2lkdGggLyAyO1xuY29uc3QgY2VudGVyWSA9IGhlaWdodCAvIDI7XG5jb25zdCBzdHJva2VXaWR0aCA9IDIwO1xuY29uc3QgZXllT2Zmc2V0WCA9IDkwO1xuY29uc3QgZXllT2Zmc2V0WSA9IDEwMDtcbmNvbnN0IGV5ZVJhZGl1cyA9IDQwO1xuY29uc3QgbW91dGhXaWR0aCA9IDEyMDtcbmNvbnN0IG1vdXRoUmFkaXVzID0gLTE3MFxuXG5jb25zdCBtb3V0aEFyYyA9IGFyYygpXG4gIC5pbm5lclJhZGl1cyhtb3V0aFdpZHRoK21vdXRoUmFkaXVzKVxuICAub3V0ZXJSYWRpdXMobW91dGhXaWR0aClcbiAgLnN0YXJ0QW5nbGUoTWF0aC5QSSAvMilcbiAgLmVuZEFuZ2xlKE1hdGguUEkqMy8yKTtcblx0XG5cbmNvbnN0IEFwcCA9ICgpID0+IChcbiAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cbiAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtjZW50ZXJYfSwke2NlbnRlcll9KWB9PlxuICAgICAgPGNpcmNsZVxuICAgICAgICByPXtjZW50ZXJZIC0gc3Ryb2tlV2lkdGggLyAyfVxuICAgICAgICBmaWxsPVwieWVsbG93XCJcbiAgICAgICAgc3Ryb2tlPVwiYmxhY2tcIlxuICAgICAgICBzdHJva2Utd2lkdGg9e3N0cm9rZVdpZHRofVxuICAgICAgLz5cbiAgICAgIDxjaXJjbGVcbiAgICAgICAgY3g9ey1leWVPZmZzZXRYfVxuICAgICAgICBjeT17LWV5ZU9mZnNldFl9XG4gICAgICAgIHI9e2V5ZVJhZGl1c31cbiAgICAgICAgc3Ryb2tlPVwid2hpdGVcIlxuICAgICAgICBzdHJva2Utd2lkdGg9XCIyNVwiXG4gICAgICAvPlxuICAgICAgPGNpcmNsZVxuICAgICAgICBjeD17ZXllT2Zmc2V0WH1cbiAgICAgICAgY3k9ey1leWVPZmZzZXRZfVxuICAgICAgICByPXtleWVSYWRpdXN9XG4gICAgICAgIHN0cm9rZT1cIndoaXRlXCJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMjVcIlxuICAgICAgLz5cbiAgICAgIDxwYXRoIGQ9e21vdXRoQXJjKCl9XG4gICAgICAgIGZpbGw9XCJ3aGl0ZVwiXG4gICAgICAgIHN0cm9rZSA9IFwiYmxhY2tcIlxuICAgICAgICBzdHJva2Utd2lkdGg9XCIxMFwiLz5cbiAgICA8L2c+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3RFbGVtZW50KTsiXSwibmFtZXMiOlsiYXJjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFJQSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7RUFDbEIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO0VBQ25CLE1BQU0sT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDMUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztFQUMzQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7RUFDdkIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0VBQ3RCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQztFQUN2QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7RUFDckIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0VBQ3ZCLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBRzs7RUFFeEIsTUFBTSxRQUFRLEdBQUdBLE1BQUcsRUFBRTtLQUNuQixXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztLQUNuQyxXQUFXLENBQUMsVUFBVSxDQUFDO0tBQ3ZCLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztFQUd6QixNQUFNLEdBQUcsR0FBRztJQUNWLDhCQUFLLE9BQU8sS0FBSyxFQUFFLFFBQVEsTUFBTTtNQUMvQiw0QkFBRyxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM5QztVQUNFLEdBQUcsT0FBTyxHQUFHLFdBQVcsR0FBRyxDQUFDLEVBQzVCLE1BQUssUUFBUSxFQUNiLFFBQU8sT0FBTyxFQUNkLGdCQUFjLFdBQVcsRUFBQztRQUU1QjtVQUNFLElBQUksQ0FBQyxVQUFXLEVBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQ2YsR0FBRyxTQUFTLEVBQ1osUUFBTyxPQUFPLEVBQ2QsZ0JBQWEsTUFBSTtRQUVuQjtVQUNFLElBQUksVUFBVSxFQUNkLElBQUksQ0FBQyxVQUFVLEVBQ2YsR0FBRyxTQUFTLEVBQ1osUUFBTyxPQUFPLEVBQ2QsZ0JBQWEsTUFBSTtRQUVuQiwrQkFBTSxHQUFHLFFBQVEsRUFBRSxFQUNqQixNQUFLLE9BQU8sRUFDWixRQUFTLE9BQU8sRUFDaEIsZ0JBQWEsTUFBSSxDQUFFO09BQ25CO0tBQ0E7R0FDUCxDQUFDOztFQUVGLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDcEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxxQkFBQyxTQUFHLEVBQUcsRUFBRSxXQUFXLENBQUM7Ozs7In0=