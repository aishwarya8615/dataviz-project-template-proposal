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

  const csvUrl = 'https://gist.githubusercontent.com/aishwarya8615/d2107f828d3f904839cbcb7eaa85bd04/raw/healthcare-dataset-stroke-data.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  const viz = vl
    .markArea({ size: 300, opacity: 0.5 })
    .encode(
      vl.x().fieldQ('age').scale({ zero: false }),
      vl.y().fieldQ('stroke').scale({ zero: false }),
      vl.color().fieldN('gender'),
      vl.size().fieldQ('bmi'),
      vl.tooltip().fieldN('smoking_status')
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fpc2h3YXJ5YTg2MTUvZDIxMDdmODI4ZDNmOTA0ODM5Y2JjYjdlYWE4NWJkMDQvcmF3L2hlYWx0aGNhcmUtZGF0YXNldC1zdHJva2UtZGF0YS5jc3YnO1xuXG5leHBvcnQgY29uc3QgZ2V0RGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGNzdihjc3ZVcmwpO1xuICBcbiAgLy8gSGF2ZSBhIGxvb2sgYXQgdGhlIGF0dHJpYnV0ZXMgYXZhaWxhYmxlIGluIHRoZSBjb25zb2xlIVxuICBjb25zb2xlLmxvZyhkYXRhWzBdKTtcblxuICByZXR1cm4gZGF0YTtcbn07IiwiaW1wb3J0IHZsIGZyb20gJ3ZlZ2EtbGl0ZS1hcGknO1xuZXhwb3J0IGNvbnN0IHZpeiA9IHZsXG4gIC5tYXJrQXJlYSh7IHNpemU6IDMwMCwgb3BhY2l0eTogMC41IH0pXG4gIC5lbmNvZGUoXG4gICAgdmwueCgpLmZpZWxkUSgnYWdlJykuc2NhbGUoeyB6ZXJvOiBmYWxzZSB9KSxcbiAgICB2bC55KCkuZmllbGRRKCdzdHJva2UnKS5zY2FsZSh7IHplcm86IGZhbHNlIH0pLFxuICAgIHZsLmNvbG9yKCkuZmllbGROKCdnZW5kZXInKSxcbiAgICB2bC5zaXplKCkuZmllbGRRKCdibWknKSxcbiAgICB2bC50b29sdGlwKCkuZmllbGROKCdzbW9raW5nX3N0YXR1cycpXG4gICk7IiwiaW1wb3J0IHZlZ2EgZnJvbSAndmVnYSc7XG5pbXBvcnQgdmVnYUxpdGUgZnJvbSAndmVnYS1saXRlJztcbmltcG9ydCB2bCBmcm9tICd2ZWdhLWxpdGUtYXBpJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tICd2ZWdhLXRvb2x0aXAnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJy4vZ2V0RGF0YSc7XG5pbXBvcnQgeyB2aXogfSBmcm9tICcuL3Zpeic7XG5cbnZsLnJlZ2lzdGVyKHZlZ2EsIHZlZ2FMaXRlLCB7XG4gIHZpZXc6IHsgcmVuZGVyZXI6ICdzdmcnIH0sXG4gIGluaXQ6IHZpZXcgPT4geyB2aWV3LnRvb2x0aXAobmV3IEhhbmRsZXIoKS5jYWxsKTsgfVxufSk7XG5cbmNvbnN0IHJ1biA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbWFya3MgPSB2aXpcbiAgICAuZGF0YShhd2FpdCBnZXREYXRhKCkpXG4gICAgLndpZHRoKHdpbmRvdy5pbm5lcldpZHRoKVxuICAgIC5oZWlnaHQod2luZG93LmlubmVySGVpZ2h0KVxuICAgIC5hdXRvc2l6ZSh7IHR5cGU6ICdmaXQnLCBjb250YWluczogJ3BhZGRpbmcnIH0pXG4gICAgLmNvbmZpZyhjb25maWcpO1xuICBcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhd2FpdCBtYXJrcy5yZW5kZXIo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