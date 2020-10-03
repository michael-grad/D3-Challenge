// @TODO: YOUR CODE HERE!
// The code for the chart is wrapped inside a function that
// automatically resizes the chart
// makeResponsive modeled after Activity 16.3.8
function makeResponsive() {

  var svgWidth = 960;
  var svgHeight = 500;

  var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  }; // closing squickly bracket for var margin

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Initial Params
  var chosenXAxis = "poverty"; // initialize variable for initial x axis before choosing

  // DEBUG!! -- added and now 2nd x axis not working
  var chosenYAxis = "healthcare"; // initialize variable for initial y axis before choosing

  // VERIFIED AS WORKING
  // function used for updating x-scale var upon click on axis label
  function xScale(chartData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(chartData, d => d[chosenXAxis]) * 0.8,
      d3.max(chartData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);

    return xLinearScale;
  } // closing squigly bracket for function xScale

  // NOT TESTED YET - SHOULD BE WORKING
  // Every time this function is called the same parameters are used
  function yScale(chartData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(chartData, d => d[chosenYAxis]) * 0.8,
      d3.max(chartData, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0]);

    return yLinearScale;
  } // closing squigly bracket for function yScale

  // NOT TESTED YET - SHOULD BE WORKING
  // Every time this function is called the same parameters are used
  // function used for updating xAxis var upon click on axis label
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);

    return xAxis;
  } // closing squigly bracket for function renderXAxes

  // NOT TESTED YET - SHOULD BE WORKING
  // Every time this function is called the same parameters are used
  // function used for updating yAxis var upon click on axis label
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
      .duration(1000)
      .call(leftAxis);

    return yAxis;
  } // closing squigly bracket for function renderYAxes

  // NOT TESTED YET - SHOULD BE WORKING
  // Every time this function is called the same parameters are used
  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      // DEBUG!! -- Upon clicking alternate xLabel, this line has error message in console
      //            Cannot read property 'age' of undefined
      .attr("cx", d => newXScale(d[chosenXAxis]))
      // console.log(chosenYAxis);
      .attr("cy", d => newYScale(d[chosenYAxis])); // changed [chosenYAxis] to d.healthcare - no impact

    return circlesGroup;
  }  // closing squigly bracket for function renderCircles

  // NOT TESTED YET - SHOULD BE WORKING
  // Every time this function is called the same parameters are used
  // function used for updating circles group with new tooltip
  // function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
  //   // QUESTION:  WHAT DOES lable = .... do?

  //   //PROBLEMSOLVE COMMENTED OUT
  //   var label;

  //   if (chosenXAxis === "poverty") {
  //     label = "in Poverty (%):";

  //     var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     // ADDED (d,i) - that did not solve d.state issue.  removed (d,i)
  //     .html(function (d) {
  //       // DEBUG!! -- CANNOT READ d.state.  THIS WAS WORKING - why is it not now?
  //       return (`${d.state}<br>Poverty: ${d.poverty} <br>Lacks Healthcare: ${d.healthcare} ${d[chosenXAxis]}`);
  //     }); // closing squigly bracket for .html(function(d)
  //   } // closing squigly bracket for if statement
  //   else if (chosenXAxis === "age") {
  //     label = "Age (Median):";

  //     var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     .html(function (d) {
  //       return (`${d.state}<br>Poverty: ${d.age} <br>Lacks Healthcare: ${d.healthcare} ${d[chosenXAxis]}`);
  //     }); // closing squigly bracket for .html(function(d)
  //   } // closing squigly bracket for else if statement
  //   else if (chosenXAxis === "income") {
  //     label = "Household Income (Median):";

  //     var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     // changed d to data in function argument - didn't change anything so changed back
  //     .html(function (d) {
  //       return (`${d.state}<br>Poverty: ${d.income} <br>Lacks Healthcare: ${d.healthcare} ${d[chosenXAxis]}`);
  //     }); // closing squigly bracket for .html(function(d)
  //   } // closing squigly bracket for else if statement

  //   // NOT TESTED YET
  //   circlesGroup.call(toolTip);
  //   // changed from circlesGroup to chartGroup -- NOT VERIFIED UNTIL STATE ABBR DISPLAYS
  //   chartGroup.on("mouseover", function (data) {
  //     // DEBUG!! -- ERROR MESSAGE IN CONSOLE. This was working, why not now?
  //     toolTip.show(data);
  //   }) // closing squigly bracket for mouseover event handler
  //     // onmouseout event
  //     .on("mouseout", function (data, index) {
  //       toolTip.hide(data);
  //     }); // closing squigly bracket for mouseout event handler

  //   return circlesGroup; // changed from chartGroup to circlesGroup.  Now the circles transition when clicking x axis label
  // }

  // VERIFIED AS WORKING
  // Retrieve data from the CSV file and execute everything below
  d3.csv("assets/data/data.csv").then(function (chartData, err) {
    if (err) throw err;

    // VERIFIED AS WORKING
    // parse data
    chartData.forEach(function (data) {
      data.poverty = +data.poverty;
      data.povertyMoe = +data.povertyMoe;
      data.age = +data.age;
      data.ageMoe = +data.ageMoe;
      data.income = +data.income;
      data.incomeMoe = +data.incomeMoe;
      data.healthcare = +data.healthcare;
      data.healthcareLow = +data.healthcareLow;
      data.healthcareHigh = +data.healthcareHigh;
      data.obesity = +data.obesity;
      data.obesityLow = +data.obesityLow;
      data.obesityHigh = +data.obesityHigh;
      data.smokes = +data.smokes;
      data.smokesLow = +data.smokesLow;
      data.smokesHigh = +data.smokesHigh;
    }); // closing squigly bracket for parsing the data

    // VERIFIED AS WORKING
    // xLinearScale function above csv import
    var xLinearScale = xScale(chartData, chosenXAxis);

    // NOT TESTED YET - SHOULD BE WORKING
    // Create y scale function
    var yLinearScale = yScale(chartData, chosenYAxis);
    // var yLinearScale = d3.scaleLinear(chartData, chosenYAxis)
    // .domain([0, d3.max(chartData, d => d.healthcare)])
    // .range([height, 0]);

    // NOT TESTED YET - SHOULD BE WORKING
    // NOTE:  leftAxis also defined under function renderYAxes
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // VERIFIED AS WORKING
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // VERIFIED AS WORKING
    // QUESTION:  WHAT IS chartGroup?
    // append y axis
    var yAxis = chartGroup.append("g") // added var yAxis =
      .classed("y-axis", true) // added
      .call(leftAxis);

    

    // VERIFIED AS WORKING
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      // DEBUG!! -- // changed and now 2nd x axis not working
      .attr("cy", d => yLinearScale(d[chosenYAxis])) // changed from d.healthcare to d[chosenYAxis]
      .attr("r", 20)
      .attr("fill", "pink")
      .attr("opacity", ".5")
      // DeBUG!! -- COMMENTED OUT
      // .append("text") {
      //   font_size: 12,
      //   color: black,
      //   state_text:  
      // }
      .text(d => d.abbr);
    //  DEBUG!! -- State abbr not displaying on chart

    // // COMMENTED OUT - PROBLEMSOLVE
    // var stateGroup = chartGroup.selectAll("circle")
    //   .data(chartData)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d => xLinearScale(d[chosenXAxis]))
    //   // DEBUG!! -- // changed and now 2nd x axis not working
    //   .attr("cy", d => yLinearScale(d.healthcare)) // changed from d.healthcare to d[chosenYAxis]
    //   .attr("r", 10)
    //   .text(d => d.abbr);

    // VERIFIED AS WORKING
    // Create group for 3 x-axis labels
    var labelsXGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);

    // VERIFIED AS WORKING
    var povertyLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty") // value to grab for event listener
      .classed("active", true)
      .text("in Poverty (%)");

    // VERIFIED AS WORKING
    // changed from albumsLabel to povertyLabel
    var ageLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "age") // value to grab for event listener
      .classed("inactive", true)
      .text("Age (Median)");

    // VERIFIED AS WORKING
    // Added 3rd label to x-axis
    var incomeLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "income") // value to grab for event listener
      .classed("inactive", true)
      .text("Household Income (Median)");

    // DEBUG!! -- not in correct location
    //         -- should be x, y
    //         -- displayed at bottom (not centered) and left of axis
    // Create group for 3 y-axis labels
    var labelsYGroup = chartGroup.append("g")
      .attr("transform", `translate(${0 - 20}, ${height / 30})`) // changed from /2 to /30 to center along y axis
      // .classed("centered", true);
      .style("text-anchor", "middle"); // added .style to center text in g tag

    // DEBUG!! -- was working, now no longer displayed  
    // append y axis
    // changed from chartGroup.append("text")
    var healthcareLabel = labelsYGroup.append("text")
      .attr("transform", "rotate(-90)")
      // DEBUG!! -- y labels are offset vertically
      // changed y...(height /2) - not visible
      // changed x... -45 - not visible
      .attr("y", 0 - 45) // changed - margin.left to - 45
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("value", "healthcare")
      .classed("axis-text", true)
      .classed("active", true)
      .text("Lacks Healthcare (%)");
    // DEBUG!! -- added and now 2nd x axis not working
    var smokesLabel = labelsYGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 65)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("value", "smokes")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("Smokes (%)");

    var obesityLabel = labelsYGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 85)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("value", "obesity")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("Obese (%)");

    // NOT TESTED YET - SHOULD BE WORKING
    // updateToolTip function above csv import.  Removed var from line 183
    // var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
    // x axis labels event listener
    labelsXGroup.selectAll("text")
      .on("click", function () {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

          // replaces chosenXAxis with value
          chosenXAxis = value;

          // console.log(chosenXAxis)

          // VERIFIED AS WORKING
          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(chartData, chosenXAxis);

          // VERIFIED AS WORKING
          // updates x axis with transition
          xAxis = renderXAxes(xLinearScale, xAxis);

          // DEBUG: WAS WORKING, NOT ANYMORE
          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

          // DEBUG: Y AXIS LABELS NOT CENTERED
          // updates tooltips with new info
          // circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // COMMENTED OUT: PROBLEM SOLVE
          // change classes to change bold text
            if (chosenXAxis === "age") {
              ageLabel
                .classed("active", true)
                .classed("inactive", false);
              povertyLabel
                .classed("active", false)
                .classed("inactive", true);
              incomeLabel
                .classed("active", false)
                .classed("inactive", true);
            } // closing squigly bracket for if statement (chosenXAxis === "age")
            else if (chosenXAxis === "poverty") {
              ageLabel
                .classed("active", false)
                .classed("inactive", true);
              povertyLabel
                .classed("active", true)
                .classed("inactive", false);
              incomeLabel
                .classed("active", false)
                .classed("inactive", true);
            } // closing squigly bracket for if else statement (chosenXAxis === "poverty")
            // else for chosenXAxis === "income"
            else {
              ageLabel
                .classed("active", false)
                .classed("inactive", true);
              povertyLabel
                .classed("active", false)
                .classed("inactive", true);
              incomeLabel
                .classed("active", true)
                .classed("inactive", false);
            } // closing squigly bracket for else statement
          // }
        } // closing squigly bracket for 1st if statement (value !== chosenXAxis)
      }) // closing squigly bracket for x axis labels event listener

    // NOT TESTED YET
    // y axis labels event listener
    labelsYGroup.selectAll("text")
      .on("click", function () {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenYAxis) {

          // replaces chosenXAxis with value
          chosenYAxis = value;

          // console.log(chosenXAxis)

          // functions here found above csv import
          // updates x scale for new data
          yLinearScale = yScale(chartData, chosenYAxis);

          // updates x axis with transition
          yAxis = renderYAxes(yLinearScale, yAxis);

          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

          // updates tooltips with new info
          // circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // change classes to change bold text
          if (chosenYAxis === "smokes") {
            smokesLabel
              .classed("active", true)
              .classed("inactive", false);
            healthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            obesityLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenYAxis === "healthcare") {
            smokesLabel
              .classed("active", false)
              .classed("inactive", true);
            healthcareLabel
              .classed("active", true)
              .classed("inactive", false);
              obesityLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          // else for chosenXAxis === "income"
          else if (chosenYAxis === "obesity") {
            smokesLabel
              .classed("active", false)
              .classed("inactive", true);
            healthcareLabel
              .classed("active", false)
              .classed("inactive", true);
              obesityLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        } // closing squigly bracket for 1st if statement (value !== chosenYAxis)



      }); // closing squigly bracket for y axis labels event listener
  }).catch(function (error) {
    console.log(error);
  }); // closing squickly brackets for d3.csv reading of raw data 
} // closing squickly brackets for function makeResponsive 

// When the browser loads, makeResponsive() is called.
makeResponsive();

// DEBUG!! -- chart not responsive upon resizing the window
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);