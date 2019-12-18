export const colorLegend = ( selection, props ) => {
  
  const {
    color,
    width,
    onClick,
    selectedLegend
  } = props;
  
  var legend = selection.selectAll(".legend").data(color.domain())
  var legendEnter = legend
    .enter().append("g")
      .attr("class", "legend")
  
  legendEnter
    .merge(legend)
      .attr("transform", (d, i) => `translate(-40,${(i + 8.5) * 50})`)
      .attr('opacity', d => 
        (!selectedLegend || d === selectedLegend)
          ? 1
          : 0.2
      )
      .on('click', d => onClick(
				d === selectedLegend
    			? null
    			: d
			));
      

    
  // draw legend colored rectangles
  legendEnter.append("rect")
      .attr("x", width-80)
      .attr("y", -400)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", color);

  // draw legend text
  legendEnter.append("text")
      .attr("x", width-85)
      .attr("y", -370)
      .attr("dy", ".6em")
      .style("text-anchor", "start")
      .text(function(d) { return d;});
  
};