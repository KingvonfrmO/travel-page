document.addEventListener("DOMContentLoaded", function () {
  const apikey = "fc8afb1bf3aa292b307c6bd0e252b983";
  const dests = [
    {
      name: "London, UK",
      price: 4200,
      price_label: "4.2k",
      days: 12,
      duration_label: "12 Days Trip",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Nairobi, KE",
      price: 3200,
      price_label: "3.2k",
      days: 10,
      duration_label: "10 Days Trip",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Stockholm, SW",
      price: 6200,
      price_label: "6.2k",
      days: 18,
      duration_label: "18 Days Trip",
      image:
        "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Cape Town, SA",
      price: 2200,
      price_label: "2.2k",
      days: 11,
      duration_label: "11 Days Trip",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dodoma, TZ",
      price: 1200,
      price_label: "1.2k",
      days: 16,
      duration_label: "16 Days Trip",
      image:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Washington, US",
      price: 4200,
      price_label: "4.2k",
      days: 14,
      duration_label: "14 Days Trip",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    },
  ];

  async function fetchWeather(city, elementId, apiKey) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        document.getElementById(elementId).textContent = "Weather Unavailable";
        return;
      }
      const data = await response.json();
      document.getElementById(elementId).textContent = `🌡️ ${data.main.temp}°C`;
    } catch {
      document.getElementById(elementId).textContent = "Weather unavailable";
    }
  }

  function initializeDestinationPage(){
    const urlParameters = new URLSearchParams(window.location.search);
    const destinationName = urlParameters.get('name');

    if (!destinationName){
      window.location.href = 'index.html';
      return;
    }

    const selectedDestination = dests.find(d => d.name === destinationName);

    if (!selectedDestination){
      window.location.href = 'index.html';
      return;
    }

    document.getElementById('destination-name').textContent = selectedDestination.name;
    document.getElementById('destination-image').src = selectedDestination.image;
    document.getElementById('price-label').textContent = selectedDestination.price_label;
    document.getElementById('duration-label').textContent = selectedDestination.duration_label;

    fetchWeather(selectedDestination.name.split(',')[0], 'weather-temp', apikey);
  }

  if (window.location.pathname.includes('destination.html')) {
    initializeDestinationPage();
  }
});
