# Interactive Dashboard Using Python Flask,MongoDB, and Javascript

**COMPANY MASTER DATA (Source: [https://data.gov.in/])**

I have used MongoDB for storing and querying the data, Python for building a web server that interacts with MongoDB and serving html pages, Javascript libraries d3.js, dc.js and crossfilter.js for building interactive charts.

For building the charts, I have used 3 Javascript libraries: crossfilter.js, d3.js and dc.js.

*crossfilter.js is a Javascript library for grouping, filtering, and aggregating large datasets.
*d3.js is a Javascript library for controlling the data and building charts.
*dc.js is a Javascript charting library that leverages both crossfilter.js and d3.js, and makes the creation of highly interactive data visualization simple.

Mongodb Connection
```
app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'delhi'
COLLECTION_NAME = 'projects'
FIELDS = {'AUTHORIZED_CAPITAL':True,'PAIDUP_CAPITAL':True,'COMPANY_STATUS':True,'PRINCIPAL_BUSINESS_ACTIVITY':True,'COMPANY_NAME':True,'COMPANY_CLASS':True,'_id':False}
```

```
if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)
```

.defer is for reading the projects data
```
   d3.json("delhi/projects", function (projectsJson) 
```

Creating a Crossfilter instance:
```
  var ndx = crossfilter(projectsJson);
```
Defining  5 data dimensions, namely Authorized Capital, Company Class, Principal Business Activity, Company Status, and Company Name
```
    var pieTypeDim = ndx.dimension(function(d) { return d.AUTHORIZED_CAPITAL; });
	var pieDim = ndx.dimension(function(d) { return d.COMPANY_CLASS; });
	var rowLevelDim = ndx.dimension(function(d) { return d.PRINCIPAL_BUSINESS_ACTIVITY; });
	var bubbleDim = ndx.dimension(function(d) { return d.COMPANY_STATUS; });
	var DataDim = ndx.dimension(function(d) { return d.COMPANY_NAME; });
```
Defining Data groups:
```
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
```
Defining DC Charts:
```
    var rowChart = dc.pieChart("#pie-chart");
	var row1Chart = dc.rowChart("#row-chart");
	var bubbleChart = dc.rowChart("#bubble-chart");
	var dataTable = dc.dataTable("#data-chart");
```

