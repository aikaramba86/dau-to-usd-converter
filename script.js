async function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    
    // Show loading message
    loadingDiv.style.display = 'block';
    resultDiv.innerText = ''; // Clear previous result

    try {
        // Fetch the current price of gold from the API
        const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
            method: 'GET',
            headers: {
                'x-access-token': 'goldapi-3qag3sm2b9l6hg-io',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const goldPricePerOunce = data.price; // Price for 1 ounce of gold in USD

        // Calculate the price for 1 kg of gold
        const ouncesInKg = 32.1507; // 1 kg = 32.1507 ounces
        const goldPricePerKg = goldPricePerOunce * ouncesInKg; // Price for 1 kg of gold

        // Calculate the equivalent USD amount
        const usdAmount = dauAmount * goldPricePerKg; // 1 DAU = 1 kg of gold
        resultDiv.innerText = `${dauAmount} DAU is equal to $${usdAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD`;
    } catch (error) {
        console.error('Error fetching gold price:', error);
        resultDiv.innerText = 'Error fetching gold price. Please try again later.';
    } finally {
        // Hide loading message
        loadingDiv.style.display = 'none';
    }
}