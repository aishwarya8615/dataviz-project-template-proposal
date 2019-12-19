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

  const csvUrl = 'https://gist.githubusercontent.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a/raw/Life_Expectancy_Data.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  const viz = vl
    .markCircle({ size: 300, opacity: 0.5 })
    .encode(
      vl.x().fieldQ('Schooling').scale({ zero: false }),
      vl.y().fieldQ('Life_expectancy ').scale({ zero: false }),
      vl.color().field('Continent'),
      vl.size().fieldQ(' BMI '),
      vl.tooltip().fieldN('Country')
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fpc2h3YXJ5YTg2MTUvODlkOWYzNmZjMDE0ZGVhNjI0ODdmNzM0Nzg2NGQxNmEvcmF3L0xpZmVfRXhwZWN0YW5jeV9EYXRhLmNzdic7XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgY3N2KGNzdlVybCk7XG4gIFxuICAvLyBIYXZlIGEgbG9vayBhdCB0aGUgYXR0cmlidXRlcyBhdmFpbGFibGUgaW4gdGhlIGNvbnNvbGUhXG4gIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xuXG4gIHJldHVybiBkYXRhO1xufTsiLCJpbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5leHBvcnQgY29uc3Qgdml6ID0gdmxcbiAgLm1hcmtDaXJjbGUoeyBzaXplOiAzMDAsIG9wYWNpdHk6IDAuNSB9KVxuICAuZW5jb2RlKFxuICAgIHZsLngoKS5maWVsZFEoJ1NjaG9vbGluZycpLnNjYWxlKHsgemVybzogZmFsc2UgfSksXG4gICAgdmwueSgpLmZpZWxkUSgnTGlmZV9leHBlY3RhbmN5ICcpLnNjYWxlKHsgemVybzogZmFsc2UgfSksXG4gICAgdmwuY29sb3IoKS5maWVsZCgnQ29udGluZW50JyksXG4gICAgdmwuc2l6ZSgpLmZpZWxkUSgnIEJNSSAnKSxcbiAgICB2bC50b29sdGlwKCkuZmllbGROKCdDb3VudHJ5JylcbiAgKTsiLCJpbXBvcnQgdmVnYSBmcm9tICd2ZWdhJztcbmltcG9ydCB2ZWdhTGl0ZSBmcm9tICd2ZWdhLWxpdGUnO1xuaW1wb3J0IHZsIGZyb20gJ3ZlZ2EtbGl0ZS1hcGknO1xuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gJ3ZlZ2EtdG9vbHRpcCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9nZXREYXRhJztcbmltcG9ydCB7IHZpeiB9IGZyb20gJy4vdml6JztcblxudmwucmVnaXN0ZXIodmVnYSwgdmVnYUxpdGUsIHtcbiAgdmlldzogeyByZW5kZXJlcjogJ3N2ZycgfSxcbiAgaW5pdDogdmlldyA9PiB7IHZpZXcudG9vbHRpcChuZXcgSGFuZGxlcigpLmNhbGwpOyB9XG59KTtcblxuY29uc3QgcnVuID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBtYXJrcyA9IHZpelxuICAgIC5kYXRhKGF3YWl0IGdldERhdGEoKSlcbiAgICAud2lkdGgod2luZG93LmlubmVyV2lkdGgpXG4gICAgLmhlaWdodCh3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgLmF1dG9zaXplKHsgdHlwZTogJ2ZpdCcsIGNvbnRhaW5zOiAncGFkZGluZycgfSlcbiAgICAuY29uZmlnKGNvbmZpZyk7XG4gIFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF3YWl0IG1hcmtzLnJl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