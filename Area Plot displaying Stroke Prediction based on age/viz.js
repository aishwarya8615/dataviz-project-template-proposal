import vl from 'vega-lite-api';
export const viz = vl
  .markArea({ size: 300, opacity: 0.5 })
  .encode(
    vl.x().fieldQ('age').scale({ zero: false }),
    vl.y().fieldQ('stroke').scale({ zero: false }),
    vl.color().fieldN('gender'),
    vl.size().fieldQ('bmi'),
    vl.tooltip().fieldN('smoking_status')
  );