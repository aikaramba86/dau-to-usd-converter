function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value;
    const conversionRate = 1; // 850000
    const usdAmount = dauAmount * conversionRate;
    document.getElementById('result').innerText = `${dauAmount} DAU is equal to $${usdAmount} USD`;
}