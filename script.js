async function fetchGoldPrice() {
    try {
        const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
            method: 'GET',
            headers: {
                'x-access-token': 'goldapi-cc0uc6sm2cnxvyt-io', // Updated access token
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.price; // Price for 1 ounce of gold in USD
    } catch (error) {
        console.error('Error fetching gold price:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

async function convertDAUtoUSD() {
    const dauAmount = document.getElementById('dauInput').value;
    const resultDivDAU = document.getElementById('resultDAU');
    const loadingDiv = document.getElementById('loading');

    // Show loader
    loadingDiv.style.display = 'block';
    resultDivDAU.innerText = ''; // Clear previous result

    try {
        const goldPricePerOunce = await fetchGoldPrice();
        const ouncesInKg = 32.1507; // 1 kg = 32.1507 ounces
        const goldPricePerKg = goldPricePerOunce * ouncesInKg; // Price for 1 kg of gold

        // Calculate the equivalent USD amount
        const usdAmount = dauAmount * goldPricePerKg; // 1 DAU = 1 kg of gold

        resultDivDAU.innerText = `${dauAmount} DAU is equal to $${usdAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD`;
    } catch (error) {
        resultDivDAU.innerText = 'Error fetching gold price. Please try again later.';
    } finally {
        // Hide loader
        loadingDiv.style.display = 'none';
    }
}

async function convertgDAUtoUSD() {
    const gDAUAmount = document.getElementById('gDAUInput').value;
    const resultDivgDAU = document.getElementById('resultgDAU');
    const loadingDiv = document.getElementById('loading');

    // Show loader
    loadingDiv.style.display = 'block';
    resultDivgDAU.innerText = ''; // Clear previous result

    try {
        const goldPricePerOunce = await fetchGoldPrice();
        const ouncesInKg = 32.1507; // 1 kg = 32.1507 ounces
        const goldPricePerKg = goldPricePerOunce * ouncesInKg; // Price for 1 kg of gold

        // Calculate the equivalent USD amount
        const usdAmount = (gDAUAmount / 1000) * goldPricePerKg; // 1000 gDAU = 1 kg of gold

        resultDivgDAU.innerText = `${gDAUAmount} gDAU is equal to $${usdAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD`;
    } catch (error) {
        resultDivgDAU.innerText = 'Error fetching gold price. Please try again later.';
    } finally {
        // Hide loader
        loadingDiv.style.display = 'none';
    }
}

// Add event listeners to buttons
document.getElementById('convertDAUButton').addEventListener('click', convertDAUtoUSD);
document.getElementById('convertgDAUButton').addEventListener('click', convertgDAUtoUSD);