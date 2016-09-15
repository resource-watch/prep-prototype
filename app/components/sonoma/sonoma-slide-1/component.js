import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  vegaSpec: {
axes: [
{
type: "x",
scale: "x",
ticks: 5,
title: "years",
values: [
1920,
1940,
1960,
1980,
2000,
2020,
2040,
2060,
2080,
2099
],
properties: {
axis: {
stroke: {
value: "#E6E6E6"
},
opacity: {
value: 1
},
strokeWidth: {
value: 1.5
}
},
ticks: {
stroke: {
value: "#9BA2AA"
}
},
title: {
fill: {
value: "#9BA2AA"
},
font: {
value: "Montserrat, sans-serif"
},
fontSize: {
value: 12
}
},
labels: {
fill: {
value: "#9BA2AA"
},
font: {
value: "Montserrat, sans-serif"
},
align: {
value: "center"
},
baseline: {
value: "top"
},
fontSize: {
value: 10
}
}
}
},
{
grid: false,
type: "y",
scale: "y",
ticks: 10,
title: "Summer max temperature ºC",
properties: {
axis: {
stroke: {
value: "#E6E6E6"
},
opacity: {
value: 1
},
strokeWidth: {
value: 1.5
}
},
ticks: {
stroke: {
value: "#9BA2AA"
}
},
title: {
x: {
value: 50
},
y: {
value: -20
},
fill: {
value: "#9BA2AA"
},
font: {
value: "Montserrat, sans-serif"
},
angle: 90,
fontSize: {
value: 12
}
},
labels: {
fill: {
value: "#9BA2AA"
},
font: {
value: "Montserrat, sans-serif"
},
align: {
value: "right"
},
baseline: {
value: "middle"
},
fontSize: {
value: 10
}
}
},
titleOffset: 15
}
],
data: [
{
url: "http://api.resourcewatch.org/query/3feaf26c-42c8-43ce-b1b5-07a02a773c36?sql=select * from index_3feaf26c42c843ceb1b507a02a773c36 order by date asc",
name: "data",
format: {
type: "json",
property: "data"
}
},
{
name: "hist",
source: "data",
transform: [
{
test: "datum.date < 2010",
type: "filter"
}
]
},
{
name: "modeled",
source: "data",
transform: [
{
test: "datum.date > 2009",
type: "filter"
}
]
},
{
name: "legend",
values: [
{
cat: "Historic"
},
{
cat: "PCM A2"
},
{
cat: "Models amplitude"
}
]
},
{
name: "tooltip",
source: "data",
transform: [
{
test: "datum.date == indexDate.date",
type: "filter"
},
{
expr: "datum.date > 2060 ? indexDate.xRight : indexDate.xLeft",
type: "formula",
field: "xTooltip"
},
{
expr: "datum.date < 2010 ? datum.HST : datum.PCM_A2",
type: "formula",
field: "value"
},
{
expr: "indexDate.xLeft",
type: "formula",
field: "xData"
},
{
by: "date",
type: "sort"
}
]
}
],
marks: [
{
name: "datalines-hist",
type: "group",
marks: [
{
from: {
data: "hist"
},
type: "line",
properties: {
enter: {
x: {
field: "date",
scale: "x"
},
y: {
field: "HST",
scale: "y"
},
height: {
scale: "y"
},
stroke: {
value: "#efa600"
},
strokeWidth: {
value: 1.5
},
strokeOpacity: {
value: 1
}
}
}
}
]
},
{
name: "datalines-modeled",
type: "group",
marks: [
{
from: {
data: "modeled"
},
type: "area",
properties: {
enter: {
x: {
field: "date",
scale: "x"
},
y: {
field: "min",
scale: "y"
},
y2: {
field: "max",
scale: "y"
},
fill: {
value: "#1a6d9e"
},
fillOpacity: {
value: 0.2
},
interpolate: {
value: "linear"
}
}
}
},
{
from: {
data: "modeled"
},
type: "line",
properties: {
enter: {
x: {
field: "date",
scale: "x"
},
y: {
field: "PCM_A2",
scale: "y"
},
height: {
scale: "y"
},
stroke: {
value: "#1a6d9e"
},
strokeWidth: {
value: 1.5
},
strokeOpacity: {
value: 1
}
}
}
}
]
},
{
name: "90 perc",
type: "rule",
properties: {
enter: {
x: {
value: 0
},
y: {
scale: "y",
value: 31.35
},
x2: {
field: {
group: "width"
}
},
stroke: {
value: "#263e57"
},
strokeWidth: {
value: 1.5
},
strokeOpacity: {
value: 0.2
}
}
}
},
{
name: "10 perc",
type: "rule",
properties: {
enter: {
x: {
value: 0
},
y: {
scale: "y",
value: 29.3
},
x2: {
field: {
group: "width"
}
},
stroke: {
value: "#263e57"
},
strokeWidth: {
value: 1.5
},
strokeOpacity: {
value: 0.2
}
}
}
},
{
from: {
data: "tooltip"
},
name: "tooltip",
type: "group",
marks: [
{
type: "text",
properties: {
update: {
x: {
value: 10
},
y: {
value: 17
},
fill: {
value: "#3B4F63"
},
font: {
value: "Montserrat, sans-serif"
},
text: {
template: "{{indexDate.xLeft}}"
},
opacity: {
value: 0.8
},
fontSize: {
value: 11
},
fontWeight: {
value: "bold"
}
}
}
},
{
name: "mean",
type: "text",
properties: {
update: {
x: {
value: 11
},
y: {
value: 35
},
fill: {
value: "#3B4F63"
},
font: {
value: "Montserrat, sans-serif"
},
text: {
template: "{{parent.value|number:'.2f'}} ºC"
},
opacity: {
value: 0.8
},
fontSize: {
value: 11
}
}
}
}
],
properties: {
update: {
x: {
field: "xTooltip",
scale: "x",
offset: 0
},
y: {
scale: "y",
offset: -10,
signal: "indexDate.yval"
},
fill: {
value: "#fff"
},
width: {
value: 130
},
height: {
value: 55
},
fillOpacity: {
value: 0.85
}
}
}
},
{
ease: "in-out",
from: {
data: "tooltip"
},
size: 4,
type: "rule",
properties: {
update: {
x: {
field: "date",
scale: "x"
},
y: {
value: 0
},
y2: {
field: {
group: "height"
}
},
stroke: {
value: "#000000"
},
opacity: {
value: 0.2
},
strokeWidth: {
value: 2
}
}
}
},
{
ease: "in-out",
from: {
data: "tooltip"
},
size: 4,
type: "symbol",
properties: {
update: {
x: {
field: "date",
scale: "x"
},
y: {
field: "value",
scale: "y"
},
fill: {
value: "#c15467"
},
size: {
value: 20
}
}
}
}
],
width: 600,
height: 400,
scales: [
{
name: "x",
type: "ordinal",
range: "width",
domain: {
fields: [
{
data: "data",
field: "date"
}
]
},
domainMax: 2100,
domainMin: 1920
},
{
name: "y",
type: "linear",
zero: false,
range: "height",
domain: {
fields: [
{
data: "data",
field: "max"
}
]
},
domainMax: 40,
domainMin: 25
},
{
name: "color",
type: "ordinal",
zero: false,
range: [
"#efa600",
"#D2E2EC",
"#1a6d9e"
],
domain: {
sort: true,
fields: [
{
data: "legend",
field: "cat"
}
]
},
points: true
}
],
legends: [
{
fill: "color",
offset: 50,
properties: {
title: {
dx: {
value: 0
},
dy: {
value: -2
},
fontSize: {
value: 12
}
},
labels: {
fill: {
value: "#9BA2AA"
},
text: {
template: "{{datum.data}}"
},
fontSize: {
value: 10
}
},
legend: {
x: {
mult: 0.05,
field: {
group: "width"
},
offset: 0
},
y: {
mult: 0.05,
field: {
group: "height"
},
offset: -10
}
},
symbols: {
size: {
value: 30
},
shape: {
value: "square"
},
strokeOpacity: {
value: 0
}
}
}
}
],
padding: {
top: 30,
left: 35,
right: 5,
bottom: 40
},
signals: [
{
init: {
xval: 0,
yval: 0
},
name: "indexDate",
streams: [
{
expr: "{xLeft: +iscale('x', eventX() + 10), xRight: +iscale('x', eventX() - 130), date: +iscale('x', eventX()), yval: iscale('y', eventY())}",
type: "mousemove"
}
]
}
]
},

  didRender() {
    this.$chart = this.$('.chart2');
    this.fetchData()
      .done(function(data){
        this.vegaSpec.data[0].values = data.rows;
        this.initChart();
      }.bind(this));
  },

  fetchData: function() {
    return $.get('http://api.resourcewatch.org/query/3feaf26c-42c8-43ce-b1b5-07a02a773c36?sql=select * from index_3feaf26c42c843ceb1b507a02a773c36');
  },

  update: function() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      this.initChart();
    }
  },

  getSize: function() {
    const vegaSpec = this.vegaSpec;
    const widthSpace = vegaSpec.padding ?
      vegaSpec.padding.left + vegaSpec.padding.right : 0;
    const heightSpace = vegaSpec.padding ?
      vegaSpec.padding.top + vegaSpec.padding.bottom : 0;

    const containerSize = this.$chart[0] && this.$chart[0].getBoundingClientRect();

    return {
      width: containerSize.width - widthSpace,
      height: containerSize.height - heightSpace
    };
  },

  getVegaSpec: function() {
    var size = this.getSize();
    this.vegaSpec.width = size.width;
    this.vegaSpec.height = size.height;
    return this.vegaSpec;
  },

  initChart: function() {
    var vegaSpec = this.getVegaSpec();
    vg.parse.spec(vegaSpec, chart => chart({ el: this.$chart[0] }).update());
    vg.parse.spec(vegaSpec, chart => chart({ el: this.$chart[1] }).update());
  }

});
