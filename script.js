async function fetchGoldPrice() {
    try {
        const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
            method: 'GET',
            headers: {
                'x-access-token': 'goldapi-3qag3sm2b9l6hg-io' // Your API token
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.price; // Assuming the price comes back in a field called "price"
    } catch (error) {
        console.error('Failed to fetch gold price:', error);
        return null; // Return null if there is an error
    }
}

async function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value; // Get the DAU amount from input
    const conversionRatePerOunce = await fetchGoldPrice(); // Fetch current gold price in USD per ounce

    if (conversionRatePerOunce === null) {
        document.getElementById('result').innerText = 'Error fetching gold price.';
        return; // Exit the function if there was an error fetching the price
    }

    // Convert the price from ounces to kilograms (1 kg = 35.274 ounces)
    const conversionRatePerKg = conversionRatePerOunce * 35.274; // Price for 1 kg of gold

    const usdAmount = dauAmount * conversionRatePerKg; // Calculate USD amount for DAU
    const formattedAmount = usdAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    document.getElementById('result').innerText = `${dauAmount} DAU is equivalent to ${formattedAmount} USD`; // Display result
}

// To handle the button click
document.getElementById('convertButton').onclick = convertDAUtoUSD;