(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  vega = vega && vega.hasOwnProperty('default') ? vega['default'] : vega;
  vegaLite = vegaLite && vegaLite.hasOwnProperty('default') ? vegaLite['default'] : vegaLite;
  vl = vl && vl.hasOwnProperty('default') ? vl['default'] : vl;

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

  const csvUrl = 'https://gist.githubusercontent.com/aishwarya8615/51e35f3e7369fc7e9883c0b8a033397a/raw/Minimum_Wage_Data.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  const viz = vl
    .markPoint({ size: 300, opacity: 0.5 })
    .encode(
     //vl.x(field("State"), type("string")),
      //vl.y(field("Low2018"), type("ordinal")),
      vl.x().fieldN('State'),
      vl.y().fieldQ('Low2018'),
      vl.color().fieldQ('Year'),
      vl.size().fieldQ('Low2018'),
      vl.tooltip().fieldN('State')
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

}(vega, vegaLite, vl, vegaTooltip, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fpc2h3YXJ5YTg2MTUvNTFlMzVmM2U3MzY5ZmM3ZTk4ODNjMGI4YTAzMzM5N2EvcmF3L01pbmltdW1fV2FnZV9EYXRhLmNzdic7XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgY3N2KGNzdlVybCk7XG4gIFxuICAvLyBIYXZlIGEgbG9vayBhdCB0aGUgYXR0cmlidXRlcyBhdmFpbGFibGUgaW4gdGhlIGNvbnNvbGUhXG4gIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xuXG4gIHJldHVybiBkYXRhO1xufTsiLCJpbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5leHBvcnQgY29uc3Qgdml6ID0gdmxcbiAgLm1hcmtQb2ludCh7IHNpemU6IDMwMCwgb3BhY2l0eTogMC41IH0pXG4gIC5lbmNvZGUoXG4gICAvL3ZsLngoZmllbGQoXCJTdGF0ZVwiKSwgdHlwZShcInN0cmluZ1wiKSksXG4gICAgLy92bC55KGZpZWxkKFwiTG93MjAxOFwiKSwgdHlwZShcIm9yZGluYWxcIikpLFxuICAgIHZsLngoKS5maWVsZE4oJ1N0YXRlJyksXG4gICAgdmwueSgpLmZpZWxkUSgnTG93MjAxOCcpLFxuICAgIHZsLmNvbG9yKCkuZmllbGRRKCdZZWFyJyksXG4gICAgdmwuc2l6ZSgpLmZpZWxkUSgnTG93MjAxOCcpLFxuICAgIHZsLnRvb2x0aXAoKS5maWVsZE4oJ1N0YXRlJylcbiAgKTsiLCJpbXBvcnQgdmVnYSBmcm9tICd2ZWdhJztcbmltcG9ydCB2ZWdhTGl0ZSBmcm9tICd2ZWdhLWxpdGUnO1xuaW1wb3J0IHZsIGZyb20gJ3ZlZ2EtbGl0ZS1hcGknO1xuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gJ3ZlZ2EtdG9vbHRpcCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9nZXREYXRhJztcbmltcG9ydCB7IHZpeiB9IGZyb20gJy4vdml6JztcblxudmwucmVnaXN0ZXIodmVnYSwgdmVnYUxpdGUsIHtcbiAgdmlldzogeyByZW5kZXJlcjogJ3N2ZycgfSxcbiAgaW5pdDogdmlldyA9PiB7IHZpZXcudG9vbHRpcChuZXcgSGFuZGxlcigpLmNhbGwpOyB9XG59KTtcblxuY29uc3QgcnVuID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBtYXJrcyA9IHZpelxuICAgIC5kYXRhKGF3YWl0IGdldERhdGEoKSlcbiAgICAud2lkdGgod2luZG93LmlubmVyV2lkdGgpXG4gICAgLmhlaWdodCh3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgLmF1dG9zaXplKHsgdHlwZTogJ2ZpdCcsIGNvbnRhaW5zOiAncGFkZGluZycgfSlcbiAgICAuY29uZmlnKGNvbmZpZyk7XG4gIFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF3YWl0IG1hcmtzLnJlbmRlcigpKTtcbn07XG5ydW4oKTsiXSwibmFtZXMiOlsiY3N2IiwiSGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUFBOztFQUVBLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUN2QixFQUFPLE1BQU0sTUFBTSxHQUFHO0lBQ3BCLElBQUksRUFBRTtNQUNKLE1BQU0sRUFBRSxLQUFLO01BQ2IsU0FBUyxFQUFFLFdBQVc7S0FDdkI7SUFDRCxLQUFLLEVBQUU7TUFDTCxhQUFhLEVBQUU7UUFDYixRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRSxJQUFJO09BQ1g7TUFDRCxhQUFhLEVBQUU7UUFDYixRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRSxJQUFJO09BQ1g7S0FDRjtHQUNGOztFQ2hCRCxNQUFNLE1BQU0sR0FBRyw2R0FBNkcsQ0FBQzs7QUFFN0gsRUFBTyxNQUFNLE9BQU8sR0FBRyxZQUFZO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLE1BQU1BLE1BQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0lBRy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRXJCLE9BQU8sSUFBSSxDQUFDO0dBQ2I7O0VDVk0sTUFBTSxHQUFHLEdBQUcsRUFBRTtLQUNsQixTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztLQUN0QyxNQUFNOzs7TUFHTCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztNQUN0QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztNQUN4QixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztNQUN6QixFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztNQUMzQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUM3Qjs7RUNISCxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7SUFDMUIsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtJQUN6QixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJQyxtQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtHQUNwRCxDQUFDLENBQUM7O0VBRUgsTUFBTSxHQUFHLEdBQUcsWUFBWTtJQUN0QixNQUFNLEtBQUssR0FBRyxHQUFHO09BQ2QsSUFBSSxDQUFDLE1BQU0sT0FBTyxFQUFFLENBQUM7T0FDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7T0FDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7T0FDMUIsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUVsQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0dBQ2pELENBQUM7RUFDRixHQUFHLEVBQUU7Ozs7In0=