function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value; // Get the DAU amount from input
    const conversionRate = 850000; // Use the correct conversion rate
    const usdAmount = dauAmount * conversionRate; // Calculate USD amount
    document.getElementById('result').innerText = `${dauAmount} DAU is equal to $${usdAmount} USD`; // Display result
}