var option = {
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
    shopowChart();
    var myChart = document.getElementById('myChart');
    var ctx = myChart.getContext('2d');
    var d = {"labels":label,"datasets":datasets};
    var dataSet = JSON.stringify(d);
    var timeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
    console.log("Data",datasets);
    //console.log("List Blink Stat",lbs);
    digitalEyesChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: label,
          datasets: datasets
        },
        options: option
    });
    console.log("charting is done");
}

function hideyChart(){
  reportContainer = document.getElementById('reportContainer');
  myChart = document.getElementById('myChart');
  myChart.style.display='NONE';
  reportContainer.style.display='NONE';
}

function shopowChart(){
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
