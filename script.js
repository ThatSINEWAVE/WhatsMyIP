// script.js
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById('theme-toggle');
    const flagDiv = document.getElementById('flag');
    const resultsDiv = document.getElementById('results');
    const testAgainButton = document.getElementById('test-again');
    const copyAllButton = document.getElementById('copy-all');

    // Function to fetch IP info and update the DOM
    async function fetchIPInfo() {
        resultsDiv.innerHTML = '<p>Loading...</p>';
        flagDiv.innerHTML = '';

        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();

        // Fetch the country flag using restcountries.com API
        const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${data.country}`);
        const countryData = await countryResponse.json();
        const countryFlag = countryData[0].flags.png;

        // Update the flag
        flagDiv.innerHTML = `<img src="${countryFlag}" alt="Flag">`;

        // Update the results with copy buttons
        resultsDiv.innerHTML = `
            <div class="info-box"><span><strong>IP:</strong> ${data.ip}</span><button class="copy-btn" data-copy="${data.ip}"><i class="fas fa-clipboard"></i></button></div>
            <div class="info-box"><span><strong>Hostname:</strong> ${data.hostname}</span><button class="copy-btn" data-copy="${data.hostname}"><i class="fas fa-clipboard"></i></button></div>
            <div class="info-box"><span><strong>City:</strong> ${data.city}</span><button class="copy-btn" data-copy="${data.city}"><i class="fas fa-clipboard"></i></button></div>
            <div class="info-box"><span><strong>Region:</strong> ${data.region}</span><button class="copy-btn" data-copy="${data.region}"><i class="fas fa-clipboard"></i></button></div>
            <div class="info-box"><span><strong>Country:</strong> ${data.country}</span><button class="copy-btn" data-copy="${data.country}"><i class="fas fa-clipboard"></i></button></div>
            <div class="info-box"><span><strong>Location:</strong> ${data.loc}</span><button class="copy-btn" data-copy="${data.loc}"><i class="fas fa-clipboard"></i></button></div>
            <div class="info-box"><span><strong>Organization:</strong> ${data.org}</span><button class="copy-btn" data-copy="${data.org}"><i class="fas fa-clipboard"></i></button></div>
            <div class="info-box"><span><strong>Postal Code:</strong> ${data.postal}</span><button class="copy-btn" data-copy="${data.postal}"><i class="fas fa-clipboard"></i></button></div>
            <div class="info-box"><span><strong>Timezone:</strong> ${data.timezone}</span><button class="copy-btn" data-copy="${data.timezone}"><i class="fas fa-clipboard"></i></button></div>
        `;

        // Add event listeners to copy buttons
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', () => copyToClipboard(button));
        });
    }

    // Fetch IP info on page load
    fetchIPInfo();

    // Fetch IP info again when the "Test Again" button is clicked
    testAgainButton.addEventListener('click', fetchIPInfo);

    // Copy individual info to clipboard
    function copyToClipboard(button) {
        const text = button.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.classList.add('success');
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-clipboard"></i>';
                button.classList.remove('success');
            }, 2000);
        });
    }

    // Copy all info to clipboard
    copyAllButton.addEventListener('click', () => {
        const allText = Array.from(document.querySelectorAll('.info-box span')).map(span => span.textContent).join('\n');
        navigator.clipboard.writeText(allText).then(() => {
            copyAllButton.classList.add('success');
            copyAllButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyAllButton.innerHTML = 'Copy All';
                copyAllButton.classList.remove('success');
            }, 2000);
        });
    });

    // Theme toggle functionality
    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark-mode';
    }

    // Event listener for theme toggle
    themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'dark-mode' : 'light-mode';
        setTheme(theme);
    });

    // Load and apply the saved theme
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    setTheme(savedTheme);
});
