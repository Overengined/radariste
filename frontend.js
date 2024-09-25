var opts = {
    angle: -0.09, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.51, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: true,     // If true, the min value of the gauge will be fixed
    colorStart: '#6F6EA0',   // Colors
    colorStop: '#C0C0DB',    // just experiment with them
    strokeColor: '#EEEEEE',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    // renderTicks is Optional
    renderTicks: {
      divisions: 5,
      divWidth: 1.1,
      divLength: 0.7,
      divColor: '#333333',
      subDivisions: 3,
      subLength: 0.5,
      subWidth: 0.6,
      subColor: '#666666'
    },
    staticZones: [
        {strokeStyle: "#F03E3E", min: 0, max: 1300}, // Red from 100 to 130
        {strokeStyle: "#FFDD00", min: 1300, max: 1500}, // Yellow
        {strokeStyle: "#30B32D", min: 1500, max: 2200}, // Green
        {strokeStyle: "#FFDD00", min: 2200, max: 2600}, // Yellow
        {strokeStyle: "#F03E3E", min: 2600, max: 3000}  // Red
     ],
    staticLabels: {
        font: "10px sans-serif",  // Specifies font
        labels: [1000, 1300, 1500, 2200, 2600, 3000],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
      },
};



tempgauge = new Gauge(document.getElementById('enginetemp')).setOptions(opts);
tempgauge.maxValue = 3000; 
tempgauge.setMinValue(0);  
tempgauge.animationSpeed = 92; 

pressgauge = new Gauge(document.getElementById('enginepress')).setOptions(opts);
pressgauge.maxValue = 3000; 
pressgauge.setMinValue(0);  
pressgauge.animationSpeed = 92; 



async function getValues() {
    const response = await fetch('http://127.0.0.1:5000/get_data');
    const data = await response.json();
    console.log(data);
    document.getElementById('output').innerText = JSON.stringify(data);
    tempgauge.set(data.enginetemp);
    pressgauge.set(data.enginepress)
}

async function postValue() {
    const data = { key: 'new_value' };
    const response = await fetch('http://127.0.0.1:5000/post_value', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
}

window.onload = function() {
    document.getElementById('getButton').onclick = getValue;
    document.getElementById('postButton').onclick = postValue;
};

setInterval(getValues, 500)