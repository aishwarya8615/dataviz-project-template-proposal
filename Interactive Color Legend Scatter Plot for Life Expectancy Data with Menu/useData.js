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
      d.GDP = +d.GDP;
      //d.Schooling = +d.Schooling;
      d.Year = +d.Year ;
      d.Status = +d.Status ;
      d.Alcohol = +d.Alcohol;
      d.Diphtheria = +d.Diphtheria;
      //d.Schooling = +d.Schooling;
      d.Polio = +d.Polio; 
      d.Hepatitis_B = +d.Hepatitis_B;  
      d.Adult_Mortality = +d.Adult_Mortality;  
      d.infant_deaths = +d.infant_deaths;   
      d.Measles = +d.Measles; 
      d.under_five_deaths = +d.under_five_deaths; 
      d.Income_composition_of_resources = +d.Income_composition_of_resources; 
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);
  
  return data;
};