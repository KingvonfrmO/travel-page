document.addEventListener("DOMContentLoaded", function () {
  function showError(input, message) {
    let error = input.parentNode.querySelector(".error");
    if (!error) {
      error = document.createElement("div");
      error.className = "error";
      error.setAttribute("role", "alert");
      input.parentNode.appendChild(error);
    }
    error.textContent = message;
  }

  function clearError(input) {
    const error = input.parentNode.querySelector(".error");
    if (error) error.remove();
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 4000);
  }

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let filled = true;

      const firstName = document.getElementById("first-name");
      const lastName = document.getElementById("last-name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone-number");
      const message = document.getElementById("message");
      const consent = document.getElementById("consent");

      if (firstName.value.trim() === "") {
        showError(firstName, "First name is required *");
        filled = false;
      } else {
        clearError(firstName);
      }

      if (lastName.value.trim() === "") {
        showError(lastName, "Last name is required *");
        filled = false;
      } else {
        clearError(lastName);
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === "") {
        showError(email, "Email is required *");
        filled = false;
      } else if (!emailPattern.test(email.value.trim())) {
        showError(email, "Enter valid email *");
        filled = false;
      } else {
        clearError(email);
      }

      const phonePattern = /^(?:\+254|0)?7\d{8}$/;
      if (phone.value.trim() === "") {
        showError(phone, "Phone number is required *");
        filled = false;
      } else if (!phonePattern.test(phone.value.trim())) {
        showError(phone, "Enter valid phone number *");
        filled = false;
      } else {
        clearError(phone);
      }

      if (message.value.trim() === "") {
        showError(message, "Message is required *");
        filled = false;
      } else {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone-number').value.trim();
        const messageText = message.value.trim(); 
        const completeMessage = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${messageText}`;
        const encodedMessage = encodeURIComponent(completeMessage);
        window.location.href = `https://wa.me/254798318333?text=${encodedMessage}`;
        clearError(message);
      }

      if (!consent) {
        filled = false;
      } else if (!consent.checked) {
        showError(consent, "Consent is required *");
        filled = false;
      } else {
        clearError(consent);
      }
      if (filled) {
        form.reset();
        showToast("Message sent Successfully!");
      }
    });
  }
});