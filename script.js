async function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value;
    const loadingMessage = document.getElementById('loading');
    const resultMessage = document.getElementById('result');

    // Show loading message
    loadingMessage.style.display = 'block';
    resultMessage.innerText = ''; // Clear previous result

    try {
        const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
            headers: {
                'x-access-token': 'goldapi-3qag3sm2b9l6hg-io'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const goldPricePerKg = data.price; // Get the gold price per kg
        const conversionRate = goldPricePerKg; // 1 DAU = 1kg of gold
        const usdAmount = dauAmount * conversionRate;

        // Format the USD amount
        const formattedUsdAmount = usdAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        resultMessage.innerText = `${dauAmount} DAU is equal to ${formattedUsdAmount}`;
    } catch (error) {
        resultMessage.innerText = 'Error fetching price: ' + error.message;
    } finally {
        // Hide loading message
        loadingMessage.style.display = 'none';
    }
}