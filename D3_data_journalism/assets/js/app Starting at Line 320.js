        // originally line 320
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

          // DEBUG: WAS WORKING, NOT ANYMORE
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

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
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // change classes to change bold text
          // if (chosenXAxis === "age") {
          //   ageLabel
          //     .classed("active", true)
          //     .classed("inactive", false);
          //   povertyLabel
          //     .classed("active", false)
          //     .classed("inactive", true);
          //   incomeLabel
          //     .classed("active", false)
          //     .classed("inactive", true);
          // }
          // else if (chosenXAxis === "poverty") {
          //   ageLabel
          //     .classed("active", false)
          //     .classed("inactive", true);
          //   povertyLabel
          //     .classed("active", true)
          //     .classed("inactive", false);
          //   incomeLabel
          //     .classed("active", false)
          //     .classed("inactive", true);
          // }
          // // else for chosenXAxis === "income"
          // else {
          //   ageLabel
          //     .classed("active", false)
          //     .classed("inactive", true);
          //   povertyLabel
          //     .classed("active", false)
          //     .classed("inactive", true);
          //   incomeLabel
          //     .classed("active", true)
          //     .classed("inactive", false);
          // }
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