document.addEventListener("DOMContentLoaded", function () {
    const dests = [
    {
      name: "London, UK",
      price: 4200,
      price_label: "4200",
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

    
  function set_budget(){
    const urlParameters = new URLSearchParams(window.location.search);
    const destinationName = urlParameters.get('name');
    const selectedDestinations = dests.filter(d => d.name === destinationName);
    const selectedDestination = selectedDestinations[0];
    document.getElementById('destination').setAttribute('placeholder', String(selectedDestination.price));
    document.getElementById('trip-duration').setAttribute('placeholder', String(selectedDestination.days));
  }
  set_budget();

  function budget_calculator(){
    const destination_price = Number(document.getElementById('destination').getAttribute('placeholder'));
    const trip_duration = Number(document.getElementById('trip-duration').getAttribute('placeholder'));
    const calculate = document.getElementById('calculate');

    calculate.addEventListener('click', function(event){
      event.preventDefault();
      const accomodation_cost = Number(document.getElementById('accomodation-cost').value.trim());
      const transport_cost = Number(document.getElementById('transportation-cost').value.trim());
      const food_cost = Number(document.getElementById('food-cost').value.trim());
      const entertainment_cost = Number(document.getElementById('entertainment-cost').value.trim());
      const emergencyFundValue = destination_price * (10 / 100);
      const result = destination_price + accomodation_cost + transport_cost + (trip_duration * (food_cost + entertainment_cost)) + emergencyFundValue;
      document.getElementById('result').innerHTML = result + ' KES';
      document.getElementById('daily-average').innerHTML = (transport_cost + (trip_duration * (food_cost + entertainment_cost))) + ' KES';
      document.getElementById('emergency-fund-result').innerHTML = emergencyFundValue + ' KES';
    });
  }
  budget_calculator();
});
