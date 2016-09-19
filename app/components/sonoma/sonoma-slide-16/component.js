import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  cartodbtable: 'o_1_tmx1951_1980_ave_hst',
  cartocss: '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(143.152,#00009C) stop(153.226,#0046FF) stop(163.3,#00FFFF) stop(173.375,#0CFFCD) stop(183.449,#68FF8A) stop(193.523,#FEFF00) stop(203.597,#FF8F00) stop(213.672,#FF0000) stop(223.746,#800000) }',

  vegaSpec: {
axes: [
{
name: "lbl",
type: "x",
scale: "x",
properties: {
axis: {
stroke: {
value: "#3B4F63"
},
opacity: {
value: 0.5
},
strokeWidth: {
value: 0
}
},
ticks: {
stroke: {
value: "#3B4F63"
},
opacity: {
value: 0.3
},
strokeWidth: {
value: 1
}
},
labels: {
dy: {
value: 5
},
fill: {
value: "#3B4F63"
},
font: {
value: "Montserrat, sans-serif"
},
text: {
value: ""
},
angle: {
value: -30
},
opacity: {
value: 0.5
},
fontSize: {
value: 10
},
fontWeight: {
value: 300
}
}
}
},
{
grid: true,
type: "y",
layer: "back",
scale: "y",
ticks: 7,
format: "f",
properties: {
axis: {
stroke: {
value: "#333"
},
strokeWidth: {
value: 0
}
},
grid: {
stroke: {
value: "#000"
},
strokeWidth: {
value: 1
},
strokeOpacity: {
value: 0.1
}
},
ticks: {
stroke: {
value: "steelblue"
}
},
labels: {
fill: {
value: "#3B4F63"
},
opacity: {
value: 0.5
},
fontSize: {
value: 10
},
fontWeight: {
value: 300
}
},
majorTicks: {
strokeWidth: {
value: 0
}
}
}
}
],
data: [
{
url: "http://api.resourcewatch.org/query/d172917b-3e34-4ed0-a55a-05eaf1abab53?sql=select%20y::int,%20x::int%20,position::int%20from%20table",
name: "bars",
format: {
type: "json",
property: "data"
},
transform: [
{
expr: "(2001 + datum.x * 5) + '-' + (2005 + datum.x * 5)",
type: "formula",
field: "label"
}
]
},
{
name: "axis",
values: [
{
x: "Year",
y: "Number of events"
}
]
},
{
name: "legend-1",
values: [
{
name: "Lower flow",
color: "#1a3e62"
}
]
},
{
name: "legend-2",
values: [
{
name: "Upper flow",
color: "#ffc94e"
}
]
}
],
marks: [
{
type: "rect",
properties: {
enter: {
x: {
scale: "x",
value: "0"
},
y: {
value: 0
},
x2: {
scale: "x",
value: "2"
},
fill: {
value: "#001421"
},
height: {
field: {
group: "height"
}
},
opacity: {
value: 0.08
}
}
}
},
{
from: {
data: "bars",
transform: [
{
type: "facet",
groupby: [
"x"
]
}
]
},
type: "group",
marks: [
{
name: "bars",
type: "rect",
properties: {
enter: {
x: {
field: "position",
scale: "pos"
},
y: {
field: "y",
scale: "y"
},
y2: {
scale: "y",
value: 0
},
fill: {
field: "position",
scale: "color"
},
width: {
band: true,
scale: "pos"
}
}
}
},
{
from: {
transform: [
{
test: "datum.x % 2 == 0 && datum.position == 0",
type: "filter"
}
]
},
type: "text",
properties: {
enter: {
x: {
field: "position",
scale: "pos"
},
y: {
scale: "y",
value: 0
},
dx: {
value: -42
},
dy: {
value: 20
},
fill: {
value: "#3B4F63"
},
font: {
value: "Montserrat, sans-serif"
},
text: {
template: "{{datum.label}}"
},
angle: {
value: -30
},
opacity: {
value: 0.5
},
fontSize: {
value: 10
},
fontWeight: {
value: 300
}
}
}
}
],
scales: [
{
name: "pos",
type: "ordinal",
range: "width",
domain: {
field: "position"
}
}
],
properties: {
enter: {
x: {
field: "key",
scale: "x"
},
width: {
band: true,
scale: "x"
}
}
}
},
{
from: {
data: "axis"
},
type: "text",
properties: {
enter: {
x: 0,
y: 0,
dx: {
value: -25
},
dy: {
value: -20
},
fill: {
value: "#3B4F63"
},
font: {
value: "Montserrat, sans-serif"
},
text: {
template: "{{datum.y | upper}}"
},
align: {
value: "left"
},
opacity: {
value: 0.5
},
fontSize: {
value: 10
},
fontWeight: {
value: 700
}
}
}
},
{
from: {
data: "legend-1"
},
type: "rect",
properties: {
enter: {
x: {
value: -25
},
y: {
mult: 1,
field: {
group: "height"
},
offset: 58
},
y2: {
mult: 1,
field: {
group: "height"
},
offset: 55
},
fill: {
field: "color"
},
width: {
value: 9
}
}
}
},
{
from: {
data: "legend-1"
},
type: "text",
properties: {
enter: {
x: 0,
y: {
mult: 1,
field: {
group: "height"
}
},
dx: {
value: -9
},
dy: {
value: 60
},
fill: {
value: "#3b4f63"
},
font: {
value: "Montserrat, sans-serif"
},
text: {
template: "{{datum.name | upper}}"
},
align: {
value: "left"
},
opacity: {
value: 0.7
},
fontSize: {
value: 10
},
fontWeight: {
value: 700
}
}
}
},
{
from: {
data: "legend-2"
},
type: "rect",
properties: {
enter: {
x: {
value: 100
},
y: {
mult: 1,
field: {
group: "height"
},
offset: 55
},
y2: {
mult: 1,
field: {
group: "height"
},
offset: 58
},
fill: {
field: "color"
},
width: {
value: 9
}
}
}
},
{
from: {
data: "legend-2"
},
type: "text",
properties: {
enter: {
x: 0,
y: {
mult: 1,
field: {
group: "height"
}
},
dx: {
value: 115
},
dy: {
value: 60
},
fill: {
value: "#3b4f63"
},
font: {
value: "Montserrat, sans-serif"
},
text: {
template: "{{datum.name | upper}}"
},
align: {
value: "left"
},
opacity: {
value: 0.7
},
fontSize: {
value: 10
},
fontWeight: {
value: 700
}
}
}
}
],
scales: [
{
name: "x",
type: "ordinal",
range: "width",
domain: {
fields: [
{
data: "bars",
field: "x"
}
]
},
padding: 0.2
},
{
name: "y",
nice: true,
type: "linear",
range: "height",
domain: {
fields: [
{
data: "bars",
field: "y"
}
]
}
},
{
name: "color",
type: "ordinal",
range: [
"#1a3e62",
"#ffc94e"
],
domain: {
data: "bars",
field: "position"
}
}
],
padding: {
top: 30,
left: 40,
right: 20,
bottom: 65
}
},


  didRender() {
    this.$chart = this.$('.chart16-1');
    this.fetchData()
      .done(function(data){
        this.vegaSpec.data[0].values = data.rows;
        this.initChart();
      }.bind(this));
  },

  fetchData: function() {
    return $.get('http://api.resourcewatch.org/query/d172917b-3e34-4ed0-a55a-05eaf1abab53?sql=select * from table');
  },

  getSize: function() {
    const vegaSpec = this.vegaSpec;
    const widthSpace = vegaSpec.padding ?
      vegaSpec.padding.left + vegaSpec.padding.right : 0;
    const heightSpace = vegaSpec.padding ?
      vegaSpec.padding.top + vegaSpec.padding.bottom : 0;

    const containerSize = this.$chart[0].getBoundingClientRect();

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
  }

});
