document.getElementById("registerForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const extra = document.getElementById("signupExtra");
    const submitBtn = this.querySelector('button[type="submit"]');

    if (extra && extra.classList.contains("is-hidden")) {
        extra.classList.remove("is-hidden");

        extra.querySelectorAll("[data-required='true']").forEach((el) => {
            el.setAttribute("required", "required");
        });

        if (submitBtn) submitBtn.textContent = "Create account";

        const nameInput = document.getElementById("name");
        if (nameInput) nameInput.focus();

        return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://campuscare-p4eh.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Account Created Successfully");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registration failed");
        }

    } catch (error) {
        alert("Backend server is not running");
        console.error(error);
    }
});