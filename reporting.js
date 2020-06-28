var opetionEyeState = {
  color: function (context) {
    //console.log('Color');
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
var lastOpenElem;
var digitalEyesChart;
var exposureChart;
function displayChart(label, datasets) {
  showChart();
  var myChart = document.getElementById('myChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  //console.log("Data", datasets);
  ////console.log("List Blink Stat",lbs);
  digitalEyesChart = new Chart(ctx, {
    type: 'line',
    data:{
      datasets:[
        {
         labels: label,
         datasets: datasets
       },
       {
        labels: label,
        datasets: datasets
      }
      ]
    },
    options: opetionEyeState
  });
  //console.log("charting is done");
}

function displayExposureChart(label, datasets) {
  showExposureChart();
  var myChart = document.getElementById('exposureChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  //console.log("Data", datasets);
  ////console.log("List Blink Stat",lbs);
  exposureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: datasets
    },
    options: opetionEyeState
  });
  //console.log("charting is done");
}

function hideyChart() {
  reportContainer = document.getElementById('reportContainer');
  reportContainer.style.display = 'NONE';
  //console.log(reportContainer);
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
    //console.log('Destroy');
    digitalEyesChart.destroy();
  }
  showChart();
  var myChart = document.getElementById('myChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  //console.log("Data", datasets);
  ////console.log("List Blink Stat",lbs);
  digitalEyesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: datasets
    },
    options: optionBar
  });
  //console.log("charting is done");
}

function displayExposureReport(label, datasets) {
  if (exposureChart) {
    //console.log('Destroy');
    exposureChart.destroy();
  }
  var myChart = document.getElementById('exposureChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  //console.log("Data", datasets);
  ////console.log("List Blink Stat",lbs);
  exposureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: datasets
    },
    options: optionBar
  });
  //console.log("charting is done");
}

function displayClosenessReport(label, datasets) {
  let closenessChartCanvas = document.getElementById('closenessChart');
  let closenessChartCanvasCtx = closenessChartCanvas.getContext('2d');
  let timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  //console.log("Data", datasets);
  ////console.log("List Blink Stat",lbs);
  let closenessChart = new Chart(closenessChartCanvasCtx, {
    type: 'line',
    data: {
      labels: label,
      datasets: datasets
    },
    options: optionBar
  });
  //console.log("charting is done");
}

function displayTouchReport(label, datasets) {
  let touchChartCanvas = document.getElementById('touchChart');
  let touchChartCanvasCtx = touchChartCanvas.getContext('2d');
  let timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  //console.log("Data", datasets);
  ////console.log("List Blink Stat",lbs);
  let touchChart = new Chart(touchChartCanvasCtx, {
    type: 'line',
    data: {
      labels: label,
      datasets: datasets
    },
    options: optionBar
  });
  //console.log("charting is done");
}

function showBlinkReport() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/fetch_blink";
  labelToShow = 'Blink Count';


  // open a connection
  // open a connection
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showChart();

      var blinkStatePerMinute = JSON.parse(this.responseText);
      //console.log(blinkStatePerMinute);
      //2020-05-30: {22:50: 28, 22:51: 35, 22:52: 32, 22:53: 29, 23:16: 16}
      //2020-06-06: {19:34: 3, 19:36: 1, 19:37: 4, 19:40: 28, 19:41: 10}
      //2020-06-07: {18:43: 23, 18:44: 21, 18:48: 35, 18:49: 17}
      //2020-06-08: {00:15: 8, 00:16: 8, 00:17: 18, 00:22: 4, 00:23: 3}
      parseAndDisplayReport(blinkStatePerMinute,'blink');
      return this.responseText;
    }
  };
  let groupBy = document.getElementById('blinkReportGropSetting').value;
  //console.log("blinkReportGropSetting",groupBy);
  let groupByJson = JSON.stringify({ "groupBy": groupBy });
  xhr.send(groupByJson);


}

function parseAndDisplayReport(reportData,reportName){
  var dataSets = [];
  var label = [];
  let labels  = [];
  var blinkReportPerMinute = [];
  let countParse = 0;
  var color_generator_factor = Object.keys(reportData).length;
  for (var attribute in reportData) {
    let data_1 = reportData[attribute];
    let data_1_report = [];
    let labelToShow_1 = [];
    countParse++;
    let color_value = 255/countParse;
    let color = "rgba("+color_value+","+10+","+color_value+",0.4)";
    for (let date_attr in data_1){
      let value_1 = data_1[date_attr];
      data_1_report.push(value_1);
      labelToShow_1.push(date_attr);
      labels.push(date_attr);
    }
    let dataset_1 = {
      label: labelToShow_1,
      fill: false,
      backgroundColor: color,
      borderColor: color,
      data: data_1_report,
      date_value : attribute
    };
    labels.sort();
    dataSets.push(dataset_1);
  }
  for(let i in dataSets){
    let dataset_i = dataSets[i];
    let count = 0;
    let data_i_corrected  = [];
    let data_i = dataset_i['data'];
    let labels_i = dataset_i['label'];
    let date_value_i = dataset_i['date_value'];
    for(let label_index in labels){
      let label = labels[label_index];
      let index = -1;
      labels_i.filter((x,i)=> {if(x == label){index=i;return true}else{return false}})
      if(index > -1){
        data_i_corrected.push(data_i[index]);
      }else{
        data_i_corrected.push(0);
      }
      count++;
    }
    dataset_i['data'] = data_i_corrected;
    dataset_i['label'] = date_value_i;
  }
  if(reportName == 'blink'){
    displayDigitalEyeReport(labels, dataSets);
  }else if(reportName == 'exposure'){
    displayExposureReport(labels, dataSets);
  }else if(reportName == 'closeness'){
    displayClosenessReport(labels, dataSets);
  }else if(reportName == 'touch'){
    displayTouchReport(labels, dataSets);
  }

}


function showExposureReport() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/fetch_exposure_data";
  labelToShow = 'Exposure'

  // open a connection
  // open a connection
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showChart();
      var blinkStatePerMinute = JSON.parse(this.responseText);
      parseAndDisplayReport(blinkStatePerMinute,'exposure');
      return this.responseText;
    }
  };
  let groupBy = document.getElementById('exposureReportGropSetting').value;
  //console.log("exposureReportGropSetting",groupBy);
  let groupByJson = JSON.stringify({ "groupBy": groupBy });
  xhr.send(groupByJson);


}

function showClosenessReport() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/closeness_data";
  labelToShow = 'Closeness'

  // open a connection
  // open a connection
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showChart();
      var closenessData = JSON.parse(this.responseText);
      parseAndDisplayReport(closenessData,'closeness');
      return this.responseText;
    }
  };
  let groupBy = document.getElementById('closenessReportGropSetting').value;
  //console.log("closenessReportGropSetting",groupBy);
  let groupByJson = JSON.stringify({ "groupBy": groupBy });
  xhr.send(groupByJson);
}

function showTouchReport() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/touch_data";
  labelToShow = 'Touch'

  // open a connection
  // open a connection
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showChart();
      var touchData = JSON.parse(this.responseText);
      parseAndDisplayReport(touchData,'touch');
      return this.responseText;
    }
  };
  let groupBy = document.getElementById('touchReportGropSetting').value;
  //console.log("touchReportGropSetting",groupBy);
  let groupByJson = JSON.stringify({ "groupBy": groupBy });
  xhr.send(groupByJson);
}
$(document).ready(function(){
  setTimeout(function(){
    $('#animContainer').remove();
  },8000);
  lastOpenElem = $('#homeButton');
  $('a[data-toggle="tab"]').click(function(){
    if(lastOpenElem){
      lastOpenElem.removeClass("active");
    }
    lastOpenElem = $(this);
  });
});
