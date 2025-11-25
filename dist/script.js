/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Data
var allData = {
  "2014": {
    "Japan": 1634790,
    "Korea": 527684,
    "China": 3987152,
    "Vietnam": 137177,
    "Singapore": 376235
  },
  "2015": {
    "Japan": 1627229,
    "Korea": 658757,
    "China": 4184102,
    "Vietnam": 146380,
    "Singapore": 393037
  },
  "2016": {
    "Japan": 1895702,
    "Korea": 884397,
    "China": 3511734,
    "Vietnam": 196636,
    "Singapore": 407267
  },
  "2017": {
    "Japan": 1898854,
    "Korea": 1054708,
    "China": 2732549,
    "Vietnam": 383329,
    "Singapore": 425577
  },
  "2018": {
    "Japan": 1969151,
    "Korea": 1019441,
    "China": 2695615,
    "Vietnam": 490774,
    "Singapore": 427222
  },
  "2019": {
    "Japan": 2167952,
    "Korea": 1242598,
    "China": 2714065,
    "Vietnam": 405396,
    "Singapore": 460635
  },
  "2020": {
    "Japan": 269659,
    "Korea": 178911,
    "China": 111050,
    "Vietnam": 110882,
    "Singapore": 49946
  },
  "2021": {
    "Japan": 10056,
    "Korea": 3300,
    "China": 13267,
    "Vietnam": 24935,
    "Singapore": 2417
  },
  "2022": {
    "Japan": 87616,
    "Korea": 51748,
    "China": 24378,
    "Vietnam": 134818,
    "Singapore": 69507
  },
  "2023": {
    "Japan": 928235,
    "Korea": 744727,
    "China": 226269,
    "Vietnam": 382529,
    "Singapore": 463893
  },
  "2024": {
    "Japan": 1319592,
    "Korea": 1003086,
    "China": 438212,
    "Vietnam": 370548,
    "Singapore": 447841
  }
  };




// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

root.numberFormatter.setAll({
  numberFormat: "#a",

  // Group only into M (millions), and B (billions)
  bigNumberPrefixes: [
    { number: 1e6, suffix: "M" },
    { number: 1e9, suffix: "B" }
  ],

  // Do not use small number prefixes at all
  smallNumberPrefixes: []
});

var stepDuration = 2000;


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "none",
  wheelY: "none",
  paddingLeft: 0
}));


// We don't want zoom-out button to appear while animating, so we hide it at all
chart.zoomOutButton.set("forceHidden", true);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 20,
  inversed: true,
  minorGridEnabled: true
});
// hide grid
yRenderer.grid.template.set("visible", false);

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "network",
  renderer: yRenderer
}));

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: 0,
  strictMinMax: true,
  extraMax: 0.1,
  renderer: am5xy.AxisRendererX.new(root, {})
}));

xAxis.set("interpolationDuration", stepDuration / 10);
xAxis.set("interpolationEasing", am5.ease.linear);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "value",
  categoryYField: "network"
}));

// Rounded corners for columns
series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 });

// Make each column to be of a different color
series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

// Add label bullet
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 1,
    sprite: am5.Label.new(root, {
      text: "{valueXWorking.formatNumber('#.# a')}",
      fill: root.interfaceColors.get("alternativeText"),
      centerX: am5.p100,
      centerY: am5.p50,
      populateText: true
    })
  });
});

var label = chart.plotContainer.children.push(am5.Label.new(root, {
  text: "2002",
  fontSize: "8em",
  opacity: 0.2,
  x: am5.p100,
  y: am5.p100,
  centerY: am5.p100,
  centerX: am5.p100
}));

// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryY") == category) {
      return dataItem;
    }
  }
}

// Axis sorting
function sortCategoryAxis() {
  // sort by value
  series.dataItems.sort(function (x, y) {
    return y.get("valueX") - x.get("valueX"); // descending
    //return x.get("valueX") - y.get("valueX"); // ascending
  });

  // go through each axis item
  am5.array.each(yAxis.dataItems, function (dataItem) {
    // get corresponding series item
    var seriesDataItem = getSeriesItem(dataItem.get("category"));

    if (seriesDataItem) {
      // get index of series data item
      var index = series.dataItems.indexOf(seriesDataItem);
      // calculate delta position
      var deltaPosition =
        (index - dataItem.get("index", 0)) / series.dataItems.length;
      // set index to be the same as series data item index
      if (dataItem.get("index") != index) {
        dataItem.set("index", index);
        // set deltaPosition instanlty
        dataItem.set("deltaPosition", -deltaPosition);
        // animate delta position to 0
        dataItem.animate({
          key: "deltaPosition",
          to: 0,
          duration: stepDuration / 2,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }
    }
  });
  // sort axis items by index.
  // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
  yAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
  });
}

var year = 2014;

// update data with values each 1.5 sec
var interval = setInterval(function () {
  year++;

  if (year > 2024) {
    clearInterval(interval);
    clearInterval(sortInterval);
  }

  updateData();
}, stepDuration);

var sortInterval = setInterval(function () {
  sortCategoryAxis();
}, 100);

function setInitialData() {
  var d = allData[year];

  for (var n in d) {
    series.data.push({ network: n, value: d[n] });
    yAxis.data.push({ network: n });
  }
}

function updateData() {
  var itemsWithNonZero = 0;

  if (allData[year]) {
    label.set("text", year.toString());

    am5.array.each(series.dataItems, function (dataItem) {
      var category = dataItem.get("categoryY");
      var value = allData[year][category];

      if (value > 0) {
        itemsWithNonZero++;
      }

      dataItem.animate({
        key: "valueX",
        to: value,
        duration: stepDuration,
        easing: am5.ease.linear
      });
      dataItem.animate({
        key: "valueXWorking",
        to: value,
        duration: stepDuration,
        easing: am5.ease.linear
      });
    });

    yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
  }
}

setInitialData();
setTimeout(function () {
  year++;
  updateData();
}, 50);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
