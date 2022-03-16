const res = localStorage.getItem("carduser")

var xValues = [];
var yValues = [];

var graph = document.getElementById("graph")
var amount = JSON.parse(localStorage.getItem(res))
for(let i=0;i<=amount.length-1;i++){
    if(i!=0){
        xValues.push(amount[i].amt)
        yValues.push(amount[i].bet)
    var canvas= document.createElement("canvas")
    var h2 = document.createElement("h2")
    h2.innerHTML = "Hello"
    canvas.append(h2)
    canvas.setAttribute("id",amount[i].Date);
    canvas.style.width = "100%";
    canvas.style.maxWidth = "600px"
    canvas.style.boxShadow = "";
    canvas.style.borderRadius = "20px"
    // canvas.classList.add("items")
    graph.appendChild(canvas)


    new Chart(amount[i].Date, {
        type: "line",
        data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(255,0,0",
            borderColor: "rgba(0,0,255,0.5)",
            data: yValues
        }]
        },
        options: {
        legend: {display: false},

        }
    });
}}

 