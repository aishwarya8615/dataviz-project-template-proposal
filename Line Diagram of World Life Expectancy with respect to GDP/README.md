Life Expectancy Data:

Dataset Source: [Life Expectancy WHO Data](https://gist.github.com/aishwarya8615/89d9f36fc014dea62487f7347864d16a) uses the line plot visualization using vega lite api.
This visualization plot shows the Life expectancy of people with respect to in various parts of the world over a period of 15 years.

The colors represent the Year in increments of 5. Thickness of line depends on the average BMI.


Observations: 
1. This is the The Life Expectancy Vs GDP line plot(3rd sketch)
2. This visualization was done using Vega Lite API
3. Actual intension was to create 4 lines - one for each year interval. Unfortunately I was unable to figure out a way in which we have only 4 lineplots(One for each time interval). Hence modified the color schema to accomodate only 4 sets of years. Currently working merging the years to a line.

Analysis:
From the plot we can see that the life expectancy is more when GDP is within $50000 for the latest set of data we have(2010-2015).

Note: The template was forked from [Vega-Lite-API Template](https://beta.vizhub.com/curran/717a939bb09b4b3297b62c20d42ea6a3?edit=files&file=README.md)