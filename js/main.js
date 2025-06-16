document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    function show_error(input, message) {
      let error = input.parentNode.querySelector(".error");
      if (error === null) {
        error = document.createElement("div");
        error.className = "error";
        error.setAttribute("role", "alert");
        input.parentNode.appendChild(error);
      }
      error.textContent = message;
    }

    function clear_error(input) {
      let error = input.parentNode.querySelector(".error");
      if (error) {
        error.remove();
      }
    }

    function show_toast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 4000);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let filled = true;

      const first_name = document.getElementById("first-name");
      if (first_name.value.trim() === "") {
        show_error(first_name, "First name is required *");
        filled = false;
      } else {
        clear_error(first_name);
      }

      const last_name = document.getElementById("last-name");
      if (last_name.value.trim() === "") {
        show_error(last_name, "Last name is required *");
        filled = false;
      } else {
        clear_error(last_name);
      }

      const email = document.getElementById("email");
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === "") {
        show_error(email, "Email is required *");
        filled = false;
      } else if (!pattern.test(email.value.trim())) {
        show_error(email, "Enter valid email *");
        filled = false;
      } else {
        clear_error(email);
      }

      const number = document.getElementById("phone-number");
      const phone_pattern = /^(?:\+254|0)?7\d{8}$/;
      if (number.value.trim() === "") {
        show_error(number, "Phone number is required *");
        filled = false;
      } else if (!phone_pattern.test(number.value.trim())) {
        show_error(number, "Enter valid phone numer *");
        filled = false;
      } else {
        clear_error(number);
      }

      const message = document.getElementById("message");
      if (message.value.trim() === "") {
        show_error(message, "Message is required *");
        filled = false;
      } else {
        clear_error(message);
      }

      const consent = document.getElementById("consent");
      if (!consent) {
        filled = false;
      } else if (!consent.checked) {
        show_error(consent, "consent is required *");
        filled = false;
      } else {
        clear_error(consent);
      }

      if (filled === true) {
        form.reset();
        show_toast("Message sent Successfully!");
      }
    });
  }

  window.onscroll = function () {
    const scroll_button = document.getElementById("scrollTopBtn");
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scroll_button.style.display = "block";
    } else {
      scroll_button.style.display = "none";
    }
    scroll_button.addEventListener("click", function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

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

  function destinations(dests) {
    const container = document.querySelector(".destinations-list");
    container.innerHTML = "";
    dests.map((destination, i) => {
      const card = document.createElement("div");
      card.className = "destination-card";
      card.innerHTML = `
            <img src= "${destination.image}" alt="${destination.name}"/>
            <div class="destination-info">
            <div>
            <span>${destination.name}</span>
            <span>${destination.price_label}</span>
            </div>
            <div class="trip-info">
            <span>&#9992;</span>
            <span>${destination.duration_label}</span>
            </div>
            <div class="weather" id="weather-${i}">
            Loading Weather...
            </div>
            </div>`;
      weather(destination.name.split(",")[0], `weather-${i}`, apikey);
      container.appendChild(card);
    });
  }

  function destination_search() {
    const section = document.querySelector(".destinations");
    if (!document.getElementById("destination-search")) {
      const controls = document.createElement("div");
      controls.className = "controls";
      controls.innerHTML = `
            <input id="destination-search" type="text" placeholder="Search destination...">
            <select id="destination-sort">
                <option value="">Sort by</option>
                <option value="price-ascend">Price: Low → High</option>
                <option value="price-descend">Price: High → Low</option>
                <option value="duration-ascend">Duration: Shortest</option>
                <option value="duration-descend">Duration: Longest</option>
            </select>
            `;
      section.insertBefore(
        controls,
        section.querySelector(".destinations-list")
      );
    }
  }

  let filtered = [...dests];
  function update() {
    let search = document
      .getElementById("destination-search")
      .value.trim()
      .toLowerCase();
    let sort = document.getElementById("destination-sort").value;

    let result = dests.filter((d) => d.name.toLowerCase().includes(search));

    if (sort === "price-ascend") result.sort((a, b) => a.price - b.price);
    if (sort === "price-descend") result.sort((a, b) => b.price - a.price);
    if (sort === "duration-ascend") result.sort((a, b) => a.days - b.days);
    if (sort === "duration-descend") result.sort((a, b) => b.days - a.days);

    destinations(result);
  }

  async function weather(city, elementId, apiKey) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apikey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        document.getElementById(elementId).textContent = "Weather Unavailable";
        return;
      }
      const data = await response.json();
      document.getElementById(
        elementId
      ).textContent = `🌡️ ${data.main.temp}°C, ${data.weather[0].main}`;
    } catch (e) {
      document.getElementById(elementId).textContent = "Weather unavailable";
    }
  }

  destination_search();
  document
    .getElementById("destination-search")
    .addEventListener("input", update);
  document
    .getElementById("destination-sort")
    .addEventListener("change", update);

  destinations(filtered);
});
