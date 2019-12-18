(function (d3,vl,vega,vegaLite,vegaTooltip) {
  'use strict';

  vl = vl && vl.hasOwnProperty('default') ? vl['default'] : vl;
  vega = vega && vega.hasOwnProperty('default') ? vega['default'] : vega;
  vegaLite = vegaLite && vegaLite.hasOwnProperty('default') ? vegaLite['default'] : vegaLite;

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickColor: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 20,
        fill: dark
      },
      "guide-title": {
        fontSize: 30,
        fill: dark
      }
    }
  };

  const csvUrl = 'https://gist.githubusercontent.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a/raw/Life_Expectancy_Data.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  const viz = vl
    .markLine({ size: 300, opacity: 0.5 })
    .encode(
      vl.x().fieldQ('GDP').scale({ zero: false }),
      vl.y().fieldQ('Life_expectancy ').scale({ zero: false }),
      vl.color().field('Year').scale({type : 'threshold' , domain: [2000,2005,2010,2015]}),
      //vl.color().field('Year').sort(['2000','2000-2005','2006-2010','2011-2015']).scale({range: ['#272727','#747474','#FF652F']}),
      vl.size().fieldQ(' BMI '),
      //vl.tooltip().fieldN('Country')
    );

  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call); }
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.body.appendChild(await marks.render());
  };
  run();

}(d3,vl,vega,vegaLite,vegaTooltip));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2NvbmZpZy5qcyIsIi4uL2dldERhdGEuanMiLCIuLi92aXouanMiLCIuLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fpc2h3YXJ5YTg2MTUvODlkOWYzNmZjMDE0ZGVhNjI0ODdmNzM0Nzg2NGQxNmEvcmF3L0xpZmVfRXhwZWN0YW5jeV9EYXRhLmNzdic7XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgY3N2KGNzdlVybCk7XG4gIFxuICAvLyBIYXZlIGEgbG9vayBhdCB0aGUgYXR0cmlidXRlcyBhdmFpbGFibGUgaW4gdGhlIGNvbnNvbGUhXG4gIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xuXG4gIHJldHVybiBkYXRhO1xufTsiLCJpbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5leHBvcnQgY29uc3Qgdml6ID0gdmxcbiAgLm1hcmtMaW5lKHsgc2l6ZTogMzAwLCBvcGFjaXR5OiAwLjUgfSlcbiAgLmVuY29kZShcbiAgICB2bC54KCkuZmllbGRRKCdHRFAnKS5zY2FsZSh7IHplcm86IGZhbHNlIH0pLFxuICAgIHZsLnkoKS5maWVsZFEoJ0xpZmVfZXhwZWN0YW5jeSAnKS5zY2FsZSh7IHplcm86IGZhbHNlIH0pLFxuICAgIHZsLmNvbG9yKCkuZmllbGQoJ1llYXInKS5zY2FsZSh7dHlwZSA6ICd0aHJlc2hvbGQnICwgZG9tYWluOiBbMjAwMCwyMDA1LDIwMTAsMjAxNV19KSxcbiAgICAvL3ZsLmNvbG9yKCkuZmllbGQoJ1llYXInKS5zb3J0KFsnMjAwMCcsJzIwMDAtMjAwNScsJzIwMDYtMjAxMCcsJzIwMTEtMjAxNSddKS5zY2FsZSh7cmFuZ2U6IFsnIzI3MjcyNycsJyM3NDc0NzQnLCcjRkY2NTJGJ119KSxcbiAgICB2bC5zaXplKCkuZmllbGRRKCcgQk1JICcpLFxuICAgIC8vdmwudG9vbHRpcCgpLmZpZWxkTignQ291bnRyeScpXG4gICk7IiwiaW1wb3J0IHZlZ2EgZnJvbSAndmVnYSc7XG5pbXBvcnQgdmVnYUxpdGUgZnJvbSAndmVnYS1saXRlJztcbmltcG9ydCB2bCBmcm9tICd2ZWdhLWxpdGUtYXBpJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tICd2ZWdhLXRvb2x0aXAnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJy4vZ2V0RGF0YSc7XG5pbXBvcnQgeyB2aXogfSBmcm9tICcuL3Zpeic7XG5cbnZsLnJlZ2lzdGVyKHZlZ2EsIHZlZ2FMaXRlLCB7XG4gIHZpZXc6IHsgcmVuZGVyZXI6ICdzdmcnIH0sXG4gIGluaXQ6IHZpZXcgPT4geyB2aWV3LnRvb2x0aXAobmV3IEhhbmRsZXIoKS5jYWxsKTsgfVxufSk7XG5cbmNvbnN0IHJ1biA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbWFya3MgPSB2aXpcbiAgICAuZGF0YShhd2FpdCBnZXREYXRhKCkpXG4gICAgLndpZHRoKHdpbmRvdy5pbm5lcldpZHRoKVxuICAgIC5oZWlnaHQod2luZG93LmlubmVySGVpZ2h0KVxuICAgIC5hdXRvc2l6ZSh7IHR5cGU6ICdmaXQnLCBjb250YWluczogJ3BhZGRpbmcnIH0pXG4gICAgLmNvbmZpZyhjb25maWcpO1xuICBcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhd2FpdCBtYXJrcy5yZW5kZXIoKSk7XG59O1xucnVuKCk7Il0sIm5hbWVzIjpbImNzdiIsIkhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBQTs7RUFFQSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUM7QUFDdkIsRUFBTyxNQUFNLE1BQU0sR0FBRztJQUNwQixJQUFJLEVBQUU7TUFDSixNQUFNLEVBQUUsS0FBSztNQUNiLFNBQVMsRUFBRSxXQUFXO0tBQ3ZCO0lBQ0QsS0FBSyxFQUFFO01BQ0wsYUFBYSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEVBQUU7UUFDWixJQUFJLEVBQUUsSUFBSTtPQUNYO01BQ0QsYUFBYSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEVBQUU7UUFDWixJQUFJLEVBQUUsSUFBSTtPQUNYO0tBQ0Y7R0FDRjs7RUNoQkQsTUFBTSxNQUFNLEdBQUcsZ0hBQWdILENBQUM7O0FBRWhJLEVBQU8sTUFBTSxPQUFPLEdBQUcsWUFBWTtJQUNqQyxNQUFNLElBQUksR0FBRyxNQUFNQSxNQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7OztJQUcvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUVyQixPQUFPLElBQUksQ0FBQztHQUNiOztFQ1ZNLE1BQU0sR0FBRyxHQUFHLEVBQUU7S0FDbEIsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7S0FDckMsTUFBTTtNQUNMLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO01BQzNDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7TUFDeEQsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O01BRXBGLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOztLQUUxQjs7RUNGSCxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7SUFDMUIsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtJQUN6QixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJQyxtQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtHQUNwRCxDQUFDLENBQUM7O0VBRUgsTUFBTSxHQUFHLEdBQUcsWUFBWTtJQUN0QixNQUFNLEtBQUssR0FBRyxHQUFHO09BQ2QsSUFBSSxDQUFDLE1BQU0sT0FBTyxFQUFFLENBQUM7T0FDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7T0FDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7T0FDMUIsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUVsQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0dBQ2pELENBQUM7RUFDRixHQUFHLEVBQUU7Ozs7In0=