import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/aishwarya8615/d2107f828d3f904839cbcb7eaa85bd04/raw/healthcare-dataset-stroke-data.csv';

export const getData = async () => {
  const data = await csv(csvUrl);
  
  // Have a look at the attributes available in the console!
  console.log(data[0]);

  return data;
};