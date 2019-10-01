# Data Visualization Project

## Data

The data I propose to visualize for my project is [Life Expectancy Data](https://gist.github.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a).  
The Global Health Observatory (GHO) data repository under World Health Organization (WHO) keeps track of the health status as well as many other related factors for all countries. The data-sets are made available to public for the purpose of health data analysis. This data-set related to life expectancy, health factors for 193 countries has been collected from the same WHO data repository website and its corresponding economic data was collected from United Nation website.
Although there have been lot of studies undertaken in the past on factors affecting life expectancy considering demographic variables, income composition and mortality rates. It was found that affect of immunization and human development index was not taken into account in the past. Important immunization like Hepatitis B, Polio and Diphtheria will also be considered for the analysis In a nutshell, this study will focus on immunization factors, mortality factors, economic factors, social factors and other health related factors as well. Since the observations of this dataset are based on different countries, it will be easier for a country to determine the predicting factor which is contributing to lower value of life expectancy. This will help in suggesting a country which area should be given importance in order to efficiently improve the life expectancy of its population.


## Prototypes

I’ve created proof of concept visualizations of this data. They comprise of a series of scatterplots with various input parameters like “Year”, “Diphtheria Vaccination”, “BMI” ,”Schooling” versus the Life expectancy of various continents. I have also created line charts for GDP vs Life Expectancy and all these plots and charts shows that the Life Expectancy in the continent of Europe is higher for all the input parameters considered when compared to  other continents. As this data is over a span of 15 years we can say that Europe is following the right path of educating its people and providing vaccination facilities. 

Please find below a few of the visualizations:


[![image](https://user-images.githubusercontent.com/54454914/65568969-a23bec00-df29-11e9-91d4-43f46d856ff9.png)](https://beta.vizhub.com/aishwarya8615/e92690e07721405ba299193059e66318)

[![image](https://user-images.githubusercontent.com/54454914/65569060-1ffff780-df2a-11e9-9fc9-499f73077c46.png)](https://beta.vizhub.com/aishwarya8615/3ee089b6e0194edba2dc1f7f0e04d62f)

[![image](https://user-images.githubusercontent.com/54454914/65569113-563d7700-df2a-11e9-8d8b-40a164b0f88a.png)](https://beta.vizhub.com/aishwarya8615/e064112e923b4934a7acf25e8e987851)

[![image](https://user-images.githubusercontent.com/54454914/65569193-ae747900-df2a-11e9-86a3-d9803ed3a750.png)
](https://beta.vizhub.com/aishwarya8615/8ddcb121338441d89bc292b6fed31c68)

[![image](https://user-images.githubusercontent.com/54454914/65569243-dcf25400-df2a-11e9-845b-ca85085f541c.png)](https://beta.vizhub.com/aishwarya8615/e961019bd2244b8595c38b4cb0c47ceb)


## Questions & Tasks

The following tasks and questions will drive the visualization and interaction decisions for this project:

 * How does Infant and Adult mortality rates affect life expectancy
 * Does Life Expectancy have positive or negative relationship with drinking alcohol?
 * Do densely populated countries tend to have lower life expectancy? 
 * Is there any correlation between Life expectancy and healthcare expenditure? Should a country/continent having a lower life expectancy value(<65) increase its healthcare expenditure in order to improve its average lifespan? 

## Sketches

Find below a few sketches of the visualizations I would like to work on for this data.

![image](https://user-images.githubusercontent.com/54454914/65569319-2347b300-df2b-11e9-9d86-0f2fe75cda81.png)

![image](https://user-images.githubusercontent.com/54454914/65569396-7883c480-df2b-11e9-9da7-f4fb1f76adec.png)


## Open Questions

- I noticed a dip in the data at lower BMI and Diphtheria vaccination administration which makes me wonder the reason for this behaviour. Would there be other input parameters with such a behavior? Does it mean that the data is incorrect?
- Area Plot appears differently with the mortatlity rates and life expectancy.Need to figure out the reason

## Schedule of Deliverables
* Scatter Plot with Color Menu for Life Expectancy Data  - Due Date :  10/02/2019
    - The dropdown menu helps in choosing multiple input options and helps finding their correlation with each other.
* Scatter Plot depicting Life expectancy and Healthcare expenditure for different continents  -  Due Date: 10/09/2019
    - This scatter plot would help in finding the correlation between life expectancy and healthcare expenditure inturn helping countries to improve the life span.
* Bar chart/Scatter Plot of Life Expectancy Vs Alcohol Consumption    - Due Date: 10/16/2019
    - The positive/negative relationship of Alcohol consumption to life expectancy is determined.
* Bivariate Choropleth map with interactive filtering  - Due Date: 10/23/2019
    - This interactive map helps in analyzing whether the densely populated countries have lower life expectancy or not.
    - Color coding denotes the different populated areas(dense has darker shades than less dense).Would want to be able to select the         country on mouse click.
    - Mouse hover displays country name, population and life expectancy.
 * Interactive Area/Line Chart of Infant and Adult mortality Vs Life Expectancy over 15 years. -  Due Date: 10/30/2019
     - Interactive chart highlighting the input category on mouse hover.
