var opetionEyeState = {
        color:function(context){
          console.log('Color');
        },
        fill : false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value,index,values){
                      if(value == 2 ){
                        return 'Eye Close';
                      }else if(value == 1){
                        return 'Eye Open';
                      }
                    }
                }
            }]
        },
        legends:{
          display:false
        }
    };
var digitalEyesChart;
function displayChart(label,datasets){
    showChart();
    var myChart = document.getElementById('myChart');
    var ctx = myChart.getContext('2d');
    var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
    console.log("Data",datasets);
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

function hideyChart(){
  reportContainer = document.getElementById('reportContainer');
  myChart = document.getElementById('myChart');
  myChart.style.display='NONE';
  reportContainer.style.display='NONE';
  console.log(reportContainer);
}

function showChart(){
  reportContainer = document.getElementById('reportContainer');
  myChart = document.getElementById('myChart');
  myChart.style.display='block';
  reportContainer.style.display='block';
}

function addData( label, data) {
    if(digitalEyesChart){
      digitalEyesChart.data.labels.push(label);
      digitalEyesChart.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
      });
      digitalEyesChart.update();
    }else{
      displayChart(label,data);
    }
}

var optionBar =  {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

function displayBlinkReportPerMinuteChart(label,datasets){
  showChart();
  var myChart = document.getElementById('myChart');
  var ctx = myChart.getContext('2d');
  var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
  console.log("Data",datasets);
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

function showHideBlinkReport(){
  var reportButton = document.getElementById('reportButton');
  console.log(reportButton);
  var reportButtonLabel = reportButton.innerHTML;
  if('Show Blink Report' == reportButtonLabel){
    reportButton.innerHTML = 'Hide Blink Report';
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/fetch_blink_per_minute_data";
    // open a connection
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          showChart();
          var dataSets = [];
          var backgroundColor_open = ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)'];
          var borderColor = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'];
          var label = [];
          var blinkStatePerMinute = JSON.parse(this.responseText);
          console.log(blinkStatePerMinute);
          var blinkReportPerMinute = [];
          for (var attribute in blinkStatePerMinute) {
            label.push(attribute);
            blinkReportPerMinute.push(blinkStatePerMinute[attribute])
          }
          var dataset = {
            label: 'Blink Count',
            fill:false,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: "rgba(225,0,0,0.4)",
            data: blinkReportPerMinute
          };
          console.log(blinkStatePerMinute);

          dataSets.push(dataset);
          displayBlinkReportPerMinuteChart(label,dataSets);
          return this.responseText;
        }
      };
    xhr.send();

  }else if('Hide Blink Report' == reportButtonLabel){
    console.log('Stop is Called',take_snapshot_interval)
    reportButton.innerHTML = 'Show Blink Report';
    hideyChart();
  }
}
