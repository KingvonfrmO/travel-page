document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('form');

    function show_error(input, message){
        let error = input.parentNode.querySelector('.error');
        if (error === null){
            error = document.createElement('div');
            error.className = 'error';
            error.setAttribute('role', 'alert')
            input.parentNode.appendChild(error);
        }
        error.textContent = message;
    }

    function clear_error(input){
        let error = input.parentNode.querySelector('.error');
        if (error){
            error.remove()
        }
    }

    function show_toast (message){
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        },4000);
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        let filled = true;

        const first_name = document.getElementById('first-name')
        if (first_name.value.trim() === ""){
            show_error(first_name, "First name is required *")
            filled = false;
        } else {
            clear_error(first_name);
        }

        const last_name = document.getElementById('last-name');
        if (last_name.value.trim() === ""){
            show_error(last_name, "Last name is required *");
            filled = false;
        } else {
            clear_error(last_name);
        }

        const email = document.getElementById('email');
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === ""){
            show_error(email, "Email is required *");
            filled = false;
        } else if (!pattern.test(email.value.trim())){
            show_error(email, "Enter valid email *");
            filled = false;
        } else {
            clear_error(email);
        }

        const number = document.getElementById('phone-number');
        const phone_pattern = /^(?:\+254|0)?7\d{8}$/
        if (number.value.trim() === ""){
            show_error(number, "Phone number is required *");
            filled = false;
        } else if (!phone_pattern.test(number.value.trim())){
            show_error(number, "Enter valid phone numer *");
            filled = false;
        } else{
            clear_error(number);
        }

        const message = document.getElementById('message');
        if (message.value.trim() === ""){
            show_error(message, "Message is required *");
            filled = false;
        } else {
            clear_error(message);
        }

        const consent = document.getElementById('consent');
        if (!consent) {
            filled = false;
        } else if (!consent.checked){
            show_error(consent, "consent is required *");
            filled = false;
        } else {
            clear_error(consent);
        }

        if (filled === true){
            form.reset();
            show_toast("Message sent Successfully!");
        }
    });


    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let newsletter_filled = true;
            const newsletter_input = document.querySelector('.newsletter-input');
            const newsletter_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (newsletter_input.value.trim() === "") {
                show_error(newsletter_input, "Please Enter your Email");
                newsletter_filled = false;
            } else if (!newsletter_pattern.test(newsletter_input.value.trim())) {
                show_error(newsletter_input, "Enter valid email *");
                newsletter_filled = false;
            } else {
                clear_error(newsletter_input);
            }

            if (newsletter_filled === true) {
                newsletterForm.reset();
                show_toast("Subscribed");
            }
        });
    }

    window.onscroll = function() {
        const scroll_button = document.getElementById('scrollTopBtn');
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scroll_button.style.display = 'block'
        } else {
            scroll_button.style.display = 'none'
        }
        scroll_button.addEventListener('click', function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    
});