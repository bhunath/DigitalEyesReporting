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
