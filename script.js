const lineCanvas = document.getElementById('cryptoChart');

var echantionage = 500

var dates = [];
var prices = [];

const lineChart = new Chart(lineCanvas, {
    type: "line",
    data: {
        labels: dates,
        datasets: [{
            label: 'Prix du BTC',
            data: prices,
            borderColor: 'green',
            fill: false,
        }]
    }
});

function formatDate() {
    const now = new Date();
    return now.toISOString().split("T")[1].split(".")[0]; // HH:MM:SS
}

let bullishCycle = 0;  
let bearishCycle = 0;  
let plateauCycle = 0;  
let cycleDuration = 50;

function generateComplexCryptoPrice(lastPrice) {
    let priceChangeDirection = "neutral";  

    if (bullishCycle > 0) {
        priceChangeDirection = "up";
        bullishCycle--;
    }

    if (bearishCycle > 0) {
        priceChangeDirection = "down";
        bearishCycle--;
    }

    if (plateauCycle > 0) {
        priceChangeDirection = "neutral";
        plateauCycle--;
    }

    if (Math.random() < 0.01 && bullishCycle === 0 && bearishCycle === 0 && plateauCycle === 0) {
        const direction = Math.random() < 0.33 ? "bullish" : (Math.random() < 0.66 ? "bearish" : "plateau");
        if (direction === "bullish") bullishCycle = cycleDuration;
        else if (direction === "bearish") bearishCycle = cycleDuration;
        else plateauCycle = cycleDuration * 2;
    }

    let basePrice = lastPrice + (Math.random() * 2 - 1) * 10;  

    if (priceChangeDirection === "up") basePrice += (Math.random() * 10 + 20);
    else if (priceChangeDirection === "down") basePrice -= (Math.random() * 10 + 20);

    if (priceChangeDirection === "neutral") basePrice += (Math.random() * 2 - 1) * 5;

    let longTermSpike = 0;
    if (Math.random() < 0.02) {
        longTermSpike = Math.random() * 2000 + 1000;
        basePrice += (Math.random() < 0.5 ? 1 : -1) * longTermSpike;
    }

    const volatility = Math.random() < 0.1 ? Math.random() * 2000 - 1000 : 0;
    basePrice += volatility;

    return Math.max(Math.min(basePrice, 10000), 1);
}

function initializeChart() {
    let lastPrice = 500;

    for (let i = 0; i < echantionage; i++) {
        const currentDate = formatDate();
        lastPrice = generateComplexCryptoPrice(lastPrice);

        dates.push(currentDate);
        prices.push(lastPrice);
    }

    lineChart.update();
}

setInterval(() => {
    if (dates.length > echantionage) {
        dates.shift();
        prices.shift();
    }

    const currentDate = formatDate();
    const lastPrice = prices.length > 0 ? prices[prices.length - 1] : 500;
    const newPrice = generateComplexCryptoPrice(lastPrice);

    dates.push(currentDate);
    prices.push(newPrice);

    lineChart.update();
}, 1000);

initializeChart();
