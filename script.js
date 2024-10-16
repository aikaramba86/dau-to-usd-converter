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
    const conversionRate = await fetchGoldPrice(); // Fetch current gold price

    if (conversionRate === null) {
        document.getElementById('result').innerText = 'Error fetching gold price.';
        return; // Exit the function if there was an error fetching the price
    }

    const usdAmount = dauAmount * conversionRate; // Calculate USD amount

    // Format the USD amount with commas and two decimal places
    const formattedAmount = usdAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    document.getElementById('result').innerText = `${dauAmount} DAU is equal to ${formattedAmount}`; // Display result
}