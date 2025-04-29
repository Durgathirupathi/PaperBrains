let menuLinks = document.querySelectorAll(".menu-list-sub-folder li a");
const form = document.getElementById("contactForm");

menuLinks.forEach(link => {
    link.addEventListener("click", function () {
        menuLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

let givenValues = {
    "full_name": "",
    "phone_number": "",
    "email": ""
};

let finalOutput = {
    "full_name": "",
    "phone_number": "",
    "email": "",
    "description": ""
};

function handleChange(event) {
    let { name, value } = event.target;
    givenValues[name] = value;
    finalOutput[name] = value;
}

function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true;
    console.log(givenValues);

    // Validation Logic
    Object.keys(givenValues).forEach((key) => {
        let id_s = document.getElementById(`${key}_id`);
        if (givenValues[key]) {
            if (id_s) id_s.textContent = "";
            if (key === 'phone_number') {
                let regex = /^\d{10}$/;
                if (!regex.test(givenValues[key])) {
                    id_s.textContent = "Please enter 10 digits of your number";
                    isValid = false;
                }
            }
        } else {
            isValid = false;
            let newKey = key.replace("_", " ");
            id_s.textContent = `Please Enter ${newKey}`;
        }
    });

    if (isValid) {
        submitToGoogleSheets();
        document.getElementById("contactForm").style.display = "none";
        document.getElementById("successMessage").style.display = "flex";
        document.querySelector(".divider").style.height = "100%";
       


        // email configuartion

        emailjs.init("5LNHz_JDU_DRcoibI");
        emailjs.sendForm("service_paperBrains", "template_h8s9pja", form).then(
            function () {
              alert("Message sent successfully! ✅");
            },
            function (error) {
              alert("Failed to send! ❌");
              console.log(error);
            }
          );
    } else {
        console.log("❌ Form validation failed");
    }

    // email configuartion
}

function submitToGoogleSheets() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyJTIvUALmIRXTTu4WDARQUcNkN6FuqjOGJd7Im6paChkU6Y7qhhMyT6G_Y5Yt3MJXu/exec';
    const form = document.forms['contact-form'];

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! Form is submitted"))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message));
}

function hamburgerEvent() {
    document.querySelector(".side-bar").classList.toggle("side-bar-display");
    document.body.classList.toggle("main-body");
}
