import vl from 'vega-lite-api';
export const viz = vl
  .markCircle({ size: 300, opacity: 0.5 })
  .encode(
    vl.x().fieldQ('Schooling').scale({ zero: false }),
    vl.y().fieldQ('Life_expectancy ').scale({ zero: false }),
    vl.color().field('Continent'),
    vl.size().fieldQ(' BMI '),
    vl.tooltip().fieldN('Country')
  );