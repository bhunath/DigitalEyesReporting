var opetionEyeState = {
  color: function (context) {
    console.log('Color');
  },
  fill: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        callback: function (value, index, values) {
          if (value == 2) {
            return 'Eye Close';
          } else if (value == 1) {
            return 'Eye Open';
          }
        }
      }
    }]
  },
  legends: {
    display: false
  }
};
var digitalEyesChart;
var exposureChart;
function displayChart(label, datasets) {
  showChart();
  var myChart = document.getElementById('myChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  console.log("Data", datasets);
  //console.log("List Blink Stat",lbs);
  digitalEyesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: datasets
    },
    options: opetionEyeState
  });
  console.log("charting is done");
}

function displayExposureChart(label, datasets) {
  showExposureChart();
  var myChart = document.getElementById('exposureChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  console.log("Data", datasets);
  //console.log("List Blink Stat",lbs);
  exposureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: datasets
    },
    options: opetionEyeState
  });
  console.log("charting is done");
}

function hideyChart() {
  reportContainer = document.getElementById('reportContainer');
  reportContainer.style.display = 'NONE';
  console.log(reportContainer);
}

function showChart() {
  reportContainer = document.getElementById('reportContainer');
  myChart = document.getElementById('myChart');
}

var optionBar = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

function displayDigitalEyeReport(label, datasets) {
  if (digitalEyesChart) {
    console.log('Destroy');
    digitalEyesChart.clear();
  }
  showChart();
  var myChart = document.getElementById('myChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  console.log("Data", datasets);
  //console.log("List Blink Stat",lbs);
  digitalEyesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: datasets
    },
    options: optionBar
  });
  console.log("charting is done");
}

function displayExposureReport(label, datasets) {
  if (exposureChart) {
    console.log('Destroy');
    exposureChart.clear();
  }
  var myChart = document.getElementById('exposureChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  console.log("Data", datasets);
  //console.log("List Blink Stat",lbs);
  exposureChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: datasets
    },
    options: optionBar
  });
  console.log("charting is done");
}

function displayClosenessReport(label, datasets) {
  let closenessChartCanvas = document.getElementById('closenessChart');
  let closenessChartCanvasCtx = closenessChartCanvas.getContext('2d');
  let timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  console.log("Data", datasets);
  //console.log("List Blink Stat",lbs);
  let closenessChart = new Chart(closenessChartCanvasCtx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: datasets
    },
    options: optionBar
  });
  console.log("charting is done");
}

function displayTouchReport(label, datasets) {
  let touchChartCanvas = document.getElementById('touchChart');
  let touchChartCanvasCtx = touchChartCanvas.getContext('2d');
  let timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  console.log("Data", datasets);
  //console.log("List Blink Stat",lbs);
  let touchChart = new Chart(touchChartCanvasCtx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: datasets
    },
    options: optionBar
  });
  console.log("charting is done");
}

function showBlinkReport() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/fetch_blink_per_minute_data";
  labelToShow = 'Blink Count';


  // open a connection
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showChart();
      var dataSets = [];
      var backgroundColor_open = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'];
      var borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'];
      var label = [];
      var blinkStatePerMinute = JSON.parse(this.responseText);
      console.log(blinkStatePerMinute);
      var blinkReportPerMinute = [];
      for (var attribute in blinkStatePerMinute) {
        label.push(attribute);
        blinkReportPerMinute.push(blinkStatePerMinute[attribute])
      }
      var dataset = {
        label: labelToShow,
        fill: false,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "rgba(225,0,0,0.4)",
        data: blinkReportPerMinute
      };
      console.log(blinkStatePerMinute);

      dataSets.push(dataset);
      displayDigitalEyeReport(label, dataSets);
      return this.responseText;
    }
  };
  xhr.send();


}


function showExposureReport() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/fetch_exposure_data";
  labelToShow = 'Exposure'

  // open a connection
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showChart();
      var dataSets = [];
      var backgroundColor_open = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'];
      var borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'];
      var label = [];
      var blinkStatePerMinute = JSON.parse(this.responseText);
      console.log(blinkStatePerMinute);
      var blinkReportPerMinute = [];
      for (var attribute in blinkStatePerMinute) {
        label.push(attribute);
        blinkReportPerMinute.push(blinkStatePerMinute[attribute])
      }
      var dataset = {
        label: labelToShow,
        fill: false,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "rgba(225,0,0,0.4)",
        data: blinkReportPerMinute
      };
      console.log(blinkStatePerMinute);

      dataSets.push(dataset);
      displayExposureReport(label, dataSets);
      return this.responseText;
    }
  };
  xhr.send();


}

function showClosenessReport() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/closeness_data";
  labelToShow = 'Closeness'

  // open a connection
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showChart();
      var dataSets = [];
      var backgroundColor_open = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'];
      var borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'];
      var label = [];
      var closenessData = JSON.parse(this.responseText);
      console.log(closenessData);
      var closenessReportPerMinute = [];
      for (var attribute in closenessData) {
        label.push(attribute);
        closenessReportPerMinute.push(closenessData[attribute])
      }
      var dataset = {
        label: labelToShow,
        fill: false,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "rgba(225,0,0,0.4)",
        data: closenessReportPerMinute
      };
      console.log(closenessReportPerMinute);

      dataSets.push(dataset);
      displayClosenessReport(label, dataSets);
      return this.responseText;
    }
  };
  xhr.send();
}

function showTouchReport() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/touch_data";
  labelToShow = 'Touch'

  // open a connection
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showChart();
      var dataSets = [];
      var backgroundColor_open = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'];
      var borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'];
      var label = [];
      var touchData = JSON.parse(this.responseText);
      console.log(touchData);
      var touchReportPerMinute = [];
      for (var attribute in touchData) {
        label.push(attribute);
        touchReportPerMinute.push(touchData[attribute])
      }
      var dataset = {
        label: labelToShow,
        fill: false,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "rgba(225,0,0,0.4)",
        data: touchReportPerMinute
      };
      console.log(touchReportPerMinute);

      dataSets.push(dataset);
      displayTouchReport(label, dataSets);
      return this.responseText;
    }
  };
  xhr.send();
}
