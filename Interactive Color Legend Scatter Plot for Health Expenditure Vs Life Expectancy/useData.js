import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a/raw/Life_Expectancy_Data.csv';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Life_expectancy  = +d.Life_expectancy ;
      d.Total_expenditure = +d.Total_expenditure;
      d.Year = +d.Year;
      //d.Continent = +d.Continent;
      d.percentage_expenditure = +d.percentage_expenditure;
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);
  
  return data;
};