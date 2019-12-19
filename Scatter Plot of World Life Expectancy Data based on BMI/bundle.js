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
      vl.x().fieldQ(' BMI ').scale({ zero: false }),
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fpc2h3YXJ5YTg2MTUvODlkOWYzNmZjMDE0ZGVhNjI0ODdmNzM0Nzg2NGQxNmEvcmF3L0xpZmVfRXhwZWN0YW5jeV9EYXRhLmNzdic7XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgY3N2KGNzdlVybCk7XG4gIFxuICAvLyBIYXZlIGEgbG9vayBhdCB0aGUgYXR0cmlidXRlcyBhdmFpbGFibGUgaW4gdGhlIGNvbnNvbGUhXG4gIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xuXG4gIHJldHVybiBkYXRhO1xufTsiLCJpbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5leHBvcnQgY29uc3Qgdml6ID0gdmxcbiAgLm1hcmtDaXJjbGUoeyBzaXplOiAzMDAsIG9wYWNpdHk6IDAuNSB9KVxuICAuZW5jb2RlKFxuICAgIHZsLngoKS5maWVsZFEoJyBCTUkgJykuc2NhbGUoeyB6ZXJvOiBmYWxzZSB9KSxcbiAgICB2bC55KCkuZmllbGRRKCdMaWZlX2V4cGVjdGFuY3kgJykuc2NhbGUoeyB6ZXJvOiBmYWxzZSB9KSxcbiAgICB2bC5jb2xvcigpLmZpZWxkKCdDb250aW5lbnQnKSxcbiAgICB2bC5zaXplKCkuZmllbGRRKCcgQk1JICcpLFxuICAgIHZsLnRvb2x0aXAoKS5maWVsZE4oJ0NvdW50cnknKVxuICApOyIsImltcG9ydCB2ZWdhIGZyb20gJ3ZlZ2EnO1xuaW1wb3J0IHZlZ2FMaXRlIGZyb20gJ3ZlZ2EtbGl0ZSc7XG5pbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5pbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSAndmVnYS10b29sdGlwJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tICcuL2dldERhdGEnO1xuaW1wb3J0IHsgdml6IH0gZnJvbSAnLi92aXonO1xuXG52bC5yZWdpc3Rlcih2ZWdhLCB2ZWdhTGl0ZSwge1xuICB2aWV3OiB7IHJlbmRlcmVyOiAnc3ZnJyB9LFxuICBpbml0OiB2aWV3ID0+IHsgdmlldy50b29sdGlwKG5ldyBIYW5kbGVyKCkuY2FsbCk7IH1cbn0pO1xuXG5jb25zdCBydW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG1hcmtzID0gdml6XG4gICAgLmRhdGEoYXdhaXQgZ2V0RGF0YSgpKVxuICAgIC53aWR0aCh3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAuaGVpZ2h0KHdpbmRvdy5pbm5lckhlaWdodClcbiAgICAuYXV0b3NpemUoeyB0eXBlOiAnZml0JywgY29udGFpbnM6ICdwYWRkaW5nJyB9KVxuICAgIC5jb25maWcoY29uZmlnKTtcbiAgXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXdhaXQgbWFya3MucmVuZGVy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