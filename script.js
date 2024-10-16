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
        console.log('Gold Price per Ounce:', data.price); // Log the fetched price
        return data.price; // Assuming the price comes back in a field called "price"
    } catch (error) {
        console.error('Failed to fetch gold price:', error);
        return null; // Return null if there is an error
    }
}

async function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value;

    // Fetch the current gold price
    const conversionRate = await fetchGoldPrice();
    if (!conversionRate) {
        document.getElementById('result').innerText = 'Error fetching gold price';
        return;
    }

    // Convert from ounces to kilograms
    const pricePerKg = conversionRate * 35.274; // Conversion factor from ounces to kg
    const usdAmount = dauAmount * pricePerKg; // Calculate the USD amount

    // Format the USD amount with commas
    const formattedUSD = usdAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    document.getElementById('result').innerText = `${dauAmount} DAU is equal to ${formattedUSD}`;
}

// Optional: Add an event listener for the button if you're not using inline onclick in HTML
document.getElementById('convertButton').addEventListener('click', convertDAUtoUSD);