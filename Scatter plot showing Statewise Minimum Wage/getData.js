import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/aishwarya8615/51e35f3e7369fc7e9883c0b8a033397a/raw/Minimum_Wage_Data.csv';

export const getData = async () => {
  const data = await csv(csvUrl);
  
  // Have a look at the attributes available in the console!
  console.log(data[0]);

  return data;
};