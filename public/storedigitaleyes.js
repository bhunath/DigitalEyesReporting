function storeBlinkStat(user_id,eye_open_time,eye_close_time){
    console.log("Storing Blink");
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3001/digital_eyes/storeBlinkStat";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            result.innerHTML = this.responseText;

        }
    };

    // Converting JSON data to string
    var data = JSON.stringify({ "user_id": user_id, "eye_open": eye_open_time,"eye_close":eye_close_time });
    // Sending data with the request
    xhr.send(data);
    console.log("Storing Blink Done",data);
}

function listBlinkStat(liveFeed){
    console.log("Storing Blink");
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3001/digital_eyes/blinkstat";

    // open a connection
    xhr.open("GET", url, true);

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            var dataSets = [];
            var backgroundColor_open = ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)'];
            var borderColor = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'];
            var label = [];
            var json = JSON.parse(this.responseText);
            var data_eye_state = [];
            json.forEach((item, i) => {
              label.push(item.eye_open);
              data_eye_state.push(1);
              label.push(item.eye_close);
              data_eye_state.push(2);
            });
            var dataset = {
              label: 'Eye State',
              fill:false,
              backgroundColor: "rgba(225,0,0,0.4)",
              borderColor: "rgba(225,0,0,0.4)",
              data: data_eye_state
            };

            dataSets.push(dataset);
            if(liveFeed){
              console.log(liveFeed,true);
              addData(label,dataSets);
            }else{
              console.log(liveFeed,false);
              displayChart(label,dataSets);
            }
            return this.responseText;
        }
    };

    xhr.send();
    console.log("List Blink Done");
}

function listBlinkStatePerMinute(){
  console.log("Storing Blink");
  let xhr = new XMLHttpRequest();
  let url = "http://localhost:3001/digital_eyes/blinkstatPerMinute";

  // open a connection
  xhr.open("GET", url, true);

  // Create a state change callback
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {

          // Print received data from server
          var dataSets = [];
          var backgroundColor_open = ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)'];
          var borderColor = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'];
          var label = [];
          var blinkStatePerMinute = JSON.parse(this.responseText);
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
  console.log("List Blink Done");
}
