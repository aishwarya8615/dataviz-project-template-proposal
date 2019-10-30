# Data Visualization Project - Life Expectancy Data

This visualization project mainly aims at providing insights about the Life Expectancy and its related factors, of people belonging to various countries over a span of 15 years. Although there has been a lot of studies undertaken in the past on factors affecting life expectancy,I would like to use this visualization project as an opportunity to display the effect of immunization factors, mortality factors, economic factors, social factors and other health related factors on Life Expectancy, in a nutshell.

## Data

The data I used to visualize for my project is [Life Expectancy Data](https://gist.github.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a).  
The Global Health Observatory (GHO) data repository under World Health Organization (WHO) keeps track of the health status as well as many other related factors for all countries. The data-sets are made available to public for the purpose of health data analysis. This data-set related to life expectancy, health factors for 193 countries has been collected from the same WHO data repository website and its corresponding economic data was collected from United Nation website.
Since the observations of this dataset are based on different countries and continents, it will be easier for a country to determine the predicting factor which is contributing to lower value of life expectancy. This will help in suggesting a country/continent, which area should be given importance in order to efficiently improve the life expectancy of its population.

## Questions & Tasks

After analysing the data, I came up with the following tasks and questions which were used to drive the visualization and interaction decisions for this project:

 * How does Infant and Adult mortality rates affect life expectancy
 * Does Life Expectancy have positive or negative relationship with drinking alcohol?
 * Do densely populated countries tend to have lower life expectancy? 
 * Is there any correlation between Life expectancy and healthcare expenditure? Should a country/continent having a lower life expectancy value(<65) increase its healthcare expenditure in order to improve its average lifespan? 

## Sketches

The above tasks helped me to come up with a few sketches that assisted me in making the final visualizations.
Sketch 1:

![image](https://user-images.githubusercontent.com/54454914/65569319-2347b300-df2b-11e9-9d86-0f2fe75cda81.png)

Sketch 2:

![image](https://user-images.githubusercontent.com/54454914/65569396-7883c480-df2b-11e9-9da7-f4fb1f76adec.png)

## Prototypes

Over the course of my class, I created many prototype visualizations exploring this data. 
Initially, they comprised of a series of scatterplots and line chart with various input parameters like “Year”, “Diphtheria Vaccination” ,”Schooling” and so on versus the Life expectancy of various continents which gave a flavour of the correlation of each parameter. 

Please find below a few of the prototypes created:

[![image](https://user-images.githubusercontent.com/54454914/65568969-a23bec00-df29-11e9-91d4-43f46d856ff9.png)](https://beta.vizhub.com/aishwarya8615/e92690e07721405ba299193059e66318)
The above scatter plot can be used to understand Life expectancy over the span of 15 years and they are color coded for each continent.

[![image](https://user-images.githubusercontent.com/54454914/65569060-1ffff780-df2a-11e9-9fc9-499f73077c46.png)](https://beta.vizhub.com/aishwarya8615/3ee089b6e0194edba2dc1f7f0e04d62f)
This visualization plot shows the Life expectancy of people in various parts of the world who had taken Diphtheria vaccination(DTP vaccination given for kids under 1 year) over a period of 15 years

[![image](https://user-images.githubusercontent.com/54454914/65569243-dcf25400-df2a-11e9-845b-ca85085f541c.png)](https://beta.vizhub.com/aishwarya8615/e961019bd2244b8595c38b4cb0c47ceb)
This line plot visualization uses vega lite api. This visualization plot shows the Life expectancy of people with respect to GDP in various parts of the world over a period of 15 years.

These data helped me in creating my final visualizations.      

## Final Visualizations

My final project comprises of the following visualizations:

* Visualization #1:
[![image](https://user-images.githubusercontent.com/54454914/67837333-323ef980-fac5-11e9-9763-4b3fb755c6c4.png)](https://beta.vizhub.com/aishwarya8615/9280287ff4d34683bfbf444502255067)
My first step was to combine the above prototypes into a single visualization. For this, I used dropdown menu's that helps us to choose the required field's and updated the scatter plots accordingly.There is an additional menu dropdown for choosing color legend. 

* Visualization #2:
[![image](https://user-images.githubusercontent.com/54454914/67839767-ca8bad00-faca-11e9-90b3-9ac8f8a375e4.png)
](https://beta.vizhub.com/aishwarya8615/879dc1e7f9e4408fb551c7a9b91f0f9b)
This bar chart takes required inputs from the data(like Alcohol Consumption, Life Expectancy and Year) and uses these as inputs to both X and Y axes with the help of an Interactive Color Legend using 'Year' as input. Here, aggregate of Alcohol Consumption is considered in X Axis and Life Expectancy in Y Axis. This scatter plot would help in determining the relationship between Alcohol Consumption and Life Expectancy in various continents. The tooltip provides a summary about the above mentioned correlation with respect to the year.

* Visualization #3:
[![image](https://user-images.githubusercontent.com/54454914/67837782-39b2d280-fac6-11e9-9a22-4f2cb76fea25.png)](https://beta.vizhub.com/aishwarya8615/80dd883f626a4f9ca7a1c7778f17dde9)
As an enhancement to Visualization #1, I implemented the interactive color legend and updated the scatterplot eith informative tooltips.This scatter plot would help in finding the correlation between these various inputs using Continent as the color legend. Clicking on th color legend would display the data relevant to that continent. Hovering over the data would display all necessary information to summarize the visualized data in the form of Continent,Year, and the X and Y Axes values. 

Through the visualizations, I was able to analyse and display how various factors affected Life expectancy worldwide.

## Schedule of Deliverables

* Scatter Plot with Color Menu for Life Expectancy Data  - Due Date :  10/02/2019 - Completed
    - The dropdown menu helps in choosing multiple input options and helps finding their correlation with each other.
* Scatter Plot depicting Life expectancy and Healthcare expenditure for different continents  -  Due Date: 10/09/2019 - Completed
    - This scatter plot would help in finding the correlation between life expectancy and healthcare expenditure inturn helping countries to improve the life span.
* Bar chart/Scatter Plot of Life Expectancy Vs Alcohol Consumption    - Due Date: 10/16/2019 - Completed
    - The positive/negative relationship of Alcohol consumption to life expectancy is determined.
 * Interactive Plot of Infant and Adult mortality Vs Life Expectancy over 15 years. -  Due Date: 10/23/2019 - Completed
     - Interactive chart, highlighting the input category on mouse hover.
     
## Future Scope

* Bivariate Choropleth map with interactive filtering 
    - This interactive map helps in analyzing whether the densely populated countries have lower life expectancy or not.
    - Color coding denotes the different populated areas(densely populated areas have darker shades than less densely populated ones).Should be able to select the country on mouse click.
    - Mouse hover displays country name, population and life expectancy.
 *  Combining the Map and a histogram-dynamically changing the Life Expectancy based on the countries chosen.
 
 ## Visualization Tools & Platform
 
 * Vega Lite API
 * D3
 * React
 * All coding was done on VizHub
 
 ## References
 
 * Visualization Analysis & Design by Tamara Munzner (2014)
 * Videos and articles provided by Prof. Curran Kelleher
