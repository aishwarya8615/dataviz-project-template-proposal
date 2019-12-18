import vl from 'vega-lite-api';
export const viz = vl
  .markLine({ size: 300, opacity: 0.5 })
  .encode(
    vl.x().fieldQ('GDP').scale({ zero: false }),
    vl.y().fieldQ('Life_expectancy ').scale({ zero: false }),
    vl.color().field('Year').scale({type : 'threshold' , domain: [2000,2005,2010,2015]}),
    //vl.color().field('Year').sort(['2000','2000-2005','2006-2010','2011-2015']).scale({range: ['#272727','#747474','#FF652F']}),
    vl.size().fieldQ(' BMI '),
    //vl.tooltip().fieldN('Country')
  );