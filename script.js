function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value; // Get the DAU amount from input
    const conversionRate = 85000; // Set conversion rate to 85,000
    const usdAmount = dauAmount * conversionRate; // Calculate USD amount

    // Format the USD amount with commas and two decimal places
    const formattedAmount = usdAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    document.getElementById('result').innerText = `${dauAmount} DAU is equal to ${formattedAmount}`; // Display result
}