function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value; // Get the DAU amount from input
    const conversionRate = 85000; // Set conversion rate to 85,000
    const usdAmount = dauAmount * conversionRate; // Calculate USD amount
    document.getElementById('result').innerText = `${dauAmount} DAU is equal to $${usdAmount.toFixed(2)} USD`; // Display result with two decimal places
}