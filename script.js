const lineCanvas = document.getElementById('cryptoChart');

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
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

let bullishCycle = 0;  // Compteur pour les tendances haussières prolongées
let bearishCycle = 0;  // Compteur pour les tendances baissières prolongées
let plateauCycle = 0;  // Compteur pour les périodes de plateau prolongées
let cycleDuration = 50;  // Nombre d'itérations pour un cycle (haussier ou baissier) beaucoup plus long

function generateComplexCryptoPrice(lastPrice) {
    let priceChangeDirection = "neutral";  // "neutral" signifie qu'il peut osciller entre haussier et baissier

    // Cycle de tendance haussière
    if (bullishCycle > 0) {
        priceChangeDirection = "up";
        bullishCycle--;
    }

    // Cycle de tendance baissière
    if (bearishCycle > 0) {
        priceChangeDirection = "down";
        bearishCycle--;
    }

    // Cycle de plateau
    if (plateauCycle > 0) {
        priceChangeDirection = "neutral";
        plateauCycle--;
    }

    // Simuler un changement de cycle de façon aléatoire (avec plus de durée de plateau)
    if (Math.random() < 0.01 && bullishCycle === 0 && bearishCycle === 0 && plateauCycle === 0) {
        const direction = Math.random() < 0.33 ? "bullish" : (Math.random() < 0.66 ? "bearish" : "plateau");
        if (direction === "bullish") {
            bullishCycle = cycleDuration;  // Cycle haussier long
        } else if (direction === "bearish") {
            bearishCycle = cycleDuration;  // Cycle baissier long
        } else {
            plateauCycle = cycleDuration * 2;  // Période de plateau longue (2x)
        }
    }

    // Calcul de la base du prix
    let basePrice = lastPrice + (Math.random() * 2 - 1) * 10;  // Changements plus petits

    // Logique de tendance prolongée
    if (priceChangeDirection === "up") {
        basePrice += (Math.random() * 10 + 20);  // Hausse modérée
    } else if (priceChangeDirection === "down") {
        basePrice -= (Math.random() * 10 + 20);  // Baisse modérée
    }

    // Plateau prolongé
    if (priceChangeDirection === "neutral") {
        basePrice += (Math.random() * 2 - 1) * 5;  // Oscille légèrement
    }

    // Simuler des pics plus longs
    let longTermSpike = 0;
    if (Math.random() < 0.02) {
        // Si on génère un pic long, la valeur oscille fortement pendant plusieurs itérations
        longTermSpike = Math.random() * 2000 + 1000;  // Un grand pic positif ou négatif
        const direction = Math.random() < 0.5 ? 1 : -1;
        basePrice += direction * longTermSpike;
    }

    // Gestion de la volatilité avec une correction
    const volatility = Math.random() < 0.1 ? Math.random() * 2000 - 1000 : 0;  // Volatilité plus faible mais toujours présente
    basePrice += volatility;

    // Limiter le prix entre 1 et 10000
    const boundedPrice = Math.max(Math.min(basePrice, 10000), 1);

    return boundedPrice;
}

setInterval(() => {
    if (dates.length > 1000) {
        dates.shift();
        prices.shift();
    }

    const currentDate = formatDate();

    // Si c'est la première valeur, on initialise le prix à une valeur de départ
    const lastPrice = prices.length > 0 ? prices[prices.length - 1] : 500;

    const newPrice = generateComplexCryptoPrice(lastPrice);

    dates.push(currentDate);
    prices.push(newPrice);

    console.log("update");

    lineChart.update();
}, 100);  // Actualisation toutes les 1 seconde

