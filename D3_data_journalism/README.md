# D3-Challenge

# Correlations Between Health Risks and Age, Income

* Summary

In this activity, % of state population lacking healthcare is plotted against % of the state population in poverty for all 50 US states.  Additional x-axes (median age, and median household income) for each state are available for the user to choose and thereby replot points for all 50 states.  Likewise, additional y-axes (% of state population that smoke, and % of state population that are obese) for each state are available for the user to select and thereby replot points for all 50 states.  As a consequency, by selecting the x-axis and y-axis, the user can choose to show any of 9 plots.

Each plot point is labels with its corresponding state abbreviation.  Also, a tooltip has been added which shows the state name, and plot coordinates and axes labels.

## Strategy

* Functions were established to compartamentalize replotting aspects upon choosing an x-axis or y-axis:

  1. function xScale:  uses chartData, chosenXAxis as inputs.  xLinearScale is the output.

  2. function yScale:  uses chartData, chosenYAxis as inputs.  yLinearScale is the output.

  3. function renderXAxes:  uses newXScale, xAxis as inputs.  xAxis is the output.

  4. function renderYAxes:  uses newYScale, yAxis as inputs.  yAxis is the output.

  5. function renderCircles:  uses circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis, stateGroup as inputs.  circlesGroup is the output.

* Event handlers were put in place to call the functions above upon choosing an axis.  In addition, event handlers were created to ensure the tooltip showed the appropriate data upon moving the mouse over a datapoint.  The data shown changes when an axis is changed.

* To make it clear which axis is selected for the plot, the "active" axes are labeled in bold text, while all others are unbolded.

* The chart is redrawn as the window is resized.

## Conclusions

* Four paragraphs summarize findings identified while analyzing the 9 variations of charts.
