
d3.json("delhi/projects", function (projectsJson) {

	
	
	var ndx = crossfilter(projectsJson);
    
	
	
	
	var pieTypeDim = ndx.dimension(function(d) { return d.AUTHORIZED_CAPITAL; });
	var pieDim = ndx.dimension(function(d) { return d.COMPANY_CLASS; });
	var rowLevelDim = ndx.dimension(function(d) { return d.PRINCIPAL_BUSINESS_ACTIVITY; });
	var bubbleDim = ndx.dimension(function(d) { return d.COMPANY_STATUS; });
	var DataDim = ndx.dimension(function(d) { return d.COMPANY_NAME; });

	
	var numProjectsByResourceType = pieTypeDim.group()
	.reduceCount(function(d){return d.AUTHORIZED_CAPITAL;});
	var pieDimType = pieDim.group()
	.reduceCount(function(d){return d.COMPANY_CLASS;});
	var numProjectsByPovertyLevel = rowLevelDim.group()
	.reduceCount(function(d){return d.PRINCIPAL_BUSINESS_ACTIVITY;});
	var bubbleDimgroup = bubbleDim.group()
	.reduceCount(function(d){return d.COMPANY_NAME;});

	
	
	var DataDimgroup = DataDim.group()
	.reduceCount(function(d){return d.COMPANY_STATUS;});
    
	var rowChart = dc.pieChart("#pie-chart");
	var row1Chart = dc.rowChart("#row-chart");
	var bubbleChart = dc.rowChart("#bubble-chart");
	var dataTable = dc.dataTable("#data-chart");

	rowChart
        .width(400)
        .height(400)
		.dimension(pieTypeDim)
        .group(numProjectsByResourceType)
		.radius(200)
		.slicesCap(5)
    .legend(dc.legend().gap(3));
       
		
	dataTable
	.width(960)
	.height(800)
	
    .dimension(DataDim)
    .group(function(d) { return d.COMPANY_NAME;
     })

    .columns([
     function(d) { return d.COMPANY_STATUS; },
     function(d) { return d.COMPANY_CLASS; },

	  function(d) { return d.PAIDUP_CAPITAL; },
      function(d) { return d.AUTHORIZED_CAPITAL; },
      
      function(d) { return d.PRINCIPAL_BUSINESS_ACTIVITY; },
    ])
    .sortBy(function(d){ return d.PRINCIPAL_BUSINESS_ACTIVITY; })
    .order(d3.ascending);
	
		
	bubbleChart
         .width(700)
        .height(150)
		.dimension(pieDim)
        .group(pieDimType)
		.xAxis().tickFormat();
		
	row1Chart
        .width(600)
        .height(600)
		.dimension(rowLevelDim)
        .group(numProjectsByPovertyLevel)
		.xAxis().tickFormat(50);
        	

	
    dc.renderAll();

});