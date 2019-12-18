(function (React, ReactDOM, d3) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const csvUrl =
    'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv';

  const width = 960;
  const height = 500;


  const pieArc = d3.arc()
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
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      d3.csv(csvUrl).then(setData);
    }, []);

    if (!data) {
      return React__default.createElement( 'pre', null, "Loading..." );
    }

    const colorPie = d3.pie().value(1);

    
    return (
      React__default.createElement( 'svg', { width: width, height: height },
        React__default.createElement( 'g', { transform: "translate(400,220) rotate(180) skewX(220) skewY(20) " },
          colorPie(data).map(d => (
            React__default.createElement( 'path', { fill: d.data['RGB hex value'], d: pieArc(d) })
          ))
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React__default.createElement( App, null ), rootElement);

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

}(React, ReactDOM, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgY3N2LCBhcmMsIHBpZSB9IGZyb20gJ2QzJztcbmltcG9ydCB7IHJhbmdlIH0gZnJvbSAnZDMnO1xuXG5jb25zdCBjc3ZVcmwgPVxuICAnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jdXJyYW4vYjIzNjk5MDA4MWEyNDc2MWY3MDAwNTY3MDk0OTE0ZTAvcmF3L2Nzc05hbWVkQ29sb3JzLmNzdic7XG5cbmNvbnN0IHdpZHRoID0gOTYwO1xuY29uc3QgaGVpZ2h0ID0gNTAwO1xuY29uc3QgY2VudGVyWCA9IHdpZHRoIC8gMjAwO1xuY29uc3QgY2VudGVyWSA9IGhlaWdodCAvIDIwMDtcblxuXG5jb25zdCBwaWVBcmMgPSBhcmMoKVxuICAuaW5uZXJSYWRpdXMoNTApXG4gIC5vdXRlclJhZGl1cygyMDApO1xuXG5cbi8vdmFyIG1hcmdpbiA9IHtsZWZ0OiAyMCwgdG9wOiAyMCwgcmlnaHQ6IDIwLCBib3R0b206IDIwfSxcblx0XHQvL3dpZHRoID0gTWF0aC5taW4oc2NyZWVuV2lkdGgsIDUwMCkgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcblx0XHQvL2hlaWdodCA9IE1hdGgubWluKHNjcmVlbldpZHRoLCA1MDApIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cdFx0XHRcdFx0XG4vLy92YXIgc3ZnID0gZDMuc2VsZWN0KFwiI2NoYXJ0XCIpLmFwcGVuZChcInN2Z1wiKVxuXHRcdC8vLmF0dHIoXCJ3aWR0aFwiLCAod2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodCkpXG5cdFx0Ly8uYXR0cihcImhlaWdodFwiLCAoaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pKVxuICAgIC8vLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwid3JhcHBlclwiKVxuXHQgIC8vLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyAod2lkdGggLyAyICsgbWFyZ2luLmxlZnQpICsgXCIsXCIgKyAoaGVpZ2h0IC8gMiArIG1hcmdpbi50b3ApICsgXCIpXCIpO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY3N2KGNzdlVybCkudGhlbihzZXREYXRhKTtcbiAgfSwgW10pO1xuXG4gIGlmICghZGF0YSkge1xuICAgIHJldHVybiA8cHJlPkxvYWRpbmcuLi48L3ByZT47XG4gIH1cblxuICBjb25zdCBjb2xvclBpZSA9IHBpZSgpLnZhbHVlKDEpO1xuXG4gIFxuICByZXR1cm4gKFxuICAgIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNDAwLDIyMCkgcm90YXRlKDE4MCkgc2tld1goMjIwKSBza2V3WSgyMCkgXCI+XG4gICAgICAgIHtjb2xvclBpZShkYXRhKS5tYXAoZCA9PiAoXG4gICAgICAgICAgPHBhdGggZmlsbD17ZC5kYXRhWydSR0IgaGV4IHZhbHVlJ119IGQ9e3BpZUFyYyhkKX0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2c+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3RFbGVtZW50KTtcblxuLy8gVG8gY29tcHV0ZSB0aGUgYXJjcyBtYW51YWxseSAod2l0aG91dCBkMy5waWUpOlxuLy8gZGF0YS5tYXAoKGQsIGkpID0+IChcbi8vICAgPHBhdGhcbi8vICAgICBmaWxsPXtkWydSR0IgaGV4IHZhbHVlJ119XG4vLyAgICAgZD17cGllQXJjKHtcbi8vICAgICAgIHN0YXJ0QW5nbGU6IChpIC8gZGF0YS5sZW5ndGgpICogMiAqIE1hdGguUEksXG4vLyAgICAgICBlbmRBbmdsZTogKChpICsgMSkgLyBkYXRhLmxlbmd0aCkgKiAyICogTWF0aC5QSVxuLy8gICAgIH0pfVxuLy8gICAvPlxuLy8gKSlcbiJdLCJuYW1lcyI6WyJhcmMiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImNzdiIsIlJlYWN0IiwicGllIl0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFLQSxNQUFNLE1BQU07SUFDVixtR0FBbUcsQ0FBQzs7RUFFdEcsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDO0VBQ2xCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNuQjs7RUFJQSxNQUFNLE1BQU0sR0FBR0EsTUFBRyxFQUFFO0tBQ2pCLFdBQVcsQ0FBQyxFQUFFLENBQUM7S0FDZixXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7RUFhcEIsTUFBTSxHQUFHLEdBQUcsTUFBTTtJQUNoQixNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHQyxjQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBRXZDQyxlQUFTLENBQUMsTUFBTTtNQUNkQyxNQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNCLEVBQUUsRUFBRSxDQUFDLENBQUM7O0lBRVAsSUFBSSxDQUFDLElBQUksRUFBRTtNQUNULE9BQU9DLDJDQUFLLFlBQVUsRUFBTSxDQUFDO0tBQzlCOztJQUVELE1BQU0sUUFBUSxHQUFHQyxNQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztJQUdoQztNQUNFRCx1Q0FBSyxPQUFPLEtBQUssRUFBRSxRQUFRLE1BQU07UUFDL0JBLHFDQUFHLFdBQVUsc0RBQXNEO1VBQ2pFLFFBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQkEsd0NBQU0sTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBRSxFQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUc7V0FDdEQsQ0FBQztTQUNBO09BQ0E7TUFDTjtHQUNILENBQUM7RUFDRixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3BELFFBQVEsQ0FBQyxNQUFNLENBQUNBLDhCQUFDLFNBQUcsRUFBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7In0=