import vl from 'vega-lite-api';
export const viz = vl
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